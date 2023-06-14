import { json } from "@sveltejs/kit";

export const POST = (async ({ request, locals: { supabase } }) => {
  const body = await request.json();

  try {
    const id = body?.id;
    if (!id) {
      return json({
        message: 'No id provided'
      }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('FishDiscussion')
      .select(`
        id,
        content,
        fish,
        author ( id, username, image ),
        createdAt
      `)
      .eq('fish', id)
      .order('createdAt', { ascending: false });

    if (error) throw error;

    return json({
      message: 'Retrieved comments',
      data
    });
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 });
  }
});