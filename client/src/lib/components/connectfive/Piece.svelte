<script>
    import { peices } from "./Board.svelte";

    export let demension = "30px";
    export let n = true, 
        s = true, 
        w = true, 
        e = true;

    export let qi = 0;

    export let isDotted = false;
</script>

<button class='Piece' style={`height: ${demension};`} on:click>
    <div class='CrossH'>
        <div style={`${w && 'background: black'}`} />
        <div style={`${e && 'background: black'}`} />
    </div>
    <div class='CrossV'>
        <div style={`${n && 'background: black'}`} />
        <div style={`${s && 'background: black'}`} />
    </div>

    {#if isDotted}
        <div class='Dot' />
    {/if}

    {#if qi !== 0}
        <div class='Qi' style={`${qi === 1 ? 'background: black' : 'background: white'}`} />
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

    .Dot {
        background-color: black;
        border-radius: 50%;
        position: absolute;
        width: 10px;
        height: 10px;
    }
</style>