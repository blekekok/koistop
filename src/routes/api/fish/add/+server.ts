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
    const type = body?.type;
    const desc = body?.desc;
    const image = body?.image;
    const dimension = body?.dimension;

    if (!name || !price || !type || !desc || !image || !dimension) {
      return json({
        message: 'Incomplete information'
      }, { status: 400 });
    }

    const { error } = await supabase
      .from('Fish')
      .insert({
        name,
        price,
        description: desc,
        dimension,
        fishType: type,
        seller: profile.id,
        image
      });

    if (error) throw error;

    return json({
      message: 'Fish item added'
    });
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to create fish'
    }, { status: 400 });
  }
};