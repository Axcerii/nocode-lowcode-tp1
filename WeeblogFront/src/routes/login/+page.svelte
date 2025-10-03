<script lang="ts">
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';

  let identifier = '';
  let password = '';
  let error = '';

  // store simple pour le token
  export const token = writable<string | null>(null);

  async function handleLogin() {
    error = '';
    try {
      const res = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });

      if (!res.ok) {
        throw new Error('Identifiant ou mot de passe incorrect');
      }

      const data = await res.json();

      // Stocker le JWT en localStorage
      localStorage.setItem('jwt', data.jwt);
      token.set(data.jwt);

      // rediriger vers la page d’accueil
      goto('/');
    } catch (e) {
      error = (e as Error).message;
    }
  }
</script>

<h1>Connexion</h1>

<form on:submit|preventDefault={handleLogin}>
  <div>
    <label for="identifier">Email ou Username :</label>
    <input id="identifier" type="text" bind:value={identifier} required />
  </div>

  <div>
    <label for="password">Mot de passe :</label>
    <input id="password" type="password" bind:value={password} required />
  </div>

  {#if error}
    <p style="color:red">{error}</p>
  {/if}

  <button type="submit">Se connecter</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &>div{
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  label{
    font-weight: bold;
  }

  input{
    padding: 0.5rem;
    border: 1px solid var(--second);
    background: var(--main);
    border-radius: 4px;
    max-width: 80%;
  }

  h1{
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  button{
    width: 10rem;
    max-width: 80%;
  }
</style>