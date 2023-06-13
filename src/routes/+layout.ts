import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	const getProfile = async () => {
		if (!session) {
			return null;
		}

		const user = session.user;

		try {
			const { data, error } = await supabase
				.from('User')
				.select()
				.eq('email', user.email);

			if (error) throw error;

			return data[0];
		} catch (err) {
			return null;
		}
	};
	const profile = await getProfile();

	return { supabase, session, profile };
};