export const platforms = {
    youtube: {
        id: "youtube",
        name: "YouTube",
        title: "YouTube Video İndirici",
        description: "YouTube videolarını 1080p, 4K ve MP3 formatında ücretsiz, hızlı ve reklamsız olarak indirin. En yüksek kalitede YouTube videolarını cihazınıza kaydedin.",
        stats: "Günlük 1M+ İndirme",
        color: "red-500",
        bg: "from-red-500/20 to-red-600/5",
        border: "border-red-500/20",
        usage: [
            "İndirmek istediğiniz YouTube videosunun linkini kopyalayın.",
            "Yukarıdaki arama kutusuna yapıştırın ve 'Analiz Et' butonuna tıklayın.",
            "İstediğiniz kaliteyi (Örn: 1080p veya MP3) seçin ve anında indirin."
        ]
    },
    tiktok: {
        id: "tiktok",
        name: "TikTok",
        title: "TikTok Filigransız İndirici",
        description: "TikTok videolarını filigran olmadan (No Watermark) orijinal kalitesinde anında indirin. TikTok şarkılarını MP3 olarak kaydedin.",
        stats: "Günlük 500K+ İndirme",
        color: "pink-500",
        bg: "from-pink-500/20 to-pink-600/5",
        border: "border-pink-500/20",
        usage: [
            "TikTok uygulamasından videonun 'Bağlantıyı Kopyala' seçeneğini kullanın.",
            "Sistemimize yapıştırıp videoyu bulun.",
            "Filigransız MP4 veya direkt MP3 olarak indirin."
        ]
    },
    facebook: {
        id: "facebook",
        name: "Facebook",
        title: "Facebook Video İndirici",
        description: "Facebook videolarını HD kalitede bilgisayarınıza veya telefonunuza indirin. Herkese açık tüm FB videolarını destekler.",
        stats: "Günlük 250K+ İndirme",
        color: "blue-500",
        bg: "from-blue-500/20 to-blue-600/5",
        border: "border-blue-500/20",
        usage: [
            "Facebook'taki videonun URL adresini tarayıcıdan kopyalayın.",
            "Yukarıdaki kutucuğa yapıştırın.",
            "Saniyeler içinde yüksek kalitede (HD) cihazınıza indirin."
        ]
    },
    instagram: {
        id: "instagram",
        name: "Instagram",
        title: "Instagram Reels ve Video İndirici",
        description: "Instagram Reels, IGTV ve normal gönderi videolarını yüksek kalitede, hızlıca indirin. Giriş yapmanıza gerek yok.",
        stats: "Günlük 800K+ İndirme",
        color: "purple-500",
        bg: "from-purple-500/20 to-purple-600/5",
        border: "border-purple-500/20",
        usage: [
            "Instagram'dan beğendiğiniz Reels veya videonun linkini kopyalayın.",
            "Sisteme yapıştırın ve videoyu analiz edin.",
            "Kalite kaybı yaşamadan anında indirin."
        ]
    },
    twitter: {
        id: "twitter",
        name: "X (Twitter)",
        title: "X (Twitter) Video İndirici",
        description: "Twitter (X) üzerindeki videoları ve GIF'leri reklamsız, beklemeden indirin.",
        stats: "Günlük 150K+ İndirme",
        color: "gray-300",
        bg: "from-gray-500/20 to-gray-600/5",
        border: "border-gray-500/20",
        usage: [
            "Videonun bulunduğu Tweet'in linkini (URL) kopyalayın.",
            "Kutucuğa yapıştırın.",
            "Video formatında MP4 olarak indirin."
        ]
    },
    "instagram-photo": {
        id: "instagram-photo",
        name: "Instagram",
        title: "Instagram Fotoğraf İndirici",
        description: "Instagram fotoğraflarını orijinal yüksek kalitesinde (HD) indirin. Çoklu kaydırmalı (carousel) gönderilerdeki tüm resimleri kolayca kaydedin.",
        stats: "Günlük 300K+ İndirme",
        color: "purple-500",
        bg: "from-purple-500/20 to-purple-600/5",
        border: "border-purple-500/20",
        usage: [
            "Instagram'dan indirmek istediğiniz fotoğrafın bağlantısını kopyalayın.",
            "Sistemimize yapıştırın ve 'Analiz Et' butonuna basın.",
            "JPG veya PNG formatında cihazınıza kaydedin."
        ]
    },
    "tiktok-photo": {
        id: "tiktok-photo",
        name: "TikTok",
        title: "TikTok Fotoğraf İndirici",
        description: "TikTok kaydırmalı fotoğraf gönderilerini (slideshow) filigransız olarak orijinal kalitede toplu veya tek tek indirin.",
        stats: "Günlük 200K+ İndirme",
        color: "pink-500",
        bg: "from-pink-500/20 to-pink-600/5",
        border: "border-pink-500/20",
        usage: [
            "TikTok'taki fotoğraf gönderisinin linkini kopyalayın.",
            "Buraya yapıştırıp analiz edin.",
            "Filigransız fotoğrafları anında indirin."
        ]
    },
    "facebook-photo": {
        id: "facebook-photo",
        name: "Facebook",
        title: "Facebook Fotoğraf İndirici",
        description: "Facebook gönderilerindeki yüksek çözünürlüklü fotoğrafları cihazınıza tek tıkla ve kalitesi bozulmadan indirin.",
        stats: "Günlük 100K+ İndirme",
        color: "blue-500",
        bg: "from-blue-500/20 to-blue-600/5",
        border: "border-blue-500/20",
        usage: [
            "Facebook'taki resmin URL'sini kopyalayın.",
            "Kutucuğa yapıştırın.",
            "HD kalitesinde fotoğrafı anında indirin."
        ]
    },
    "twitter-photo": {
        id: "twitter-photo",
        name: "X (Twitter)",
        title: "X (Twitter) Fotoğraf İndirici",
        description: "X (Twitter) üzerindeki görselleri ve resimleri kalite kaybı olmadan doğrudan indirin.",
        stats: "Günlük 50K+ İndirme",
        color: "gray-300",
        bg: "from-gray-500/20 to-gray-600/5",
        border: "border-gray-500/20",
        usage: [
            "Resmin bulunduğu Tweet bağlantısını kopyalayın.",
            "Arama kutusuna yapıştırın.",
            "Görseli orijinal boyutuyla indirin."
        ]
    },
    "instagram-dp": {
        id: "instagram-dp",
        name: "Instagram DP",
        title: "Instagram Profil Fotoğrafı (DP) Büyütme",
        description: "Instagram profil fotoğraflarını (PP/DP) orijinal ve yüksek çözünürlüklü boyutunda indirin ve görüntüleyin.",
        stats: "Günlük 400K+ İşlem",
        color: "purple-500",
        bg: "from-purple-500/20 to-purple-600/5",
        border: "border-purple-500/20",
        usage: [
            "Profilini görmek istediğiniz Instagram kullanıcısının linkini (veya @kullaniciadi) kopyalayın.",
            "Sisteme yapıştırın ve 'Analiz Et' butonuna tıklayın.",
            "Büyük boy (HD) profil fotoğrafını anında indirin."
        ]
    },
    "tiktok-dp": {
        id: "tiktok-dp",
        name: "TikTok DP",
        title: "TikTok Profil Fotoğrafı (DP) Büyütme",
        description: "TikTok profil fotoğraflarını en yüksek kalitede, orijinal boyutunda görüntüleyin ve indirin.",
        stats: "Günlük 150K+ İşlem",
        color: "pink-500",
        bg: "from-pink-500/20 to-pink-600/5",
        border: "border-pink-500/20",
        usage: [
            "TikTok kullanıcı profilinin linkini (veya @kullaniciadi) kopyalayın.",
            "Arama kutusuna yapıştırın.",
            "Profil fotoğrafını HD kalitede indirin."
        ]
    },
    "twitter-dp": {
        id: "twitter-dp",
        name: "X (Twitter) DP",
        title: "X (Twitter) Profil Fotoğrafı İndirici",
        description: "Twitter (X) hesaplarının profil fotoğraflarını tam çözünürlüklü olarak büyütün ve kaydedin.",
        stats: "Günlük 80K+ İşlem",
        color: "gray-300",
        bg: "from-gray-500/20 to-gray-600/5",
        border: "border-gray-500/20",
        usage: [
            "Twitter kullanıcı profilinin linkini kopyalayın.",
            "Arama kutusuna yapıştırın.",
            "Orijinal boyuttaki profil fotoğrafını indirin."
        ]
    }
};
