import { json } from "@sveltejs/kit";

export const GET = async ({ request, locals: { supabase, getProfile } }) => {
  const profile = await getProfile();

  if (!profile) {
    return json({
      message: 'User not logged in'
    }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('Cart')
      .select(`
        fish ( id, name, price, image, seller ( username ), sold ),
        utility ( id, name, price, image, seller ( username ), sold )
      `).eq('user', profile.id);

    if (error) throw error;

    const mapped = data.map((d: any) => {
      const item = d.fish ?? d.utility;

      return {
        ...item,
        type: d.fish ? 'fish' : 'utility'
      }
    });

    return json({
      message: 'Cart items',
      data: mapped
    });
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 });
  }
}