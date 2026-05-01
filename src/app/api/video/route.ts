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

        // TIKTOK DP
        if (platform === 'tiktok-dp') {
            try {
                let uniqueId = url;
                if (url.includes('tiktok.com')) {
                    const match = url.match(/@([a-zA-Z0-9_.-]+)/);
                    if (match) uniqueId = match[1];
                }
                if (!uniqueId.startsWith('@') && !uniqueId.includes('http')) uniqueId = '@' + uniqueId;

                const res = await fetch(`https://tikwm.com/api/user/info?unique_id=${uniqueId}`);
                const data = await res.json();

                if (data.code === 0 && data.data && data.data.user) {
                    return NextResponse.json({
                        download_url: data.data.user.avatarLarger || data.data.user.avatarMedium || data.data.user.avatarThumb
                    });
                } else {
                    throw new Error("TikTok kullanıcısı bulunamadı.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: 'TikTok sunucularına bağlanırken hata: ' + err.message }, { status: 500 });
            }
        }

        // TWITTER DP
        if (platform === 'twitter-dp') {
            try {
                let username = url;
                if (url.includes('twitter.com') || url.includes('x.com')) {
                    const parts = url.split('/');
                    username = parts[parts.findIndex(p => p === 'twitter.com' || p === 'x.com') + 1];
                    username = username.split('?')[0];
                }
                username = username.replace('@', '');

                const res = await fetch(`https://api.vxtwitter.com/${username}`);
                const data = await res.json();

                if (data && data.profile_image_url) {
                    return NextResponse.json({
                        download_url: data.profile_image_url.replace('_normal', '_400x400')
                    });
                } else {
                    throw new Error("Twitter kullanıcısı bulunamadı.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: 'Twitter sunucularına bağlanılamadı: ' + err.message }, { status: 500 });
            }
        }

        // TIKTOK & TIKTOK-PHOTO İÇİN HIZLI API (tikwm)
        if (platform === 'tiktok' || platform === 'tiktok-photo') {
            try {
                const res = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.code === 0 && data.data) {
                    // Eğer fotoğraf (slideshow) ise
                    if (data.data.images && data.data.images.length > 0) {
                        return NextResponse.json({
                            download_url: data.data.images[0]
                        });
                    } else if (data.data.play || data.data.wmplay) {
                        // Normal video
                        return NextResponse.json({
                            download_url: format === 'watermark_free' ? data.data.play : data.data.wmplay
                        });
                    } else {
                        throw new Error("Bu linkte indirilebilir bir içerik bulunamadı.");
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

        // YOUTUBE (Video) İÇİN (loader.to asenkron API)
        if (platform === 'youtube') {
            try {
                const loaderFormat = format || '720';
                const res = await fetch(`https://loader.to/ajax/download.php?format=${loaderFormat}&url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.success && data.progress_url) {
                    return NextResponse.json({
                        progress_url: data.progress_url
                    });
                } else {
                    throw new Error("YouTube bu videoyu gizlemiş veya yaş kısıtlaması var.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: `YouTube servisi çöktü: ` + err.message }, { status: 500 });
            }
        }

        // INSTAGRAM (VİDEO/FOTO/DP), FACEBOOK (VİDEO/FOTO) - RAPIDAPI
        if (platform.includes('instagram') || platform.includes('facebook')) {
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

                let finalUrl = url;
                if (platform === 'instagram-dp' && !url.includes('instagram.com')) {
                    finalUrl = `https://www.instagram.com/${url.replace('@', '')}/`;
                }

                const encodedUrl = encodeURIComponent(finalUrl);
                const apiUrl = `https://social-media-video-downloader.p.rapidapi.com/smvd/get/all?url=${encodedUrl}`;

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

                // Eğer dizi dönmeyip direkt url döndüyse
                if (itemsList.length === 0 && (contents.url || contents.video || contents.link)) {
                    itemsList.push(contents);
                }

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