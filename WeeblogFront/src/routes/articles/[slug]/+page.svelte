<script lang="ts">
  export let data: {
    article: {
      id: number;
      title: string;
      createdAt: string;
      content: any[];
    } | null;
  };

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
</script>

{#if data.article}
  <article>
    <h1>{data.article.title}</h1>
    <p><em>Publié le {formatDate(data.article.createdAt)}</em></p>

    <!-- Rendu du contenu simple (paragraphes) -->
    {#each data.article.content as block}
      {#if block.type === 'paragraph'}
        <p>
          {#each block.children as child}
            {child.text}
          {/each}
        </p>
      {/if}
    {/each}
  </article>
{:else}
  <p>Article introuvable.</p>
{/if}
