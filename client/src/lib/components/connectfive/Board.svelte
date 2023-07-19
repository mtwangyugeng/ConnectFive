<script context="module">
    import { writable } from "svelte/store";

    const width = 19;
    const height = 19;

    export const peices = writable(
        Array(height).fill(null).map( _=> Array(width).fill(0))
    )
    /**
     * @param {number} i
     * @param {number} j
     * @param {number[][]} board
     */
    function checkWin(i, j, board) {
        const qi = board[i][j];
        const height = board.length;
        const width = board[0].length;

        let horizontal = 1;
        let cnt = j + 1;
        while (cnt < width && board[i][cnt] === qi) {
            horizontal ++;
            cnt++;
        }
        cnt = j - 1;
        while (cnt >= 0 && board[i][cnt] === qi) {
            horizontal ++;
            cnt--;
        }

        let vertical = 1;
        cnt = i + 1;
        while (cnt < height && board[cnt][j] === qi) {
            vertical ++;
            cnt++;
        }
        cnt = i - 1;
        while (cnt >= 0 && board[cnt][j] === qi) {
            vertical ++;
            cnt--;
        }

        let diagonal = 1;
        let cntI = i + 1;
        let cntJ = j + 1;
        while (cntI < height && cntJ < width && board[cntI][cntJ] === qi) {
            diagonal ++;
            cntI++;
            cntJ++;
        }
        cntI = i - 1;
        cntJ = j - 1;
        while (cntI >= 0 && cntJ >= 0 && board[cntI][cntJ] === qi) {
            diagonal ++;
            cntI--;
            cntJ--;
        }

        let diagonalAlter = 1;
        cntI = i + 1;
        cntJ = j - 1;
        while (cntI < height && cntJ >= 0 && board[cntI][cntJ] === qi) {
            diagonalAlter ++;
            cntI++;
            cntJ--;
        }
        cntI = i - 1;
        cntJ = j + 1;
        while (cntI >= 0 && cntJ < width && board[cntI][cntJ] === qi) {
            diagonalAlter ++;
            cntI--;
            cntJ++;
        }

        console.log(horizontal, vertical, diagonal, diagonalAlter)
        return horizontal >= 5 || vertical >=5 || diagonal >= 5 || diagonalAlter >= 5;
    }

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
            console.log(i, j, checkWin(i , j, v));
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

