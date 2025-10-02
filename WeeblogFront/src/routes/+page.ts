import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch(
    'http://localhost:1337/api/articles?populate=coverImage'
  );

  if (!res.ok) {
    throw new Error('Impossible de récupérer les articles');
  }

  const data = await res.json();

  const articles = data.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    createdAt: item.createdAt,
    // L'image est maintenant directement dans coverImage (pas dans coverImage.data)
    imageUrl:
      item.coverImage?.formats?.medium?.url ||
      item.coverImage?.formats?.small?.url ||
      item.coverImage?.formats?.thumbnail?.url ||
      item.coverImage?.url || // fallback sur l'image complète
      null
  }));

  return { articles };
};