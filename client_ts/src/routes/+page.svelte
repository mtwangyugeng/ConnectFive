<script>
    import { goto } from "$app/navigation";
    import Board from "$lib/components/connectfive/Board.svelte";
    import { onMount } from "svelte";
    import { userToken } from "./login/LoginForm.svelte";
	console.log("THIS IS HOME NOW", $userToken)

	// todo if user token is invalid then send them back to login
	onMount(() => {
		if (!$userToken || $userToken === "") {
		goto('/login')
	}
	})
	
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<section>
<Board />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
