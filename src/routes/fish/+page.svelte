<script lang="ts">
    import ItemPage from '$lib/components/ItemListPage.svelte';

    export let data;

    $: items = data.content;
</script>

<ItemPage {items} type="fish" />