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
    <div className="flex flex-col flex-1 items-center justify-center font-sans w-full overflow-hidden noise-overlay">
      <main className="relative flex flex-1 w-full flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-8 mesh-gradient">
        {/* Animated Orbs */}
        <div className="orb orb-blue" aria-hidden="true"></div>
        <div className="orb orb-purple" aria-hidden="true"></div>
        <div className="orb orb-cyan" aria-hidden="true"></div>

        {/* Floating Particles */}
        <div className="particle particle-1" aria-hidden="true"></div>
        <div className="particle particle-2" aria-hidden="true"></div>
        <div className="particle particle-3" aria-hidden="true"></div>
        <div className="particle particle-4" aria-hidden="true"></div>
        <div className="particle particle-5" aria-hidden="true"></div>
        <div className="particle particle-6" aria-hidden="true"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 grid-pattern pointer-events-none" aria-hidden="true"></div>

        {/* Üst Reklam Alanı (Header Banner) */}
        <aside className="w-full hidden md:flex items-center justify-center z-10" aria-label="Header Advertisement">
          <Ad728x90 />
        </aside>
        <aside className="w-full max-w-[320px] h-[100px] flex md:hidden items-center justify-center text-gray-500 mb-8 relative group shadow-lg z-10" aria-label="Mobile Header Advertisement">
          <AdBanner />
        </aside>

        {/* Başlık ve Açıklama */}
        <header className="relative z-10 mb-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300 mb-8 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Türkiye&apos;nin #1 Medya İndirme Aracı</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.05] animate-slide-up animate-slide-up-delay-1">
            <span className="gradient-text-animated">
              {t('title')}
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl mx-auto animate-slide-up animate-slide-up-delay-2">
            {t('description')}
          </p>
        </header>

        <AdBanner />

        {/* 3 Kolonlu Ana Yapı: Sol Reklam | Dönüştürücü | Sağ Reklam */}
        <section className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-center relative z-10 animate-slide-up animate-slide-up-delay-3" aria-label="Converter Tool Area">

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