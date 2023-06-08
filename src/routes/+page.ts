export const load = async ({ parent }) => {
  const { session } = await parent();

  console.log(session);
};