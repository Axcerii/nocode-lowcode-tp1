import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('http://localhost:1337/api/articles');
  if (!res.ok) {
    throw new Error('Impossible de récupérer les articles');
  }

  const data = await res.json();

  return {
    articles: data.data
  };
};