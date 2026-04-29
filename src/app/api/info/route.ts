import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import os from 'os';

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

        const isWindows = os.platform() === 'win32';
        // Linux/Render ortamında Docker içindeki yt-dlp komutunu direkt çalıştır
        const ytDlpPath = isWindows ? path.join(process.cwd(), 'bin', 'yt-dlp.exe') : 'yt-dlp';

        if (isWindows && !fs.existsSync(ytDlpPath)) {
            throw new Error(`yt-dlp bulunamadı baba: ${ytDlpPath}`);
        }

        // Basit bir test: Sadece videonun meta verilerini (json) çek
        const command = `"${ytDlpPath}" "${url}" --dump-json --no-warnings --no-check-certificates`;

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
