<script lang="ts">
    let rX = 0;
    let rY = 0;
    let isRippleActive = false;
    function handleRipple(e: MouseEvent) {
        console.log(e.offsetX, e.offsetY);
        rX = e.offsetX;
        rY = e.offsetY;
        isRippleActive = true;
        setTimeout(() => (isRippleActive = false), 500);
    }

    export let type: "button" | "submit" | "reset" | null | undefined =
        "button";
    export let classes = "";
    export let style = "";
    export let disabled = false;
</script>

<button class={"RippleButton " + classes} on:click={handleRipple} on:click {type} {style} {disabled}>
    <div
        class="Ripple"
        class:RippleActive={isRippleActive}
        style={`left:${rX}px;top:${rY}px;`}
    />
    <slot />
</button>

<style>
    button {
        position: relative;
        overflow: hidden;
    }

    .Ripple {
        position: absolute;
        background-color: white;
        z-index: 3;
        border-radius: 50%;
        /* width: 20px;
        height: 20px; */
        transform: translate(-50%, -50%);
    }

    .RippleActive {
        animation: ripple 500ms ease-in;
    }

    @keyframes ripple {
        0% {
            opacity: 0;
            width: 0%;
        }
        25% {
            opacity: 1;
        }
        100% {
            width: 200%;
            padding-bottom: 200%;
            opacity: 0;
        }
    }
</style>
