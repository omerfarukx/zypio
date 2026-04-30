import { getTranslations } from 'next-intl/server';
import { ConverterForm } from '@/components/ConverterForm';

export default async function DownloadPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Index' });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-28 px-4 w-full bg-[#0A0A0C]">

            {/* Üst Reklam Alanı (728x90 Desktop, 320x100 Mobil) */}
            <div className="w-full max-w-[728px] h-[90px] bg-[#1C1C1E] border border-white/10 border-dashed rounded-xl hidden md:flex items-center justify-center text-gray-500 mb-8 mx-auto relative overflow-hidden group shadow-lg">
                <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold">Reklam</span>
                <span className="font-medium group-hover:text-blue-400 transition-colors">728x90 Header Banner</span>
            </div>
            <div className="w-full max-w-[320px] h-[100px] bg-[#1C1C1E] border border-white/10 border-dashed rounded-xl flex md:hidden items-center justify-center text-gray-500 mb-8 mx-auto relative overflow-hidden group shadow-lg">
                <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold">Reklam</span>
                <span className="font-medium group-hover:text-blue-400 transition-colors">320x100 Mobil Banner</span>
            </div>

            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

                {/* Sol Sticky Sidebar Reklamı (300x250) */}
                <div className="hidden lg:flex flex-col gap-6 sticky top-28">
                    <div className="w-[300px] h-[250px] bg-[#1C1C1E] border border-white/10 border-dashed rounded-xl flex items-center justify-center text-gray-500 relative overflow-hidden group shadow-lg">
                        <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold">Reklam</span>
                        <span className="font-medium group-hover:text-blue-400 transition-colors">300x250 Sidebar 1</span>
                    </div>
                    <div className="w-[300px] h-[250px] bg-[#1C1C1E] border border-white/10 border-dashed rounded-xl flex items-center justify-center text-gray-500 relative overflow-hidden group shadow-lg">
                        <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold">Reklam</span>
                        <span className="font-medium group-hover:text-blue-400 transition-colors">300x250 Sidebar 2</span>
                    </div>
                </div>

                {/* Ana Dönüştürücü Alanı */}
                <div className="flex-1 w-full max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Ücretsiz Video İndirici</h1>
                        <p className="text-gray-400 text-lg">Videonuzu anında indirin, istediğiniz kaliteyi seçin. Reklamsız ve güvenli.</p>
                    </div>

                    <ConverterForm />

                    {/* Native İçerik Reklamı (İçerik arasına serpiştirilmiş) */}
                    <div className="w-full h-[250px] bg-[#1C1C1E] border border-white/10 border-dashed rounded-xl flex items-center justify-center text-gray-500 mt-12 mb-8 relative overflow-hidden group shadow-lg">
                        <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold">Sponsorlu İçerik</span>
                        <span className="font-medium group-hover:text-blue-400 transition-colors">Native In-Feed Reklam Alanı</span>
                    </div>
                </div>

                {/* Sağ Sticky Sidebar Reklamı (160x600) */}
                <div className="hidden xl:flex w-[160px] h-[600px] bg-[#1C1C1E] border border-white/10 border-dashed rounded-xl items-center justify-center text-gray-500 sticky top-28 relative overflow-hidden group shadow-lg">
                    <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold">Reklam</span>
                    <span className="font-medium text-center px-4 group-hover:text-blue-400 transition-colors">160x600 Skyscraper Banner</span>
                </div>

            </div>

            {/* Alt Footer Reklam Alanı (970x250) */}
            <div className="w-full max-w-[970px] h-[250px] bg-[#1C1C1E] border border-white/10 border-dashed rounded-xl flex items-center justify-center text-gray-500 mt-16 mx-auto hidden lg:flex relative overflow-hidden group shadow-lg">
                <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold">Reklam</span>
                <span className="font-medium group-hover:text-blue-400 transition-colors">970x250 Footer Billboard</span>
            </div>

        </div>
    );
}