export const load = async ({ parent }) => {
  const { supabase, session } = await parent();

  if (session) {
    const user = session.user;
    const app_metadata = user.app_metadata;
    const user_metadata = user.user_metadata;

    try {
      if (app_metadata.provider === 'google') {
          const { data: dbUser, error: dbUserErr } = await supabase
            .from('User')
            .select('email')
            .eq('email', user.email);

          if (dbUserErr) throw dbUserErr;

          if (!dbUser || dbUser.length === 0) {
            const { error: creationErr } = await supabase
              .from('User')
              .insert({
                username: user_metadata.name,
                email: user.email
              });

              if (creationErr) throw creationErr;
          }
      }
    } catch (err) {
      console.log(err);
    }

  }
  // console.log(session);
};