import { redirect } from "@sveltejs/kit";

export const load = async ({ fetch, parent }) => {
  const data = {
    type: []
  };
  const { profile }: any = await parent();

  if (!profile) {
    throw redirect(301, '/');
  }

  try {
    const response = await fetch('/api/fish/type');

    if (response.status !== 200) {
      throw Error('Fish types cant be retrieved');
    }

    const content = await response.json();
    data.type = content.data;
  } catch (err) {
    console.log(err);
    throw redirect(301, '/');
  }

  return data;
};