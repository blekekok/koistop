import { json } from '@sveltejs/kit';

export const POST = (async ({ request, locals: { supabase, getProfile } }) => {
  const body = await request.json();
  const user = await getProfile();

  if (user) {
    return json({
      message: 'User unauthenticated'
    }, { status: 400 });
  }

  try {
    const name = body?.name;
    const price = body?.price;
    const description = body?.description;
    const type = body?.type;
    if (!name || !price || !description || !type) {
      return json({
        message: 'Please complete the form'
      }, { status: 400 });
    }

    // const { error } = await supabase
    //   .from('Fish')
    //   .insert({
    //     name,
    //     price,
    //     description,
    //     dimension,
    //     fishType: type,
    //     image: image
    //   });
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 });
  }
});