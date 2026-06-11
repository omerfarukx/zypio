"use client"

import { Globe, Video, FileText, Music, Image as ImageIcon, Heart } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/routing"

export function Footer() {
  const t = useTranslations("Footer")
  const locale = useLocale()
  const tr = locale === "tr"

  return (
    <footer className="w-full py-16 bg-[#0A0A0C] border-t border-white/5 relative overflow-hidden">
      {/* Gradient line at the top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              Zypio Convert
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
              {t("desc")}
            </p>
            {/* Social-like decorative dots */}
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-500/20 transition-all duration-300 cursor-pointer group">
                <div className="w-3 h-3 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors"></div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-purple-500/10 hover:border-purple-500/20 transition-all duration-300 cursor-pointer group">
                <div className="w-3 h-3 rounded-full bg-gray-600 group-hover:bg-purple-400 transition-colors"></div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-pink-500/10 hover:border-pink-500/20 transition-all duration-300 cursor-pointer group">
                <div className="w-3 h-3 rounded-full bg-gray-600 group-hover:bg-pink-400 transition-colors"></div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t("tools")}</h4>
            <ul className="space-y-3">
              <li><Link href="/tools/video-donusturucu" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2.5 group"><Video className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" /> Video Dönüştürücü</Link></li>
              <li><Link href="/tools/ses-donusturucu" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2.5 group"><Music className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition-colors" /> Ses Dönüştürücü</Link></li>
              <li><Link href="/tools/gorsel-donusturucu" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2.5 group"><ImageIcon className="w-4 h-4 text-gray-600 group-hover:text-green-400 transition-colors" /> Görsel Dönüştürücü</Link></li>
              <li><Link href="/tools/belge-donusturucu" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2.5 group"><FileText className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors" /> Belge Dönüştürücü</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{tr ? "Keşfet" : "Discover"}</h4>
            <ul className="space-y-3">
              <li><Link href="/what-is-zypio" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">{tr ? "Zypio Nedir?" : "What is Zypio?"}</Link></li>
              <li><Link href="/use-cases" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">{tr ? "Kullanım Senaryoları" : "Use Cases"}</Link></li>
              <li><Link href="/compare" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">{tr ? "Karşılaştırma" : "Compare"}</Link></li>
              <li><Link href="/tools" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">{tr ? "Tüm Araçlar" : "All Tools"}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{tr ? "Kaynaklar" : "Resources"}</h4>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Blog</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">{tr ? "SSS" : "FAQ"}</Link></li>
              <li><a href="/llms.txt" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">llms.txt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t("legal")}</h4>
            <ul className="space-y-3">
              <li><Link href="/legal/terms" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">{t("terms")}</Link></li>
              <li><Link href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">{t("privacy")}</Link></li>
              <li><Link href="/legal/dmca" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">{t("dmca")}</Link></li>
              <li><a href="mailto:contact@zypio.online" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">{t("contact")}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            © {new Date().getFullYear()} Zypio Convert. {t("rights")}
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1.5">
            Türkiye&apos;de <Heart className="w-3 h-3 text-red-500/60 fill-red-500/60" /> ile yapıldı
          </p>
        </div>
      </div>
    </footer>
  )
}
