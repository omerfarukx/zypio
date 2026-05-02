import { getTranslations } from 'next-intl/server';
import { ConverterForm } from '@/components/ConverterForm';
import { FeaturesSection } from '@/components/FeaturesSection';
import { StatsSection } from '@/components/StatsSection';
import { FAQSection } from '@/components/FAQSection';
import { PlatformSummary } from '@/components/PlatformSummary';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import Ad728x90 from '@/components/Ad728x90';
import Ad160x600 from '@/components/Ad160x600';
import AdNative from '@/components/AdNative';
import AdBanner from '@/components/AdBanner';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans w-full overflow-hidden">
      <main className="relative flex flex-1 w-full flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-8 bg-gradient-to-b from-[#0A0A0C] to-[#0F0F13]">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-600/10 rounded-[100%] blur-[100px] pointer-events-none" aria-hidden="true"></div>

        {/* Üst Reklam Alanı (Header Banner) */}
        <aside className="w-full hidden md:flex items-center justify-center z-10" aria-label="Header Advertisement">
          <Ad728x90 />
        </aside>
        <aside className="w-full max-w-[320px] h-[100px] bg-[#1C1C1E] border border-white/10 border-dashed rounded-xl flex md:hidden items-center justify-center text-gray-500 mb-8 relative group shadow-lg z-10" aria-label="Mobile Header Advertisement">
          <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold" aria-hidden="true">{t('adLabel')}</span>
          <span className="font-medium group-hover:text-blue-400 transition-colors">{t('adMobile')}</span>
        </aside>

        {/* Başlık ve Açıklama */}
        <header className="relative z-10 mb-8 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              {t('title')}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            {t('description')}
          </p>
        </header>

        <AdBanner />

        {/* 3 Kolonlu Ana Yapı: Sol Reklam | Dönüştürücü | Sağ Reklam */}
        <section className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-center relative z-10" aria-label="Converter Tool Area">

          {/* Sol Sticky Sidebar Reklamı */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-28 w-[160px] xl:w-[300px]" aria-label="Left Sidebar Advertisement">
            <Ad160x600 />
          </aside>

          {/* Ana Dönüştürücü Form */}
          <article className="flex-1 w-full max-w-3xl mx-auto">
            <ConverterForm />

            {/* Form Altı Native Reklam */}
            <aside className="w-full mt-8" aria-label="In-Feed Advertisement">
              <AdNative />
            </aside>
          </article>

          {/* Sağ Sticky Sidebar Reklamı */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-28 w-[160px] xl:w-[300px]" aria-label="Right Sidebar Advertisement">
            <Ad160x600 />
          </aside>

        </section>

        {/* Alt Banner (Footer Billboard) */}
        <aside className="w-full hidden lg:flex items-center justify-center mt-12 relative z-50 mx-auto" aria-label="Footer Advertisement">
          <Ad728x90 />
        </aside>
      </main>

      {/* Sayfa Altı Ekstra Native Reklam - Güvenli Alan */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 mt-12">
        <AdNative />
      </div>

      <PlatformSummary />
      <Ad728x90 />
      <HowItWorksSection />
      <AdNative />
      <StatsSection />
      <Ad728x90 />
      <section id="features" className="w-full" aria-label="Features Section">
        <FeaturesSection />
      </section>
      <AdNative />
      <TestimonialsSection />
      <Ad728x90 />
      <FAQSection />
      <AdNative />
    </div>
  );
}