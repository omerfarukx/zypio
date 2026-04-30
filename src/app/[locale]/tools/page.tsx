import { getTranslations } from 'next-intl/server';
import { ToolsGrid } from '@/components/ToolsGrid';

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Index' });

    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-32 px-4 sm:px-8 w-full bg-[#0A0A0C] relative overflow-hidden">

            {/* Premium Glow Arka Plan Efektleri */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-600/10 rounded-[100%] blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-purple-600/10 rounded-[100%] blur-[150px] pointer-events-none"></div>

            <div className="max-w-[1500px] w-full mx-auto relative z-10">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-bold tracking-widest uppercase mb-8 shadow-lg backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Premium Araçlar Seti
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 mb-6 tracking-tight drop-shadow-2xl leading-tight">
                        Tüm Dosya Dönüştürücüler
                    </h1>
                    <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Video, ses, görüntü, PDF ve daha fazlası... İhtiyacınız olan tüm araçlar tek bir yerde, <span className="text-white drop-shadow-md">tamamen ücretsiz ve limitsiz.</span>
                    </p>
                </div>

                {/* Üst Reklam Alanı (970x90) */}
                <div className="w-full max-w-[970px] h-[90px] bg-[#1C1C1E]/80 backdrop-blur-md border border-white/10 border-dashed rounded-2xl hidden md:flex items-center justify-center text-gray-500 mb-20 mx-auto relative overflow-hidden group shadow-2xl transition-colors hover:border-blue-500/30">
                    <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold">Sponsorlu</span>
                    <span className="font-medium group-hover:text-blue-400 transition-colors tracking-wide">970x90 Premium Header Banner</span>
                </div>

                {/* Premium Etkileşimli Grid Bileşeni */}
                <ToolsGrid />

                {/* Alt Reklam Alanı (970x250) */}
                <div className="w-full max-w-[970px] h-[250px] bg-[#1C1C1E]/80 backdrop-blur-md border border-white/10 border-dashed rounded-3xl flex items-center justify-center text-gray-500 mt-32 mx-auto relative overflow-hidden group shadow-2xl transition-colors hover:border-purple-500/30">
                    <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold">Sponsorlu</span>
                    <span className="font-medium group-hover:text-purple-400 transition-colors tracking-wide">970x250 Premium Footer Billboard</span>
                </div>

            </div>
        </div>
    );
}