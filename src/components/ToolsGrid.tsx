"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Image as ImageIcon, FileText, FileVideo, LayoutGrid, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const categories = [
    {
        title: "Video & Ses",
        icon: <Film className="w-6 h-6 text-blue-400" />,
        color: "from-blue-500/10 to-transparent",
        glow: "group-hover:shadow-blue-500/20 hover:border-blue-500/50",
        items: ["Video Dönüştürücü", "Ses Dönüştürücü", "MP3 Dönüştürücü", "MP4 ile MP3", "Video ile MP3", "MP4 Dönüştürücü", "MOV ile MP4", "MP3 ile OGG"]
    },
    {
        title: "Görüntü",
        icon: <ImageIcon className="w-6 h-6 text-emerald-400" />,
        color: "from-emerald-500/10 to-transparent",
        glow: "group-hover:shadow-emerald-500/20 hover:border-emerald-500/50",
        items: ["Görüntü Dönüştürücü", "WEBP ile PNG", "JFIF ile PNG", "PNG ile SVG", "HEIC ile JPG", "HEIC ile PNG", "WEBP ile JPG", "SVG Dönüştürücü"]
    },
    {
        title: "PDF & Belgeler",
        icon: <FileText className="w-6 h-6 text-rose-400" />,
        color: "from-rose-500/10 to-transparent",
        glow: "group-hover:shadow-rose-500/20 hover:border-rose-500/50",
        items: ["PDF Dönüştürücü", "Belge Dönüştürücü", "E-kitap Dönüştürücü", "PDF ile Word", "PDF ile JPG", "PDF ile EPUB", "EPUB ile PDF", "HEIC ile PDF", "DOCX ile PDF", "JPG ile PDF"]
    },
    {
        title: "GIF",
        icon: <FileVideo className="w-6 h-6 text-purple-400" />,
        color: "from-purple-500/10 to-transparent",
        glow: "group-hover:shadow-purple-500/20 hover:border-purple-500/50",
        items: ["Video ile GIF", "MP4 ile GIF", "WEBM ile GIF", "APNG ile GIF", "GIF ile MP4", "GIF ile APNG", "Görüntü ile GIF", "MOV ile GIF", "AVI ile GIF"]
    },
    {
        title: "Diğerleri",
        icon: <LayoutGrid className="w-6 h-6 text-amber-400" />,
        color: "from-amber-500/10 to-transparent",
        glow: "group-hover:shadow-amber-500/20 hover:border-amber-500/50",
        items: ["Birim Dönüştürücü", "Zaman Dönüştürücü", "Arşiv Dönüştürücü"]
    }
];

export function ToolsGrid() {
    const [searchTerm, setSearchTerm] = useState('');
    const locale = useLocale();

    const generateSlug = (text: string) => {
        return text.toLowerCase()
            .replace(/ /g, '-')
            .replace(/ü/g, 'u')
            .replace(/ö/g, 'o')
            .replace(/ı/g, 'i')
            .replace(/ç/g, 'c')
            .replace(/ş/g, 's')
            .replace(/ğ/g, 'g')
            .replace(/[^a-z0-9-]/g, '');
    };

    return (
        <div className="w-full flex flex-col gap-16 relative z-10">

            {/* Search Bar - Premium Glassmorphism */}
            <div className="w-full max-w-2xl mx-auto relative group z-20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-50 transition-opacity duration-700"></div>
                <div className="relative flex items-center bg-[#1C1C1E]/80 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-5 shadow-2xl transition-transform group-hover:scale-[1.02] duration-500">
                    <Search className="w-7 h-7 text-gray-400 mr-4" />
                    <input
                        type="text"
                        placeholder="Hangi aracı arıyorsunuz? (Örn: PDF ile Word)"
                        className="w-full bg-transparent border-none text-white text-xl focus:outline-none placeholder-gray-500 font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="text-gray-500 hover:text-white transition-colors text-sm font-bold bg-white/5 px-3 py-1 rounded-full">
                            TEMİZLE
                        </button>
                    )}
                </div>
            </div>

            {/* Masonry-style Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                {categories.map((category, idx) => {
                    const filteredItems = category.items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));

                    if (filteredItems.length === 0 && searchTerm !== '') return null;

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className={`flex flex-col bg-[#121214]/80 backdrop-blur-md border border-white/5 rounded-[2rem] overflow-hidden group transition-all duration-500 shadow-xl ${category.glow}`}
                        >
                            {/* Premium Card Header */}
                            <div className={`p-6 border-b border-white/5 bg-gradient-to-b ${category.color} relative overflow-hidden`}>
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="p-3 bg-black/40 rounded-2xl border border-white/10 shadow-inner backdrop-blur-sm">
                                        {category.icon}
                                    </div>
                                    <h2 className="text-xl font-bold text-white tracking-wide">{category.title}</h2>
                                </div>

                                {/* Decorative Background Icon */}
                                <div className="absolute -right-4 -bottom-4 opacity-[0.03] scale-150 transform rotate-12">
                                    {category.icon}
                                </div>
                            </div>

                            {/* Premium Link List */}
                            <div className="p-4 flex flex-col gap-1.5 h-full">
                                {filteredItems.map((item, itemIdx) => {
                                    const slug = generateSlug(item);
                                    return (
                                        <Link
                                            key={itemIdx}
                                            href={`/${locale}/tools/${slug}`}
                                            className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 group/item hover:shadow-lg"
                                        >
                                            <span className="font-semibold text-[15px]">{item}</span>
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300">
                                                <ArrowRight className="w-4 h-4 text-white" />
                                            </div>
                                        </Link>
                                    );
                                })}

                                {/* Boşluk doldurucu (Tasarım düzgün dursun diye) */}
                                <div className="flex-1"></div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {searchTerm && categories.every(c => c.items.filter(i => i.toLowerCase().includes(searchTerm.toLowerCase())).length === 0) && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="w-full py-20 flex flex-col items-center justify-center text-center"
                >
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <Search className="w-10 h-10 text-gray-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Sonuç Bulunamadı</h3>
                    <p className="text-gray-400">"{searchTerm}" için herhangi bir dönüştürücü aracı bulamadık.</p>
                </motion.div>
            )}
        </div>
    );
}