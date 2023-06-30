import { json } from "@sveltejs/kit";

export const GET = async ({ request, locals: { supabase, getProfile } }) => {
  const profile = await getProfile();

  if (!profile) {
    return json({
      message: 'User not logged in'
    }, { status: 400 });
  }

  try {
    const data: any = [];

    const { data: fishData, error: fishError } = await supabase
      .from('Fish')
      .select(`
        id,
        name,
        price,
        seller,
        sold
      `)
      .eq('seller', profile.id);

    if (fishError) throw fishError;

    data.push(...fishData.map((d: any) => { return { ...d, type: 'fish' } }));

    const { data: utilityData, error: utilityError } = await supabase
      .from('Utility')
      .select(`
        id,
        name,
        price,
        seller,
        sold
      `)
      .eq('seller', profile.id);

    if (utilityError) throw utilityError;

    data.push(...utilityData.map((d: any) => { return { ...d, type: 'utility' } }));

    return json({
      message: 'Product items',
      data
    });
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 });
  }
};