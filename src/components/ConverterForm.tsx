"use client"

import { useState } from "react"
import { Link2, ArrowRight, Loader2, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

import { useTranslations } from "next-intl"

type VideoInfo = {
  title: string
  thumbnail: string
  duration: number
  extractor: string
}

export function ConverterForm() {
  const t = useTranslations("Converter")
  const [url, setUrl] = useState("")
  const [format, setFormat] = useState<string>("mp4-best")
  const [isLoadingInfo, setIsLoadingInfo] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [showAdLayer, setShowAdLayer] = useState(false) // Reklam ekranını tetiklemek için
  const [error, setError] = useState("")
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)

  // 1. Adım: Videonun bilgilerini (kapak, başlık vs.) getir
  const handleGetInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoadingInfo(true)
    setError("")
    setVideoInfo(null)

    try {
      // Dinamik backend URL kullanımı (Vercel -> Render)
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Video bilgileri alınamadı.')
      }

      const data = await response.json()
      setVideoInfo(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoadingInfo(false)
    }
  }

  // 2. Adım: Adam formatı seçip indir dediğinde asıl indirmeyi başlat
  const handleDownload = async () => {
    if (!url) return

    setIsConverting(true)
    setShowAdLayer(true) // İndirme başlarken reklam ekranını aç
    setError("")

    try {
      // Dinamik backend URL kullanımı (Vercel -> Render)
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Dönüştürme sırasında bir hata oluştu.')
      }

      // Dosyayı indirtmek için blob'a çeviriyoruz
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl

      // Temiz bir dosya adı oluştur ve uzantıyı bul
      const fileExt = format.startsWith("mp3") ? "mp3" : "mp4"
      const cleanTitle = videoInfo?.title ? videoInfo.title.replace(/[^a-zA-Z0-9 ]/g, "").substring(0, 30) : "zypio_video"
      a.download = `${cleanTitle}.${fileExt}`

      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(downloadUrl)
      document.body.removeChild(a)

    } catch (err: any) {
      setError(err.message)
      setShowAdLayer(false) // Hata olursa reklamı kapat
    } finally {
      setIsConverting(false)
      // Dosya indikten sonra 2 saniye daha reklamı tutup sonra kapat
      setTimeout(() => setShowAdLayer(false), 2000)
    }
  }

  // Süreyi MM:SS formatına çeviren yardımcı fonksiyon
  const formatDuration = (seconds: number) => {
    if (!seconds) return "0:00"
    // Gelen saniye küsuratlıysa (Örn: 83.03499) yuvarla
    const roundedSeconds = Math.round(seconds)
    const m = Math.floor(roundedSeconds / 60)
    const s = roundedSeconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  // Thumbnail resmi yüklenemezse veya eksikse varsayılan bir kapak göster
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop";
    e.currentTarget.onerror = null; // Sonsuz döngüyü engelle
  }

  return (
    <div className="w-full max-w-3xl mx-auto relative z-20">

      {/* Reklam Overlay (İndirme sırasında tam ekran çıkan reklam alanı) */}
      <AnimatePresence>
        {showAdLayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <div className="bg-[#1C1C1E] border border-white/10 rounded-3xl p-8 max-w-lg w-full text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 15, ease: "linear" }}
                />
              </div>

              <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">{t("preparing")}</h3>
              <p className="text-gray-400 mb-8">{t("pleaseWait")}</p>

              {/* SAHTE REKLAM ALANI (AdSense buraya gelecek) */}
              <div className="w-full h-[250px] bg-[#0F0F13] border border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-gray-600 relative overflow-hidden group">
                <span className="text-xs uppercase tracking-widest mb-2 font-bold opacity-50">{t("sponsored")}</span>
                <span className="text-lg font-medium group-hover:text-blue-400 transition-colors">{t("adSpace")}</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key="link"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-[#1C1C1E] rounded-3xl p-6 sm:p-8 border border-white/5 shadow-2xl"
        >
          {/* Eğer henüz video bilgisi çekilmediyse URL giriş formunu göster */}
          {!videoInfo ? (
            <form onSubmit={handleGetInfo} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Link2 className="w-5 h-5 text-gray-500" />
                  </div>
                  <Input
                    type="url"
                    placeholder={t("placeholder")}
                    className="pl-12 bg-[#0F0F13] border-white/5"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoadingInfo || !url}
                  className="sm:w-auto w-full group"
                >
                  {isLoadingInfo ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {t("analyze")}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <div className="text-red-400 text-sm mt-2 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                  {error}
                </div>
              )}
            </form>
          ) : (
            // Video bilgisi çekildiyse önizleme (Preview) ve İndirme butonlarını göster (SaveFrom Mantığı)
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col md:flex-row gap-6 bg-[#0F0F13] p-5 rounded-2xl border border-white/10"
            >
              {/* Thumbnail */}
              <div className="w-full md:w-56 aspect-video rounded-xl overflow-hidden bg-black relative flex-shrink-0 border border-white/5">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL || ''}/api/proxy-image?url=${encodeURIComponent(videoInfo.thumbnail)}`}
                  alt={videoInfo.title}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-white shadow-lg">
                  {formatDuration(videoInfo.duration)}
                </div>
              </div>

              {/* Info & Download Actions */}
              <div className="flex flex-col justify-between flex-1 text-left min-w-0">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white truncate leading-snug mb-1" title={videoInfo.title}>
                    {videoInfo.title}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {t("source")} <span className="text-blue-400 font-medium">{videoInfo.extractor}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <select
                    className="w-full bg-[#1C1C1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm appearance-none cursor-pointer"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    disabled={isConverting}
                  >
                    <optgroup label={t("videoOpt")}>
                      <option value="mp4-best">{t("q1080")}</option>
                      <option value="mp4-720p">{t("q720")}</option>
                      <option value="mp4-480p">{t("q480")}</option>
                      <option value="mp4-360p">{t("q360")}</option>
                    </optgroup>
                    <optgroup label={t("audioOpt")}>
                      <option value="mp3-best">{t("q320k")}</option>
                      <option value="mp3-128k">{t("q128k")}</option>
                    </optgroup>
                  </select>

                  <Button
                    onClick={handleDownload}
                    disabled={isConverting}
                    className="w-full bg-green-600 hover:bg-green-500 shadow-green-600/20 shadow-lg h-12"
                  >
                    {isConverting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        {t("converting")}
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        {t("downloadNow")}
                      </>
                    )}
                  </Button>
                </div>

                {/* Başka video indir butonu */}
                <button
                  onClick={() => { setVideoInfo(null); setUrl(""); }}
                  className="mt-4 text-xs text-gray-500 hover:text-white transition-colors underline underline-offset-2 self-start"
                  disabled={isConverting}
                >
                  {t("convertAnother")}
                </button>
              </div>
            </motion.div>
          )}

          {!videoInfo && (
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                {t("free")}
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                {t("noReg")}
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                {t("fast")}
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
