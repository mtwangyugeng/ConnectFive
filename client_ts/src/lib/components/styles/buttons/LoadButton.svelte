<script lang="ts">
	import LoadingIcon from '../icons/LoadingIcon.svelte';

	export let isLoading = false;

    export let type: "button" | "submit" | "reset" | null | undefined = "submit";
    export let style = "width: 100%;";
    export let disabled = false;
</script>


<button type={type} style={style} disabled={isLoading || disabled} on:click>
    {#if isLoading}
        <span class=LoadingIcon><LoadingIcon /></span>
    {:else}
        <slot />
    {/if}
</button>


<style>
    .LoadingIcon :global(svg){
        width: 25px;
        height: 25px;
        fill: orange;
    }
</style>