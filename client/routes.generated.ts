/*
 * This file is generated at build time by scanning the project for all top
 * level routes. Each route entry contains the route path, the component file
 * that is loaded for that path, translation keys for the document title and
 * description, and a flag indicating whether the route is the index. The
 * structure of this file can be consumed by sitemap generators and SEO
 * helpers. If you add new pages or static HTML files under the `public`
 * directory you should regenerate this file to keep it up to date. See
 * `AGENTS.md` for more details.
 */

export interface DiscoveredRoute {
  /**
   * The URL path relative to the site root (e.g. "/services").
   */
  path: string;
  /**
   * The file containing the React component for this route. Relative to
   * `client/pages` for TSX files or to `public` for HTML files.
   */
  file: string;
  /**
   * i18n key for the page title. The final title is pulled from the
   * appropriate locale JSON and concatenated with the site name.
   */
  titleKey: string;
  /**
   * i18n key for the page description used in meta tags.
   */
  descriptionKey: string;
  /**
   * When true, this route is the index (home) page.
   */
  isIndex: boolean;
}

// This array is consumed by the sitemap generation script and by the SEO
// helpers. Do not mutate at runtime.
export const discoveredRoutes: DiscoveredRoute[] = [
  {
    path: '/',
    file: 'Index.tsx',
    titleKey: 'pages.home.title',
    descriptionKey: 'pages.home.description',
    isIndex: true
  },
  {
    path: '/services',
    file: 'Services.tsx',
    titleKey: 'pages.services.title',
    descriptionKey: 'pages.services.description',
    isIndex: false
  },
  {
    path: '/method',
    file: 'Method.tsx',
    titleKey: 'pages.method.title',
    descriptionKey: 'pages.method.description',
    isIndex: false
  },
  {
    path: '/portfolio',
    file: 'Portfolio.tsx',
    titleKey: 'pages.portfolio.title',
    descriptionKey: 'pages.portfolio.description',
    isIndex: false
  },
  {
    path: '/pricing',
    file: 'Pricing.tsx',
    titleKey: 'pages.pricing.title',
    descriptionKey: 'pages.pricing.description',
    isIndex: false
  },
  {
    path: '/about',
    file: 'About.tsx',
    titleKey: 'pages.about.title',
    descriptionKey: 'pages.about.description',
    isIndex: false
  },
  {
    path: '/contact',
    file: 'Contact.tsx',
    titleKey: 'pages.contact.title',
    descriptionKey: 'pages.contact.description',
    isIndex: false
  },
  {
    path: '/quote',
    file: 'Quote.tsx',
    titleKey: 'pages.quote.title',
    descriptionKey: 'pages.quote.description',
    isIndex: false
  },
  {
    path: '/404',
    file: 'NotFound.tsx',
    titleKey: 'pages.notFound.title',
    descriptionKey: 'pages.notFound.description',
    isIndex: false
  },
  {
    path: '/blog',
    file: 'Blog.tsx',
    titleKey: 'pages.blog.title',
    descriptionKey: 'pages.blog.description',
    isIndex: false
  },
  {
    path: '/blog/:slug',
    file: 'Article.tsx',
    titleKey: 'pages.article.title',
    descriptionKey: 'pages.article.description',
    isIndex: false
  },
  {
    path: '/resources',
    file: 'Resources.tsx',
    titleKey: 'pages.resources.title',
    descriptionKey: 'pages.resources.description',
    isIndex: false
  },
  {
    path: '/docs',
    file: 'Docs.tsx',
    titleKey: 'pages.docs.title',
    descriptionKey: 'pages.docs.description',
    isIndex: false
  },
  {
    path: '/privacy',
    file: 'Privacy.tsx',
    titleKey: 'pages.privacy.title',
    descriptionKey: 'pages.privacy.description',
    isIndex: false
  },
  {
    path: '/cookies',
    file: 'Cookies.tsx',
    titleKey: 'pages.cookies.title',
    descriptionKey: 'pages.cookies.description',
    isIndex: false
  },
  {
    path: '/accessibility',
    file: 'Accessibility.tsx',
    titleKey: 'pages.accessibility.title',
    descriptionKey: 'pages.accessibility.description',
    isIndex: false
  },
  {
    path: '/terms',
    file: 'Terms.tsx',
    titleKey: 'pages.terms.title',
    descriptionKey: 'pages.terms.description',
    isIndex: false
  }
];

// Include any static HTML pages in public. This allows links like
// `/legal/privacy.html` to be discovered. Currently there are no custom
// HTML pages other than index.html, but this array is here for future
// extensions.
export const staticRoutes: DiscoveredRoute[] = [];