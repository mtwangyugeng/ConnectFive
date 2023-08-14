<script context="module" lang="ts">
    import { message } from "$lib/components/ToastSystem/ToastSystem.svelte";

    const AUTH_URL = "/auth/";
    const userNameF = writable("");
    const userToken = writable("");

    function postLogIn(username: string, password: string) {
        return fetch(AUTH_URL + "login/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
    }

    function postCreateAccount(
        username: string,
        password: string,
        password2: string
    ) {
        return fetch(AUTH_URL + "register/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, password2 }),
        });
    }

    async function handleCreateAccount(
        username: string,
        password: string,
        confirmPassword: string
    ) {
        let failed = false;

        const res = await postCreateAccount(
            username,
            password,
            confirmPassword
        );
        if (res.status !== 201) {
            const errorJson = await res.text();
            message.set({
                type: "error",
                message: "Create account error: " + errorJson,
            });
            failed = true;
        } else {
            const reader = await res.json();
            console.error("READER", reader);
            // userToken.set(reader.access);
            // userNameF.set(username);
        }

        return failed;
    }

    async function handleLogIn(username: string, password: string) {
        let failed = false;

        const res = await postLogIn(username, password);
        if (res.status !== 200) {
            const errorJson = await res.json();
            message.set({
                type: "error",
                message: "Login error: " + errorJson.detail,
            });
            failed = true;
        } else {
            const reader = await res.json();
            userToken.set(reader.access);
            userNameF.set(username);
        }

        return failed;
    }
</script>

<script lang="ts">
    import LoadingIcon from "$lib/components/styles/icons/LoadingIcon.svelte";
    import RippleButton from "$lib/components/styles/buttons/_RippleButton.svelte";
    import InputWithAnimatedPlaceHolder from "$lib/components/styles/inputs/InputWithAnimatedPlaceHolder.svelte";
    import { writable } from "svelte/store";

    let username = "";
    let password = "";
    let confirmPassword = "";

    let isShowingPassword = false;
    $: passwordType = isShowingPassword ? "text" : "password";

    let isCreatingAccount = false;
    $: windowTitle = isCreatingAccount ? "Create Account" : "Login";

    let isLoading = false;

    async function handleSubmit() {
        isLoading = true;
        let failed = null;

        try {
            if (isCreatingAccount) {
                failed = await handleCreateAccount(
                    username,
                    password,
                    confirmPassword
                );
                failed = await handleLogIn(username, password);
            } else {
                failed = await handleLogIn(username, password);
            }
        } catch (e: any) {
            message.set({
                type: "error",
                message: "Login error: " + e.message,
            });
        }

        if (failed === false) {
            if (isCreatingAccount) {
                message.set({
                    type: "good",
                    message: "Welcome, " + username + ".",
                });
            } else {
                message.set({
                    type: "good",
                    message: "Welcome back, " + username + ".",
                });
            }
        }

        isLoading = false;
    }
</script>

<form
    on:submit|preventDefault={handleSubmit}
    class="card card-dropin card-shadow"
>
    <h1 class="normal-text">{windowTitle}</h1>

    <InputWithAnimatedPlaceHolder
        bind:value={username}
        placeholder="User Name"
    />

    <InputWithAnimatedPlaceHolder
        bind:value={password}
        placeholder="Password"
        type={passwordType}
    />

    <span class="CreatAccount" class:ZoomIn={isCreatingAccount}>
        <InputWithAnimatedPlaceHolder
            bind:value={confirmPassword}
            placeholder="Confirm Password"
            type={passwordType}
        />
    </span>

    <div class="Options">
        <label class="ShowPassword">
            <input type="checkbox" bind:checked={isShowingPassword} />
            Show Password
        </label>

        <button
            class="SwitchMode"
            on:click={() => (isCreatingAccount = !isCreatingAccount)}
            type="button"
        >
            {isCreatingAccount ? "Login" : "Create Account"}
        </button>
    </div>

    <span class="Submit">
        <RippleButton
            type="submit"
            classes={username === "" ||
            password === "" ||
            (isCreatingAccount && confirmPassword === "") ||
            isLoading
                ? "btn-disabled"
                : "btn-primary"}
        >
            {#if isLoading}
                <LoadingIcon />
            {:else}
                {windowTitle}
            {/if}
        </RippleButton>
    </span>
</form>

<style>
    
    form {
        width: 100%;
        max-width: 400px;
    }
    .ShowPassword {
        user-select: none;
        cursor: pointer;
        color: black;
    }

    h1 {
        font-size: 18px;
    }

    .Options {
        display: flex;
        justify-content: space-between;
        margin: 0 10px;
    }

    .SwitchMode {
        font-weight: bold;
        text-decoration: underline;
        cursor: pointer;
        user-select: none;
        color: rgb(49, 114, 136);
        transition: all 0.2s;
        padding: 5px;
        border-radius: 5px;
    }
    .SwitchMode:hover {
        color: rgb(65, 49, 136);
        background-color: rgba(105, 91, 148, 0.267);
    }

    .CreatAccount {
        height: 0px;
        overflow: hidden;
        transition: all 0.2s;
    }

    .ZoomIn {
        height: 40px;
        overflow: visible;
    }

    .Submit {
        display: flex;
        height: 45px;
    }

    .Submit :global(button) {
        width: 100%;
    }

    .Submit :global(svg) {
        width: 30px;
        height: 30px;
    }
</style>
