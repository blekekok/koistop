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
    const passwordLength = 6;

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

      if (body['password'].length < passwordLength) {
        return fail(422, {
          error: `Please enter a password longer than ${passwordLength} characters!`
        });
      }

      const { data: existingUser, error: existingUserError } = await supabase
        .from('User')
        .select('username, email')
        .or(`username.eq.${body.username},email.eq.${body.email}`);

      if (existingUserError) {
        throw existingUserError;
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
        password: body.password as string,
        options: {
          emailRedirectTo: `${SITE_URL}auth/callback`,
        }
      });

      if (authError) {
        throw authError;
      }

      const { error: userError } = await supabase
        .from('User')
        .insert({
          username: body.username,
          email: body.email
        });

      if (userError) {
        throw userError;
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