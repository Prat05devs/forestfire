# Van Rakshak landing page

Long form product landing page for the Van Rakshak forest fire intelligence and safety platform concept.

## Run locally

Use Node 24 or a current Node 22 release.

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The generated site is written to `dist/`.

## Deploy as a separate Vercel repository

This directory is self contained. Copy or move the entire `landing-page` directory into a new repository, but do not copy `node_modules` or `dist`.

The repository already includes:

- Every website image under `public/screens/`
- The working logo under `public/brand/`
- The favicon under `public/`
- React, Vite, Tailwind, PostCSS, and dependency configuration
- A lockfile for repeatable dependency installation
- `vercel.json` with the Vite build settings and single page application routing

In Vercel, import the repository and leave the framework preset as Vite. The included configuration runs `npm run build` and publishes `dist`.

No environment variables or parent directory files are required by the current website.

## Content status

The page describes a proposed product and interactive prototype. It does not represent a live emergency service, connected production feeds, or approved government deployment. Data integrations are labelled as planned, pending access, or requiring stakeholder approval.
