# 🤖 ProjectBot - Site Web Astro + Tailwind

Un site web moderne et performant pour ProjectBot, le bot Discord de gestion de projets, construit avec Astro et Tailwind CSS.

## 🚀 Fonctionnalités

- ⚡ **Astro** - Framework web ultra-rapide avec génération statique
- 🎨 **Tailwind CSS** - Framework CSS utilitaire pour un design moderne
- 📱 **Responsive Design** - Optimisé pour tous les écrans
- ♿ **Accessibilité** - Conforme aux standards WCAG 2.1
- 🔍 **SEO Optimisé** - Meta tags, données structurées et sitemap
- 🎭 **Animations Fluides** - Transitions CSS3 performantes
- 🌙 **Dark Theme** - Design sombre adapté à Discord

## 📦 Technologies Utilisées

- [Astro](https://astro.build/) v5.14.1
- [Tailwind CSS](https://tailwindcss.com/) v4.1.14
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [Font Awesome](https://fontawesome.com/) - Icônes
- [Inter Font](https://fonts.google.com/specimen/Inter) - Typographie

## 🛠️ Installation et Développement

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Scripts Disponibles

```bash
npm run dev          # Serveur de développement (http://localhost:4321)
npm run build        # Build de production
npm run preview      # Prévisualiser le build de production
npm run astro        # CLI Astro
```

## 🎨 Composants Principaux

### Navigation
- Menu responsive avec hamburger mobile
- Smooth scrolling vers les sections
- Navbar qui se cache/affiche au scroll
- Lien vers l'OAuth Discord

### Hero Section
- Animation de texte en dégradé
- Blobs animés en arrière-plan
- CTAs vers Discord et la démo
- Aperçu des fonctionnalités principales

### Features Section
- Grille de fonctionnalités avec hover effects
- Icônes Font Awesome
- Cartes avec glassmorphism
- Animation on scroll

### Commands Section
- Commandes Discord organisées par catégorie
- Copie en un clic avec feedback visuel
- Exemple d'utilisation interactif
- Coloration syntaxique

## 🚀 Déploiement

### Build de Production

```bash
npm run build
```

Le site est maintenant prêt pour le déploiement sur Vercel, Netlify, ou toute autre plateforme supportant Astro.

## 🔧 Configuration

Pour utiliser avec votre bot Discord, remplacez `YOUR_BOT_ID` dans les liens OAuth par votre véritable ID de bot Discord.

---

Made with ❤️ by the ProjectBot Team