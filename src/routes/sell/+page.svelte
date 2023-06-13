<script>
import RiArchiveFill from '~icons/ri/archive-fill'
import { Button } from 'flowbite-svelte';
import Logocart from '~icons/material-symbols/add-shopping-cart'

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


<div class="text-white p-10">
    <div class="flex flex-col items-center justify-center bg-gray-800/50 pt-10 pb-20 px-40">
        <div class="flex justify-start w-full">
            <h2 class="text-6xl pb-10">SELL</h2>
        </div>
        <!-- sell 4 tombol -->
        <div class="flex flex-wrap text-2xl justify-between w-full">
            <div class="flex flex-col items-center">
                <a href="" class="flex flex-col items-center">
                    <Logocart class="text-6xl"></Logocart>
                    NEW ORDER
                </a>
            </div>
            <div class="flex flex-col items-center">
                <a href="" class="flex flex-col items-center">
                    <Logocart class="text-6xl"></Logocart>
                    READY
                </a>
            </div>
            <div class="flex flex-col items-center">
                <a href="" class="flex flex-col items-center">
                    <Logocart class="text-6xl"></Logocart>
                    DELIVERING
                </a>
            </div>
            <div class="flex flex-col items-center">
                <a href="" class="flex flex-col items-center">
                    <Logocart class="text-6xl"></Logocart>
                    DELIVERED
                </a>
            </div>
        </div>
        <!-- tambah ikan -->
        <div class="flex flex-row pt-12 w-full justify-between h-full">
            <div class="flex flex-col text-3xl w-[50%] justify-between items-center">
                <h2 class="pb-10 text-4xl">SELL YOUR PRODUCT HERE</h2>
                <h2 class="pb-8">ADD A NEW PRODUCT</h2>
                <Button class="w-[20%]" href="/additem">SELL</Button>
            </div>
            <div class="min-h-full w-1 bg-white"></div>
            <div class="w-[50%] flex flex-col text-3xl px-10">
                <Button class="mb-5">PRODUCT LIST</Button>
                <Button class="mb-5">PRODUCT LIST</Button>
                <Button class="mb-5">PRODUCT LIST</Button>
            </div>
        </div>
    </div>
    <!-- <ul class="flex items-center h-full gap-10 font-bold font-sans text-lg px-8">
        {#each menus as menu}
          <li class="hover:text-gray-500">
              <a class="p-2" href={menu.href}>{menu.title}</a>
          </li>
        {/each}
    </ul> -->
    
</div>