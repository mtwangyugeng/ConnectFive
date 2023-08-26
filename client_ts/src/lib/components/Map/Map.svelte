<script context="module" lang="ts">
    /**
     * Front end rendering for the map.
     */
</script>

<script lang="ts">
    import { mapData, currentPositionId } from "./store";
</script>

{#each $mapData as row, i (i)}
    {#each row as block, j (j)}
        {block.id}
    {/each}
{/each}