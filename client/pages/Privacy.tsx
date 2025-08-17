import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/i18n';

export default function Privacy() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>{t('pages.privacy.title')}</title>
        <meta name="description" content={t('pages.privacy.description')} />
        <link rel="canonical" href="/privacy" />
      </Helmet>
      <Header />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert mx-auto max-w-4xl">
        <h1>{t('pages.privacy.title')}</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          We respect your privacy. This placeholder policy will be replaced with
          full details on what data we collect, how we use it and your rights.
        </p>
        <p>
          For now, know that we only use necessary cookies to deliver the
          website and we never sell your information.
        </p>
      </main>
      <Footer />
    </div>
  );
}