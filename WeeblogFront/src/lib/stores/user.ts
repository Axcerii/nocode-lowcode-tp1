import { writable } from 'svelte/store';
import { token } from './auth'; // ton store déjà existant

export interface User {
  id: number;
  username: string;
  email: string;
}

export const user = writable<User | null>(null);

// Quand on met à jour le token, on peut aussi charger l'utilisateur
token.subscribe(async (jwt) => {
  if (jwt) {
    try {
      const res = await fetch('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        user.set({
          id: data.id,
          username: data.identifier,
          email: data.email
        });
      } else {
        user.set(null);
      }
    } catch {
      user.set(null);
    }
  } else {
    user.set(null);
  }
});