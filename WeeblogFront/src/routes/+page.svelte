<script lang="ts">
  export let data: {
    articles: {
      id: number;
      title: string;
      slug: string;
      createdAt: string;
    }[];
  };

  // Fonction pour formatter la date en français
  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
</script>

<h1>Bienvenue sur Mon Blog</h1>

{#if data.articles.length > 0}
  <ul>
    {#each data.articles as article}
      <li>
        <h2>
          <a href={`/articles/${article.slug}`}>{article.title}</a>
        </h2>
        <p>Publié le {formatDate(article.createdAt)}</p>
      </li>
    {/each}
  </ul>
{:else}
  <p>Aucun article pour le moment.</p>
{/if}