"use client"

import { motion } from "framer-motion"
import { Download, ShieldCheck, Zap } from "lucide-react"
import { useTranslations } from "next-intl"

export function StatsSection() {
  const t = useTranslations("Stats")

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[#0F0F13] to-[#0A0A0C] border-t border-white/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center p-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 flex items-center justify-center mb-6 border border-blue-500/20">
              <Download className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">{t("stat1Title")}</h3>
            <p className="text-gray-400 font-medium text-center">{t("stat1Desc")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center p-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/5 flex items-center justify-center mb-6 border border-purple-500/20">
              <Zap className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">{t("stat2Title")}</h3>
            <p className="text-gray-400 font-medium text-center">{t("stat2Desc")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center p-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/5 flex items-center justify-center mb-6 border border-green-500/20">
              <ShieldCheck className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">{t("stat3Title")}</h3>
            <p className="text-gray-400 font-medium text-center">{t("stat3Desc")}</p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
