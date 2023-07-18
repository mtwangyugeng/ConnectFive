<script>
    import { peices } from "./Board.svelte";

    export let demension = "30px";
    export let n = true, 
        s = true, 
        w = true, 
        e = true;

    /**
     * @type {number}
     */
     export let i;
    /**
     * @type {number}
     */
     export let j;


    function handleClick() {
        console.log(i, j)
        peices.update(v => {
            v[i][j] = 1;
            return v
        })
    }
</script>

<button class='Piece' style={`height: ${demension};`} on:click={handleClick}>
    <div class='CrossH'>
        <div style={`${w && 'background: black'}`} />
        <div style={`${e && 'background: black'}`} />
    </div>
    <div class='CrossV'>
        <div style={`${n && 'background: black'}`} />
        <div style={`${s && 'background: black'}`} />
    </div>

    {#if $peices[i][j] == 1}
        <div class='Qi'>
        </div>
    {/if}
</button>


<style>
    .Piece {
        all: unset;
        aspect-ratio: 1;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .Piece:hover {
        background-color: rgb(190, 190, 190);
    }

    .CrossH {
        height: 2px;
        width: 100%;
        position: absolute;
        display: flex;
    }
    .CrossH div {
        flex: 1;
    }

    .CrossV {
        height: 100%;
        width: 2px;
        position: absolute;
        display: flex;
        flex-direction: column;
    }
    .CrossV div {
        flex: 1;
    }

    .Qi {
        background-color: rgb(218, 0, 0);
        z-index: 2;
        border-radius: 50%;
        height: 90%;
        width: 90%;
    }
</style>