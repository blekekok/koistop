<script lang="ts">
    import fishImage from '$lib/images/ikan1.jpg';
    import { Button, Modal } from 'flowbite-svelte';
	import { onMount } from 'svelte';

    const numberFormat = new Intl.NumberFormat();

    $: items = null;

    $: totalPrice = items?.reduce((total: any, item: any) => {
        return total += item.price;
    }, 0);

    $: showModal = false;
    $: modalTitle = 'Error';
    $: modalMessage = '';
    function openModal(title: string, message: string) {
        modalTitle = title;
        modalMessage = message;
        showModal = true;
    }

    async function removeFromCart(item: any) {
        let content: any = {};
        if (item.type === 'fish') {
            content.fish_id = item.id;
        } else {
            content.utility_id = item.id;
        }

        const response = await fetch('/api/cart/remove', {
            method: 'POST',
            body: JSON.stringify(content)
        });

        if (response.status !== 200) {
            openModal('Error', 'Failed to remove item');
            return;
        }

        await loadItems();
    }

    async function proceedCheckout() {
        if (!items || items.length <= 0) {
            openModal('Error', 'There is nothing in the cart');
            return;
        }

        const response = await fetch('/api/cart/checkout', {
            method: 'POST'
        });

        const content = await response.json();
        openModal('Error', content.message);

        await loadItems();
    }

    async function loadItems() {
        const response = await fetch('/api/cart/list');

        const content = await response.json();

        if (response.status !== 200) {
            openModal('Error', 'You are not logged in');
            return;
        }

        items = content.data;
    }

    onMount(async () => {
        await loadItems();
    });
</script>

<div class="text-white p-6">
    <div class="bg-black/30 p-6">
        <h1 class="text-3xl">Your Items:</h1>
        <div class="flex items-center mb-4 pt-6">
            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="default-checkbox" class="ml-2 text-sm font-medium dark:text-gray-300">Select all Items</label>
        </div>
        {#if items}
            {#each items as item}
                <div class="flex flex-row w-[100%] pt-6 gap-2">
                    <div class="flex mb-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </div>
                    <div class="h-40 w-72 overflow-hidden rounded-md"> <!-- Set fixed width for landscape size -->
                        <img class="object-cover w-full h-full" src={item.image} alt="">
                    </div>
                    <div class="justify-between flex flex-col w-full">
                        <div>
                            <h1 class="font-bold text-3xl">{item.name} {item.sold ? '( SOLD )' : ''}</h1>
                            <h1 class="text-2xl">Rp. {numberFormat.format(item.price)}</h1>
                            <h1 class="text-1xl">{item.seller.username}</h1>
                        </div>
                        <Button on:click={async () => { removeFromCart(item) }} class="self-end">Remove From Cart</Button>
                    </div>
                </div>
            {/each}
        {:else}
            <span>Loading...</span>
        {/if}
    </div>

    <footer class="fixed inset-x-0 bottom-0 text-center bg-gray-800 p-4">
        <div class="place-content-evenly flex flex-row">
            <div class="flex flex-row items-center">
                <div>Total Price: Rp. {numberFormat.format(totalPrice)}</div>
            </div>
            <Button on:click={proceedCheckout} class="w-auto">Checkout</Button>
        </div>
    </footer>
</div>

<Modal title={modalTitle} bind:open={showModal} autoclose outsideclose>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
      {modalMessage}
    </p>
    <svelte:fragment slot='footer'>
        <Button>Close</Button>
    </svelte:fragment>
</Modal>