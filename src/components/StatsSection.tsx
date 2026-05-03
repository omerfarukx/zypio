"use client"

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion"
import { Download, ShieldCheck, Zap } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

function CountUpNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => {
    if (value >= 1000) {
      return Math.round(v).toLocaleString()
    }
    return Math.round(v).toString()
  })

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      })
      return controls.stop
    }
  }, [isInView, motionValue, value])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  )
}

export function StatsSection() {
  const t = useTranslations("Stats")

  const stats = [
    {
      icon: <Download className="w-8 h-8" />,
      value: 500000,
      suffix: "+",
      label: t("stat1Title"),
      description: t("stat1Desc"),
      gradient: "from-blue-500/20 to-blue-600/5",
      border: "border-blue-500/20",
      iconColor: "text-blue-400",
      glowColor: "group-hover:shadow-blue-500/10"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: 99,
      suffix: "%",
      label: t("stat2Title"),
      description: t("stat2Desc"),
      gradient: "from-purple-500/20 to-purple-600/5",
      border: "border-purple-500/20",
      iconColor: "text-purple-400",
      glowColor: "group-hover:shadow-purple-500/10"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      value: 100,
      suffix: "%",
      label: t("stat3Title"),
      description: t("stat3Desc"),
      gradient: "from-green-500/20 to-green-600/5",
      border: "border-green-500/20",
      iconColor: "text-green-400",
      glowColor: "group-hover:shadow-green-500/10"
    }
  ]

  return (
    <section className="w-full py-28 bg-gradient-to-b from-[#0F0F13] to-[#0A0A0C] border-t border-white/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/[0.04] rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/[0.04] rounded-full blur-[120px] translate-y-1/2 pointer-events-none" aria-hidden="true"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            Canlı İstatistikler
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">Rakamlar Kendini Konuşuyor</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className={`group flex flex-col items-center p-8 glass rounded-3xl transition-all duration-300 ${stat.glowColor} hover:shadow-2xl cursor-default`}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-6 border ${stat.border} ${stat.iconColor}`}
              >
                {stat.icon}
              </motion.div>

              <h3 className="text-5xl font-extrabold text-white mb-3 tracking-tight">
                <CountUpNumber value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-gray-400 font-medium text-center group-hover:text-gray-300 transition-colors">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
