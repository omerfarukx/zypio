"use client"

import { motion } from "framer-motion"
import { Copy, ArrowRight, Download } from "lucide-react"
import { useTranslations } from "next-intl"

export function HowItWorksSection() {
    const t = useTranslations("HowItWorks")

    const steps = [
        {
            icon: <Copy className="w-6 h-6 text-blue-400" />,
            title: t("step1Title"),
            description: t("step1Desc"),
            bg: "from-blue-500/20 to-blue-600/5",
            border: "border-blue-500/20"
        },
        {
            icon: <ArrowRight className="w-6 h-6 text-purple-400" />,
            title: t("step2Title"),
            description: t("step2Desc"),
            bg: "from-purple-500/20 to-purple-600/5",
            border: "border-purple-500/20"
        },
        {
            icon: <Download className="w-6 h-6 text-green-400" />,
            title: t("step3Title"),
            description: t("step3Desc"),
            bg: "from-green-500/20 to-green-600/5",
            border: "border-green-500/20"
        }
    ]

    return (
        <section className="w-full py-20 bg-[#0F0F13] border-t border-white/5 relative">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Bağlantı çizgisi (Sadece masaüstünde) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0"></div>

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.5 }}
                            className="relative z-10 flex flex-col items-center text-center p-6 bg-[#1C1C1E] rounded-3xl border border-white/5 shadow-xl"
                        >
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.bg} flex items-center justify-center mb-6 border ${step.border} shadow-lg`}>
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
