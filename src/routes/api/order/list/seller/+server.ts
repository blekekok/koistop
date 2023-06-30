import { json } from "@sveltejs/kit";

export const POST = async ({ request, locals: { supabase, getProfile } }) => {
  const profile = await getProfile();
  const body = await request.json();

  if (!profile) {
    return json({
      message: 'User not logged in'
    }, { status: 400 });
  }

  try {
    const status = body?.status;

    const data: any = [];

    const { data: fishData, error: fishError } = await supabase
      .from('OrderItem')
      .select(`
        item:fish!inner (*),
        status
      `)
      .eq('status', status ?? 0)
      .eq('item.seller', profile.id);

    if (fishError) throw fishError;

    data.push(...fishData.map(d => { return { ...d, type: 'fish' } }));

    const { data: utilityData, error: utilityError } = await supabase
      .from('OrderItem')
      .select(`
        item:utility!inner (*),
        status
      `)
      .eq('status', status ?? 0)
      .eq('item.seller', profile.id);

    if (utilityError) throw utilityError;

    data.push(...utilityData.map(d => { return { ...d, type: 'utility' } }));

    const mapped = data.map((d: any) => {
      return {
        ...d.item,
        status: d.status,
        type: d.type
      }
    });

    return json({
      message: 'Order items',
      data: mapped
    });
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 });
  }
};