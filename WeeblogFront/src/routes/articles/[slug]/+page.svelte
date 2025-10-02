<script lang="ts">
  import { user } from '$lib/stores/user';
  export let data: {
    article: {
      id: number;
      documentId: string;
      title: string;
      slug: string;
      content: any[];
      createdAt: string;
      updatedAt: string;
      imageUrl: string | null;
      images: {
        thumbnail: string | null;
        small: string | null;
        medium: string | null;
        large: string | null;
        full: string | null;
      };
    } | null;
    comments: {
      id: number;
      documentId: string;
      content: string;
      authorName: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };

  let authorName = '';
  let content = '';
  let error = '';
  let success = '';

  $: if ($user?.username) {
    authorName = $user.username;
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  async function handleSubmit() {
    error = '';
    success = '';
    if (!authorName || !content) {
      error = 'Tous les champs sont obligatoires';
      return;
    }

    try {
      const res = await fetch('http://localhost:1337/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            authorName,
            content,
            article: data.article?.documentId
          }
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || 'Erreur lors de l\'envoi du commentaire');
      }

      success = 'Commentaire ajouté avec succès ✅';
      content = '';
      
      // Recharger les commentaires
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      error = (e as Error).message;
    }
  }
</script>

{#if data.article}
  <article>
    <!-- Affichage de l'image de couverture si disponible -->
    {#if data.article.imageUrl}
      <img 
        src="http://localhost:1337{data.article.imageUrl}" 
        alt={data.article.title}
        style="max-width: 100%; height: auto; margin-bottom: 1rem;"
      />
    {/if}

    <h1>{data.article.title}</h1>
    <p><em>Publié le {formatDate(data.article.createdAt)}</em></p>

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

  <section class="comments">
    <h2>Commentaires</h2>
    {#if data.comments.length > 0}
      <ul>
        {#each data.comments as comment}
          <li>
            <p>{comment.content}</p>
            <small>
              Posté {formatDate(comment.createdAt)}
              {#if comment.authorName} par {comment.authorName}{/if}
            </small>
          </li>
        {/each}
      </ul>
    {:else}
      <p>Aucun commentaire pour cet article.</p>
    {/if}
  </section>

  <section class="add-comment">
    <h2>Ajouter un commentaire</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="authorName">Nom :</label>
        {#if $user?.username}
          <input
            id="authorName"
            type="text"
            bind:value={authorName}
            required
            readonly
          />
        {:else}
          <input
            id="authorName"
            type="text"
            bind:value={authorName}
            required
          />
        {/if}
      </div>

      <div>
        <label for="content">Commentaire :</label>
        <textarea id="content" bind:value={content} required></textarea>
      </div>

      {#if error}
        <p style="color:red">{error}</p>
      {/if}
      {#if success}
        <p style="color:green">{success}</p>
      {/if}

      <button type="submit">Publier</button>
    </form>
  </section>
{:else}
  <p>Article introuvable.</p>
{/if}