import { writable } from 'svelte/store';

export const token = writable<string | null>(null);

// au démarrage, on recharge depuis localStorage
if (typeof localStorage !== 'undefined') {
  const saved = localStorage.getItem('jwt');
  if (saved) {
    token.set(saved);
  }
}
