# Zen Haven Upgrade Guide

This document summarises the improvements and feature flags added to the Zen Haven starter in this upgrade. It also explains how to toggle optional functionality at build and runtime.

## Feature flags

The project reads several environment variables at runtime to enable or disable costly features, particularly those relating to rich 3D graphics and motion. Flags are evaluated through the `useFeatureFlags` hook. When a flag is absent it defaults to a safe disabled state. To set a flag add it to your `.env` file (e.g. `.env.production`):

| Flag | Values | Description |
| --- | --- | --- |
| `VITE_MOBILE_UI` | `true`/`false` | Render a mobile‑only UI layer. When enabled the UI will adjust layouts and hide desktop‑only elements. |
| `VITE_ENABLE_PWA` | `true`/`false` | Register a Service Worker and generate an installable PWA manifest. Behind the scenes it uses the [`vite-plugin-pwa`](https://github.com/antfu/vite-plugin-pwa). |
| `VITE_MOBILE_PERF_MODE` | `on`/`off` | When `on`, lower poly counts and frame rates are used for 3D scenes and animations to improve performance on low‑end devices. |
| `VITE_3D_HERO` | `on`/`off` | Use a WebGL‑powered hero section on the home page. Falls back to a static gradient when disabled or when reduced‑motion is enabled. |
| `VITE_3D_PARTICLES` | `on`/`off` | Show instanced particle effects in supported scenes. |
| `VITE_AUDIO_REACTIVE` | `on`/`off` | Enable audio‑reactive animations. Requires user interaction before accessing the microphone. |

Feature flags can be accessed in components via:

```tsx
import { useFeatureFlags } from '@/hooks/useFeatureFlags';

const flags = useFeatureFlags();
if (flags.hero3d) {
  // render WebGL hero…
}
```

## Progressive Web App

When `VITE_ENABLE_PWA` is `true`, the build includes a service worker and manifests generated via `vite-plugin-pwa`. The manifest is defined both in `vite.config.ts` and in `public/manifest.webmanifest`. Two icons (`pwa-192x192.png` and `pwa-512x512.png`) live in `public/`; replace these with your own artwork for production.

The service worker precaches the application shell and provides runtime caching for images and fonts. The PWA will automatically update itself when a new version is deployed.

## Internationalisation (i18n)

The app ships with English, Italian, French, Spanish, German and Portuguese language packs. Use the language selector in the header to switch at runtime. The selection persists across sessions. See `i18n.md` for details on adding new keys.

## Accessibility and Skip Link

All pages now include a skip‑to‑content link. This hidden anchor becomes visible when focused and allows keyboard users to jump directly into the main content. Ensure that the primary content of each page is wrapped in an element with `id="main-content"` so that the link works correctly.

## Cookie Consent and Analytics

A lightweight cookie consent banner appears until the user makes a choice. Users can opt into anonymous analytics powered by Plausible. Consent is stored in `localStorage` and the Plausible script is only injected when analytics are enabled.

## Sitemap and Robots

`public/robots.txt` now references `sitemap.xml`, which is generated at build time using the list of discovered routes from `routes.generated.ts`. The sitemap lists all important pages with their last modification date.

## Tests

Vitest is configured for unit testing. Sample tests for the feature flag hook, theme hook and i18n provider live under `client/tests`. Run all tests with:

```sh
npm run test
```

## Development Tips

- To regenerate the sitemap after adding pages, run `npm run build` or execute the script in `scripts/generate-sitemap.ts` manually.
- Use the `useLowEndDevice` and `usePrefersReducedMotion` hooks to choose simplified experiences on low‑power devices or when the user requests reduced motion.
- See `tailwind.config.ts` for semantic colour tokens and dark mode configuration.
