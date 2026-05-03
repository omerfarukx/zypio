"use client"

import { motion } from "framer-motion"
import { Copy, Settings, Download } from "lucide-react"
import { useTranslations } from "next-intl"

const stepVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  })
}

export function HowItWorksSection() {
    const t = useTranslations("HowItWorks")

    const steps = [
        {
            icon: <Copy className="w-6 h-6" />,
            title: t("step1Title"),
            description: t("step1Desc"),
            gradient: "from-blue-500 to-blue-600",
            iconBg: "from-blue-500/20 to-blue-600/5",
            border: "border-blue-500/20",
            iconColor: "text-blue-400",
            number: "01"
        },
        {
            icon: <Settings className="w-6 h-6" />,
            title: t("step2Title"),
            description: t("step2Desc"),
            gradient: "from-purple-500 to-purple-600",
            iconBg: "from-purple-500/20 to-purple-600/5",
            border: "border-purple-500/20",
            iconColor: "text-purple-400",
            number: "02"
        },
        {
            icon: <Download className="w-6 h-6" />,
            title: t("step3Title"),
            description: t("step3Desc"),
            gradient: "from-green-500 to-green-600",
            iconBg: "from-green-500/20 to-green-600/5",
            border: "border-green-500/20",
            iconColor: "text-green-400",
            number: "03"
        }
    ]

    return (
        <section className="w-full py-28 bg-[#0F0F13] border-t border-white/5 relative overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 grid-pattern pointer-events-none opacity-50" aria-hidden="true"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        3 Kolay Adım
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">{t("title")}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t("subtitle")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connection line (Desktop only) */}
                    <div className="hidden md:block absolute top-[72px] left-[16%] right-[16%] z-0">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
                            className="h-px bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-green-500/40 origin-left"
                        />
                    </div>

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            custom={idx}
                            variants={stepVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                            className="relative z-10 flex flex-col items-center text-center p-8 glass rounded-3xl group transition-all duration-300 cursor-default"
                        >
                            {/* Step number */}
                            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                                {step.number}
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.iconBg} flex items-center justify-center mb-6 border ${step.border} shadow-lg ${step.iconColor} transition-all duration-300`}
                            >
                                {step.icon}
                            </motion.div>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{step.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
