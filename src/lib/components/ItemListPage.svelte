<script lang="ts">
    import fishImage from '$lib/images/ikan1.jpg';

    import { Select, Label } from 'flowbite-svelte';

    export let type: any;
    export let items: any;
    export let filters: any = [];
    export let onChange: any;

    const numberFormat = new Intl.NumberFormat();
</script>

<div class="flex min-h-full  bg-no-repeat text-white">
    <div class="w-[20%] h-full flex justify-center p-4">
        <div class="flex flex-col gap-4 w-full">
            {#each filters as filter}
                <div class="w-full">
                    <Label defaultClass="font-semibold text-white" for={filter.name}>{filter.label}</Label>
                    <Select id={filter.name} class="w-full" items={filter.selections} bind:value={filter.selected} on:change={onChange}/>
                </div>
            {/each}
        </div>
    </div>
    <div class="w-[80%] flex gap-3 flex-wrap h-full p-4 justify-start align items-center">
        {#if items}
            {#each items as item}
            <a href="/{type}/{item.id}">
                <div class="flex flex-col w-56 p-1 rounded-md gap-1 bg-gray-600/70">
                    <div class="h-32 overflow-hidden rounded-md">
                        <img class="object-cover w-full h-full" src="{item.image || fishImage}" alt="">
                    </div>
                    <div class="rounded-md px-1">
                        <h2 class="font-light">{item.name}</h2>
                        <h3 class="font-semibold">Rp. {numberFormat.format(item.price)}</h3>
                        <h4 class="font-light">{item.seller.username}</h4>
                    </div>
                </div>
            </a>
            {/each}
        {:else}
            <span>Loading...</span>
        {/if}
      </div>
</div>

