<script lang="ts">
    import fishImage from '$lib/images/ikan1.jpg';

    import { Select, Label } from 'flowbite-svelte';
    /**
	 * @type {any}
	 */
    let selected: any;
    let sorting = [
        {value:"us", name: "United States"},
        {value:"ca", name: "Canada"},
        {value:"fr", name: "France"},
    ]

    export let type: any;

    export let items: any;

    const numberFormat = new Intl.NumberFormat();
</script>

<div class="flex min-h-full  bg-no-repeat text-white">
    <div class="w-[20%] h-full flex justify-center p-4">
        <div class="w-full">
            <div>
                <p>Select:</p>
                <Label>
                    <Select class="mt-2" items={sorting} bind:value={selected} />
                </Label>
            </div>
            <div class="mt-4">
                <p>Select:</p>
                <Label>
                    <Select class="mt-2" items={sorting} bind:value={selected} />
                </Label>
            </div>
        </div>
    </div>
    <div class="w-[80%] flex gap-3 flex-wrap h-full p-4 justify-start align items-center">
        {#each items as item}
        <a href="/{type}/{item.id}">
            <div class="flex flex-col w-56 p-1 rounded-md gap-1 bg-gray-600/70">
                <img class="object-contain w-full h-full rounded-md" src="{item.image || fishImage}" alt="">
                <div class="rounded-md px-1">
                    <h2 class="font-light">{item.name}</h2>
                    <h3 class="font-semibold">Rp. {numberFormat.format(item.price)}</h3>
                    <h4 class="font-light">{item.seller.username}</h4>
                </div>
            </div>
        </a>
        {/each}
      </div>
</div>

