import { json } from '@sveltejs/kit';

export const GET = (async ({ locals: { supabase } }) => {

  try {
    const { data: fishData, error: utilityErr } = await supabase
      .from('Utility')
      .select(`
        id,
        name,
        price,
        description,
        seller ( id, username ),
        image
      `);

    if (utilityErr) throw utilityErr;

    return json({
      message: 'Retrieved all utility data',
      data: fishData
    })
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 })
  }
});