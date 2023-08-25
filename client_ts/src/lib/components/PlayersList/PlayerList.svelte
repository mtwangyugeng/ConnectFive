<script lang="ts">
    import Player from "./Player.svelte";
    import type { PlayerInfo } from "./types";

    export let players: PlayerInfo[] = [];

</script>


<section>
    {#each players as player, i (i)}
        <Player playinfo={player} />
    {/each}
</section>


<style>
    section {
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
        overflow: auto;
    }
</style>