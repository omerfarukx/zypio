"use client"

import { useState, useEffect } from "react"
import { Link2, ArrowRight, Loader2, Download, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Image from "next/image"
import AdBanner from "./AdBanner"

export function ConverterForm({ activeContext }: { activeContext?: string }) {
  const [url, setUrl] = useState("")
  const [platform, setPlatform] = useState<string>("unknown")
  const [format, setFormat] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] = useState("")
  const [videoInfo, setVideoInfo] = useState<{ title: string, thumbnail: string } | null>(null)
  const [showAdLayer, setShowAdLayer] = useState(false) // Reklam/İndirme overlay'i

  // URL değiştiğinde platformu otomatik tanı
  useEffect(() => {
    if (!url) {
      setPlatform("unknown")
      setVideoInfo(null)
      return
    }

    if (activeContext?.includes("-dp") && url && !url.startsWith("http")) {
      setPlatform(activeContext)
      setFormat("jpg")
      return
    }

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      setPlatform("youtube")
      setFormat("720")
    } else if (url.includes("instagram.com")) {
      setPlatform(activeContext === "instagram-photo" ? "instagram-photo" : activeContext === "instagram-dp" ? "instagram-dp" : "instagram")
      setFormat(activeContext === "instagram-photo" || activeContext === "instagram-dp" ? "jpg" : "720")
    } else if (url.includes("tiktok.com")) {
      setPlatform(activeContext === "tiktok-photo" ? "tiktok-photo" : activeContext === "tiktok-dp" ? "tiktok-dp" : "tiktok")
      setFormat(activeContext === "tiktok-photo" || activeContext === "tiktok-dp" ? "jpg" : "watermark_free")
    } else if (url.includes("facebook.com") || url.includes("fb.watch")) {
      setPlatform(activeContext === "facebook-photo" ? "facebook-photo" : "facebook")
      setFormat(activeContext === "facebook-photo" ? "jpg" : "720")
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      setPlatform(activeContext === "twitter-photo" ? "twitter-photo" : activeContext === "twitter-dp" ? "twitter-dp" : "twitter")
      setFormat(activeContext === "twitter-photo" || activeContext === "twitter-dp" ? "jpg" : "720")
    } else {
      setPlatform("unknown")
      setVideoInfo(null)
    }
  }, [url])

  // Yeni Adım 1: Analiz Et (Video bilgilerini getir)
  const handleGetInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url || platform === "unknown") {
      setError("Lütfen desteklenen bir platformdan geçerli bir URL giriniz (YouTube, Instagram, TikTok).")
      return
    }

    setIsProcessing(true)
    setError("")
    setVideoInfo(null)

    try {
      const response = await fetch('/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, platform })
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || "Video bilgileri alınamadı.")
      }

      setVideoInfo({
        title: data.title,
        thumbnail: data.thumbnail
      })

    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  // Yeni Adım 2: Format seçip İndir'e basınca (Mevcut mantık + Reklam Overlay)
  const handleDownload = async () => {
    if (!url || platform === "unknown") return

    setIsProcessing(true)
    setError("")
    setProgress(0)
    setShowAdLayer(true) // Reklam ekranını tetikle

    try {
      // API çağrısı
      const response = await fetch('/api/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, platform, format })
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || "Video işlenirken bir hata oluştu.")
      }

      if (data.download_url) {
        // Direkt indirme linki geldi (TikTok gibi hızlı API'ler için)
        setProgress(100)
        window.location.href = data.download_url
        setIsProcessing(false)
        return
      }

      if (data.progress_url) {
        // Asenkron indirme (loader.to gibi)
        pollProgress(data.progress_url)
      }

    } catch (err: any) {
      setError(err.message)
      setIsProcessing(false)
      setShowAdLayer(false) // Overlay kapatılmalı!
    }
  }

  const pollProgress = async (progressUrl: string) => {
    try {
      while (true) {
        const pRes = await fetch(progressUrl)
        const pData = await pRes.json()

        if (pData.progress) {
          setProgress(pData.progress / 10) // 1000'e kadar çıkıyor loader.to'da
        }

        if (pData.success === 1 && pData.download_url) {
          setProgress(100)
          window.location.href = pData.download_url
          setTimeout(() => { setIsProcessing(false); setShowAdLayer(false); }, 1500)
          break
        }

        await new Promise(r => setTimeout(r, 1500))
      }
    } catch (err: any) {
      setError("İndirme bağlantısı alınırken koptuk: " + err.message)
      setIsProcessing(false)
      setShowAdLayer(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto relative z-20">

      {/* REKLAM VE İNDİRME EKRANI (Overlay) */}
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
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              {progress === 100 ? (
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8" />
                </div>
              ) : (
                <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-6" />
              )}

              <h3 className="text-2xl font-bold text-white mb-2">
                {progress === 100 ? "İndirme Başlıyor!" : "Video Hazırlanıyor..."}
              </h3>
              <p className="text-gray-400 mb-4">
                {progress === 100 ? "Dosyanız kaydediliyor..." : `Lütfen bekleyin... ${Math.round(progress)}%`}
              </p>

              {/* GERÇEK ADSTERRA BANNER REKLAMI */}
              <AdBanner />

              {/* Çarpı (Kapat) butonu - Kullanıcı takılırsa çıksın diye */}
              {progress === 100 && (
                <button onClick={() => setShowAdLayer(false)} className="mt-6 text-sm text-gray-500 hover:text-white underline underline-offset-4">
                  Kapat
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1C1C1E] rounded-3xl p-6 sm:p-8 border border-white/5 shadow-2xl"
      >
        <form onSubmit={!videoInfo ? handleGetInfo : (e) => e.preventDefault()} className="flex flex-col gap-6">

          {/* 1. ADIM: LİNK GİRME EKRANI */}
          {!videoInfo ? (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="relative w-full flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Link2 className="w-5 h-5 text-gray-500" />
                  </div>
                  <Input
                    type={activeContext?.includes("-dp") ? "text" : "url"}
                    placeholder={
                      activeContext?.includes("-dp") ? "Profil linkini veya kullanıcı adını yapıştırın..." :
                        activeContext === "instagram-photo" ? "https://www.instagram.com/p/..." :
                          activeContext === "tiktok-photo" ? "https://www.tiktok.com/@user/photo/..." :
                            activeContext === "twitter-photo" ? "https://x.com/user/status/..." :
                              activeContext === "youtube" ? "https://www.youtube.com/watch?v=..." :
                                "Video veya görsel bağlantısını yapıştırın..."
                    }
                    className="pl-12 pr-32 bg-[#0F0F13] border-white/10 text-white h-14 rounded-2xl text-lg focus-visible:ring-blue-500 placeholder:text-gray-600"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    disabled={isProcessing}
                  />

                  {/* Platform Tanıma Göstergesi */}
                  <AnimatePresence>
                    {platform !== "unknown" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#1C1C1E] border border-white/10 text-white pointer-events-none backdrop-blur-md"
                      >
                        {platform.replace('-photo', ' Foto')}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing || !url || platform === "unknown"}
                  className="sm:w-auto w-full h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-lg group transition-all"
                >
                  {isProcessing ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Analiz Et
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>Ücretsiz</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Hızlı</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>Sınırsız</span>
              </div>
            </>
          ) : (
            /* 2. ADIM: VİDEO ÖNİZLEME VE İNDİRME EKRANI */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col md:flex-row gap-6 bg-[#0F0F13] p-5 rounded-2xl border border-white/10"
            >
              {/* Thumbnail */}
              <div className="w-full md:w-48 aspect-video rounded-xl overflow-hidden bg-black relative flex-shrink-0 border border-white/5 flex items-center justify-center">
                <Image
                  src={videoInfo.thumbnail.includes("logo.clearbit.com") ? videoInfo.thumbnail : `/api/proxy-image?url=${encodeURIComponent(videoInfo.thumbnail)}`}
                  alt={videoInfo.title}
                  fill
                  className={`${videoInfo.thumbnail.includes("logo.clearbit.com") ? "object-contain p-4 opacity-50" : "object-cover"}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600";
                    target.onerror = null;
                  }}
                />
              </div>

              {/* Bilgiler ve Butonlar */}
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white truncate leading-snug mb-1" title={videoInfo.title}>
                    {videoInfo.title}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    Platform: <span className="text-blue-400 font-medium">{platform}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Dropdown ile Format/Kalite Seçimi */}
                  <select
                    className="w-full bg-[#1C1C1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm appearance-none cursor-pointer"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    disabled={isProcessing}
                  >
                    {platform === "youtube" ? (
                      <optgroup label="Video (MP4)">
                        <option value="1080">Ultra Kalite (1080p+)</option>
                        <option value="720">Yüksek Kalite (720p)</option>
                        <option value="480">Orta Kalite (480p)</option>
                        <option value="360">Düşük Kalite (360p)</option>
                      </optgroup>
                    ) : platform === "tiktok" ? (
                      <optgroup label="Video">
                        <option value="watermark_free">Ultra Kalite (Filigransız)</option>
                        <option value="watermark">Orta Kalite (Filigranlı)</option>
                      </optgroup>
                    ) : platform.includes("-photo") || platform.includes("-dp") ? (
                      <optgroup label="Fotoğraf / Görsel">
                        <option value="jpg">Orijinal Kalite (JPG)</option>
                        <option value="png">Yüksek Kalite (PNG)</option>
                      </optgroup>
                    ) : (
                      <optgroup label="Video">
                        <option value="1080">Ultra Kalite</option>
                        <option value="720">Yüksek Kalite</option>
                        <option value="480">Orta Kalite</option>
                        <option value="360">Düşük Kalite</option>
                      </optgroup>
                    )}
                  </select>

                  <Button
                    onClick={handleDownload}
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-500 shadow-green-600/20 shadow-lg h-12"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Hemen İndir
                  </Button>
                </div>

                <button
                  type="button"
                  onClick={() => { setVideoInfo(null); setUrl(""); }}
                  className="mt-4 text-xs text-gray-500 hover:text-white transition-colors underline underline-offset-2 self-start"
                  disabled={isProcessing}
                >
                  Farklı bir video indir
                </button>
              </div>
            </motion.div>
          )}

          {/* Hata Mesajı */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3 text-red-400 text-sm p-4 bg-red-500/10 rounded-xl border border-red-500/20"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

        </form>
      </motion.div>
    </div>
  )
}