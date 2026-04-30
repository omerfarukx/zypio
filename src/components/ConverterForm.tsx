"use client"

import { useState, useEffect } from "react"
import { Link2, ArrowRight, Loader2, Download, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function ConverterForm() {
  const [url, setUrl] = useState("")
  const [platform, setPlatform] = useState<"youtube" | "instagram" | "tiktok" | "unknown">("unknown")
  const [format, setFormat] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] = useState("")

  // URL değiştiğinde platformu otomatik tanı
  useEffect(() => {
    if (!url) {
      setPlatform("unknown")
      return
    }

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      setPlatform("youtube")
      setFormat("720") // Varsayılan 720p
    } else if (url.includes("instagram.com")) {
      setPlatform("instagram")
      setFormat("hd") // Instagram için HD
    } else if (url.includes("tiktok.com")) {
      setPlatform("tiktok")
      setFormat("watermark_free") // TikTok için filigransız
    } else {
      setPlatform("unknown")
    }
  }, [url])

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url || platform === "unknown") {
      setError("Lütfen desteklenen bir platformdan geçerli bir URL giriniz (YouTube, Instagram, TikTok).")
      return
    }

    setIsProcessing(true)
    setError("")
    setProgress(0)

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
          setIsProcessing(false)
          break
        }

        await new Promise(r => setTimeout(r, 1500))
      }
    } catch (err: any) {
      setError("İndirme bağlantısı alınırken koptuk: " + err.message)
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1C1C1E] rounded-3xl p-6 sm:p-8 border border-white/5 shadow-2xl"
      >
        <form onSubmit={handleDownload} className="flex flex-col gap-6">

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="relative w-full flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Link2 className="w-5 h-5 text-gray-500" />
              </div>
              <Input
                type="url"
                placeholder="Video URL'sini buraya yapıştır..."
                className="pl-12 bg-[#0F0F13] border-white/10 text-white h-14 rounded-2xl text-lg focus-visible:ring-blue-500"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/10 text-white"
                  >
                    {platform}
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
                  İndir
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>

          {/* Dinamik Çözünürlük Seçenekleri */}
          <AnimatePresence>
            {platform === "youtube" && !isProcessing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-center gap-3"
              >
                <span className="text-sm text-gray-400 font-medium">Kalite Seçin:</span>
                <div className="flex bg-[#0F0F13] p-1 rounded-xl border border-white/5">
                  {["360", "720", "1080"].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setFormat(q)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${format === q
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      {q}p
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* İlerleme Çubuğu */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-[#0F0F13] rounded-xl p-4 border border-white/5"
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400 font-medium">Video hazırlanıyor...</span>
                  <span className="text-blue-400 font-bold">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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