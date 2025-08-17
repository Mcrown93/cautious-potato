import { defineConfig, Plugin, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    // Serve the app on port 5173 so Builder.io can connect at the expected URL.
    port: 5173,
    // Do not automatically fall back to another port; fail fast instead.
    strictPort: true,
    // Listen on all interfaces (including IPv4/IPv6). Boolean true resolves to 0.0.0.0.
    host: true,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [
    react(),
    // Conditionally enable the PWA plugin. When the VITE_ENABLE_PWA
    // environment variable is set to "true", the site will register a
    // service worker, generate a manifest and precache the app shell.
    // See UPGRADES.md for details on how to toggle this feature.
    (() => {
      const env = loadEnv(mode, process.cwd(), '');
      return env.VITE_ENABLE_PWA === 'true'
        ? VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            includeAssets: ['favicon.ico', 'robots.txt'],
            manifest: {
              name: 'Zen Haven',
              short_name: 'ZenHaven',
              description: 'Full‑service web agency.',
              theme_color: '#00897B',
              background_color: '#ffffff',
              icons: [
                {
                  src: '/pwa-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                },
                {
                  src: '/pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                },
              ],
            },
            workbox: {
              runtimeCaching: [
                {
                  urlPattern: ({ request }) => request.destination === 'image',
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'images-cache',
                    expiration: {
                      maxEntries: 50,
                      maxAgeSeconds: 60 * 60 * 24 * 7,
                    },
                  },
                },
                {
                  urlPattern: ({ request }) => request.destination === 'font',
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'fonts-cache',
                    expiration: {
                      maxEntries: 20,
                      maxAgeSeconds: 60 * 60 * 24 * 30,
                    },
                  },
                },
              ],
            },
          })
        : undefined;
    })(),
    expressPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
