import { AuthApiError } from "@supabase/supabase-js";
import { redirect, type Actions, fail, Redirect } from "@sveltejs/kit";
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
    let success = false;

    try {
      if (!body['email'] || !body['password']) {
        return fail(422, {
          error: 'Please fill in both email and password'
        });
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: body.email as string,
        password: body.password as string
      });

      if (error) {
        if (error instanceof AuthApiError && error.status === 400) {
          return fail(400, {
            error: "Invalid credentials",
          });
        }
        return fail(500, {
          message: "Server error. Try again later.",
        });
      }

      success = true;
    } catch (err: any) {
      return fail(422, {
        error: 'An error occurred'
      })
    }

    if (success) {
      throw redirect(301, '/');
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

      const { data: existingUser, error: existingUserError } = await supabase
        .from('user')
        .select('username, email')
        .or(`username.eq.${body.username},email.eq.${body.email}`);

      if (existingUserError) {
        throw Error();
      }

      if (existingUser) {
        for (const user of existingUser) {
          if (user.email === body.email) {
            return fail(422, {
              error: 'Email already exists'
            });
          }

          if (user.username === body.username) {
            return fail(422, {
              error: 'Username already exists'
            });
          }
        }
      }

      const { error: authError } = await supabase.auth.signUp({
        email: body.email as string,
        password: body.password as string
      });

      if (authError) {
        throw Error();
      }

      const { error: userError } = await supabase
        .from('user')
        .insert({
          username: body.username,
          email: body.email
        });

      if (userError) {
        throw Error();
      }

      return {
        success: true
      }
    } catch (err) {
      console.log(err);
      return fail(422, {
        error: 'An error occurred'
      });
    }
  }
};