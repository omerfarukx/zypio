import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ error: 'Lütfen geçerli bir bağlantı (URL) giriniz.' }, { status: 400 });
        }

        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?.*)?$/;
        if (!urlRegex.test(url)) {
            return NextResponse.json({ error: 'Girdiğiniz bağlantı geçersiz. Lütfen kontrol edip tekrar deneyiniz.' }, { status: 400 });
        }

        const ytDlpPath = path.join(process.cwd(), 'bin', 'yt-dlp.exe');

        if (!fs.existsSync(ytDlpPath)) {
            throw new Error(`yt-dlp bulunamadı baba: ${ytDlpPath}`);
        }

        // Videoyu indirme, sadece JSON olarak bilgilerini ver (-j veya --dump-json)
        const args = [
            `"${ytDlpPath}"`,
            `"${url}"`,
            `--dump-json`,
            `--no-warnings`,
            `--add-header "referer:youtube.com"`,
            `--add-header "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"`
        ];

        const command = args.join(' ');

        const { stdout } = await execAsync(command);

        const videoInfo = JSON.parse(stdout);

        return NextResponse.json({
            title: videoInfo.title,
            thumbnail: videoInfo.thumbnail,
            duration: videoInfo.duration, // saniye cinsinden
            extractor: videoInfo.extractor_key // Hangi siteden (Youtube, Tiktok vb.)
        });

    } catch (error: any) {
        console.error('Info çekerken hata patladı:', error);
        return NextResponse.json({ error: 'Videonun bilgileri alınamadı: ' + error.message }, { status: 500 });
    }
}
