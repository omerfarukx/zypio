"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, Globe } from "lucide-react"
import { Logo } from "./Logo"
import { useTranslations, useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/routing"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations("Header")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageSwitch = () => {
    const nextLocale = locale === "tr" ? "en" : "tr"
    router.replace(pathname, { locale: nextLocale })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-[#0A0A0C]/80 backdrop-blur-md border-b border-white/5 py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <Logo className="w-10 h-10 group-hover:scale-105 transition-transform duration-300 shadow-xl shadow-blue-500/20" />
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Zypio
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {t("tools")} <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 mt-4 w-64 bg-[#1C1C1E] border border-white/10 rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-2xl translate-y-2 group-hover:translate-y-0">
              <a href={`/${locale}/platform/youtube`} className="block px-4 py-3 hover:bg-white/5 rounded-xl transition-colors">
                <div className="text-sm font-medium text-white mb-0.5">{t("youtube")}</div>
                <div className="text-xs text-gray-500">{t("youtubeDesc")}</div>
              </a>
              <a href={`/${locale}/platform/tiktok`} className="block px-4 py-3 hover:bg-white/5 rounded-xl transition-colors">
                <div className="text-sm font-medium text-white mb-0.5">{t("tiktok")}</div>
                <div className="text-xs text-gray-500">{t("tiktokDesc")}</div>
              </a>
              <a href={`/${locale}/platform/facebook`} className="block px-4 py-3 hover:bg-white/5 rounded-xl transition-colors">
                <div className="text-sm font-medium text-white mb-0.5">{t("facebook")}</div>
                <div className="text-xs text-gray-500">{t("facebookDesc")}</div>
              </a>
            </div>
          </div>

          <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">{t("features")}</a>
          <a href="#faq" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">{t("faq")}</a>

          <div className="w-px h-5 bg-white/10 mx-2"></div>

          <button
            onClick={handleLanguageSwitch}
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full"
          >
            <Globe className="w-4 h-4" />
            {locale === "tr" ? "English" : "Türkçe"}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A0A0C] border-b border-white/5 p-6 shadow-2xl">
          <nav className="flex flex-col gap-4">
            <a href="/tr/platform/youtube" className="text-lg font-medium text-white">YouTube Dönüştürücü</a>
            <a href="/tr/platform/tiktok" className="text-lg font-medium text-white">TikTok İndirici</a>
            <a href="/tr/platform/facebook" className="text-lg font-medium text-white">Facebook İndirici</a>
            <div className="w-full h-px bg-white/10 my-2"></div>
            <button className="flex items-center gap-2 text-lg font-medium text-white">
              <Globe className="w-5 h-5" />
              Türkçe
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
