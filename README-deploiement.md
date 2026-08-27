# Déployer le quiz "Diagnostic des 5 Systèmes"

Même principe que pour le backend : un dépôt GitHub, un projet Vercel,
zéro code à écrire. C'est un deuxième projet Vercel, séparé du backend
(le backend continue de vivre dans son propre projet).

## 1. Créer un nouveau dépôt GitHub

1. Va sur [github.com](https://github.com), clique **New**
2. Nomme-le par exemple `diagnostic-frontend`, laisse-le en **Private**
3. Clique **Create repository**

## 2. Envoyer tous les fichiers de ce dossier

1. Sur la page de ton dépôt (encore vide), clique sur le lien
   **"uploading an existing file"**
2. Ouvre le dossier `diagnostic-frontend` sur ton ordinateur, sélectionne
   TOUS les fichiers à l'intérieur (`index.html`, `main.jsx`,
   `DiagnosticFR.jsx`, `DiagnosticEN.jsx`, `package.json`, `vite.config.js`,
   `vercel.json`) et glisse-les dans la zone de dépôt GitHub
3. Clique **Commit changes**

Vérifie qu'à la fin ces 7 fichiers apparaissent tous **à la racine** du
dépôt (pas dans un sous-dossier) — c'est important, le projet est conçu
pour ça maintenant.

## 3. Importer dans Vercel

1. Dans Vercel, **Add New** → **Project**
2. Sélectionne le dépôt `diagnostic-frontend`
3. Vercel détecte automatiquement que c'est un projet Vite — laisse les
   réglages par défaut
4. Clique **Deploy**

Pas de variable d'environnement à ajouter ici (les clés secrètes restent
uniquement dans le projet backend).

## 4. Récupérer les deux URLs

Une fois déployé, tu obtiens une URL du type
`https://diagnostic-frontend-xxxx.vercel.app` :

- **Version française** : cette URL telle quelle
- **Version anglaise** : la même URL suivie de `/en`
  (ex: `https://diagnostic-frontend-xxxx.vercel.app/en`)

## 5. Tester

Ouvre les deux URLs, fais le quiz jusqu'au bout dans chaque langue, et
vérifie que :
- Le diagnostic généré s'affiche bien
- Le lead apparaît dans Kit avec le bon tag

## Ensuite

Une fois que tout est validé, tu pourras :
- Soit partager directement ces deux URLs Vercel (via ton lien en bio)
- Soit connecter un sous-domaine à toi (ex: `diagnostic.sola.ai`) dans
  les réglages du projet Vercel, sous **Settings → Domains**
