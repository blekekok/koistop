<script lang="ts">
    import ItemPage from '$lib/components/ItemPage.svelte';

    export let data;

    $: items = data.content;
</script>

<ItemPage {items} />