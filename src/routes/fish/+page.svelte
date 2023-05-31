<script>
    import img1 from '$lib/images/tes1.jpg';
    import img2 from '$lib/images/ikan1.jpg';
    import { Banner } from "flowbite-svelte";

    import { Select, Label } from 'flowbite-svelte';
    /**
	 * @type {any}
	 */
    let selected;
    let sorting = [
        {value:"us", name: "United States"},
        {value:"ca", name: "Canada"},
        {value:"fr", name: "France"},
    ]

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

<div class="flex min-h-full  bg-no-repeat text-white" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('{img2}');background-attachment:fixed">
    <!-- <div class="fixed top-24 bg-white text-black h-12 flex items-center justify-center w-full">
        filter
    </div> -->
    <div class="w-[20%] h-full flex justify-center p-4" style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('{img2}');background-attachment:fixed">
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
    <div class="w-[80%] flex gap-4 flex-wrap h-full p-4 justify-start align items-center" style="background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('{img2}');background-attachment:fixed">
        {#each items as item}
          <div class="flex flex-col w-56 p-2 rounded-md gap-2 bg-gray-200" style="background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))">
            <img class="object-contain w-full h-full rounded-md" src="{img1}" alt="">
            <div class="rounded-md bg-gray-200" style="background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))">
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
                <p>Price: ${item.price}</p>
            </div>
        </div>
        {/each}
      </div>
</div>

