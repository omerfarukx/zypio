import { notFound } from 'next/navigation';
import { ConverterForm } from '@/components/ConverterForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { platforms } from '@/lib/platforms';
import { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Ad728x90 from '@/components/Ad728x90';
import AdNative from '@/components/AdNative';
import AdBanner from '@/components/AdBanner';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string; platform: string }>;
}): Promise<Metadata> {
    const { locale, platform } = await params;
    const data = platforms[platform as keyof typeof platforms];

    if (!data) return {};

    const t = await getTranslations({ locale, namespace: 'PlatformSummary' });

    // Güvenli çeviri çekimi
    const title = t.has(`${platform}Title`) ? t(`${platform}Title`) : data.title;
    const description = t.has(`${platform}Desc`) ? t(`${platform}Desc`) : data.description;

    return {
        title: `${title} | Zypio Convert`,
        description: description,
        keywords: `${data.name} video downloader, ${data.name} mp4, ${data.name} mp3, free ${data.name} converter, ${data.name} indir, ${data.name} video dönüştürücü`,
        openGraph: {
            title: `${title} | Zypio Convert`,
            description: description,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Zypio Convert`,
            description: description,
        }
    };
}

export default async function PlatformPage({
    params
}: {
    params: Promise<{ locale: string; platform: string }>;
}) {
    const { locale, platform } = await params;
    const data = platforms[platform as keyof typeof platforms];

    if (!data) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: 'PlatformSummary' });

    const localizedTitle = t.has(`${platform}Title`) ? t(`${platform}Title`) : data.title;
    const localizedDesc = t.has(`${platform}Desc`) ? t(`${platform}Desc`) : data.description;
    const localizedStats = t.has(`${platform}Stats`) ? t(`${platform}Stats`) : data.stats;

    const breadcrumbs = [
        { name: locale === 'tr' ? 'Araçlar' : 'Tools', url: `/${locale}` },
        { name: data.name, url: `/${locale}/platform/${platform}` }
    ];

    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans w-full overflow-hidden">
            {/* Schema Markup for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": localizedTitle,
                        "description": localizedDesc,
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": "All",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        }
                    })
                }}
            />

            <main className="relative flex flex-1 w-full flex-col items-center justify-start pt-28 pb-16 px-4 sm:px-8 bg-gradient-to-b from-[#0A0A0C] to-[#0F0F13]">
                {/* Glow Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-600/5 rounded-[100%] blur-[100px] pointer-events-none" aria-hidden="true"></div>

                <article className="relative z-10 w-full max-w-4xl mx-auto">
                    <Breadcrumbs items={breadcrumbs} />

                    <header className="text-center mb-12">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1C1E] border border-white/10 text-gray-300 text-sm font-medium mb-6 hover:bg-white/5 transition-colors cursor-pointer group shadow-lg`}>
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${data.color} opacity-75`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 bg-${data.color}`}></span>
                            </span>
                            {localizedStats}
                        </div>

                        <AdBanner />

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight mt-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                                {localizedTitle}
                            </span>
                        </h1>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            {localizedDesc}
                        </p>
                    </header>

                    {/* Converter Form UI */}
                    <section className="w-full relative z-10 mb-8" aria-label="Converter Form">
                        <ConverterForm activeContext={platform} />
                    </section>

                    <AdNative />

                    {/* Usage Instructions / Info Section */}
                    <section className="bg-[#1C1C1E] rounded-3xl p-8 sm:p-12 border border-white/5 shadow-2xl mt-8" aria-label="How to use">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">{locale === 'tr' ? 'Nasıl Kullanılır?' : 'How It Works?'}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {data.usage.map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xl mb-4 border border-blue-500/20" aria-hidden="true">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                                {locale === 'tr' ? 'Limitsiz İndirme' : 'Unlimited Downloads'}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                                {locale === 'tr' ? 'Kalite Kaybı Yok' : 'No Quality Loss'}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                                {locale === 'tr' ? 'Her Cihazla Uyumlu' : 'Compatible with All Devices'}
                            </div>
                        </div>
                    </section>
                </article>

                {/* Alt Banner (Footer Billboard) */}
                <aside className="w-full hidden lg:flex items-center justify-center mt-12 relative z-50 mx-auto" aria-label="Footer Advertisement">
                    <Ad728x90 />
                </aside>
            </main>
        </div>
    );
}