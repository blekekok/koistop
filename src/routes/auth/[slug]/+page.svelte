<script lang="ts">
  import { enhance } from '$app/forms';
	import { Button, Input, Label, FloatingLabelInput } from "flowbite-svelte";
  import GoogleIcon from '~icons/logos/google-icon';

  export let form;
  export let data;

  $: type = data.slug;
</script>

<div class="flex flex-grow w-full justify-center items-center">
  <div class="flex flex-col w-full max-w-[500px] bg-black/60 shadow-xl shadow-white/20 px-8 py-6 gap-6">

    <!-- Login or Register option -->
    <div class="flex w-full justify-between text-white text-3xl font-bold px-8">
      <a href="/auth/login" class="px-1 hover:brightness-75 transition duration-75 {!type || type === 'login' ? 'border-b-2' : ''}">
        <h1>LOGIN</h1>
      </a>
      <a href="/auth/register" class="px-1 hover:brightness-75 transition duration-75 {type === 'register' ? 'border-b-2' : ''}">
        <h1>REGISTER</h1>
      </a>
    </div>

    <!-- Login -->

    {#if form?.error}
      <div class="w-full py-4 px-4 bg-red-500/80 rounded-md text-white font-bold">
        <span>{form.error}</span>
      </div>
    {/if}

    {#if form && !form.error}
      <div class="w-full py-4 px-4 bg-green-500/80 rounded-md text-white font-bold">
        <span>Successfully created account</span>
      </div>
    {/if}

    {#if type === 'register'}
      <div class="flex flex-col gap-4">
        <form action="?/register" method="POST" class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <FloatingLabelInput id="username-input" name="username" type="text" required label="Username" class="text-white font-semibold text-lg"></FloatingLabelInput>
            </div>
            <div class="flex flex-col gap-1">
              <FloatingLabelInput id="email-input" name="email" type="email" required label="Email" class="text-white font-semibold text-lg"></FloatingLabelInput>
            </div>
            <div class="flex flex-col gap-1">
              <FloatingLabelInput id="password-input" name="password" type="password" required label="Password" class="text-white font-semibold text-lg"></FloatingLabelInput>
            </div>
            <div class="flex flex-col gap-1">
              <FloatingLabelInput id="confirm-password-input" name="confirm-password" type="password" required label="Confirm Password" class="text-white font-semibold text-lg"></FloatingLabelInput>
            </div>
          </div>
          <Button type="submit" pill>
            <span class="font-bold">SIGN UP</span>
          </Button>
        </form>
      </div>
    {:else}
      <div class="flex flex-col gap-4">
        <form action="?/login" method="POST" class="flex flex-col gap-8" use:enhance>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <FloatingLabelInput id="email-input" name="email" type="email" label="Email" class="text-white font-semibold text-lg"></FloatingLabelInput>
            </div>
            <div class="flex flex-col gap-1">
              <FloatingLabelInput id="password-input" name="password" type="password" label="Password" class="text-white font-semibold text-lg"></FloatingLabelInput>
            </div>
          </div>
          <Button type="submit" pill>
            <span class="font-bold">SIGN IN</span>
          </Button>
        </form>

        <div class="h-[1px] bg-slate-100"></div>

        <form action="?/login-google" method="POST" class="flex w-full justify-center">
          <Button color="light" type="submit" class="flex items-center w-full gap-2">
            <GoogleIcon class="mt-[3px]"/>
            <span class="font-semibold">Sign in with Google</span>
          </Button>
        </form>
      </div>
    {/if}
  </div>
</div>