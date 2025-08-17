import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/i18n';

// Placeholder resources page. In a full implementation this would list
// downloadable assets, guides, or external links.
export default function Resources() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>{t('pages.resources.title')}</title>
        <meta name="description" content={t('pages.resources.description')} />
        <link rel="canonical" href="/resources" />
      </Helmet>
      <Header />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-bold mb-6">{t('pages.resources.title')}</h1>
          <p className="text-lg text-muted-foreground mb-8">{t('pages.resources.description')}</p>
          <p className="mb-6">Coming soon: curated resources, templates and tools to help you on your digital journey.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}