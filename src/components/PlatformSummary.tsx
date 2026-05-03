"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
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

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
        }
    })
}

export function PlatformSummary() {
    const t = useTranslations("PlatformSummary")
    const locale = useLocale()

    return (
        <section className="w-full py-28 bg-[#0A0A0C] border-t border-white/5 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" aria-hidden="true"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[100px] translate-y-1/2 pointer-events-none" aria-hidden="true"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        Desteklenen Platformlar
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">{t("title")}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t("subtitle")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.values(platforms).map((platform, idx) => (
                        <motion.div
                            key={platform.id}
                            custom={idx}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                        >
                            <Link href={`/${locale}/platform/${platform.id}`}>
                                <div className="h-full p-6 rounded-3xl glass shimmer group transition-all duration-500 hover:border-white/15 hover:shadow-2xl hover:shadow-blue-500/5 cursor-pointer">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: -5 }}
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${platform.bg} flex items-center justify-center mb-6 border ${platform.border} transition-all duration-300`}
                                    >
                                        {iconMap[platform.id]}
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                        {t(`${platform.id}Title`)}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                                        {t(`${platform.id}Desc`).substring(0, 80)}...
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                            {t(`${platform.id}Stats`)}
                                        </span>
                                        <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-all group-hover:translate-x-1 duration-300" />
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
