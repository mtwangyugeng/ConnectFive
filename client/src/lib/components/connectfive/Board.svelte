<script context="module">
    import { writable } from "svelte/store";

    const width = 19;
    const height = 19;

    export const peices = writable(
        Array(height).fill(null).map( _=> Array(width).fill(0))
    )
    export const curPlayer = writable(1);
    function switchPlayer() {
        curPlayer.update(v=>{
            return v % 2 + 1;
        })
    }

    /**
     * @param {number} i
     * @param {number} j
     * @param {number} curplayer
     */
    function updatePiece(i, j, curplayer) {
        peices.update(v => {
            v[i][j] = curplayer;
            return v;
        })

        switchPlayer();
    }
</script>

<script>
    import Piece from "./Piece.svelte";


</script>


<section 
    class="Board" 
    style={`grid-template-columns: repeat(${width}, 1fr);
            grid-template-rows: repeat(${height}, 1fr);`}
    >
    {#each $peices as row, i (i)}
        {#each row as piece, j (j)}
            <Piece n={i!=0} s={i!=height-1} w={j!=0} e={j!=width-1} qi={piece} on:click={()=>updatePiece(i, j, $curPlayer)}/>
        {/each}
    {/each}
</section>

<style>
    .Board {
        display: grid;
        background-color: burlywood;
    }
</style>

