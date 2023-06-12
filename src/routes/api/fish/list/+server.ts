import { json } from '@sveltejs/kit';

export const GET = (async ({ locals: { supabase } }) => {

  try {
    const { data: fishData, error: fishErr } = await supabase
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
      `);

    if (fishErr) throw fishErr;

    return json({
      message: 'Retrieved all fish data',
      data: fishData
    })
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 })
  }
});