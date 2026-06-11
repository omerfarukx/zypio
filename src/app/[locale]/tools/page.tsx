import { getTranslations } from 'next-intl/server';
import { ToolsGrid } from '@/components/ToolsGrid';
import { Metadata } from 'next';
import { SITE_URL, alternates } from '@/lib/seo/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const title = locale === 'tr'
        ? "Tüm Ücretsiz Medya İndirme ve Dönüştürme Araçları"
        : "All Free Media Download & Conversion Tools";

    const description = locale === 'tr'
        ? "YouTube, Instagram, TikTok, Facebook ve X için video, fotoğraf ve profil fotoğrafı indirme araçları — ücretsiz, kayıt gerektirmeden, tek bir yerde."
        : "Video, photo and profile-picture download tools for YouTube, Instagram, TikTok, Facebook and X — free, no registration, all in one place.";

    return {
        title,
        description,
        keywords: "video indirici, youtube mp3 çevirici, tiktok filigransız indir, instagram reels indir, online converter, free video downloader, mp4 mp3",
        alternates: alternates(locale, '/tools'),
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/${locale}/tools`,
            type: "website",
        }
    };
}

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Index' });

    // Google Schema.org (Structured Data) for CollectionPage & SoftwareApplication
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": locale === 'tr' ? "Zypio Ücretsiz Araçlar Merkezi" : "Zypio Free Tools Hub",
        "description": locale === 'tr' ? "PDF, Video, Görüntü ve Ses dosyalarınızı saniyeler içinde dönüştürün." : "Convert PDF, Video, Image and Audio files in seconds.",
        "url": `${SITE_URL}/${locale}/tools`,
        "about": {
            "@type": "SoftwareApplication",
            "name": "Zypio Converter Suite",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web browser",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-32 px-4 sm:px-8 w-full bg-[#0A0A0C] relative overflow-hidden">

            {/* Schema.org Script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Premium Glow Arka Plan Efektleri */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-600/10 rounded-[100%] blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-purple-600/10 rounded-[100%] blur-[150px] pointer-events-none"></div>

            <div className="max-w-[1500px] w-full mx-auto relative z-10">

                {/* Header Section (H1) */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-bold tracking-widest uppercase mb-8 shadow-lg backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Premium Araçlar Seti
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 mb-6 tracking-tight drop-shadow-2xl leading-tight">
                        Tüm Dosya Dönüştürücüler
                    </h1>
                    <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Video, ses, görüntü, PDF ve daha fazlası... İhtiyacınız olan tüm araçlar tek bir yerde, <span className="text-white drop-shadow-md">tamamen ücretsiz ve limitsiz.</span>
                    </p>
                </div>

                {/* Üst Reklam Alanı (970x90) */}
                <div className="w-full max-w-[970px] h-[90px] bg-[#1C1C1E]/80 backdrop-blur-md border border-white/10 border-dashed rounded-2xl hidden md:flex items-center justify-center text-gray-500 mb-20 mx-auto relative overflow-hidden group shadow-2xl transition-colors hover:border-blue-500/30">
                    <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold">Sponsorlu</span>
                    <span className="font-medium group-hover:text-blue-400 transition-colors tracking-wide">970x90 Premium Header Banner</span>
                </div>

                {/* Premium Etkileşimli Grid Bileşeni (H2 and H3 generated here) */}
                <ToolsGrid />

                {/* Alt Reklam Alanı (970x250) */}
                <div className="w-full max-w-[970px] h-[250px] bg-[#1C1C1E]/80 backdrop-blur-md border border-white/10 border-dashed rounded-3xl flex items-center justify-center text-gray-500 mt-32 mb-16 mx-auto relative overflow-hidden group shadow-2xl transition-colors hover:border-purple-500/30">
                    <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider opacity-50 font-bold">Sponsorlu</span>
                    <span className="font-medium group-hover:text-purple-400 transition-colors tracking-wide">970x250 Premium Footer Billboard</span>
                </div>

                {/* SEO Metin İçeriği (H2 ve H3 ile Uzun Kuyruklu Anahtar Kelimeler) */}
                <section className="w-full max-w-4xl mx-auto mt-24 text-gray-400 prose prose-invert prose-blue">
                    <h2 className="text-3xl font-bold text-white mb-6">Neden Zypio Dosya Dönüştürücü Araçlarını Kullanmalısınız?</h2>
                    <p className="mb-6 leading-relaxed">
                        İnternetteki en kapsamlı ve tamamen ücretsiz <strong>dosya dönüştürücü</strong> platformu olan Zypio, günlük dijital işlemlerinizi saniyeler içinde halletmenizi sağlar. Geleneksel yazılımların aksine, hiçbir program kurmadan doğrudan web tarayıcınız üzerinden <em>PDF'ten Word'e, MP4'ten MP3'e, HEIC'ten JPG'ye</em> kadar onlarca formatı birbirine çevirebilirsiniz.
                    </p>

                    <h3 className="text-2xl font-bold text-white mb-4 mt-8">Hızlı, Güvenli ve Sınırsız Dönüştürme</h3>
                    <p className="mb-6 leading-relaxed">
                        Dosya gizliliğiniz bizim için en önemli önceliktir. Yüklediğiniz PDF belgeleri, özel videolarınız veya şirket içi görselleriniz, dönüşüm işlemi tamamlandıktan hemen sonra (maksimum 1 saat içinde) sunucularımızdan kalıcı olarak silinir. Piyasada <strong>"ücretsiz dosya dönüştürücü"</strong> adı altında hizmet veren birçok platformun aksine Zypio, sizden gizli bir kayıt ücreti veya kota limiti talep etmez.
                    </p>

                    <h3 className="text-2xl font-bold text-white mb-4 mt-8">En Çok Kullanılan Çevirici Araçlarımız</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Video ve Ses:</strong> YouTube videolarını indirme, MP4 videoları MP3 müzik formatına çevirme ve MOV dosyalarını sıkıştırma.</li>
                        <li><strong>Belge (PDF) İşlemleri:</strong> PDF birleştirme, PDF'i düzenlenebilir Word (DOCX) belgesine aktarma veya e-kitap (EPUB) formatına çevirme.</li>
                        <li><strong>Görüntü Optimizasyonu:</strong> Apple cihazlarının varsayılan HEIC formatını evrensel JPG veya PNG'ye çevirme, WEBP resimlerini dönüştürme.</li>
                        <li><strong>Animasyon:</strong> Videoları (MP4, WEBM) sosyal medyada paylaşmak için akıcı GIF'lere dönüştürme.</li>
                    </ul>

                    <p className="leading-relaxed">
                        Yukarıdaki arama çubuğunu kullanarak veya kategoriler arasında gezinerek ihtiyacınız olan <strong>online converter</strong> aracını anında bulabilir, %100 bulut tabanlı sistemimiz sayesinde bilgisayarınızın işlemcisini yormadan tüm dönüşümlerinizi Vercel ve özel sunucu altyapımızla 60fps akıcılığında tamamlayabilirsiniz.
                    </p>
                </section>

            </div>
        </div>
    );
}