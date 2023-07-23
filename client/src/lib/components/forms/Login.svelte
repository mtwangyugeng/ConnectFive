<script context="module">
    import { writable } from "svelte/store";
    import Modal from "../styles/Modal.svelte";
    import CloseIcon from "../styles/icons/CloseIcon.svelte";
    const user = writable("");

</script>

{#if $user ===""}
    <Modal>
        <section class=card style={``}>
            <button class=close_button>
                <CloseIcon />
            </button>
            <form>
                Enter a nickname.
            </form>
        </section>
    </Modal>
{/if}

<style>
    .card {
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        position: relative;
    }

    .close_button {
        all: unset;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 5px;
        border-radius: 5px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .close_button:hover{
        transition: all 0.5s;
        background-color: rgba(124, 124, 124, 0.3);

    }

    .close_button :global(svg){
        width: 15px;
        height: 15px;
    }
</style>