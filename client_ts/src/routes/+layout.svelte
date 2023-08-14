<script context="module" lang="ts">
	import ToastSystem from '$lib/components/ToastSystem/ToastSystem.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	/**
	 * The store that determins if we are using dark theme or not.
	 */
	export const darkMode = writable(false);
</script>

<script>
    import ThemeProvider from "$lib/components/styles/_ThemeProvider.svelte";
</script>

<ThemeProvider>
	<div class="app">
		<slot />
		<ToastSystem />
	</div>
</ThemeProvider>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 100vh;
		font-family: Arial, Helvetica, sans-serif;
	}
</style>
