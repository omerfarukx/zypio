import { getTranslations } from 'next-intl/server';
import { Film, Image as ImageIcon, FileText, FileVideo, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Index' });

    // Görseldeki tüm kategoriler ve dönüştürücü tipleri
    const categories = [
        {
            title: "Video & Ses",
            icon: <Film className="w-5 h-5 text-blue-400" />,
            items: ["Video Dönüştürücü", "Ses Dönüştürücü", "MP3 Dönüştürücü", "MP4 ile MP3", "Video ile MP3", "MP4 Dönüştürücü", "MOV ile MP4", "MP3 ile OGG"]
        },
        {
            title: "Görüntü",
            icon: <ImageIcon className="w-5 h-5 text-green-400" />,
            items: ["Görüntü Dönüştürücü", "WEBP ile PNG", "JFIF ile PNG", "PNG ile SVG", "HEIC ile JPG", "HEIC ile PNG", "WEBP ile JPG", "SVG Dönüştürücü"]
        },
        {
            title: "PDF & Belgeler",
            icon: <FileText className="w-5 h-5 text-red-400" />,
            items: ["PDF Dönüştürücü", "Belge Dönüştürücü", "E-kitap Dönüştürücü", "PDF ile Word", "PDF ile JPG", "PDF ile EPUB", "EPUB ile PDF", "HEIC ile PDF", "DOCX ile PDF", "JPG ile PDF"]
        },
        {
            title: "GIF",
            icon: <FileVideo className="w-5 h-5 text-purple-400" />,
            items: ["Video ile GIF", "MP4 ile GIF", "WEBM ile GIF", "APNG ile GIF", "GIF ile MP4", "GIF ile APNG", "Görüntü ile GIF", "MOV ile GIF", "AVI ile GIF"]
        },
        {
            title: "Diğerleri",
            icon: <LayoutGrid className="w-5 h-5 text-gray-400" />,
            items: ["Birim Dönüştürücü", "Zaman Dönüştürücü", "Arşiv Dönüştürücü"]
        }
    ];

    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-32 px-6 sm:px-12 w-full bg-[#0A0A0C]">
            <div className="max-w-7xl w-full mx-auto">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Tüm Dosya Dönüştürücüler
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Video, ses, görüntü, PDF ve daha fazlası... İhtiyacınız olan tüm dosya dönüştürme araçları tek bir yerde, tamamen ücretsiz ve sınırsız.
                    </p>
                </div>

                {/* Üst Reklam Alanı (970x90) */}
                <div className="w-full max-w-[970px] h-[90px] bg-[#1C1C1E] border border-white/10 border-dashed rounded-xl hidden md:flex items-center justify-center text-gray-500 mb-16 mx-auto relative overflow-hidden group shadow-lg">
                    <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold">Reklam</span>
                    <span className="font-medium group-hover:text-blue-400 transition-colors">970x90 Header Banner</span>
                </div>

                {/* 5 Kolonlu Grid Yapısı (Görseldeki gibi) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-12">
                    {categories.map((category, idx) => (
                        <div key={idx} className="flex flex-col">
                            {/* Kategori Başlığı ve İkonu */}
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                                {category.icon}
                                <h2 className="text-lg font-bold text-white">{category.title}</h2>
                            </div>

                            {/* Link Listesi */}
                            <ul className="flex flex-col gap-4">
                                {category.items.map((item, itemIdx) => {
                                    const slug = item.toLowerCase()
                                        .replace(/ /g, '-')
                                        .replace(/ü/g, 'u')
                                        .replace(/ö/g, 'o')
                                        .replace(/ı/g, 'i')
                                        .replace(/ç/g, 'c')
                                        .replace(/ş/g, 's')
                                        .replace(/ğ/g, 'g')
                                        .replace(/[^a-z0-9-]/g, '');

                                    return (
                                        <li key={itemIdx}>
                                            <Link href={`/${locale}/tools/${slug}`} className="text-gray-400 hover:text-white hover:underline transition-colors text-[15px] font-medium">
                                                {item}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Alt Reklam Alanı (970x250) */}
                <div className="w-full max-w-[970px] h-[250px] bg-[#1C1C1E] border border-white/10 border-dashed rounded-xl flex items-center justify-center text-gray-500 mt-24 mx-auto relative overflow-hidden group shadow-lg">
                    <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold">Reklam</span>
                    <span className="font-medium group-hover:text-blue-400 transition-colors">970x250 Footer Billboard</span>
                </div>

            </div>
        </div>
    );
}