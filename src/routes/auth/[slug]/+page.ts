import { redirect } from '@sveltejs/kit';

export const load = async ({ parent, params }) => {
  const { session } = await parent();
  const slug = params.slug;

  if (session) {
    throw redirect(303, '/');
  }

  if (!['login', 'register'].includes(slug)) {
    throw redirect(303, '/auth/login');
  }

  return {
    slug: params.slug
  }
};