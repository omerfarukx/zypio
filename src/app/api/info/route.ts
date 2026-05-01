import { NextResponse } from 'next/server';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { url, platform } = body;

        if (!url || !platform || platform === 'unknown') {
            return NextResponse.json({ error: 'Lütfen geçerli bir URL giriniz.' }, { status: 400 });
        }

        // TIKTOK & TIKTOK-PHOTO
        if (platform === 'tiktok' || platform === 'tiktok-photo') {
            try {
                const res = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.code === 0 && data.data) {
                    return NextResponse.json({
                        title: data.data.title || "TikTok Medyası",
                        thumbnail: data.data.cover || data.data.origin_cover || "https://logo.clearbit.com/www.tiktok.com?size=256"
                    });
                } else {
                    throw new Error("TikTok içeriği bulunamadı.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: 'TikTok verisi alınamadı: ' + err.message }, { status: 500 });
            }
        }

        // TWITTER & TWITTER-PHOTO (vxtwitter ücretsiz API'si)
        if (platform === 'twitter' || platform === 'twitter-photo') {
            try {
                // url: https://twitter.com/user/status/123 -> https://api.vxtwitter.com/user/status/123
                const vxUrl = url.replace('twitter.com', 'api.vxtwitter.com').replace('x.com', 'api.vxtwitter.com');
                const res = await fetch(vxUrl);
                const data = await res.json();

                if (data && data.text) {
                    return NextResponse.json({
                        title: data.text.substring(0, 50) + "...",
                        thumbnail: data.mediaURLs && data.mediaURLs.length > 0 ? data.mediaURLs[0] : "https://logo.clearbit.com/twitter.com?size=256"
                    });
                } else {
                    throw new Error("Tweet bulunamadı veya gizli.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: 'Twitter verisi alınamadı: ' + err.message }, { status: 500 });
            }
        }

        // YOUTUBE ve INSTAGRAM (Video) - loader.to
        if (platform === 'youtube' || platform === 'instagram') {
            try {
                const res = await fetch(`https://loader.to/ajax/download.php?format=720&url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.success && data.info) {
                    let thumbnail = data.info.image;
                    if (!thumbnail || thumbnail.includes("logo.clearbit.com")) {
                        thumbnail = platform === 'youtube' ? "https://logo.clearbit.com/www.youtube.com?size=256" : "https://logo.clearbit.com/www.instagram.com?size=256";
                    }

                    return NextResponse.json({
                        title: data.title || data.info.title || "Video",
                        thumbnail: thumbnail
                    });
                } else {
                    throw new Error("Video bilgileri gizli veya servis meşgul.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: `Video bilgileri alınamadı: ` + err.message }, { status: 500 });
            }
        }

        // INSTAGRAM FOTO, FACEBOOK, FACEBOOK FOTO - RAPIDAPI KULLANIMI
        if (platform === 'instagram-photo' || platform === 'facebook' || platform === 'facebook-photo') {
            const rapidApiKey = process.env.RAPIDAPI_KEY;

            if (!rapidApiKey) {
                // Eğer key yoksa sadece generic bir logo dönelim ki UI patlamasın. (Video indirme aşamasında hata verdireceğiz)
                return NextResponse.json({
                    title: `${platform.includes('instagram') ? 'Instagram' : 'Facebook'} İçeriği (RapidAPI Key Bekleniyor)`,
                    thumbnail: platform.includes('instagram') ? "https://logo.clearbit.com/www.instagram.com?size=256" : "https://logo.clearbit.com/www.facebook.com?size=256"
                });
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

                if (data && data.title) {
                    return NextResponse.json({
                        title: data.title || "Sosyal Medya İçeriği",
                        thumbnail: data.picture || (platform.includes('instagram') ? "https://logo.clearbit.com/www.instagram.com?size=256" : "https://logo.clearbit.com/www.facebook.com?size=256")
                    });
                } else {
                    throw new Error("İçerik gizli veya bulunamadı.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: `API Hatası: ` + err.message }, { status: 500 });
            }
        }

        return NextResponse.json({ error: 'Desteklenmeyen platform.' }, { status: 400 });

    } catch (error: any) {
        return NextResponse.json({ error: 'Sistem hatası: ' + error.message }, { status: 500 });
    }
}