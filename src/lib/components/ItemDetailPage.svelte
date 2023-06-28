<script lang="ts">
    import defaultUser from '$lib/images/default_user.jpg';
    import defaultFish from '$lib/images/ikan1.jpg';
    import { Button } from 'flowbite-svelte';
    import { fly } from 'svelte/transition';

    export let item: any;
    export let user: any;

    const numberFormat = new Intl.NumberFormat();

    $: showButton = userComment !== '';

    export let userComment = '';
    export let comments: any = null;
    export let submitComment: any;
    export let commentError: any;
    export let addToCart: any;

    function ClearC(){
        userComment = '';
    }
</script>

<div class="min-h-full bg-no-repeat text-white">
    <div class="flex items-center content-center p-10">
        <div class="bg-black/40 rounded-md p-8 flex flex-col">
            <h1 class="text-5xl justify-center flex">{item.name}</h1>
            <div class="flex pt-8">
                <div class="w-[40%]">
                    <img src="{item.image}" class="w-full h-full" alt="">
                </div>
                <div class="flex flex-col place-content-between w-[60%] pl-10">
                    <div>
                        <h3 class="font-semibold text-3xl">Rp. {numberFormat.format(item.price)}</h3>
                        <h4 class="py-3">Seller: {item.seller.username}</h4>
                        <p>{item.description}</p>
                    </div>
                    <div class="flex justify-end">
                        <Button on:click={addToCart} class="block">
                            Add to cart
                        </Button>
                    </div>
                </div>
            </div>
            <h1 class="text-3xl pt-10 pb-5">RECOMMENDED ITEM:</h1>
            <div class="gap-10 flex-row flex place-content-between">
                <div class="w-[30%] h-full">
                    <img src="{defaultFish}" class="w-full h-full" alt="">
                    <h1>Fish Name: adsa</h1>
                    <h1>Fish Price: 11212312</h1>
                    <h1>Seller: dasdas</h1>
                    <div class="flex justify-end">
                        <Button class="block">
                            Add to cart
                        </Button>
                    </div>
                </div>
                <div class="w-[30%] h-full">
                    <img src="{defaultFish}" class="w-full h-full" alt="">
                    <h1>Fish Name: adsa</h1>
                    <h1>Fish Price: 11212312</h1>
                    <h1>Seller: dasdas</h1>
                    <div class="flex justify-end">
                        <Button class="block">
                            Add to cart
                        </Button>
                    </div>
                </div>
                <div class="w-[30%] h-full">
                    <img src="{defaultFish}" class="w-full h-full" alt="">
                    <h1>Fish Name: adsa</h1>
                    <h1>Fish Price: 11212312</h1>
                    <h1>Seller: dasdas</h1>
                    <div class="flex justify-end">
                        <Button class="block">
                            Add to cart
                        </Button>
                    </div>
                </div>
            </div>    
            <h1 class="text-3xl pt-10 pb-5">DISCUSSION:</h1>
            {#if commentError}
                <div class="flex h-12 w-full justify-start items-center px-4 my-4 bg-red-500/70 rounded-xl">
                    <span class="text-white font-semibold">{commentError}</span>
                </div>
            {/if}
            {#if user}
                <div class="flex flex-row items-center pb-6">
                    <div class="w-12 h-12 mr-4">
                        <img class="rounded-full object-cover w-full h-full" src="{user.image ?? defaultUser}" alt="">
                    </div>
                    <div class="h-full flex-grow">
                        <input bind:value={userComment} class="w-full px-3 py-2 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="comment" type="text" placeholder="Write a comment..." />
                    </div>
                </div>
                {#if showButton}
                    <div class="flex justify-end gap-5" transition:fly>
                        <Button class="my-4 w-[10%]" on:click={ClearC}>Cancel</Button>
                        <Button class="my-4 w-[10%]" on:click={submitComment}>Post</Button>
                    </div>
                {/if}
            {/if}
            <div class="flex flex-col">
                {#if comments}
                    {#if !comments.length}
                        <span class="text-lg font-semibold text-white">No comments</span>
                    {:else}
                        {#each comments as comment}
                            <div class="flex flex-row items-center pb-6">
                                <div class="w-12 h-12 mr-4">
                                    <img class="rounded-full object-cover w-full h-full" src="{comment.author.image ?? defaultUser}" alt="">
                                </div>
                                <div>
                                    <h2 class="font-bold">{comment.author.username} {comment.author.username === item.seller.username ? ' - Seller' : ''}</h2>
                                    <h1>{comment.content}</h1>
                                </div>
                            </div>
                        {/each}
                    {/if}
                {:else}
                    <span class="font-semibold text-white">Loading comments...</span>
                {/if}
            </div>
        </div>
    </div>
</div>
