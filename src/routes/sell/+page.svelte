<script lang="ts">
    import { Button, Select, Modal } from 'flowbite-svelte';
    import Logocart from '~icons/material-symbols/add-shopping-cart'
    import fishImage from '$lib/images/ikan1.jpg';
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

    export let data;
    let types = data.type.map((type: any) => {
        return {
            name: type.name,
            value: type.id
        }
    });

    $: showModalFish = false;
    function toggleModalFish(){
        showModalFish = !showModalFish;
    }

    $: newFish = {
        name: '',
        price: 0,
        type: '',
        dimension: 0,
        desc: '',
        image: ''
    };

    function clearFish() {
        newFish = {
            name: '',
            price: 0,
            type: '',
            dimension: 0,
            desc: '',
            image: ''
        };
    }

    async function addFish() {
        const response = await fetch('/api/fish/add', {
            method: 'POST',
            body: JSON.stringify(newFish)
        });

        const content = await response.json();

        if (response.status !== 200) {
            openModal('Error', content.message);
            return;
        }

        clearFish();
        openModal('Success', 'Successfully created a new fish');
        showModalFish = false;
    }

    $: showModalUtility = false;
    function toggleModalUtility(){
        showModalUtility = !showModalUtility;
    }

    $: newUtility = {
        name: '',
        price: 0,
        desc: '',
        image: ''
    };

    function clearUtility() {
        newUtility = {
            name: '',
            price: 0,
            desc: '',
            image: ''
        };
    }

    async function addUtility() {
        const response = await fetch('/api/utility/add', {
            method: 'POST',
            body: JSON.stringify(newUtility)
        });

        const content = await response.json();

        if (response.status !== 200) {
            openModal('Error', content.message);
            return;
        }

        clearUtility();
        openModal('Success', 'Successfully created a new utility');
        showModalUtility = false;
    }

    let activeTab = 'new-order';
    async function setActiveTab(tabName: string) {
        activeTab = tabName;
        await loadItems(tabs[activeTab].status);
    }

    $: items = null;

    const tabs: any = {
        'new-order': {
            title: 'New Order',
            status: 0
        },
        'ready': {
            title: 'Ready',
            status: 2
        },
        'delivering': {
            title: 'Delivering',
            status: 3
        },
        'delivered': {
            title: 'Delivered',
            status: 4
        }
    };

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

        openModal('Success', 'Action success');
        await loadItems(tabs[activeTab].status);
    }

    async function loadItems(status: number) {
        items = null;

        const response = await fetch('/api/order/list/seller', {
            method: 'POST',
            body: JSON.stringify({
                status
            })
        });

        if (response.status !== 200) {
            openModal('Error', `Can't retrieve order data`);
            return;
        }

        const content = await response.json();
        items = content.data;
    }

    onMount(async () => {
        await loadItems(0);
    });
</script>

<div class="flex min-h-full bg-no-repeat text-white">
    <div class="w-[20%] h-full flex justify-center p-4">
        <div class="flex flex-col gap-4 w-full">
            <a href="#new-order" on:click={() => setActiveTab('new-order')} class="w-auto items-center flex bg-[#eb4f27] rounded-xl p-2.5 hover:bg-orange-600">
                <Logocart class="text-2xl"></Logocart>
                <h1 class="text-lg">New Order</h1>
            </a>
            <a href="#ready" on:click={() => setActiveTab('ready')} class="w-auto items-center flex bg-[#eb4f27] rounded-xl p-2.5 hover:bg-orange-600">
                <Logocart class="text-2xl"></Logocart>
                <h1 class="text-lg">Ready</h1>
            </a>
            <a href="#delivering" on:click={() => setActiveTab('delivering')} class="w-auto items-center flex bg-[#eb4f27] rounded-xl p-2.5 hover:bg-orange-600">
                <Logocart class="text-2xl"></Logocart>
                <h1 class="text-lg">Delivering</h1>
            </a>
            <a href="#delivered" on:click={() => setActiveTab('delivered')} class="w-auto items-center flex bg-[#eb4f27] rounded-xl p-2.5 hover:bg-orange-600">
                <Logocart class="text-2xl"></Logocart>
                <h1 class="text-lg">Delivered</h1>
            </a>
        </div>
    </div>
    <div class="w-[80%] flex gap-3 flex-col h-full p-4 justify-start align bg-black/50">
        <div class="flex place-content-between items-center">
            <h1 class="text-3xl">{tabs[activeTab].title}:</h1>
            <div>
                <Button class="w-auto" on:click={toggleModalFish}>SELL FISH</Button>
                {#if showModalFish}
                    <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex text-white">
                    <div class="relative w-full my-6 mx-auto max-w-3xl">
                        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
                        <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 class="text-3xl font-semibold">
                            Add Your New Fish Here
                            </h3>
                            <button class="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none" on:click={toggleModalFish}>
                            <span class="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                                x
                            </span>
                            </button>
                        </div>
                        <div class="relative p-6 flex-auto w-full">
                            <form>
                                <div class="my-2 text-lg leading-relaxed">
                                    <label class="block text-sm font-bold mb-2" for="fishname">
                                        Fish Name
                                    </label>
                                    <input bind:value={newFish.name} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fishname" type="text" placeholder="Fish Name">
                                </div>
                                <div class="mb-4">
                                    <label class="block  text-sm font-bold mb-2" for="fishprice">
                                        Fish Price
                                    </label>
                                    <input bind:value={newFish.price} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fishprice" type="number" placeholder="Fish Price">
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-bold mb-2" for="fishtype">
                                        Dimension
                                    </label>
                                    <input bind:value={newFish.dimension} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fishdimension" type="number" placeholder="Fish Dimension">
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-bold mb-2" for="fishtype">
                                        Fish Type
                                    </label>
                                    <Select bind:value={newFish.type} items={types} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fishtype" />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-bold mb-2" for="fishdescription">
                                        Fish Description
                                    </label>
                                    <textarea bind:value={newFish.desc} class="shadow resize-none text-black appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="fishdescription" rows="3" placeholder="Fish Description"></textarea>
                                </div>
                                <div class="my-2 text-lg leading-relaxed">
                                    <label class="block text-sm font-bold mb-2" for="fishname">
                                        Fish Image URL
                                    </label>
                                    <input bind:value={newFish.image} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fishname" type="text" placeholder="Fish Image">
                                </div>
                            </form>
                        </div>
                        <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" on:click={toggleModalFish}>
                            Close
                            </button>
                            <button class="bg-orange-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" on:click={addFish}>
                            Create
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
                {/if}

                <Button class="w-auto" on:click={toggleModalUtility}>SELL UTILITY</Button>
                {#if showModalUtility}
                    <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex text-white">
                    <div class="relative w-full my-6 mx-auto max-w-3xl">
                        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
                        <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 class="text-3xl font-semibold">
                            Add Utility Product Here
                            </h3>
                            <button class="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none" on:click={toggleModalUtility}>
                            <span class="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                                x
                            </span>
                            </button>
                        </div>
                        <div class="relative p-6 flex-auto w-full">
                            <form>
                                <div class="my-2 text-lg leading-relaxed">
                                    <label class="block text-sm font-bold mb-2" for="fishname">
                                        Utility Name
                                    </label>
                                    <input bind:value={newUtility.name} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fishname" type="text" placeholder="Utility Name">
                                </div>
                                <div class="mb-4">
                                    <label class="block  text-sm font-bold mb-2" for="fishprice">
                                        Utility Price
                                    </label>
                                    <input bind:value={newUtility.price} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fishprice" type="number" placeholder="Utility Price">
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-bold mb-2" for="fishdescription">
                                        Utility Description
                                    </label>
                                    <textarea bind:value={newUtility.desc} class="shadow resize-none text-black appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="fishdescription" rows="3" placeholder="Utility Description"></textarea>
                                </div>
                                <div class="my-2 text-lg leading-relaxed">
                                    <label class="block text-sm font-bold mb-2" for="fishname">
                                        Utility Image URL
                                    </label>
                                    <input bind:value={newUtility.image} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fishname" type="text" placeholder="Utility image">
                                </div>
                            </form>
                        </div>
                        <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" on:click={toggleModalUtility}>
                            Close
                            </button>
                            <button class="bg-orange-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" on:click={addUtility}>
                            Create
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
                {/if}
            </div>
        </div>

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
                            </div>
                            {#if activeTab === 'new-order'}
                                <Button on:click={() => setStatus(item, 2)} class="self-end">Accept</Button>
                                <Button on:click={() => setStatus(item, 1)} class="self-end">Decline</Button>
                            {/if}

                            {#if activeTab === 'ready'}
                                <Button on:click={() => setStatus(item, 3)} class="self-end">Deliver</Button>
                                <Button on:click={() => setStatus(item, 1)} class="self-end">Cancel</Button>
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