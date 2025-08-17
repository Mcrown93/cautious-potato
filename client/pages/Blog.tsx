import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/i18n';
import { Link } from 'react-router-dom';

// A placeholder blog listing page. It provides SEO meta tags via Helmet
// and displays a simple list of mock posts. In a full implementation
// these posts would be fetched via TanStack Query from a headless CMS or
// local markdown files. The translation keys are defined in locales.
export default function Blog() {
  const { t } = useTranslation();
  const posts = [
    {
      slug: 'introducing-zen-haven',
      title: 'Introducing Zen Haven',
      excerpt: 'Get to know our mission and the value we bring to your digital projects.',
      date: '2025-01-15',
      category: 'Company',
      readTime: '3 min',
    },
    {
      slug: 'web-performance-best-practices',
      title: 'Web Performance Best Practices',
      excerpt: 'Learn how to optimize your site for Core Web Vitals and beyond.',
      date: '2025-02-10',
      category: 'Performance',
      readTime: '5 min',
    },
    {
      slug: 'accessibility-checklist',
      title: 'Accessibility Checklist',
      excerpt: 'A practical guide to building accessible websites that everyone can use.',
      date: '2025-03-05',
      category: 'Accessibility',
      readTime: '4 min',
    },
  ];
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>{t('pages.blog.title')}</title>
        <meta name="description" content={t('pages.blog.description')} />
        <link rel="canonical" href="/blog" />
      </Helmet>
      <Header />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-8">{t('pages.blog.title')}</h1>
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug} className="p-6 rounded-lg border border-border bg-card transition-colors hover:bg-card/70 focus-within:bg-card/70">
                <article>
                  <header className="mb-2">
                    <h2 className="text-2xl font-semibold">
                      <Link to={`/blog/${post.slug}`} className="hover:underline focus-visible:underline">
                        {post.title}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap text-sm text-muted-foreground space-x-2">
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                      <span aria-hidden="true">·</span>
                      <span>{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </header>
                  <p className="text-muted-foreground mb-2 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${post.slug}`} className="text-primary hover:underline focus-visible:underline">
                    Read more
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}