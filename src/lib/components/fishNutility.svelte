<script>
    import img1 from '$lib/images/tes1.jpg';
    import img2 from '$lib/images/ikan1.jpg';
    import img3 from '$lib/images/tes2.jpg';
    import { Banner } from "flowbite-svelte";
    // import ikan from '$lib/components/fishNutility.svelte';

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
            desc: 'This is koi 2'
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



<div class="flex min-h-full  bg-no-repeat text-white" style="background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('{img2}');background-attachment:fixed">
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
    <div class="w-[80%] flex gap-4 flex-wrap h-full p-4 justify-start align items-center" style="background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('{img2}'); background-attachment: fixed;">
        {#each items as item}
        <div class="flex flex-col w-56 p-2 rounded-md gap-2" style="background: linear-gradient(rgba(50, 50, 50, 1), rgba(50, 50, 50, 1), rgba(80, 80, 80, 1))">
            <img class="object-contain w-full h-full rounded-md" src="{img3}" alt="">
                <a href="/fishDetail">
                    <div class="rounded-md p-2" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))">
                        <h2>{item.title}</h2>
                        <p>Price: ${item.price}</p>
                        <!-- <p>Seller: {item.desc}</p> -->
                        <div class="flex place-content-between">
                            <p>View Details</p>
                            <p>></p>
                        </div>
                    </div>
                </a>
            </div>
        {/each}
      </div>
</div>

