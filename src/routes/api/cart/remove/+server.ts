import { json } from "@sveltejs/kit";

export const POST = async ({ request, locals: { supabase, getProfile } }) => {
  const body = await request.json();
  const profile = await getProfile();

  if (!profile) {
    return json({
      message: 'User not logged in'
    }, { status: 400 });
  }

  try {
    const fish = body?.fish_id;
    const utility = body?.utility_id;

    if (!(fish || utility)) {
      return json({
        message: 'No id provided'
      });
    }

    const req = supabase
      .from('Cart')
      .delete();

    if (fish) {
      req.eq('fish', fish);
    } else if (utility) {
      req.eq('utility', utility);
    }

    const { error } = await req;

    if (error) throw error;

    return json({
      message: 'Cart item removed'
    });
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 });
  }
}