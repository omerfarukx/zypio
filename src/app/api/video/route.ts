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
                    username = parts[parts.findIndex((p: string) => p === 'twitter.com' || p === 'x.com') + 1];
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
                return NextResponse.json({ error: 'TikTok sunucularına bağlanırken bir hata oluştu: ' + err.message }, { status: 500 });
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

        // YOUTUBE, INSTAGRAM, FACEBOOK (Video) İÇİN (loader.to asenkron API)
        if (platform === 'youtube' || platform === 'instagram' || platform === 'facebook') {
            try {
                const loaderFormat = format || '720';
                const res = await fetch(`https://loader.to/ajax/download.php?format=${loaderFormat}&url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.success && data.progress_url) {
                    return NextResponse.json({
                        progress_url: data.progress_url
                    });
                } else {
                    throw new Error("İçerik gizli, yaş kısıtlaması var veya desteklenmiyor.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: 'Servis geçici olarak kullanılamıyor: ' + err.message }, { status: 500 });
            }
        }

        // INSTAGRAM DP - API YÖNTEMİ
        if (platform === 'instagram-dp') {
            try {
                let username = url;
                if (username.includes('instagram.com')) {
                    const match = username.match(/instagram\.com\/([^/?]+)/);
                    if (match) username = match[1];
                }
                username = username.replace('@', '').trim();

                const igRes = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
                    headers: {
                        'x-ig-app-id': '936619743392459',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin'
                    }
                });

                const data = await igRes.json();
                const hdUrl = data?.data?.user?.profile_pic_url_hd;

                if (hdUrl) {
                    return NextResponse.json({
                        download_url: hdUrl
                    });
                } else {
                    throw new Error("Profil bulunamadı veya gizli.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: "Fotoğraf alınamadı: " + err.message }, { status: 500 });
            }
        }

        // INSTAGRAM FOTO - instagram-url-direct paketi ile (çoklu fotoğraf desteği)
        if (platform === 'instagram-photo') {
            try {
                const { instagramGetUrl } = await import('instagram-url-direct');
                const result = await instagramGetUrl(url);

                if (result && result.url_list && result.url_list.length > 0) {
                    // Tüm medya URL'lerini döndür (carousel desteği)
                    return NextResponse.json({
                        download_urls: result.url_list
                    });
                } else {
                    throw new Error("Bu gönderide indirilebilir fotoğraf bulunamadı.");
                }
            } catch (err: any) {
                // Fallback: loader.to ile dene (tek dosya)
                try {
                    const res = await fetch(`https://loader.to/ajax/download.php?format=jpg&url=${encodeURIComponent(url)}`);
                    const data = await res.json();

                    if (data.success && data.progress_url) {
                        return NextResponse.json({
                            progress_url: data.progress_url
                        });
                    }
                } catch { /* fallback da başarısız */ }

                return NextResponse.json({ error: 'Instagram fotoğrafı alınamadı: ' + err.message }, { status: 500 });
            }
        }

        // FACEBOOK FOTO - loader.to API ile
        if (platform === 'facebook-photo') {
            try {
                const res = await fetch(`https://loader.to/ajax/download.php?format=jpg&url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.success && data.progress_url) {
                    return NextResponse.json({
                        progress_url: data.progress_url
                    });
                } else {
                    throw new Error("Bu gönderide indirilebilir fotoğraf bulunamadı veya gönderi gizli.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: 'Facebook fotoğrafı alınamadı: ' + err.message }, { status: 500 });
            }
        }

        return NextResponse.json({ error: 'Desteklenmeyen platform.' }, { status: 400 });

    } catch (error: any) {
        return NextResponse.json({ error: 'Sistem hatası: ' + error.message }, { status: 500 });
    }
}