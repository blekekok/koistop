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
        name: "koi1",
        imgurl: img1,
        attribution: "ikan koi",
    },
    {
        id: 1,
        name: "koi2",
        imgurl: img2,
        attribution: "ikan koi2",
    },
    {
        id: 2,
        name: "koi3",
        imgurl: img3,
        attribution: "ikan koi3",
    },
    ];  
</script>

<div class="h-screen w-full bg-no-repeat text-white" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('{img1}');background-attachment:fixed">
    <div class="flex justify-center w-full py-10">    
        <!-- <h1>dsadasdas</h1> -->
        <div class="max-w-4xl">
            <CarouselTransition {images} transitionType="slide" transitionParams="{{duration: 1500, easing: bounceInOut}}" showCaptions={false} showThumbs={false}/>
        </div>
    </div>
</div>

<style>
</style>
