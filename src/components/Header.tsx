"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, Globe, Download, Play, Music, Image as ImageIcon, LayoutGrid } from "lucide-react"
import { Logo } from "./Logo"
import { useTranslations, useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/routing"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const t = useTranslations("Header")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageSwitch = () => {
    const nextLocale = locale === "tr" ? "en" : "tr"
    router.replace(pathname, { locale: nextLocale })
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-[#0A0A0C]/90 backdrop-blur-lg border-b border-white/5 py-3 shadow-lg shadow-black/50"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-blue-500/20" />
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Zypio
          </span>
        </a>

        {/* Desktop Nav (>1024px) */}
        <nav className="hidden lg:flex items-center gap-8">

          {/* Mega Menu - Araçlar */}
          <div
            className="relative group"
            onMouseEnter={() => setActiveDropdown('tools')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors py-2">
              Araçlarımız <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'tools' && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-[#1C1C1E]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl grid grid-cols-2 gap-6"
                >
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Video & Ses</h4>
                    <div className="flex flex-col gap-2">
                      <a href={`/${locale}/platform/youtube`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item">
                        <div className="p-2 bg-red-500/10 text-red-500 rounded-lg group-hover/item:bg-red-500 group-hover/item:text-white transition-colors"><Play className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5">YouTube Dönüştürücü</div>
                          <div className="text-xs text-gray-400">Videoları MP4 ve MP3 yap.</div>
                        </div>
                      </a>
                      <a href={`/${locale}/platform/tiktok`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item">
                        <div className="p-2 bg-black/50 text-white rounded-lg border border-white/10 group-hover/item:bg-white group-hover/item:text-black transition-colors"><Music className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5">TikTok İndirici</div>
                          <div className="text-xs text-gray-400">Filigransız MP4 indir.</div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Görsel & Fotoğraf</h4>
                    <div className="flex flex-col gap-2">
                      <a href={`/${locale}/platform/instagram-photo`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item">
                        <div className="p-2 bg-pink-500/10 text-pink-500 rounded-lg group-hover/item:bg-pink-500 group-hover/item:text-white transition-colors"><ImageIcon className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5">Instagram Fotoğraf İndirici</div>
                          <div className="text-xs text-gray-400">Çoklu gönderileri indir.</div>
                        </div>
                      </a>
                      <a href={`/${locale}/platform/tiktok-photo`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item">
                        <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors"><Download className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5">TikTok Fotoğraf İndirici</div>
                          <div className="text-xs text-gray-400">Kaydırmalı resimleri indir.</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href={`/${locale}/tools`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2">Tüm Araçlar</a>
          <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2">{t("features")}</a>
          <a href="#faq" className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2">{t("faq")}</a>

          <div className="w-px h-5 bg-white/10 mx-2"></div>

          <button
            onClick={handleLanguageSwitch}
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5"
          >
            <Globe className="w-4 h-4" />
            {locale === "tr" ? "English" : "Türkçe"}
          </button>
        </nav>

        {/* Mobile Toggle (<1024px) */}
        <button
          className="lg:hidden p-2 text-gray-400 hover:text-white bg-white/5 rounded-xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer (<1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#0A0A0C]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Araçlarımız</span>
                <a href={`/${locale}/platform/youtube`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform"><Play className="w-5 h-5 text-red-500" /> YouTube Dönüştürücü</a>
                <a href={`/${locale}/platform/tiktok`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform"><Music className="w-5 h-5 text-gray-300" /> TikTok İndirici</a>
                <a href={`/${locale}/platform/instagram-photo`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform"><ImageIcon className="w-5 h-5 text-pink-500" /> Instagram Fotoğraf İndirici</a>
                <a href={`/${locale}/platform/tiktok-photo`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform"><ImageIcon className="w-5 h-5 text-blue-400" /> TikTok Fotoğraf İndirici</a>
                <a href={`/${locale}/tools`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform"><LayoutGrid className="w-5 h-5 text-blue-400" /> Tüm Dönüştürücü Araçlar</a>
              </div>

              <div className="w-full h-px bg-white/10"></div>

              <button
                onClick={handleLanguageSwitch}
                className="flex items-center justify-center gap-2 p-4 bg-blue-600 rounded-xl text-white font-bold active:scale-95 transition-transform"
              >
                <Globe className="w-5 h-5" />
                {locale === "tr" ? "Switch to English" : "Türkçe'ye Geç"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
