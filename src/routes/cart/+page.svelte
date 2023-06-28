<script>
    import fishImage from '$lib/images/ikan1.jpg';
    import { Button } from 'flowbite-svelte';
</script>







<div class="text-white p-6">
    <div class="bg-black/30 p-6">
        <h1 class="text-3xl">Your Items:</h1>
        <div class="flex items-center mb-4 pt-6">
            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="default-checkbox" class="ml-2 text-sm font-medium dark:text-gray-300">Select all Items</label>
        </div>
        <div class="flex flex-row w-[100%] pt-6 gap-2">
            <div class="flex mb-4">
                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            </div>
            <div class="h-40 w-72 overflow-hidden rounded-md"> <!-- Set fixed width for landscape size -->
                <img class="object-cover w-full h-full" src="{fishImage}" alt="">
            </div>
            <div class="justify-between flex flex-col w-full">
                <div>
                    <h1 class="font-bold text-2xl">Fish Name</h1>
                    <h1 class="font-semibold">Price</h1>
                    <h1>Seller</h1>
                    <h1>Desc</h1>
                </div>
                <Button class="self-end">Remove From Cart</Button>
            </div>
        </div>
        <div class="flex flex-row w-[100%] pt-6 gap-2">
            <div class="flex mb-4">
                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            </div>
            <div class="h-40 w-72 overflow-hidden rounded-md"> <!-- Set fixed width for landscape size -->
                <img class="object-cover w-full h-full" src="{fishImage}" alt="">
            </div>
            <div class="justify-between flex flex-col w-full">
                <div>
                    <h1 class="font-bold text-2xl">Fish Name</h1>
                    <h1 class="font-semibold">Price</h1>
                    <h1>Seller</h1>
                    <h1>Desc</h1>
                </div>
                <Button class="self-end">Remove From Cart</Button>
            </div>
        </div>
    </div>

    <footer class="fixed inset-x-0 bottom-0 text-center bg-gray-800 p-4">
        <div class="place-content-evenly flex flex-row">
            <div class="flex flex-row items-center">
                <div>Total Price: </div>
                <div>RP1238129321</div>
            </div>
            <Button class="w-auto">Checkout</Button>
        </div>
    </footer>
</div>