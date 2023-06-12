export const load = async ({ fetch }) => {
  const data = {
    content: []
  };

  try {
    const response = await fetch('/api/utility/list');

    if (response.status !== 200) {
      throw Error('Utilty cant be retrieved')
    }

    const content = await response.json();

    data.content = content.data;
  } catch (err) {
    console.log(err);
  }

  return data;
};