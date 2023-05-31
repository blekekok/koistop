<script>
    import img1 from '$lib/images/tes1.jpg';
    import img2 from '$lib/images/ikan1.jpg';
    import { Banner } from "flowbite-svelte";

    const items = [
        {
            title: 'Koi fish 1',
            price: 3500000,
            desc: 'This is koi fish 1'
        },
        {
            title: 'Koi fish 2',
            price: 3200000,
            desc: 'This is koi fish 2'
        },
        {
            title: 'Koi fish 2',
            price: 3200000,
            desc: 'This is koi fish 2'
        },
        {
            title: 'Koi fish 2',
            price: 3200000,
            desc: 'This is koi fish 2'
        },
        {
            title: 'Koi fish 2',
            price: 3200000,
            desc: 'This is koi fish 2'
        },
        {
            title: 'Koi fish 2',
            price: 3200000,
            desc: 'This is koi fish 2'
        },
        {
            title: 'Koi fish 2',
            price: 3200000,
            desc: 'This is koi fish 2'
        },
        {
            title: 'Koi fish 2',
            price: 3200000,
            desc: 'This is koi fish 2'
        },
    ];
</script>

<div class="flex h-full w-full bg-no-repeat text-white" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('{img2}');background-attachment:fixed">
    <!-- <div class="fixed top-24 bg-white text-black h-12 flex items-center justify-center w-full">
        filter
    </div> -->
    <div class="w-[20%] h-20 bg-gray-600 flex justify-center items-center">
        <div class="m-4 bg-cyan-500">
            adasd
        </div>
    </div>
    <div class="w-[80%] flex gap-4 flex-wrap h-full bg-blue-800 p-4 justify-start">
        {#each items as item}
        <div class="flex w-48">
            <img src="{img1}" alt="">
        </div>
        {/each}
    </div>
</div>

