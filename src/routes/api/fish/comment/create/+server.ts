import { json } from "@sveltejs/kit";

export const POST = (async ({ request, locals: { supabase, getProfile }}) => {
  const body = await request.json();
  const profile = await getProfile();

  if (!profile) {
    return json({
      message: 'User not logged in'
    }, { status: 400 });
  }

  try {
    const id = body?.id;
    const comment = body?.comment;

    if (!id) {
      return json({
        message: 'No id provided'
      });
    }
    if (!comment) {
      return json({
        message: 'No comment provided'
      }, { status: 400 })
    }

    const { error } = await supabase
      .from('FishDiscussion')
      .insert({
        content: comment,
        fish: id,
        author: profile.id,
      });

    if (error) throw error;

    return json({
      message: 'Comment created'
    });
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 });
  }
});