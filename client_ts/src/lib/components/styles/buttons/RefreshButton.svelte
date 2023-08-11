<script>
	import RefreshIcon from "../icons/RefreshIcon.svelte";
    import Button from '@smui/button';
</script>

<span class=RefreshButton>
    <Button variant="outlined" on:click>
        <RefreshIcon />
    </Button>
</span>



<style>
    .RefreshButton :global(svg) {
        width: 20px;
        height: 20px;
    }
</style>