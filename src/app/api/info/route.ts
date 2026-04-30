import { NextResponse } from 'next/server';
// @ts-ignore
import ytdl from 'ytdl-core-enhanced';
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

        // Eğer YouTube ise ytdl-core-enhanced kullanıyoruz (bot banını poToken ile aşıyor)
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const info = await ytdl.getInfo(url);
            return NextResponse.json({
                title: info.videoDetails.title,
                thumbnail: info.videoDetails.thumbnails[0]?.url || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600",
                duration: parseInt(info.videoDetails.lengthSeconds || "0"),
                extractor: "youtube"
            });
        }

        // Diğer platformlar için yt-dlp kullanmaya devam ediyoruz
        const isWindows = os.platform() === 'win32';
        const ytDlpPath = isWindows ? path.join(process.cwd(), 'bin', 'yt-dlp.exe') : 'yt-dlp';

        if (isWindows && !fs.existsSync(ytDlpPath)) {
            throw new Error(`yt-dlp bulunamadı: ${ytDlpPath}`);
        }

        const command = `"${ytDlpPath}" "${url}" --dump-json --no-warnings --no-check-certificates`;
        const { stdout } = await execAsync(command);
        const videoInfo = JSON.parse(stdout);

        return NextResponse.json({
            title: videoInfo.title,
            thumbnail: videoInfo.thumbnail,
            duration: videoInfo.duration,
            extractor: videoInfo.extractor_key
        });

    } catch (error: any) {
        console.error('Info çekerken hata patladı:', error);
        return NextResponse.json({ error: 'Videonun bilgileri alınamadı: ' + error.message }, { status: 500 });
    }
}
