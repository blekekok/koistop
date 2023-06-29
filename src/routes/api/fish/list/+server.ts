import { json } from '@sveltejs/kit';

export const POST = (async ({ request, locals: { supabase } }) => {
  const body = await request.json();

  try {
    let req = supabase
      .from('Fish')
      .select(`
        id,
        name,
        price,
        description,
        dimension,
        fishType ( id, name ),
        seller ( id, username ),
        image,
        sold
      `)
      .eq('sold', false);

    if (body?.fish_type) {
      const type = body.fish_type;
      if (type !== 'all') {
        req = req.eq('fishType', type);
      }
    }

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

    const { data: fishData, error: fishErr } = await req;

    if (fishErr) throw fishErr;

    return json({
      message: 'Retrieved all fish data',
      data: fishData
    })
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 });
  }
});