<script>
    import img1 from '$lib/images/ikan1.jpg';
    import img2 from '$lib/images/ikan2.jpg';
    import img3 from '$lib/images/ikan3.jpg';
    import { Button } from 'flowbite-svelte';
    import { CarouselTransition } from 'flowbite-svelte'


    export const images = [
        {
            id: 0,
            name: "",
            imgurl: img1,
            attribution: "",
        },
        {
            id: 1,
            name: "",
            imgurl: img2,
            attribution: "",
        },
        {
            id: 2,
            name: "",
            imgurl: img3,
            attribution: "",
        },
    ];
</script>

<div class="flex justify-center w-full bg-no-repeat text-white">
    <div class="flex flex-col items-center py-8 px-12">
        <CarouselTransition {images} slideControls="{false}" loop duration="{5000}" transitionType="fly" transitionParams="{{delay: 250, duration: 300}}" showCaptions={false} showThumbs={false}/>

        <div class="flex flex-row p-4 gap-4">
            <div class="flex flex-col justify-between items-center align-middle bg-black/30 w-full h-full p-4">
                <div class="items-center flex flex-col"> 
                    <h1 class="font-bold text-3xl">
                        FISH?
                    </h1>
                    <p>
                        buy fish here now or else :)
                    </p>
                </div>
                <div class="p-5">
                    <Button href="/fish">Shop Now</Button>
                </div>
            </div>
            <div class="flex flex-col justify-between items-center align-middle bg-black/30 w-full h-full p-4">
                <div class="items-center flex flex-col"> 
                    <h1 class="font-bold text-3xl">
                        UTILITY?
                    </h1>
                    <p>
                        buy fish utility here now or else :)
                    </p>
                </div>
                <div class="p-5">
                    <Button href="/utility">Shop Now</Button>
                </div>
            </div>
            <div class="flex flex-col justify-between items-center align-middle bg-black/30 w-full h-full p-4">
                <div class="items-center flex flex-col"> 
                    <h1 class="font-bold text-3xl">
                        GUIDANCE?
                    </h1>
                    <p>
                        use guide here now or else :)
                    </p>
                </div>
                <div class="p-5">
                    <Button href="/">Guide</Button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
</style>
