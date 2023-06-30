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
    const name = body?.name;
    const price = body?.price;
    const desc = body?.desc;
    const image = body?.image;

    if (!name || !price || !desc || !image) {
      return json({
        message: 'Incomplete information'
      }, { status: 400 });
    }

    const { error } = await supabase
      .from('Utility')
      .insert({
        name,
        price,
        description: desc,
        seller: profile.id,
        image
      });

    if (error) throw error;

    return json({
      message: 'Utility item added'
    });
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to create utility'
    }, { status: 400 });
  }
};