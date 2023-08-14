<script>
	import RefreshIcon from "../icons/RefreshIcon.svelte";
</script>

<span class=RefreshButton>
    <button on:click>
        <RefreshIcon />
    </button>
</span>



<style>
    .RefreshButton :global(svg) {
        width: 20px;
        height: 20px;
    }
</style>