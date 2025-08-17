import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/i18n';

export default function Accessibility() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>{t('pages.accessibility.title')}</title>
        <meta name="description" content={t('pages.accessibility.description')} />
        <link rel="canonical" href="/accessibility" />
      </Helmet>
      <Header />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert mx-auto max-w-4xl">
        <h1>{t('pages.accessibility.title')}</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          Zen Haven is committed to making our website accessible to as many
          users as possible, regardless of ability or technology. This
          statement outlines our ongoing efforts to improve accessibility and
          meet WCAG 2.2 AA guidelines.
        </p>
        <h2>Our Commitment</h2>
        <p>
          We strive to ensure our content is perceivable, operable,
          understandable and robust. We regularly audit our site using
          automated tools and manual testing with assistive technologies.
        </p>
        <h2>Feedback</h2>
        <p>
          If you encounter any accessibility barriers please contact us at
          <a href="mailto:accessibility@zenhaven.dev"> accessibility@zenhaven.dev</a>.
          We will make every reasonable effort to fix issues promptly.
        </p>
      </main>
      <Footer />
    </div>
  );
}