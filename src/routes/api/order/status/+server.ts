import { json } from "@sveltejs/kit";

export const POST = async ({ request, locals: { supabase, getProfile } }) => {
  const profile = await getProfile();
  const body = await request.json();

  if (!profile) {
    return json({
      message: 'User not logged in'
    }, { status: 400 });
  }

  try {
    const fish = body?.fish_id;
    const utility = body?.utility_id;
    const status = body?.status;

    if (!(fish || utility) || !status) {
      return json({
        message: 'No id or status given'
      });
    }

    const { error } = await supabase
      .from('OrderItem')
      .update({ status })
      .eq(fish ? 'fish' : 'utility', fish ?? utility)

    if (error) throw error;

    return json({
      message: 'Status changed'
    });
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 });
  }
};