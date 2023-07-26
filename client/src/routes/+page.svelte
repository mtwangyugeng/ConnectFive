<script>
    import Board from '$lib/components/connectfive/Board.svelte';
    import Login from '$lib/components/forms/Login.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Board />
</section>
<!-- <Login /> -->

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
