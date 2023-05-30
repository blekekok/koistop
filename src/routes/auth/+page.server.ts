import { AuthApiError } from "@supabase/supabase-js";
import { redirect, type Actions, fail } from "@sveltejs/kit";

export const actions: Actions = {
  'login-google': async ({ locals: { supabase } }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      }
    });

    if (error) {
      console.log(error);
      return fail(400, {
        message: "Something wen't wrong"
      });
    }

    throw redirect(303, data.url);
  },
  login: async ({ request, locals: { supabase } }) => {
    const body = Object.fromEntries(await request.formData());

    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email as string,
      password: body.password as string
    });

    if (error) {
      console.log(error);
      if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: "Invalid credentials",
				});
			}
			return fail(500, {
				message: "Server error. Try again later.",
			});
    }

    throw redirect(303, '/');
  },
  register: async ({ request, locals: { supabase } }) => {
    const body = Object.fromEntries(await request.formData());

    const { data, error } = await supabase.auth.signUp({
      email: body.email as string,
      password: body.password as string
    });

    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: "Invalid email or password",
				})
			}
			return fail(500, {
				error: "Server error. Please try again later.",
			})
    }

    throw redirect(303, '/auth')
  }
};