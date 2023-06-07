<script lang="ts">
    import "../app.css";
    import Header from '$lib/components/Header.svelte';
    import backgroundImage from '$lib/images/ikan1.jpg';

    import { invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import type { LayoutData, PageData } from './$types';

    export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

    const user = data.session?.user;
</script>

<svelte:head>
	<title>Koistop</title>
</svelte:head>

<main class="flex flex-col w-full min-h-full bg-black text-black box-border" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('{backgroundImage}');background-attachment:fixed">
    <Header {user} />

    <slot />
</main>
