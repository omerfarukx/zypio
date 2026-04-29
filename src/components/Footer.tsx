import { Globe, Video, FileText, Music, Image as ImageIcon } from "lucide-react"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("Footer")

  return (
    <footer className="w-full py-12 bg-[#0A0A0C] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-500" />
              Zypio Convert
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              {t("desc")}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">{t("tools")}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Video className="w-4 h-4" /> Video Dönüştürücü</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Music className="w-4 h-4" /> Ses Dönüştürücü</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Görsel Dönüştürücü</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><FileText className="w-4 h-4" /> Belge Dönüştürücü</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t("legal")}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("terms")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("privacy")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("dmca")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("contact")}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Zypio Convert. {t("rights")}
          </p>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-gray-600 hover:bg-white transition-colors cursor-pointer"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600 hover:bg-white transition-colors cursor-pointer"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600 hover:bg-white transition-colors cursor-pointer"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}
