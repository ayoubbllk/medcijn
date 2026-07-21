# CardioConseils — Site éditorial de cardiologie

Site web éditorial pour un cabinet de cardiologie. L'objectif est de sensibiliser les patients et le grand public, partager des astuces santé cœur, expliquer les explorations médicales et créer de l'interaction (questions/réponses, sondages, partage de contenu).

> **Important** : ce site ne propose pas de prise de rendez-vous. Tous les contenus sont à visée éducative et informatives. Ils ne remplacent pas une consultation médicale.

## Stack technique

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- Prisma + SQLite (données de démonstration)
- Lucide React (icônes)

## Prérequis

- Node.js 18.17+ (testé avec Node 24)
- npm ou pnpm

## Installation

```bash
npm install
```

## Configuration de la base de données

Le projet utilise SQLite via Prisma. Pour créer la base et insérer les données de démonstration :

```bash
npm run db:seed
```

Cette commande exécute :

```bash
prisma db push
tsx prisma/seed.ts
```

## Lancer le projet en développement

```bash
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
app/
  page.tsx                  # Page d'accueil
  blog/                     # Blog et articles
  explorations/             # Explorations médicales
  regimes/                  # Régimes & nutrition
  qa/                       # Q&A communautaire
  api/                      # Routes API (questions, sondage)
components/
  ui/                       # Composants shadcn/ui
  sections/                 # Sections de la page d'accueil
  card.tsx                  # Carte réutilisable
  flip-card.tsx             # Carte 3D retournable
  stat-counter.tsx          # Compteur animé
  ecg-divider.tsx           # Séparateur ECG animé
  alert-accordion.tsx       # Accordéon des signes d'alerte
  scroll-reveal.tsx         # Wrapper d'animation au scroll
  navbar.tsx                # Navigation
  footer.tsx                # Pied de page
  floating-emergency.tsx    # Bouton d'urgence flottant
  pulse-blob.tsx            # Halo bleu pulsant
  tips-carousel.tsx         # Carrousel d'astuces
  blog-card.tsx             # Carte d'article
  blog-filter.tsx           # Filtre et recherche du blog
  qa-list.tsx               # Liste des questions avec vote
  question-form.tsx         # Formulaire de question
  regime-card.tsx           # Carte de fiche nutritionnelle
lib/
  prisma.ts                 # Singleton Prisma Client
  utils.ts                  # Utilitaires Tailwind
prisma/
  schema.prisma             # Schéma de base de données
  seed.ts                   # Données de démonstration
```

## Données de démonstration

Le fichier `prisma/seed.ts` crée automatiquement :

- 4 statistiques pour la page d'accueil
- 6 articles de blog
- 5 explorations médicales
- 3 fiches régimes/nutrition
- 5 questions/réponses
- 5 astuces du moment
- 1 sondage santé

## Accessibilité

- Contraste élevé et taille de texte généreuse
- Respect de `prefers-reduced-motion`
- Navigation clavier supportée
- Labels et états ARIA sur les composants interactifs
- Numéro d'urgence accessible en permanence via le bouton flottant

## Scripts disponibles

- `npm run dev` : lancer le serveur de développement
- `npm run build` : construire le projet pour la production
- `npm run start` : lancer le serveur de production
- `npm run lint` : exécuter ESLint
- `npm run db:seed` : créer la base et insérer les données de démonstration
- `npm run seed` : exécuter uniquement le seed

## Licence

Projet créé dans un cadre démonstratif.
