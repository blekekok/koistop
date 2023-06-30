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

    let reqFish = supabase
      .from('OrderItem')
      .select(`
        item:fish!inner (*),
        status
      `)
      .eq('item.seller', profile.id);

    if (status && status != -1) {
      reqFish = reqFish.eq('status', status ?? 0)
    }

    const { data: fishData, error: fishError } = await reqFish;

    if (fishError) throw fishError;

    data.push(...fishData.map((d: any) => { return { ...d, type: 'fish' } }));

    let reqUtility = supabase
      .from('OrderItem')
      .select(`
        item:utility!inner (*),
        status
      `)
      .eq('item.seller', profile.id);

    if (status && status != -1) {
      reqUtility = reqUtility.eq('status', status ?? 0)
    }

    const { data: utilityData, error: utilityError } = await reqUtility;

    if (utilityError) throw utilityError;

    data.push(...utilityData.map((d: any) => { return { ...d, type: 'utility' } }));

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