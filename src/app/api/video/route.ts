import { NextResponse } from 'next/server';

export const maxDuration = 60; // 60 saniye timeout (Hızlı olmasını hedefliyoruz)
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { url, platform, format } = body;

        if (!url) {
            return NextResponse.json({ error: 'Lütfen geçerli bir URL giriniz.' }, { status: 400 });
        }

        // TIKTOK & TIKTOK-PHOTO İÇİN HIZLI API (tikwm)
        if (platform === 'tiktok' || platform === 'tiktok-photo') {
            try {
                const res = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.code === 0 && data.data) {
                    // Eğer fotoğraf (slideshow) isteniyorsa
                    if (platform === 'tiktok-photo') {
                        if (data.data.images && data.data.images.length > 0) {
                            // Şimdilik sadece ilk fotoğrafı (veya en iyi çözünürlüklü) indiriyoruz.
                            // İleride toplu ZIP olarak da verilebilir.
                            return NextResponse.json({
                                download_url: data.data.images[0]
                            });
                        } else {
                            throw new Error("Bu linkte bir fotoğraf galerisi bulunamadı.");
                        }
                    } else {
                        // Normal video
                        return NextResponse.json({
                            download_url: format === 'watermark_free' ? data.data.play : data.data.wmplay
                        });
                    }
                } else {
                    throw new Error("TikTok içeriği gizli veya silinmiş olabilir.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: 'TikTok sunucularına bağlanırken patladık: ' + err.message }, { status: 500 });
            }
        }

        // TWITTER FOTO (vxtwitter)
        if (platform === 'twitter-photo' || platform === 'twitter') {
            try {
                const vxUrl = url.replace('twitter.com', 'api.vxtwitter.com').replace('x.com', 'api.vxtwitter.com');
                const res = await fetch(vxUrl);
                const data = await res.json();

                if (platform === 'twitter-photo') {
                    if (data && data.mediaURLs && data.mediaURLs.length > 0) {
                        return NextResponse.json({
                            download_url: data.mediaURLs[0]
                        });
                    } else {
                        throw new Error("Bu tweet'te resim bulunamadı.");
                    }
                } else {
                    // Twitter video için
                    if (data && data.media_extended && data.media_extended.length > 0 && data.media_extended[0].type === 'video') {
                        return NextResponse.json({
                            download_url: data.media_extended[0].url
                        });
                    } else {
                        throw new Error("Bu tweet'te video bulunamadı.");
                    }
                }
            } catch (err: any) {
                return NextResponse.json({ error: 'Twitter sunucularına bağlanılamadı: ' + err.message }, { status: 500 });
            }
        }

        // YOUTUBE ve INSTAGRAM (Video) İÇİN (loader.to asenkron API)
        if (platform === 'youtube' || platform === 'instagram') {
            try {
                const loaderFormat = platform === 'instagram' ? '720' : (format || '720');
                const res = await fetch(`https://loader.to/ajax/download.php?format=${loaderFormat}&url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.success && data.progress_url) {
                    return NextResponse.json({
                        progress_url: data.progress_url
                    });
                } else {
                    throw new Error(platform === 'youtube' ? "YouTube bu videoyu gizlemiş veya yaş kısıtlaması var." : "Instagram gizli profilleri indiremiyoruz.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: `${platform === 'youtube' ? 'YouTube' : 'Instagram'} servisi çöktü: ` + err.message }, { status: 500 });
            }
        }

        // INSTAGRAM FOTO, FACEBOOK, FACEBOOK FOTO - RAPIDAPI
        if (platform === 'instagram-photo' || platform === 'facebook' || platform === 'facebook-photo') {
            const rapidApiKey = process.env.RAPIDAPI_KEY;

            if (!rapidApiKey) {
                return NextResponse.json({ error: "Sistem Bakımda: RapidAPI Key eksik. Lütfen yöneticinize başvurun." }, { status: 500 });
            }

            try {
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': rapidApiKey,
                        'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com'
                    }
                };

                // Yeni endpoint yapısına göre güncellendi
                const encodedUrl = encodeURIComponent(url);
                const apiUrl = platform.includes('instagram')
                    ? `https://social-media-video-downloader.p.rapidapi.com/smvd/get/instagram?url=${encodedUrl}`
                    : `https://social-media-video-downloader.p.rapidapi.com/smvd/get/facebook?url=${encodedUrl}`;

                const res = await fetch(apiUrl, options);
                const data = await res.json();

                if (res.status === 401 || res.status === 403 || data.message === "You are not subscribed to this API.") {
                    throw new Error("RapidAPI aboneliği aktif değil. Lütfen yöneticinizle iletişime geçin.");
                }

                // RapidAPI'nin yeni JSON yapısı: data.body.videos[] (videolar/resimler için) veya data.body.images[]
                // Attığın resimdeki yapıya göre içerikler data.body.videos veya data.contents.videos dizisinde dönüyor.

                // Resimdeki "contents" veya "body" objesine göre güvenli arama yapıyoruz:
                const contents = data.body || data.contents || data;
                let itemsList: any[] = [];

                if (contents.videos && Array.isArray(contents.videos)) itemsList = [...itemsList, ...contents.videos];
                if (contents.images && Array.isArray(contents.images)) itemsList = [...itemsList, ...contents.images];
                if (contents.links && Array.isArray(contents.links)) itemsList = [...itemsList, ...contents.links];

                if (itemsList.length > 0) {
                    let bestLink = itemsList[0].url || itemsList[0].link || itemsList[0];

                    // Eğer spesifik kalite/format isteniyorsa (RapidAPI genelde hd/sd veya 1080p etiketleriyle döner)
                    if (platform.includes('photo')) {
                        const imageLinks = itemsList.filter((l: any) => l.type === 'image' || (l.url && l.url.includes('.jpg')));
                        if (imageLinks.length > 0) bestLink = imageLinks[0].url || imageLinks[0].link;
                    } else {
                        const hdLinks = itemsList.filter((l: any) => l.label === 'HD' || l.label === '1080p' || l.quality === 'hd');
                        if (hdLinks.length > 0) bestLink = hdLinks[0].url || hdLinks[0].link;
                    }

                    // Eğer obje değil direkt string URL döndüyse onu al
                    if (typeof bestLink === 'object' && bestLink !== null) {
                        bestLink = bestLink.url || bestLink.link;
                    }

                    return NextResponse.json({
                        download_url: bestLink
                    });
                } else {
                    throw new Error(data.message || "İçerik indirilemedi veya gizli profil.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: err.message }, { status: 500 });
            }
        }

        return NextResponse.json({ error: 'Desteklenmeyen platform.' }, { status: 400 });

    } catch (error: any) {
        return NextResponse.json({ error: 'Sistem hatası: ' + error.message }, { status: 500 });
    }
}