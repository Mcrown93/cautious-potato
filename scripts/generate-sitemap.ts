#!/usr/bin/env ts-node
/*
 * Generates a sitemap.xml based on the compiled `routes.generated.ts` file.
 * This script reads the exported `discoveredRoutes` array and writes
 * `public/sitemap.xml` with a `<url>` entry for each route. The base
 * URL should be specified via the BASE_URL environment variable or will
 * default to `https://zen-haven.com`. Run this script as part of the
 * build process (e.g. using an npm script).
 */
import fs from 'fs';
import path from 'path';
import { discoveredRoutes } from '../client/routes.generated';

const baseUrl = process.env.BASE_URL || 'https://zen-haven.com';
const lastmod = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
for (const route of discoveredRoutes) {
  // Ignore dynamic routes (e.g. blog/:slug) in the sitemap
  if (route.path.includes(':')) continue;
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
  xml += `    <lastmod>${lastmod}</lastmod>\n`;
  xml += `  </url>\n`;
}
xml += `</urlset>\n`;

const outPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, xml);
console.log(`Sitemap written to ${outPath}`);