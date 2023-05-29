<script>
    import "../app.css";
    import img from '$lib/images/logoikangud.svg';
    import img2 from '$lib/images/logoikan.svg';

    const menus = [
        {
            title: 'Home',
            href: '/'
        },
        {
            title: 'Browse',
            href: '/browse'
        }
    ];
</script>

<main class="w-screen h-screen">
    <header class="flex place-content-between w-full h-20 bg-gray-500 p-2">
        <a href="/"><img class="h-full invert" src={img} alt=""></a>

        <ul class="flex h-full items-center gap-2 font-bold font-sans text-lg">
            {#each menus as menu}
                <li class="">
                    <a class="p-2" href={menu.href}>{menu.title}</a>
                </li>
            {/each}
        </ul>
    </header>
    
    <slot />
</main>
