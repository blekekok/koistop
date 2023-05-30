<script>
    import "../app.css";
    import { Input, Button, NavHamburger, Navbar, NavBrand, NavUl, NavLi } from 'flowbite-svelte';
    import img from '$lib/images/logoikangud.svg';
    import img2 from '$lib/images/logoikan.svg';

    const menus = [
        {
            title: 'FISH',
            href: '/'
        },
        {
            title: 'UTILITY',
            href: '/browse'
        },
        {
            title: 'CART',
            href: '/browse'
        },
        {
            title: 'SELL',
            href: '/browse'
        },
        {
            title: 'LOGIN',
            href: '/browse'
        }
    ];
</script>

<main class="w-full h-full bg-black">
    <header>
        <Navbar let:hidden let:toggle class="flex !bg-black/50 w-full h-20 p-2 sticky top-0 text-lg md:px-0 text-white !flex-nowrap">
            <NavBrand class="w-28" href="/">
                <img class="invert" src={img} alt="">
            </NavBrand>

            <div class="flex">
                <Button color="none" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                </Button>
                <div class="hidden relative md:block">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    </div>
                    <Input id="search-navbar" class="pl-10" placeholder="Search..." />
                </div>
                <NavHamburger on:click={toggle} />
            </div>

            <NavUl {hidden}>
                {#each menus as menu}
                    <NavLi href="{menu.href}" active={true}>{menu.title}</NavLi>
                {/each}
            </NavUl>
            <!-- <a href="/" class="ml-10 mr-6">
                <img class="h-full invert" src={img} alt="">
            </a>

            <form class="flex-grow mx-10">
                <div class="flex md:order-2">
                    <Button color="none" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    </Button>
                        <div class="hidden relative md:block">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                        </div>
                        <Input id="search-navbar" class="pl-10" placeholder="Search..." />
                        </div>
                    <NavHamburger on:click={toggle} />
                </div>
            </form>

            <ul class="flex h-full items-center gap-2 font-bold font-sans text-lg">
                {#each menus as menu}
                    <li class="">
                        <a class="px-7" href={menu.href}>{menu.title}</a>
                    </li>
                {/each}
            </ul> -->
            <!-- <Navbar let:hidden let:toggle>
                <NavBrand href="/">
                    <img class="h-full invert" src={img} alt="">
                </NavBrand>
                <div class="flex">
                    <Button color="none" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    </Button>
                    <div class="hidden relative md:block">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    </div>
                    <Input id="search-navbar" class="pl-10" placeholder="Search..." />
                    </div>
                    <NavHamburger on:click={toggle} />
                </div>
                
            </Navbar> -->


        </Navbar>
    </header>

    <slot />
</main>
