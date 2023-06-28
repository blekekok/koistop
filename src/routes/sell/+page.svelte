<script lang="ts">
    import { Button, Select } from 'flowbite-svelte';
    import Logocart from '~icons/material-symbols/add-shopping-cart'

    let showModal = false;

    export let data;
    let types = data.type.map((type) => {
        return {
            name: type.name,
            value: type.id
        }
    });

    $: newFish = {
        type: ''
    };

    function toggleModal(){
        showModal = !showModal;
    }
</script>


<div class="text-white p-10">
    <div class="flex flex-col items-center justify-center bg-gray-800/50 pt-10 pb-20 px-40">
        <div class="flex justify-start w-full">
            <h2 class="text-6xl pb-10">SELL</h2>
        </div>
        <!-- sell 4 tombol -->
        <div class="flex flex-wrap text-2xl justify-between w-full">
            <div class="flex flex-col items-center">
                <a href="#new-order" class="flex flex-col items-center">
                    <Logocart class="text-6xl"></Logocart>
                    NEW ORDER
                </a>
            </div>
            <div class="flex flex-col items-center">
                <a href="#ready" class="flex flex-col items-center">
                    <Logocart class="text-6xl"></Logocart>
                    READY
                </a>
            </div>
            <div class="flex flex-col items-center">
                <a href="#delivering" class="flex flex-col items-center">
                    <Logocart class="text-6xl"></Logocart>
                    DELIVERING
                </a>
            </div>
            <div class="flex flex-col items-center">
                <a href="#delivered" class="flex flex-col items-center">
                    <Logocart class="text-6xl"></Logocart>
                    DELIVERED
                </a>
            </div>
        </div>
        <!-- tambah ikan -->
        <div class="flex flex-row pt-12 w-full justify-between h-full">
            <div class="flex flex-col text-3xl w-[50%] justify-between items-center">
                <h2 class="pb-10 text-4xl">SELL YOUR PRODUCT HERE</h2>
                <h2 class="pb-8">ADD A NEW PRODUCT</h2>
                <Button class="w-[20%]" on:click={toggleModal}>SELL</Button>
                {#if showModal}
                    <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex text-white">
                    <div class="relative w-full my-6 mx-auto max-w-3xl">
                        <!--content-->
                        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
                        <!--header-->
                        <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 class="text-3xl font-semibold">
                            Add Your New Fish Here
                            </h3>
                            <button class="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none" on:click={toggleModal}>
                            <span class="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                                x
                            </span>
                            </button>
                        </div>
                        <!--body-->
                        <div class="relative p-6 flex-auto w-full">
                            <form>
                                <div class="my-2 text-lg leading-relaxed">
                                    <label class="block text-sm font-bold mb-2" for="fishname">
                                        Fish Image URL
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fishname" type="text" placeholder="Fish Name">
                                </div>
                                <div class="my-2 text-lg leading-relaxed">
                                    <label class="block text-sm font-bold mb-2" for="fishname">
                                        Fish Name
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fishname" type="text" placeholder="Fish Name">
                                </div>
                                <div class="mb-4">
                                    <label class="block  text-sm font-bold mb-2" for="fishprice">
                                        Fish Price
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fishprice" type="number" placeholder="Fish Price">
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
                                    <textarea class="shadow resize-none text-black appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="fishdescription" rows="3" placeholder="Fish Description"></textarea>
                                </div>
                            </form>
                        </div>
                        <!--footer-->
                        <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" on:click={toggleModal}>
                            Close
                            </button>
                            <button class="bg-orange-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" on:click={toggleModal}>
                            Save Changes
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
                {/if}
            </div>

            <div class="min-h-full w-1 bg-white"></div>

            <div class="w-[50%] flex flex-col text-3xl px-10">
                <Button class="mb-5" href="/fishproductlist">FISH PRODUCT LIST</Button>
                <Button class="mb-5" href="/utilityproductlist">UTILITY PRODUCT LIST</Button>
                <Button class="mb-5">PRODUCT QUESTION</Button>
                <Button class="mb-5">PRODUCT ----</Button>
            </div>
        </div>
    </div>
    <!-- <ul class="flex items-center h-full gap-10 font-bold font-sans text-lg px-8">
        {#each menus as menu}
          <li class="hover:text-gray-500">
              <a class="p-2" href={menu.href}>{menu.title}</a>
          </li>
        {/each}
    </ul> -->
    
</div>