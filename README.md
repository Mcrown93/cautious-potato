# Zen Haven

Zen Haven is a full‑stack React + Vite application with Tailwind, shadcn/ui, Framer Motion and optional 3D features.  The project implements route auto‑discovery, i18n, accessibility and PWA support behind feature flags.  All user‑visible text is localized via the i18n provider (see `locales/`), and the site respects reduced‑motion and low‑end devices.

## Quick start

```bash
# install dependencies
npm install

# start the dev server on port 5173 for local development
npm run dev -- --host --port 5173 --strictPort

# build the client and server
npm run build

# run the built server (falls back to vite preview if no server build exists)
npm start
```

## Project structure

```
├── client/      # React app code (pages, components, hooks)
├── server/      # Express server used during development/build
├── public/      # Static assets (manifest, icons, sitemap, robots)
├── locales/     # i18n JSON files (en, it, fr, es, de, pt)
├── scripts/     # build/postbuild scripts
├── vite.config.ts     # Vite configuration (dev server on 5173)
├── vite.config.server.ts  # Vite config for server build
├── package.json  # npm scripts and dependencies
└── README.md
```

For details about feature flags, PWA configuration and translation workflow, see `UPGRADES.md` and `i18n.md`.