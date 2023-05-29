<script>
    import img from '$lib/images/ikan1.jpg';
    import { Button } from 'flowbite-svelte';
</script>

<div class="h-screen w-full bg-no-repeat text-white" style="background-image:url('{img}');background-color: rgba(0, 0, 0, 0.6)">
    <div style="background-color: rgba(0, 0, 0, 0.6);">
        <h1>Welcome to SvelteKit</h1>
        <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        <Button color="blue">Hello</Button>
    </div>
</div>

<style>
</style>