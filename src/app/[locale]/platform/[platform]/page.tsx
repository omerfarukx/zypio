import { notFound } from 'next/navigation';
import { ConverterForm } from '@/components/ConverterForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { platforms } from '@/lib/platforms';
import { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string; platform: string }>;
}): Promise<Metadata> {
    const { platform } = await params;
    const data = platforms[platform as keyof typeof platforms];

    if (!data) return {};

    return {
        title: `${data.title} | Zypio Convert`,
        description: data.description,
        keywords: `${data.name} indir, ${data.name} video dönüştürücü, ${data.name} mp4 indir, ücretsiz ${data.name} indir`,
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

    const breadcrumbs = [
        { name: 'Araçlar', url: `/${locale}` },
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
                        "@type": "WebApplication",
                        "name": data.title,
                        "description": data.description,
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": "All"
                    })
                }}
            />

            <main className="relative flex flex-1 w-full flex-col items-center justify-start pt-28 pb-16 px-4 sm:px-8 bg-gradient-to-b from-[#0A0A0C] to-[#0F0F13]">
                {/* Glow Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-600/5 rounded-[100%] blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-4xl mx-auto">
                    <Breadcrumbs items={breadcrumbs} />

                    <div className="text-center mb-12">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1C1E] border border-white/10 text-gray-300 text-sm font-medium mb-6 hover:bg-white/5 transition-colors cursor-pointer group shadow-lg`}>
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${data.color} opacity-75`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 bg-${data.color}`}></span>
                            </span>
                            {data.stats}
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                                {data.title}
                            </span>
                        </h1>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            {data.description}
                        </p>
                    </div>

                    {/* Converter Form UI */}
                    <div className="w-full relative z-10 mb-20">
                        <ConverterForm />
                    </div>

                    {/* Usage Instructions / Info Section */}
                    <div className="bg-[#1C1C1E] rounded-3xl p-8 sm:p-12 border border-white/5 shadow-2xl">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Nasıl Kullanılır?</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {data.usage.map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xl mb-4 border border-blue-500/20">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                Limitsiz İndirme
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                Kalite Kaybı Yok
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                Her Cihazla Uyumlu
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}