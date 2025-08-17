import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/i18n';
import { useParams, Link } from 'react-router-dom';

// Placeholder data for demonstration. In a real application you would fetch
// article data based on the slug via TanStack Query from a CMS or API.
const articles: Record<string, { title: string; content: string; date: string; author: string }> = {
  'introducing-zen-haven': {
    title: 'Introducing Zen Haven',
    date: '2025-01-15',
    author: 'Team Zen Haven',
    content:
      'Welcome to Zen Haven! We are excited to share our journey and vision with you. Stay tuned for more content soon.',
  },
  'web-performance-best-practices': {
    title: 'Web Performance Best Practices',
    date: '2025-02-10',
    author: 'Jane Doe',
    content:
      'Performance matters. In this article we explore techniques to improve your site’s Core Web Vitals and provide a great user experience.',
  },
  'accessibility-checklist': {
    title: 'Accessibility Checklist',
    date: '2025-03-05',
    author: 'John Smith',
    content:
      'Accessibility should never be an afterthought. Here is a practical checklist to ensure your websites can be used by everyone.',
  },
};

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const article = slug ? articles[slug] : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>
          {article ? `${article.title} – ${t('app.name')}` : t('pages.article.title')}
        </title>
        <meta
          name="description"
          content={article ? article.content.slice(0, 150) : t('pages.article.description')}
        />
        <link rel="canonical" href={`/blog/${slug || ''}`} />
      </Helmet>
      <Header />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {article ? (
            <article>
              <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
              <div className="mb-6 text-sm text-muted-foreground">
                <time dateTime={article.date}>{new Date(article.date).toLocaleDateString()}</time>
                {' · '}<span>{article.author}</span>
              </div>
              <p className="prose prose-slate dark:prose-invert max-w-none leading-relaxed mb-8">
                {article.content}
              </p>
              <Link to="/blog" className="text-primary hover:underline">
                ← Back to blog
              </Link>
            </article>
          ) : (
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold mb-4">{t('pages.notFound.title')}</h1>
              <p className="mb-4">{t('pages.notFound.description')}</p>
              <Link to="/blog" className="text-primary hover:underline">
                {t('components.header.portfolio')}
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}