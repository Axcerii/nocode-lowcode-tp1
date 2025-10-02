import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const { slug } = params;

  const res = await fetch(
    `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}`
  );

  if (!res.ok) {
    throw new Error('Impossible de récupérer l’article');
  }

  const data = await res.json();

  if (!data.data || data.data.length === 0) {
    return {
      article: null
    };
  }

  return {
    article: data.data[0]
  };
};
