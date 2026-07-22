# Version statique CardioConseils

Site HTML/CSS/JS **sans base de données**, prêt pour Netlify.

## Contenu

- `index.html` — accueil (hero, explorations, carte Algérie, étapes, astuces, alerte, Q&A)
- `blog.html`, `explorations.html`, `regimes.html`, `qa.html`
- `algeria.svg` + `js/map.js` — carte interactive des 58 wilayas
- `css/styles.css` — identité turquoise
- `downloads/` — PDF régimes

## Déploiement Netlify

Le fichier `netlify.toml` à la racine du dépôt publie ce dossier :

```
publish = "static"
```

Aucun build Node n’est requis. Sur Netlify : Site settings → Build & deploy → Publish directory = `static`.

## Prévisualisation locale

Ouvrir `index.html` dans un navigateur, ou :

```bash
npx serve static
```
