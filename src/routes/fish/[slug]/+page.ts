import { redirect } from "@sveltejs/kit";

export const load = async ({ fetch, params }) => {
  const data = {
    content: {}
  };

  try {
    const response = await fetch('/api/fish/detail',
      {
        method: 'POST',
        body: JSON.stringify({
          id: params.slug
        })
      }
    );

    if (response.status !== 200) {
      throw Error('Fishes cant be retrieved');
    }

    const content = await response.json();

    data.content = content.data;
  } catch (err) {
    // console.log(err);
    throw redirect(301, '/fish');
  }

  return data;
};