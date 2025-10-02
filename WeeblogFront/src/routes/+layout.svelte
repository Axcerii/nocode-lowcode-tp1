<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { token } from '$lib/stores/auth';

	let { children } = $props();

	function logout() {
		localStorage.removeItem('jwt');
		token.set(null);
	}

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
  <a href="/" class="logo">Weeblog</a>
  <nav data-sveltekit-reload>
    <a href="/">Articles</a>
	{#if $token}
		<a href="/" onclick={logout}>Deconnexion</a>
	{:else}	
		<a href="/login">Connexion</a>
	{/if}
  </nav>
</header>

<main>
  {@render children?.()}
</main>

<footer>
  <p>© 2025 Weeblog - Tous droits réservés</p>
</footer>


<style>
  :root {
    --main: #ffc6fa; /* tu peux changer cette valeur selon ton besoin */
  }

  header {
    background-color: var(--main);
    color: black;
    padding: 2rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav a {
    margin-left: 1rem;
    text-decoration: none;
    color: black;
    font-weight: bold;
    transition: all 0.2s ease-in-out;
    padding: 0 0.5rem;
  }

  nav a:hover {
    text-decoration: underline;
  }

  main {
    min-height: calc(100vh - 100px); /* laisse de la place pour le footer */
    padding: 1rem;
  }

  footer {
    background-color: var(--main);
    color: black;
    text-align: center;
    padding: 0.5rem;
  }

  .logo{
    font-weight: bold;
    text-transform: uppercase;
  }
</style>