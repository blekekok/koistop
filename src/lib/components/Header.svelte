<script>
  import { Button, Search } from 'flowbite-svelte';
  import img from '$lib/images/logoikangud.svg';
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ user, tableData } = data);

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
            href: '/auth'
        }
    ];
</script>

<header class="flex justify-between items-center bg-black/50 w-full h-20 px-6 sticky top-0 text-lg text-white z-10">
  <a href="/">
    <img class="w-28 invert" src={img} alt="">
  </a>

  <!-- Another button style g apus buat jaga jaga aj -->
  <!-- <form class="flex-grow mx-10">   
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative items-center">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here! :)" required>
          <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-gray-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>
  </form> -->

  <div class="flex justify-end items-center gap-4 flex-grow">
    <div class="flex items-center gap-2 place-content-between">
      <Search class="py-1.5 flex items-center" placeholder="Search Mockups, Logos, Design Templates..."></Search>
      <Button>
          <svg class="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          Search
      </Button>
    </div>

    <ul class="flex items-center h-full gap-4 font-bold font-sans text-lg">
      {#each menus as menu}
        <li class="hover:text-gray-500">
            <a class="p-2" href={menu.href}>{menu.title}</a>
        </li>
      {/each}
    </ul>
  </div>
</header>