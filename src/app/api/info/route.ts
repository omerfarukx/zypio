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

        // YOUTUBE, INSTAGRAM, FACEBOOK (Video) - loader.to
        if (platform === 'youtube' || platform === 'instagram' || platform === 'facebook') {
            try {
                const res = await fetch(`https://loader.to/ajax/download.php?format=720&url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.success && data.info) {
                    let thumbnail = data.info.image;
                    if (!thumbnail || thumbnail.includes("logo.clearbit.com")) {
                        thumbnail = `https://logo.clearbit.com/www.${platform}.com?size=256`;
                    }

                    return NextResponse.json({
                        title: data.title || data.info.title || `${platform} İçeriği`,
                        thumbnail: thumbnail
                    });
                } else {
                    throw new Error("İçerik gizli veya servis meşgul.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: `Bilgiler alınamadı: ` + err.message }, { status: 500 });
            }
        }

        // INSTAGRAM DP - AÇIK API YÖNTEMİ
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
                        title: `@${username} Profil Fotoğrafı`,
                        thumbnail: hdUrl
                    });
                }
            } catch (err: any) {
                console.error("IG DP Error:", err.message);
            }

            // Fallback
            return NextResponse.json({
                title: `Instagram Profil Fotoğrafı`,
                thumbnail: `https://logo.clearbit.com/www.instagram.com?size=256`
            });
        }

        // INSTAGRAM FOTO / FACEBOOK FOTO
        if (platform === 'instagram-photo' || platform === 'facebook-photo') {
            return NextResponse.json({
                title: `${platform} İçeriği`,
                thumbnail: `https://logo.clearbit.com/www.${platform.split('-')[0]}.com?size=256`
            });
        }

        return NextResponse.json({ error: 'Desteklenmeyen platform.' }, { status: 400 });

    } catch (error: any) {
        return NextResponse.json({ error: 'Sistem hatası: ' + error.message }, { status: 500 });
    }
}