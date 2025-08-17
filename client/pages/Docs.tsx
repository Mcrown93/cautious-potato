import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/i18n';

export default function Docs() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>{t('pages.docs.title')}</title>
        <meta name="description" content={t('pages.docs.description')} />
        <link rel="canonical" href="/docs" />
      </Helmet>
      <Header />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-bold mb-6">{t('pages.docs.title')}</h1>
          <p className="text-lg text-muted-foreground mb-8">{t('pages.docs.description')}</p>
          <p>Our documentation will be available soon. Stay tuned!</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}