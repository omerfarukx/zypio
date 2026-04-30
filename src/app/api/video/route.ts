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

        // TIKTOK İÇİN HIZLI API (tikwm)
        if (platform === 'tiktok') {
            try {
                const res = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.code === 0 && data.data && data.data.play) {
                    return NextResponse.json({
                        download_url: format === 'watermark_free' ? data.data.play : data.data.wmplay
                    });
                } else {
                    throw new Error("TikTok videosu gizli veya silinmiş olabilir.");
                }
            } catch (err: any) {
                return NextResponse.json({ error: 'TikTok sunucularına bağlanırken patladık: ' + err.message }, { status: 500 });
            }
        }

        // YOUTUBE ve INSTAGRAM İÇİN (loader.to asenkron API)
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

        return NextResponse.json({ error: 'Desteklenmeyen platform.' }, { status: 400 });

    } catch (error: any) {
        return NextResponse.json({ error: 'Sistem hatası: ' + error.message }, { status: 500 });
    }
}