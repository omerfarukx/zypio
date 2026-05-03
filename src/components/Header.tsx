"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, Globe, Download, Play, Music, Image as ImageIcon, LayoutGrid, Share2, MessageSquare } from "lucide-react"
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
      aria-label="Main Navigation"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group" aria-label="Zypio Home">
          <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-blue-500/20" aria-hidden="true" />
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Zypio
          </span>
        </a>

        {/* Desktop Nav (>1024px) */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Desktop Navigation">

          {/* Mega Menu - Araçlar */}
          <div
            className="relative group"
            onMouseEnter={() => setActiveDropdown('tools')}
            onMouseLeave={() => setActiveDropdown(null)}
            onFocus={() => setActiveDropdown('tools')}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setActiveDropdown(null)
              }
            }}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              aria-expanded={activeDropdown === 'tools'}
              aria-haspopup="true"
            >
              Araçlarımız <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            <AnimatePresence>
              {activeDropdown === 'tools' && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[1000px] bg-[#1C1C1E]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl grid grid-cols-3 gap-6"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4" id="menu-video-audio">Video & Ses Araçları</h4>
                    <div className="flex flex-col gap-2" role="group" aria-labelledby="menu-video-audio">
                      <a href={`/${locale}/platform/youtube`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" role="menuitem">
                        <div className="p-2 bg-red-500/10 text-red-500 rounded-lg group-hover/item:bg-red-500 group-hover/item:text-white transition-colors shadow-lg" aria-hidden="true"><Play className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5 group-hover/item:text-blue-400 transition-colors">YouTube İndirici</div>
                          <div className="text-xs text-gray-400">Videoları MP4 ve MP3 yap.</div>
                        </div>
                      </a>
                      <a href={`/${locale}/platform/tiktok`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" role="menuitem">
                        <div className="p-2 bg-gray-500/10 text-gray-300 rounded-lg border border-white/5 group-hover/item:bg-gray-200 group-hover/item:text-black transition-colors shadow-lg" aria-hidden="true"><Music className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5 group-hover/item:text-blue-400 transition-colors">TikTok İndirici</div>
                          <div className="text-xs text-gray-400">Filigransız MP4 indir.</div>
                        </div>
                      </a>
                      <a href={`/${locale}/platform/facebook`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" role="menuitem">
                        <div className="p-2 bg-blue-600/10 text-blue-500 rounded-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors shadow-lg" aria-hidden="true"><Share2 className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5 group-hover/item:text-blue-400 transition-colors">Facebook İndirici</div>
                          <div className="text-xs text-gray-400">HD kalitede FB videoları.</div>
                        </div>
                      </a>
                      <a href={`/${locale}/platform/twitter`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" role="menuitem">
                        <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg group-hover/item:bg-sky-500 group-hover/item:text-white transition-colors shadow-lg" aria-hidden="true"><MessageSquare className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5 group-hover/item:text-blue-400 transition-colors">X (Twitter) İndirici</div>
                          <div className="text-xs text-gray-400">Twitter videoları ve GIF'ler.</div>
                        </div>
                      </a>
                      <a href={`/${locale}/platform/instagram`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" role="menuitem">
                        <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg group-hover/item:bg-gradient-to-tr group-hover/item:from-yellow-500 group-hover/item:via-pink-500 group-hover/item:to-purple-500 group-hover/item:text-white transition-colors shadow-lg" aria-hidden="true"><Play className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5 group-hover/item:text-blue-400 transition-colors">Instagram Reels</div>
                          <div className="text-xs text-gray-400">IGTV ve Reels videoları.</div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4" id="menu-photo">Görsel & Fotoğraf Araçları</h4>
                    <div className="flex flex-col gap-2" role="group" aria-labelledby="menu-photo">
                      <a href={`/${locale}/platform/instagram-photo`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" role="menuitem">
                        <div className="p-2 bg-pink-500/10 text-pink-500 rounded-lg group-hover/item:bg-gradient-to-tr group-hover/item:from-yellow-500 group-hover/item:via-pink-500 group-hover/item:to-purple-500 group-hover/item:text-white transition-colors shadow-lg" aria-hidden="true"><ImageIcon className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5 group-hover/item:text-blue-400 transition-colors">Instagram Fotoğraf</div>
                          <div className="text-xs text-gray-400">Çoklu gönderileri (carousel) indir.</div>
                        </div>
                      </a>
                      <a href={`/${locale}/platform/tiktok-photo`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" role="menuitem">
                        <div className="p-2 bg-gray-500/10 text-gray-300 rounded-lg border border-white/5 group-hover/item:bg-gray-200 group-hover/item:text-black transition-colors shadow-lg" aria-hidden="true"><Download className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5 group-hover/item:text-blue-400 transition-colors">TikTok Fotoğraf</div>
                          <div className="text-xs text-gray-400">Filigransız fotoğrafları indir.</div>
                        </div>
                      </a>
                      <a href={`/${locale}/platform/facebook-photo`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" role="menuitem">
                        <div className="p-2 bg-blue-600/10 text-blue-500 rounded-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors shadow-lg" aria-hidden="true"><ImageIcon className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5 group-hover/item:text-blue-400 transition-colors">Facebook Fotoğraf</div>
                          <div className="text-xs text-gray-400">HD kalitede gönderi resimleri.</div>
                        </div>
                      </a>
                      <a href={`/${locale}/platform/twitter-photo`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" role="menuitem">
                        <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg group-hover/item:bg-sky-500 group-hover/item:text-white transition-colors shadow-lg" aria-hidden="true"><ImageIcon className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5 group-hover/item:text-blue-400 transition-colors">X (Twitter) Fotoğraf</div>
                          <div className="text-xs text-gray-400">Tweet'lerdeki medyaları kaydet.</div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4" id="menu-dp">Profil (DP) Araçları</h4>
                    <div className="flex flex-col gap-2" role="group" aria-labelledby="menu-dp">
                      <a href={`/${locale}/platform/instagram-dp`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" role="menuitem">
                        <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg group-hover/item:bg-gradient-to-tr group-hover/item:from-yellow-500 group-hover/item:via-pink-500 group-hover/item:to-purple-500 group-hover/item:text-white transition-colors shadow-lg" aria-hidden="true"><ImageIcon className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5 group-hover/item:text-blue-400 transition-colors">Instagram DP</div>
                          <div className="text-xs text-gray-400">PP'leri HD olarak büyüt.</div>
                        </div>
                      </a>
                      <a href={`/${locale}/platform/tiktok-dp`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" role="menuitem">
                        <div className="p-2 bg-gray-500/10 text-gray-300 rounded-lg border border-white/5 group-hover/item:bg-gray-200 group-hover/item:text-black transition-colors shadow-lg" aria-hidden="true"><ImageIcon className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5 group-hover/item:text-blue-400 transition-colors">TikTok DP</div>
                          <div className="text-xs text-gray-400">TikTok profillerini indir.</div>
                        </div>
                      </a>
                      <a href={`/${locale}/platform/twitter-dp`} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" role="menuitem">
                        <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg group-hover/item:bg-sky-500 group-hover/item:text-white transition-colors shadow-lg" aria-hidden="true"><ImageIcon className="w-5 h-5" /></div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5 group-hover/item:text-blue-400 transition-colors">X (Twitter) DP</div>
                          <div className="text-xs text-gray-400">Twitter PP'lerini kaydet.</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href={`/${locale}/tools`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Tüm Araçlar</a>
          <a href={`/${locale}/blog`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Blog</a>
          <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">{t("features")}</a>
          <a href="#faq" className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">{t("faq")}</a>

          <div className="w-px h-5 bg-white/10 mx-2" aria-hidden="true"></div>

          <button
            onClick={handleLanguageSwitch}
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={locale === "tr" ? "Switch language to English" : "Dili Türkçe'ye çevir"}
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
            {locale === "tr" ? "English" : "Türkçe"}
          </button>
        </nav>

        {/* Mobile Toggle (<1024px) */}
        <button
          className="lg:hidden p-2 text-gray-400 hover:text-white bg-white/5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>

      </div>

      {/* Mobile Drawer (<1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#0A0A0C]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden shadow-2xl"
            role="navigation"
            aria-label="Mobile Navigation"
          >
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Video & Ses</span>
                <a href={`/${locale}/platform/youtube`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><Play className="w-5 h-5 text-red-500" aria-hidden="true" /> YouTube İndirici</a>
                <a href={`/${locale}/platform/tiktok`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><Music className="w-5 h-5 text-gray-300" aria-hidden="true" /> TikTok İndirici</a>
                <a href={`/${locale}/platform/facebook`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><Share2 className="w-5 h-5 text-blue-500" aria-hidden="true" /> Facebook İndirici</a>
                <a href={`/${locale}/platform/twitter`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><MessageSquare className="w-5 h-5 text-sky-400" aria-hidden="true" /> X (Twitter) İndirici</a>
                <a href={`/${locale}/platform/instagram`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><Play className="w-5 h-5 text-purple-500" aria-hidden="true" /> Instagram Reels</a>

                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-4 mb-2">Görsel & Fotoğraf</span>
                <a href={`/${locale}/platform/instagram-photo`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><ImageIcon className="w-5 h-5 text-pink-500" aria-hidden="true" /> Instagram Fotoğraf</a>
                <a href={`/${locale}/platform/tiktok-photo`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><Download className="w-5 h-5 text-gray-300" aria-hidden="true" /> TikTok Fotoğraf</a>
                <a href={`/${locale}/platform/facebook-photo`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><ImageIcon className="w-5 h-5 text-blue-500" aria-hidden="true" /> Facebook Fotoğraf</a>
                <a href={`/${locale}/platform/twitter-photo`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><ImageIcon className="w-5 h-5 text-sky-400" aria-hidden="true" /> X (Twitter) Fotoğraf</a>

                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-4 mb-2">Profil (DP) Araçları</span>
                <a href={`/${locale}/platform/instagram-dp`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><ImageIcon className="w-5 h-5 text-pink-500" aria-hidden="true" /> Instagram DP Büyütme</a>
                <a href={`/${locale}/platform/tiktok-dp`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><ImageIcon className="w-5 h-5 text-gray-300" aria-hidden="true" /> TikTok DP İndirici</a>
                <a href={`/${locale}/platform/twitter-dp`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><ImageIcon className="w-5 h-5 text-sky-400" aria-hidden="true" /> X (Twitter) DP İndirici</a>

                <div className="w-full h-px bg-white/10 my-2" aria-hidden="true"></div>
                <a href={`/${locale}/tools`} className="flex items-center gap-3 p-3 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400 font-bold active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><LayoutGrid className="w-5 h-5" aria-hidden="true" /> Tüm Araçları Keşfet</a>
              </div>

              <div className="w-full h-px bg-white/10" aria-hidden="true"></div>

              <button
                onClick={handleLanguageSwitch}
                className="flex items-center justify-center gap-2 p-4 bg-blue-600 rounded-xl text-white font-bold active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label={locale === "tr" ? "Switch language to English" : "Dili Türkçe'ye çevir"}
              >
                <Globe className="w-5 h-5" aria-hidden="true" />
                {locale === "tr" ? "Switch to English" : "Türkçe'ye Geç"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
