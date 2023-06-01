<script>
    import img2 from '$lib/images/ikan1.jpg';
    import img1 from '$lib/images/tes2.jpg';
    import img3 from '$lib/images/ikan1.jpg';
    import { Button } from 'flowbite-svelte';
</script>

<style>
</style>

<div class="min-h-full bg-no-repeat text-white" style="background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('{img2}');background-attachment:fixed">
    <div class="flex items-center content-center p-10">
        <div class="bg-blue-950 rounded-md p-8 flex flex-col" style="background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));">
            <h1 class="text-5xl justify-center flex">IKAN TONGKOL</h1>
            <div class="flex pt-8">
                <div class="w-[40%]">
                    <img src="{img3}" class="w-full h-full" alt="">
                </div>
                <div class="flex flex-col place-content-between w-[60%] pl-10">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab doloribus accusamus recusandae mollitia, ea laborum inventore a officia distinctio labore quis sit numquam, aliquam voluptatibus, aut nesciunt aliquid hic pariatur?
                    </p>
                    <div class="flex justify-end">
                        <Button class="block">
                            Add to cart
                        </Button>
                    </div>
                </div>
            </div>
            <h1 class="text-5xl pt-10 pb-5">RECOMMENDATION:</h1>
            <div class="w-[40%]">
                <img src="{img3}" class="w-full h-full" alt="">
            </div>
        </div>
    </div>
</div>
