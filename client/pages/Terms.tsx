import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/i18n';

export default function Terms() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>{t('pages.terms.title')}</title>
        <meta name="description" content={t('pages.terms.description')} />
        <link rel="canonical" href="/terms" />
      </Helmet>
      <Header />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert mx-auto max-w-4xl">
        <h1>{t('pages.terms.title')}</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          These Terms of Service govern your use of our website. By using our
          site you agree to these terms. This placeholder will be replaced
          with full terms and conditions in a future iteration.
        </p>
      </main>
      <Footer />
    </div>
  );
}