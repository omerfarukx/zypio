"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useTranslations } from "next-intl"

export function TestimonialsSection() {
    const t = useTranslations("Testimonials")

    const reviews = [
        {
            name: "Ahmet Yılmaz",
            role: t("r1Role"),
            content: t("r1Text"),
            rating: 5
        },
        {
            name: "Zeynep Kaya",
            role: t("r2Role"),
            content: t("r2Text"),
            rating: 5
        },
        {
            name: "Caner Demir",
            role: t("r3Role"),
            content: t("r3Text"),
            rating: 5
        }
    ]

    return (
        <section className="w-full py-24 bg-gradient-to-b from-[#0A0A0C] to-[#0F0F13] border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("title")}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.5 }}
                            className="bg-[#1C1C1E] p-8 rounded-3xl border border-white/5 relative group hover:border-purple-500/30 transition-colors"
                        >
                            <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5 group-hover:text-purple-500/10 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-8 relative z-10">
                                "{review.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white">
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
