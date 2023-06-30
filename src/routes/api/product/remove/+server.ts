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
    const id = body?.id;
    const type = body?.type;

    if (!id || !type) {
      return json({
        message: 'No id or type provided'
      });
    }

    if (type === 'fish') {
      const { error } = await supabase
        .from('Fish')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } else {
      const { error } = await supabase
      .from('Utility')
      .delete()
      .eq('id', id);

    if (error) throw error;
    }

    return json({
      message: 'Product item removed'
    });
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 });
  }
}