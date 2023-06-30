<script lang="ts">
    import fishImage from '$lib/images/ikan1.jpg';
    import { Button, Modal } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    
    const numberFormat = new Intl.NumberFormat();

    $: showModal = false;
    $: modalTitle = 'Error';
    $: modalMessage = '';
    function openModal(title: string, message: string) {
        modalTitle = title;
        modalMessage = message;
        showModal = true;
    }

    $: items = null;

    async function setStatus(item: any, status: number) {
        const content: any = {
            status
        };

        if (item.type === 'fish') {
            content.fish_id = item.id;
        } else {
            content.utility_id = item.id;
        }

        const response = await fetch('/api/order/status', {
            method: 'POST',
            body: JSON.stringify(content)
        });

        if (response.status !== 200) {
            openModal('Error', 'Failed to do action');
            return;
        }

        await loadItems();
    }

    async function loadItems() {
        items = null;

        const response = await fetch('/api/order/list/buyer');

        if (response.status !== 200) {
            openModal('Error', `Can't retrieve order data`);
            return;
        }

        const content = await response.json();
        items = content.data;
    }

    const statuses: any = {
        0: {
            title: 'Order received by seller',
            color: 'text-yellow-300'
        },
        1: {
            title: 'Order cancelled',
            color: 'text-red-500'
        },
        2: {
            title: 'Order being processed',
            color: 'text-orange-300'
        },
        3: {
            title: 'Order sent',
            color: 'text-orange-400'
        },
        4: {
            title: 'Order complete',
            color: 'text-green-500'
        }
    };

    onMount(async () => {
        await loadItems();
    });
</script>

<div class="flex min-h-full  bg-no-repeat text-white">
    <div class="w-full flex gap-3 flex-wrap h-full p-4 justify-start align items-center bg-black/50">
        <h1>Order List:</h1>
        <div class="flex flex-col w-full gap-4">
            {#if items}
                {#each items as item}
                    <div class="flex flex-row w-[100%] pb-2 gap-2">
                        <div class="h-40 w-72 overflow-hidden rounded-md">
                            <img class="object-cover w-full h-full" src="{fishImage}" alt="">
                        </div>
                        <div class="justify-between flex flex-col w-full">
                            <div>
                                <h1 class="font-bold text-3xl">{item.name}</h1>
                                <h1 class="text-2xl">Rp. {numberFormat.format(item.price)}</h1>
                                <h1 class="text-1xl">{item.seller.username}</h1>
                                <h1 class="text-1xl font-semibold {statuses[item.status].color}">{statuses[item.status].title}</h1>
                            </div>
                            {#if item.status === 3}
                                <Button on:click={() => setStatus(item, 4)} class="self-end">Complete</Button>
                            {/if}
                        </div>
                    </div>
                {/each}
            {:else}
                <h1>Loading...</h1>
            {/if}
        </div>
    </div>
</div>

<Modal title={modalTitle} bind:open={showModal} autoclose outsideclose>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
      {modalMessage}
    </p>
    <svelte:fragment slot='footer'>
        <Button>Close</Button>
    </svelte:fragment>
</Modal>