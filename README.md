Weeblog - Projet Strapi (Back) x SvelteKit (Front)

# Installation du projet
1. Configuration des variables d’environnement

Dans le dossier Weeblog (backend Strapi), créez un fichier .env en vous basant sur .env.example.
Adaptez les variables selon votre environnement (base de données, clés, etc.).

2. Installation des dépendances

Installez les dépendances du backend et du frontend :

# Backend (Strapi)
cd Weeblog
npm install

# Frontend (SvelteKit)
cd ../WeeblogFront
npm install

3. Lancer les serveurs

Ouvrez deux terminaux distincts :

Terminal 1 (Strapi - Backend)

cd Weeblog
npm run develop


Terminal 2 (SvelteKit - Frontend)

cd WeeblogFront
npm run dev

4. Configuration de Strapi

Rendez-vous sur http://localhost:1337/admin

Créez un compte administrateur Strapi.

Configurez les permissions et rôles nécessaires via le plugin Users & Permissions.

5. Accéder à l’application

Une fois le front démarré, l’application est accessible à l’adresse :
👉 http://localhost:5174

# Scripts utiles

Backend (Weeblog - Strapi)

npm run develop : Lancer Strapi en mode développement
npm run build : Construire le projet pour la production
npm run start : Lancer Strapi en mode production

Frontend (WeeblogFront - SvelteKit)

npm run dev : Lancer SvelteKit en mode développement
npm run build : Construire le projet pour la production
npm run preview : Prévisualiser le projet en mode production

# Arborescence du projet
.
├── Weeblog/         # Backend Strapi
│   ├── config/      # Configuration Strapi
│   ├── src/         # Collections, composants, API
│   └── .env         # Variables d’environnement (à créer)
│
└── WeeblogFront/    # Frontend SvelteKit
    ├── src/         # Code source du front
    ├── static/      # Fichiers statiques

# Prérequis

Node.js (v22.x.x recommandé)

npm ou yarn