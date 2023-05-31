<script>
    import img1 from '$lib/images/ikan1.jpg';
    import { Banner } from "flowbite-svelte"
    
    const menus = [
        {
            title: 'FISH',
            href: '/fish'
        },
        {
            title: 'UTILITY',
            href: '/utility'
        },
        {
            title: 'CART',
            href: '/cart'
        },
        {
            title: 'SELL',
            href: '/sell'
        },
        {
            title: 'LOGIN',
            href: '/login'
        }
    ];
</script>

<div class="h-screen w-full bg-no-repeat text-white" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('{img1}');background-attachment:fixed">
    <div class="fixed top-24 bg-white text-black h-12 flex items-center justify-center w-full">
        filter
    </div>
    <div class="pt-12">
        dsadasdas
    </div>
</div>
