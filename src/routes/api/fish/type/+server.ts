import { json } from "@sveltejs/kit";

export const GET = (async ({ locals: { supabase } }) => {
  try {
    const { data, error } = await supabase
      .from('FishType')
      .select();

      if (error) throw error;

      return json({
        data
      });
  } catch (err) {
    return json({
      data: []
    });
  }
});