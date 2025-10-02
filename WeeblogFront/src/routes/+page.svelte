<script lang="ts">
  import ArticleCard from '$lib/components/ArticleCard.svelte';

  export let data: {
    articles: {
      id: number;
      title: string;
      slug: string;
      createdAt: string;
      imageUrl: string | null;
    }[];
  };
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
</style>

<h1>Bienvenue sur Mon Vlog</h1>

{#if data.articles.length > 0}
  <div class="grid">
    {#each data.articles as article}
      <ArticleCard 
        title={article.title} 
        slug={article.slug} 
        createdAt={article.createdAt} 
        imageUrl={article.imageUrl} 
      />
    {/each}
  </div>
{:else}
  <p>Aucun article pour le moment.</p>
{/if}