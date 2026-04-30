import { getTranslations } from 'next-intl/server';
import { ConverterForm } from '@/components/ConverterForm';
import { FeaturesSection } from '@/components/FeaturesSection';
import { StatsSection } from '@/components/StatsSection';
import { FAQSection } from '@/components/FAQSection';
import { PlatformSummary } from '@/components/PlatformSummary';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans w-full overflow-hidden">
      {/* Hero Section */}
      <main className="relative flex flex-1 w-full flex-col items-center justify-center py-28 px-4 sm:px-8 sm:items-center text-center bg-gradient-to-b from-[#0A0A0C] to-[#0F0F13]">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-600/10 rounded-[100%] blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 mb-12 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1C1E] border border-white/10 text-gray-300 text-sm font-medium mb-8 hover:bg-white/5 transition-colors cursor-pointer group shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {t('systemStatus')}
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              {t('title')}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-12">
            {t('description')}
          </p>
        </div>

        <div className="w-full relative z-10 flex justify-center mt-8">
          <a href={`/${locale}/download`} className="px-10 py-5 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-xl shadow-green-600/30 flex items-center gap-3 group">
            Hemen Ücretsiz Başla
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </main>

      {/* Platform Summary Section */}
      <PlatformSummary />

      {/* How it works Section */}
      <HowItWorksSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <div id="features" className="w-full">
        <FeaturesSection />
      </div>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
