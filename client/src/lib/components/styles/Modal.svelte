<script>
    /**
     * This component is a modal wich is a container that 
     * covers the full screen. it usually contains a 
     * window in the center
    */
</script>

<section>
	<div class="WindowContainer">
		<slot />
	</div>
</section>

<style>
	section {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		min-height: 100dvh;
		flex: 1;
		z-index: 999;

		animation: turndark 400ms;
		animation-fill-mode: forwards;
	}

	@keyframes turndark {
		from {
			background-color: rgba(0, 0, 0, 0);
		}
		to {
			background-color: rgba(0, 0, 0, 0.5);
		}
	}

	.WindowContainer {
		position: absolute;
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
