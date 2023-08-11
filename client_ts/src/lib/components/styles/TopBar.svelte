<script lang=ts>
    export let title: string = 'placeholder'
</script>


<div class="TopBar h-stack">
    <h1>{title}</h1>
    <slot />
</div>

<style>
    .TopBar {
		padding: 10px;
		background-color: rgb(231, 231, 231, 0.3);
		align-items: center;
		justify-content: space-between;
	}

    h1 {
		flex: 1;
		text-align: left;
	}

    @media (max-width: 550px) {
		h1 {
			display: none;
		}
	}
</style>