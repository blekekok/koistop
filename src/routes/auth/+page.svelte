<script>
	import { Button, Input } from "flowbite-svelte";
</script>

<div class="flex bg-white">
  <div class="flex">
    <form method="POST">
      <Button class="bg-red-600" type="submit" formaction="?/login-google">Google Login</Button>
    </form>

    <h1>Login</h1>
    <form action="?/login" method="POST">
      <Input name="email" type="email" placeholder="Email"></Input>
      <Input name="password" type="password" placeholder="Password"></Input>
      <Button class="bg-red-600" type="submit">Login</Button>
    </form>
  </div>
</div>