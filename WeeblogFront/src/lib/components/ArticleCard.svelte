<script lang="ts">
  export let title: string;
  export let slug: string;
  export let createdAt: string;
  export let imageUrl: string | null = null;

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
</script>

<style>
  .card {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    overflow: hidden;
    transition: transform 0.2s;
  }
  .card:hover {
    transform: translateY(-8px) scale(1.01);
  }

  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-content {
    padding: 1rem;
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: var(--second);
  }

  .card-date {
    font-size: 0.9rem;
    color: black;
  }

  .card-link {
    text-decoration: none;
  }
</style>

<a class="card-link" href={`/articles/${slug}`}>
  <div class="card">
    {#if imageUrl}
      <img src="http://localhost:1337{imageUrl}" alt={title} />
    {/if}
    <div class="card-content">
      <h2 class="card-title">{title}</h2>
      <p class="card-date">{formatDate(createdAt)}</p>
    </div>
  </div>
</a>