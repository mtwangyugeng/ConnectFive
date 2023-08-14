<script lang="ts">
	import LoadingIcon from '../icons/LoadingIcon.svelte';
    import RippleButton from './_RippleButton.svelte';

	export let isLoading = false;

    export let type: "button" | "submit" | "reset" | null | undefined = "submit";
    export let style = "width: 100%;";
    export let disabled = false;
</script>


<RippleButton classes={(isLoading || disabled) ? "btn-disabled" : "btn-primary"} type={type} style={style} disabled={isLoading || disabled} on:click>
    {#if isLoading}
        <span class=LoadingIcon><LoadingIcon /></span>
    {:else}
        <slot />
    {/if}
</RippleButton>


<style>
    .LoadingIcon :global(svg){
        width: 25px;
        height: 25px;
    }
</style>