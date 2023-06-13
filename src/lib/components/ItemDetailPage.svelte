<script lang="ts">
    import img2 from '$lib/images/ikan1.jpg';
    import img1 from '$lib/images/tes2.jpg';
    import img3 from '$lib/images/ikan1.jpg';
    import { Button } from 'flowbite-svelte';

    export let item: any;

    const numberFormat = new Intl.NumberFormat();

    let comment = '';
    $: showButton = comment !== '';

    function ClearC(){
        comment = '';
    }
</script>

<div class="min-h-full bg-no-repeat text-white">
    <div class="flex items-center content-center p-10">
        <div class="bg-blue-950 rounded-md p-8 flex flex-col" style="background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));">
            <h1 class="text-5xl justify-center flex">{item.name}</h1>
            <div class="flex pt-8">
                <div class="w-[40%]">
                    <img src="{img3}" class="w-full h-full" alt="">
                </div>
                <div class="flex flex-col place-content-between w-[60%] pl-10">
                    <div>
                        <h3 class="font-semibold text-3xl">Rp. {numberFormat.format(item.price)}</h3>
                        <h4 class="py-3">Seller: {item.seller.username}</h4>                 
                        <p>{item.description}</p>
                    </div>
                    <div class="flex justify-end">
                        <Button class="block">
                            Add to cart
                        </Button>
                    </div>
                </div>
            </div>
            <h1 class="text-3xl pt-10 pb-5">RECOMMENDED ITEM:</h1>
            <div class="w-[40%]">
                <img src="{img3}" class="w-full h-full" alt="">
            </div>
            <h1 class="text-3xl pt-10 pb-5">ASK SELLER:</h1>
            <div class="flex flex-row items-center pb-6">
                <div class="w-12 h-12 mr-4">
                    <img class="rounded-xl object-cover w-full h-full" src="{img1}" alt="">
                </div>
                <div class="h-full flex-grow">
                    <input bind:value={comment} class="w-full px-3 py-2 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="comment" type="text" placeholder="Write a comment..." />
                </div>
            </div>
            {#if showButton}
                <div class="flex justify-end gap-5">
                    <Button class="my-4 w-[10%]" on:click={ClearC}>Cancel</Button>
                    <Button class="my-4 w-[10%]">Post</Button>
                </div>
            {/if}
            <div class="flex flex-row items-center pb-6">
                <div class="w-12 h-12 mr-4">
                    <img class="rounded-xl object-cover w-full h-full" src="{img1}" alt="">
                </div>
                <div>
                    <h2 class="font-bold">Bang Asep</h2>
                    <h1>The fish is not fresh. i want refund :((((((((</h1>
                </div>
            </div>
        </div>
    </div>
</div>
