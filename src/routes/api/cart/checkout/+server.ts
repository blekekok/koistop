import { json } from "@sveltejs/kit";

export const POST = async ({ request, locals: { supabase, getProfile } }) => {
  const profile = await getProfile();

  if (!profile) {
    return json({
      message: 'User not logged in'
    }, { status: 400 });
  }

  try {
    const items: any = [];
    const fishIds: any = [];
    const utilityIds: any = [];

    const { data: cartData, error: cartError } = await supabase
      .from('Cart')
      .select(`
        fish ( id, sold ),
        utility ( id, sold )
      `)
      .eq('user', profile.id);

    if (cartError) throw cartError;

    // Check if the item has been sold
    for (const item of cartData) {
      const fish: any = item.fish;
      const utility: any = item.utility;

      if ((fish && fish.sold) || (utility && utility.sold)) {
        return json({
          message: 'Please remove all sold fish from the cart'
        }, { status: 400 });
      }

      if (fish) {
        items.push({
          fish: fish.id
        });
        fishIds.push(fish.id);
      } else if (utility) {
        items.push({
          utility: utility.id
        });
        utilityIds.push(utility.id);
      }
    }

    // Make Order
    const { data: orderData, error: orderError } = await supabase
      .from('Order')
      .insert({
        user: profile.id
      })
      .select();

    if (orderError) throw orderError;

    const orderId = orderData[0].id;

    items.forEach((item: any) => {
      item.order_id = orderId;
    });

    const { error: orderItemError } = await supabase
      .from('OrderItem')
      .insert(items)

    if (orderItemError) throw orderItemError;

    // Remove item from cart
    const { error: fishItemError } = await supabase
      .from('Cart')
      .delete()
      .in('fish', fishIds);

    if (fishItemError) throw fishItemError;

    const { error: utilityItemError } = await supabase
      .from('Cart')
      .delete()
      .in('utility', utilityIds);

    if (utilityItemError) throw utilityItemError;

    // Set ordered items to sold
    for (const item of items) {
      if (item.fish) {
        await supabase
          .from('Fish')
          .update({ sold: true })
          .eq('id', item.fish);
      }

      if (item.utility) {
        await supabase
          .from('Utility')
          .update({ sold: true })
          .eq('id', item.utility);
      }
    }

    return json({
      message: 'Checkout complete'
    });
  } catch (err) {
    console.log(err);
    return json({
      message: 'Failed to respond'
    }, { status: 400 });
  }
}