"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useTranslations } from "next-intl"

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
        }
    })
}

export function TestimonialsSection() {
    const t = useTranslations("Testimonials")

    const reviews = [
        {
            name: "Ahmet Yılmaz",
            role: t("r1Role"),
            content: t("r1Text"),
            rating: 5,
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            name: "Zeynep Kaya",
            role: t("r2Role"),
            content: t("r2Text"),
            rating: 5,
            gradient: "from-purple-500 to-pink-500"
        },
        {
            name: "Caner Demir",
            role: t("r3Role"),
            content: t("r3Text"),
            rating: 5,
            gradient: "from-orange-500 to-red-500"
        }
    ]

    return (
        <section className="w-full py-28 bg-gradient-to-b from-[#0A0A0C] to-[#0F0F13] border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-purple-600/[0.03] rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        Kullanıcı Yorumları
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">{t("title")}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t("subtitle")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={idx}
                            custom={idx}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="glass p-8 rounded-3xl relative group hover:border-purple-500/20 transition-all duration-500 cursor-default shimmer"
                        >
                            {/* Gradient accent */}
                            <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${review.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />

                            <Quote className="absolute top-6 right-6 w-10 h-10 text-white/[0.03] group-hover:text-purple-500/10 transition-colors duration-500" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.15 + i * 0.05, duration: 0.3 }}
                                    >
                                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                    </motion.div>
                                ))}
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-8 relative z-10 group-hover:text-gray-200 transition-colors">
                                &ldquo;{review.content}&rdquo;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${review.gradient} flex items-center justify-center font-bold text-white text-sm shadow-lg`}>
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">{review.name}</h4>
                                    <p className="text-xs text-gray-500">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
