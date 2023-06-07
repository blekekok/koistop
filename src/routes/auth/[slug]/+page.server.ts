import { AuthApiError } from "@supabase/supabase-js";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import { SITE_URL } from '$env/static/private';

export const actions: Actions = {
  'login-google': async ({ locals: { supabase } }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: SITE_URL
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

    try {
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
    } catch (err: any) {
      return fail(422, {
        error: err.message
      })
    }

  },
  register: async ({ request, locals: { supabase } }) => {
    const body = Object.fromEntries(await request.formData());

    try {
      if (body['password'] !== body['confirm-password']) {
        throw Error('Password does not match');
      }

      if (!body['username'] || !body['email'] || !body['password'] || !body['confirm-password']) {
        throw Error('Please complete all the forms')
      }

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

      // throw redirect(303, '/auth')
    } catch (err: any) {
      return fail(422, {
        error: err.message
      });
    }
  }
};