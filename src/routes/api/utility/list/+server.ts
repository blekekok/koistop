import { json } from '@sveltejs/kit';

export const POST = (async ({ request, locals: { supabase } }) => {
  const body = await request.json();

  try {
    let req = supabase
      .from('Utility')
      .select(`
        id,
        name,
        price,
        description,
        seller ( id, username ),
        image,
        sold
      `)
      .eq('sold', false);

    if (body?.sort) {
      const sort = body.sort;
      if (['a-z', 'z-a'].includes(sort)) {
        req = req.order('name', { ascending: sort === 'z-a' })
      } else if (['cheapest', 'expensive'].includes(sort)) {
        req = req.order('price', { ascending: sort === 'cheapest' });
      } else if (['recent', 'oldest'].includes(sort)) {
        req = req.order('createdAt', { ascending: sort === 'oldest' })
      }
    }

    if (body?.search) {
      const search = body.search;
      req = req.textSearch('name', search);
    }

    const { data: utilityData, error: utilityErr } = await req;

    if (utilityErr) throw utilityErr;

    return json({
      message: 'Retrieved all utility data',
      data: utilityData
    })
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 })
  }
});