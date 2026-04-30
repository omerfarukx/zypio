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

        // TIKTOK
        if (platform === 'tiktok') {
            try {
                const res = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.code === 0 && data.data) {
                    return NextResponse.json({
                        title: data.data.title || "TikTok Videosu",
                        thumbnail: data.data.cover || data.data.origin_cover || "https://logo.clearbit.com/www.tiktok.com?size=256"
                    });
                } else {
                    throw new Error("TikTok videosu bulunamadı.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: 'TikTok verisi alınamadı: ' + err.message }, { status: 500 });
            }
        }

        // YOUTUBE ve INSTAGRAM (loader.to'dan hızlı info alıyoruz)
        if (platform === 'youtube' || platform === 'instagram') {
            try {
                const res = await fetch(`https://loader.to/ajax/download.php?format=720&url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.success && data.info) {
                    let thumbnail = data.info.image;
                    // Eğer loader.to instagram için geçerli bir kapak bulamazsa logo gösterelim
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

        return NextResponse.json({ error: 'Desteklenmeyen platform.' }, { status: 400 });

    } catch (error: any) {
        return NextResponse.json({ error: 'Sistem hatası: ' + error.message }, { status: 500 });
    }
}