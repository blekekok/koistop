<script lang="ts">
    import "../app.css";
    import Header from '$lib/components/Header.svelte';

    import { invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import type { LayoutData } from './$types';

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
</script>


<main class="w-full h-full bg-black text-black">
    <Header />

    <slot />
</main>
