<script>
    import img1 from '$lib/images/ikan1.jpg';
    import img2 from '$lib/images/ikan2.jpg';
    import img3 from '$lib/images/ikan3.jpg';
    import { Button } from 'flowbite-svelte';
    import { bounceInOut } from 'svelte/easing';
    import { Carousel, CarouselTransition } from 'flowbite-svelte'


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

<div class="flex justify-center w-full h-screen bg-no-repeat text-white">
    <div class="flex flex-col items-center py-8 px-12">
        <CarouselTransition {images} slideControls="{false}" loop duration="{5000}" transitionType="fly" transitionParams="{{delay: 250, duration: 300}}" showCaptions={false} showThumbs={false}/>

        <div class="">

        </div>

        <div class="pt-5">
            <Button href="/fish">Shop Now</Button>
        </div>
    </div>
</div>

<style>
</style>
