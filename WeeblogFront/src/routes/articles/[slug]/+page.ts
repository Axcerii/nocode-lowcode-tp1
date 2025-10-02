import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const { slug } = params;

  // On récupère l'article par slug avec son image de couverture
  const res = await fetch(
    `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=coverImage`
  );
  const data = await res.json();

  if (!data.data || data.data.length === 0) {
    return { article: null, comments: [] };
  }

  const rawArticle = data.data[0];

  // On formate l'article pour faciliter son utilisation
  const article = {
    id: rawArticle.id,
    documentId: rawArticle.documentId,
    title: rawArticle.title,
    slug: rawArticle.slug,
    content: rawArticle.content,
    createdAt: rawArticle.createdAt,
    updatedAt: rawArticle.updatedAt,
    // Récupération des images
    imageUrl:
      rawArticle.coverImage?.formats?.large?.url ||
      rawArticle.coverImage?.formats?.medium?.url ||
      rawArticle.coverImage?.formats?.small?.url ||
      rawArticle.coverImage?.url ||
      null,
    // Toutes les tailles disponibles si besoin
    images: {
      thumbnail: rawArticle.coverImage?.formats?.thumbnail?.url || null,
      small: rawArticle.coverImage?.formats?.small?.url || null,
      medium: rawArticle.coverImage?.formats?.medium?.url || null,
      large: rawArticle.coverImage?.formats?.large?.url || null,
      full: rawArticle.coverImage?.url || null
    }
  };

  // Récupération des commentaires liés à cet article
  const commentsRes = await fetch(
    `http://localhost:1337/api/comments?filters[related][documentId][$eq]=${rawArticle.documentId}`
  );
  const commentsData = await commentsRes.json();

  // Formatage des commentaires
  const comments = commentsData.data?.map((comment: any) => ({
    id: comment.id,
    documentId: comment.documentId,
    content: comment.content,
    author: comment.author,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt
  })) || [];

  return {
    article,
    comments
  };
};