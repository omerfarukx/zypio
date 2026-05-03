"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

export function FAQSection() {
  const t = useTranslations("FAQ")
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: t("q1"),
      answer: t("a1")
    },
    {
      question: t("q2"),
      answer: t("a2")
    },
    {
      question: t("q3"),
      answer: t("a3")
    },
    {
      question: t("q4"),
      answer: t("a4")
    },
    {
      question: t("q5"),
      answer: t("a5")
    }
  ]

  return (
    <section id="faq" className="w-full py-28 bg-[#0A0A0C] border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/[0.02] rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            SSS
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">{t("title")}</h2>
          <p className="text-gray-400 text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? 'border-blue-500/20 shadow-lg shadow-blue-500/5'
                  : 'hover:border-white/15'
              }`}
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset rounded-2xl group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-white text-lg pr-4 group-hover:text-blue-300 transition-colors">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${openIndex === index ? 'text-blue-400' : 'text-gray-500'}`} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="w-12 h-px bg-gradient-to-r from-blue-500/40 to-transparent mb-4"></div>
                      <p className="text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
