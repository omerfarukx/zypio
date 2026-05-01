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

        // TIKTOK DP
        if (platform === 'tiktok-dp') {
            try {
                let uniqueId = url;
                if (url.includes('tiktok.com')) {
                    const match = url.match(/@([a-zA-Z0-9_.-]+)/);
                    if (match) uniqueId = match[1];
                }
                if (!uniqueId.startsWith('@') && !uniqueId.includes('http')) uniqueId = '@' + uniqueId;
                // If it's still a full URL but not matching @, tikwm might fail, but let's try.

                const res = await fetch(`https://tikwm.com/api/user/info?unique_id=${uniqueId}`);
                const data = await res.json();

                if (data.code === 0 && data.data && data.data.user) {
                    return NextResponse.json({
                        title: `${data.data.user.nickname} (@${data.data.user.uniqueId}) TikTok DP`,
                        thumbnail: data.data.user.avatarLarger || data.data.user.avatarMedium || data.data.user.avatarThumb
                    });
                } else {
                    throw new Error("Kullanıcı bulunamadı veya gizli.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: 'TikTok kullanıcı verisi alınamadı: ' + err.message }, { status: 500 });
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

                if (data && data.name) {
                    const hdProfilePic = data.profile_image_url ? data.profile_image_url.replace('_normal', '_400x400') : "https://logo.clearbit.com/twitter.com?size=256";
                    return NextResponse.json({
                        title: `${data.name} (@${data.screen_name}) X DP`,
                        thumbnail: hdProfilePic
                    });
                } else {
                    throw new Error("Kullanıcı bulunamadı veya gizli.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: 'Twitter kullanıcı verisi alınamadı: ' + err.message }, { status: 500 });
            }
        }

        // TIKTOK & TIKTOK-PHOTO
        if (platform === 'tiktok' || platform === 'tiktok-photo') {
            try {
                const res = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.code === 0 && data.data) {
                    let thumb = data.data.cover || data.data.origin_cover;
                    if (!thumb && data.data.images && data.data.images.length > 0) {
                        thumb = data.data.images[0];
                    }

                    return NextResponse.json({
                        title: data.data.title || "TikTok Medyası",
                        thumbnail: thumb || "https://logo.clearbit.com/www.tiktok.com?size=256"
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

        // YOUTUBE (Video) - loader.to
        if (platform === 'youtube') {
            try {
                const res = await fetch(`https://loader.to/ajax/download.php?format=720&url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.success && data.info) {
                    let thumbnail = data.info.image;
                    if (!thumbnail || thumbnail.includes("logo.clearbit.com")) {
                        thumbnail = "https://logo.clearbit.com/www.youtube.com?size=256";
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

        // INSTAGRAM (VİDEO/FOTO/DP), FACEBOOK (VİDEO/FOTO) - RAPIDAPI KULLANIMI
        if (platform.includes('instagram') || platform.includes('facebook')) {
            const rapidApiKey = process.env.RAPIDAPI_KEY;

            if (!rapidApiKey) {
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

                const contents = data.body || data.contents || data;

                if (contents) {
                    return NextResponse.json({
                        title: contents.title || contents.desc || "Sosyal Medya İçeriği",
                        thumbnail: contents.picture || contents.thumbnail || (platform.includes('instagram') ? "https://logo.clearbit.com/www.instagram.com?size=256" : "https://logo.clearbit.com/www.facebook.com?size=256")
                    });
                } else {
                    // API'den gelen gerçek hatayı yakalayalım
                    throw new Error(data.message || "İçerik gizli veya bulunamadı.");
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