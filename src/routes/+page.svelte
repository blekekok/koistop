<script>
    import img from '$lib/images/ikan1.jpg';
    import { Button } from 'flowbite-svelte';
</script>

<div class="h-screen w-full bg-no-repeat text-white" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('{img}');">
    <div>
        <h1>Welcome to SvelteKit</h1>
        <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        <Button color="blue">Hello</Button>
    </div>
</div>

<style>
</style>
