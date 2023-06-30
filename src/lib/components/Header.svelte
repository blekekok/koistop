<script lang="ts">
  import { Button, Search, Popover } from 'flowbite-svelte';
  import img from '$lib/images/logoikangud.svg';
  import defaultUser from '$lib/images/default_user.jpg';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

  export let user: any;

  $: search = '';

  function searchFish() {
    $page.url.searchParams.set('search', search);
    goto(`/fish?${$page.url.searchParams.toString()}`);
  }

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
            title: 'ORDER',
            href: '/order',
            authenticated: true
        },
        {
            title: 'CART',
            href: '/cart'
        },
        {
            title: 'SELL',
            href: '/sell',
            authenticated: true
        }
    ];
</script>

<header class="flex justify-between items-center bg-black/50 w-full h-[76px] sticky top-0 text-lg text-white z-10">
  <a href="/" class="w-48 px-8">
    <img class="w-full invert" src={img} alt="">
  </a>

  <!-- <div class="flex justify-end items-center gap-32 flex-grow"> -->
    <div class="w-[40%] flex items-center gap-2 place-content-between">
      <Search class="py-1.5 flex items-center" placeholder="Search Fishes..." bind:value={search}></Search>
      <Button on:click={searchFish}>
          <svg class="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          Search
      </Button>
    </div>

    <ul class="h-full flex items-center gap-10 font-bold font-sans text-lg px-8">
      {#each menus as menu}
        {#if !menu.authenticated || user}
          <li class="hover:text-gray-500">
              <a class="p-2" href={menu.href}>{menu.title}</a>
          </li>
        {/if}
      {/each}
      {#if user}
        <li class="h-full hover:text-gray-500">
          <Button btnClass="h-full bg-transparent">
            <img id="user" src={user.image ?? defaultUser} alt="" class="max-h-full p-4 rounded-full" />
          </Button>
          <Popover triggeredBy="#user" placement="bottom" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
            <div class="flex flex-col gap-4 p-3">
              <span class="font-semibold text-black text-lg">Welcome, {user.username}</span>
              <div class="h-[1px] bg-slate-800 w-full"></div>
              <Button href="/logout">Logout</Button>
            </div>
          </Popover>
        </li>
      {:else}
        <li class="hover:text-gray-500">
          <a class="p-2" href="/auth/login">LOGIN</a>
        </li>
      {/if}
    </ul>
  <!-- </div> -->
</header>