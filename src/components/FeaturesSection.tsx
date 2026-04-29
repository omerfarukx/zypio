"use client"

import { UploadCloud, Link2, Shield, Zap, RefreshCw, FileVideo } from "lucide-react"
import { useTranslations } from "next-intl"

export function FeaturesSection() {
  const t = useTranslations("Features")

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: t("f1Title"),
      description: t("f1Desc"),
    },
    {
      icon: <Link2 className="w-6 h-6 text-blue-500" />,
      title: t("f2Title"),
      description: t("f2Desc"),
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: t("f3Title"),
      description: t("f3Desc"),
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-purple-500" />,
      title: t("f4Title"),
      description: t("f4Desc"),
    },
    {
      icon: <FileVideo className="w-6 h-6 text-red-500" />,
      title: t("f5Title"),
      description: t("f5Desc"),
    },
    {
      icon: <UploadCloud className="w-6 h-6 text-teal-500" />,
      title: t("f6Title"),
      description: t("f6Desc"),
    }
  ]

  return (
    <section className="w-full py-24 bg-[#0F0F13] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-3xl bg-[#1C1C1E] border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Işık Hızında İşlem</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Özel sunucularımız sayesinde dönüştürme işlemleri saniyeler sürer. Beklemek yok, anında indirin.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-3xl bg-[#1C1C1E] border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">%100 Güvenli & Gizli</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Yüklediğiniz dosyalar şifrelenir ve işlem bittikten tam 1 saat sonra sunucularımızdan kalıcı olarak silinir.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-3xl bg-[#1C1C1E] border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
              <RefreshCw className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Sınırsız Format</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Sadece YouTube değil; TikTok, X, Instagram ve 1000'den fazla platformu destekliyoruz. Her türlü format elinizin altında.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
