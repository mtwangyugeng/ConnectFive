<script lang="ts">
	import Button from '@smui/button';
	import LoadingIcon from '../icons/LoadingIcon.svelte';

	export let isLoading = false;

    export let type = "submit";
    export let style = "width: 100%;";

    export let variant: 'text' | 'outlined' | 'raised' = 'text';

    export let disabled = false;
</script>


<Button type={type} style={style} disabled={isLoading || disabled} variant={variant} on:click>
    {#if isLoading}
        <span class=LoadingIcon><LoadingIcon /></span>
    {:else}
        <slot />
    {/if}
</Button>


<style>
    .LoadingIcon :global(svg){
        width: 25px;
        height: 25px;
        fill: orange;
    }
</style>