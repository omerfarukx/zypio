"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FaYoutube, FaTiktok, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import Link from "next/link"
import { platforms } from "@/lib/platforms"
import { useTranslations, useLocale } from "next-intl"

// lucide-react yerine react-icons kullanarak tüm platform ikonlarını garantiliyoruz
const iconMap: Record<string, React.ReactNode> = {
    youtube: <FaYoutube className="w-7 h-7 text-red-500" />,
    tiktok: <FaTiktok className="w-6 h-6 text-pink-500" />,
    facebook: <FaFacebook className="w-6 h-6 text-blue-500" />,
    instagram: <FaInstagram className="w-7 h-7 text-purple-500" />,
    twitter: <FaTwitter className="w-6 h-6 text-gray-300" />
}

export function PlatformSummary() {
    const t = useTranslations("PlatformSummary")
    const locale = useLocale()

    return (
        <section className="w-full py-24 bg-[#0A0A0C] border-t border-white/5 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("title")}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.values(platforms).map((platform, idx) => (
                        <motion.div
                            key={platform.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                        >
                            <Link href={`/${locale}/platform/${platform.id}`}>
                                <div className={`h-full p-6 rounded-3xl bg-[#1C1C1E] border border-white/5 hover:border-white/20 transition-all group hover:-translate-y-1 cursor-pointer`}>
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${platform.bg} flex items-center justify-center mb-6 border ${platform.border}`}>
                                        {iconMap[platform.id]}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                        {platform.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                        {platform.description.substring(0, 80)}...
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                                            {platform.stats}
                                        </span>
                                        <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
