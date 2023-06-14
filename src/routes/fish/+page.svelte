<script lang="ts">
    import ItemPage from '$lib/components/ItemListPage.svelte';
	import { onMount } from 'svelte';

    $: items = null;

    $: filters = [
        {
            label: 'Sort by',
            name: 'sort',
            type: 'select',
            selected: 'a-z',
            selections: [
                {
                    name: 'Most recent',
                    value: 'recent'
                },
                {
                    name: 'Most oldest',
                    value: 'oldest'
                },
                {
                    name: 'A-Z',
                    value: 'a-z'
                },
                {
                    name: 'Z-A',
                    value: 'z-a'
                },
                {
                    name: 'Most expensive',
                    value: 'expensive'
                },
                {
                    name: 'Most cheapest',
                    value: 'cheapest'
                }
            ]
        }
    ];

    async function getTypeFilter() {
        const filter: any = {
            label: 'Type',
            name: 'fish_type',
            type: 'select',
            selected: 'all',
            selections: [
                {
                    name: 'All',
                    value: 'all'
                }
            ]
        };

        const response = await fetch('/api/fish/type');

        if (response.status !== 200) return;

        const content = await response.json();
        content.data.forEach((type: any) => {
            filter.selections.push({
                name: type.name,
                value: type.id
            });
        });

        filters = [...filters, filter];
    }

    async function getItems() {
        items = null;

        const filtering: any = {};
        filters.forEach((filter) => {
            filtering[filter.name] = filter.selected;
        });

        const response = await fetch('/api/fish/list', {
            method: 'POST',
            body: JSON.stringify(filtering)
        });

        if (response.status !== 200) return;

        const content = await response.json();
        items = content.data;
    }

    onMount(async () => {
        await getTypeFilter();
        await getItems();
    });
</script>

<ItemPage {items} {filters} onChange={getItems} type="fish" />