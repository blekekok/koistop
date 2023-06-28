<script lang="ts">
    import fishImage from '$lib/images/ikan1.jpg';
    import fishImage2 from '$lib/images/tes1.jpg';
    import { Button } from 'flowbite-svelte';

    import { Select, Label } from 'flowbite-svelte';

    const numberFormat = new Intl.NumberFormat();
</script>

<div class="flex min-h-full bg-no-repeat text-white">
    <div class="w-[20%] h-full flex justify-center p-4">
        <div class="flex flex-col gap-4 w-full">
            FILTERING
        </div>
    </div>
    <div class="w-[80%] flex gap-3 flex-col h-full p-4 justify-start align bg-black/50">
        <div class="flex flex-row w-[100%] p-2 gap-2">
            <div class="h-40 w-72 overflow-hidden rounded-md"> <!-- Set fixed width for landscape size -->
                <img class="object-cover w-full h-full" src="{fishImage}" alt="">
            </div>
            <div class="justify-between flex flex-col w-full">
                <div>
                    <h1 class="font-bold text-3xl">Fish Name</h1>
                    <h1 class="text-2xl">Price</h1>
                    <h1 class="text-1xl">Seller</h1>
                </div>
                <Button class="self-end">Remove Product</Button>
            </div>
        </div>
        <div class="flex flex-row w-[100%] p-2 gap-2">
            <div class="h-40 w-72 overflow-hidden rounded-md"> <!-- Set fixed width for landscape size -->
                <img class="object-cover w-full h-full" src="{fishImage2}" alt="">
            </div>
            <div class="justify-between flex flex-col w-full">
                <div>
                    <h1 class="font-bold text-3xl">Fish Name</h1>
                    <h1 class="text-2xl">Price</h1>
                    <h1 class="text-1xl">Seller</h1>
                </div>
                <Button class="self-end">Remove Product</Button>
            </div>
        </div>
    </div>
</div>
