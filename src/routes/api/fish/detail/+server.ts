import { json } from '@sveltejs/kit';

export const POST = (async ({ request, locals: { supabase } }) => {
  const body = await request.json();
  const id = body.id;

  try {
    const { data: data, error: dataErr } = await supabase
      .from('Fish')
      .select(`
        id,
        name,
        price,
        description,
        dimension,
        fishType ( id, name ),
        seller ( id, username ),
        image
      `)
      .eq('id', id);

    if (dataErr) throw dataErr;

    return json({
      message: 'Retrieved data',
      data: data[0]
    })
  } catch (err) {
    return json({
      message: 'Failed to respond'
    }, { status: 400 })
  }
});