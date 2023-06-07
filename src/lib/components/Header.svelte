<script lang="ts">
  import { Button, Search } from 'flowbite-svelte';
  import img from '$lib/images/logoikangud.svg';

  export let user: any = null;

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
        }
    ];
</script>

<header class="flex justify-between items-center bg-black/50 w-full h-[76px] sticky top-0 text-lg text-white z-10">
  <a href="/" class="w-48 px-8">
    <img class="w-full invert" src={img} alt="">
  </a>

  <!-- <div class="flex justify-end items-center gap-32 flex-grow"> -->
    <div class="w-[40%] flex items-center gap-2 place-content-between">
      <Search class="py-1.5 flex items-center" placeholder="Search Mockups, Logos, Design Templates..."></Search>
      <Button>
          <svg class="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          Search
      </Button>
    </div>

    <ul class="flex items-center h-full gap-10 font-bold font-sans text-lg px-8">
      {#each menus as menu}
        <li class="hover:text-gray-500">
            <a class="p-2" href={menu.href}>{menu.title}</a>
        </li>
      {/each}
      {#if user}
        <li class="hover:text-gray-500">
          <a class="p-2" href="/logout">LOGOUT</a>
        </li>
      {:else}
        <li class="hover:text-gray-500">
          <a class="p-2" href="/auth/login">LOGIN</a>
        </li>
      {/if}
    </ul>
  <!-- </div> -->
</header>