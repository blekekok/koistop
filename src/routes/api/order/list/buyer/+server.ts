import { json } from "@sveltejs/kit";

export const GET = async ({ locals: { supabase, getProfile } }) => {
  const profile = await getProfile();

  if (!profile) {
    return json({
      message: 'User not logged in'
    }, { status: 400 });
  }

  try {
    const { data , error } = await supabase
      .from('OrderItem')
      .select(`
        order:order_id!inner (*),
        fish ( id, name, price, image, seller (username)),
        utility ( id, name, price, image, seller (username)),
        status
      `)
      .eq('order.user', profile.id);

    if (error) throw error;

    const mapped = data.map((d: any) => {
        const item = d.fish ?? d.utility;

        return {
            ...item,
            status: d.status,
            type: d.fish ? 'fish' : 'utility'
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