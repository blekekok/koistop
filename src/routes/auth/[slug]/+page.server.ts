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
        return fail(422, {
          error: 'Password does not match'
        });
      }

      if (!body['username'] || !body['email'] || !body['password'] || !body['confirm-password']) {
        return fail(422, {
          error: 'Please complete all the forms'
        });
      }

      const { data: existingUser } = await supabase
        .from('user')
        .select('username, email')
        .or(`username.eq.${body.username},email.eq.${body.email}`);

      if (existingUser) {
        for (const _user in existingUser) {
          const user = _user as any
          if (user.email === body.email) {
            return fail(422, {
              error: 'Email already exists'
            });
          }

          if (user.username === body.email) {
            return fail(422, {
              error: 'Username already exists'
            });
          }
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email: body.email as string,
        password: body.password as string
      });

      const { error: err } = await supabase
        .from('user')
        .insert({
          username: body.username,
          email: body.email
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
    } catch (err) {
      return fail(422, {
        error: 'An error occurred'
      });
    }
  }
};