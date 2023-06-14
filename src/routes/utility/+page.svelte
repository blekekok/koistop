<script lang="ts">
	import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import ItemPage from '$lib/components/ItemListPage.svelte';
  import { onMount } from 'svelte';

  $: items = null;

  $: filters = [
        {
            label: 'Search',
            name: 'search',
            type: 'textbox',
            value: $page.url.searchParams.get('search') ?? ''
        },
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

    async function getItems() {
        items = null;

        const filtering: any = {};
        filters.forEach((filter) => {
            if (filter.type === 'select') {
                filtering[filter.name] = filter.selected;
            }

            if (filter.type === 'textbox') {
                filtering[filter.name] = filter.value;
            }

            if (filter.name === 'search') {
                $page.url.searchParams.set('search', filter.value ?? '');
                if (filter.value) {
                    goto(`?${$page.url.searchParams.toString()}`);
                } else {
                    goto('?');
                }
            }
        });

        const response = await fetch('/api/utility/list', {
            method: 'POST',
            body: JSON.stringify(filtering)
        });

        if (response.status !== 200) return;

        const content = await response.json();
        items = content.data;
    }

    onMount(async () => {
      await getItems();
    })
</script>

<ItemPage {items} {filters} onChange={getItems} type="utility" />