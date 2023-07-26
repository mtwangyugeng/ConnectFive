<script context="module">
    import { writable } from "svelte/store";
    import Modal from "../styles/Modal.svelte";
    import CloseIcon from "../styles/icons/CloseIcon.svelte";
    import InputWithAnimatedPlaceHolder from "../styles/InputWithAnimatedPlaceHolder.svelte";
    import NameTagIcon from "../styles/icons/NameTagIcon.svelte";
    const user = writable("");
</script>

<script>
    import RippleButton from "../styles/RippleButton.svelte";
    import LoadingIcon from "../styles/icons/LoadingIcon.svelte";

    let isOpened = ($user ==="");

    let name = ""
    let isLoading = false;
</script>

{#if isOpened}
    <Modal>
        <section class=card style={``}>
            <button class=close_button on:click={() => isOpened = false}>
                <CloseIcon />
            </button>
            <form>
                <InputWithAnimatedPlaceHolder bind:value={name} name="name" placeholder="Enter a nickname." icon={NameTagIcon}/>

                <RippleButton type="submit" classes={(name==="" || isLoading) ? "btn-disabled" : "btn-primary"}>
                    {#if isLoading}
                        <LoadingIcon />
                    {:else}
                        Join
                    {/if}
                </RippleButton>
            </form>
        </section>
    </Modal>
{/if}

<style>
    .card {
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        position: relative;
    }

    .close_button {
        all: unset;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 5px;
        border-radius: 5px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .close_button:hover{
        transition: all 0.5s;
        background-color: rgba(124, 124, 124, 0.3);

    }

    .close_button :global(svg){
        width: 15px;
        height: 15px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>