<script>
	import LoginForm from "./LoginForm.svelte";

</script>

<section>
    <LoginForm />
    <span class="logo">
        <h1>Connect Five</h1>
    </span>
</section>

<style>
    section {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .logo {
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
</style>