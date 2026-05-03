"use client"

import { Zap, Shield, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
}

export function FeaturesSection() {
  const t = useTranslations("Features")

  const features = [
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Işık Hızında İşlem",
      description: "Özel sunucularımız sayesinde dönüştürme işlemleri saniyeler sürer. Beklemek yok, anında indirin.",
      gradient: "from-amber-500 to-orange-600",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
      glowColor: "hover:shadow-amber-500/10",
      borderHover: "hover:border-amber-500/30"
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "%100 Güvenli & Gizli",
      description: "Yüklediğiniz dosyalar şifrelenir ve işlem bittikten tam 1 saat sonra sunucularımızdan kalıcı olarak silinir.",
      gradient: "from-violet-500 to-purple-600",
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
      glowColor: "hover:shadow-violet-500/10",
      borderHover: "hover:border-violet-500/30"
    },
    {
      icon: <RefreshCw className="w-7 h-7" />,
      title: "Sınırsız Format",
      description: "Sadece YouTube değil; TikTok, X, Instagram ve 1000'den fazla platformu destekliyoruz. Her türlü format elinizin altında.",
      gradient: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      glowColor: "hover:shadow-emerald-500/10",
      borderHover: "hover:border-emerald-500/30"
    }
  ]

  return (
    <section className="w-full py-28 bg-[#0A0A0C] border-t border-white/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[100px] pointer-events-none" aria-hidden="true"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            Neden Biz?
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">{t("title")}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className={`relative p-8 rounded-3xl glass shimmer group transition-all duration-500 ${feature.borderHover} ${feature.glowColor} hover:shadow-2xl cursor-default`}
            >
              {/* Gradient accent line at top */}
              <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`w-14 h-14 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-7 ${feature.iconColor} transition-all duration-300`}
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
