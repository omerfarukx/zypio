import { NextResponse } from 'next/server';
// @ts-ignore
import ytdl from 'ytdl-core-enhanced';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import os from 'os';
import { supabase } from '@/lib/supabase';

const execAsync = promisify(exec);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { url } = body;

        // IP adresini al
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

        if (!url) {
            return NextResponse.json({ error: 'Lütfen geçerli bir bağlantı (URL) giriniz.' }, { status: 400 });
        }

        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?.*)?$/;
        if (!urlRegex.test(url)) {
            return NextResponse.json({ error: 'Girdiğiniz bağlantı geçersiz. Lütfen kontrol edip tekrar deneyiniz.' }, { status: 400 });
        }

        // Güvenlik: Rate Limit Kontrolü (Geçici olarak iptal edildi çünkü veritabanı yoruyor ve yanlış limitliyor)
        /*
        if (ip !== 'unknown') {
            const oneHourAgo = new Date();
            oneHourAgo.setHours(oneHourAgo.getHours() - 1);

            const { count, error: countError } = await supabase
                .from('info_log')
                .select('*', { count: 'exact', head: true })
                .eq('ip_address', ip)
                .gte('created_at', oneHourAgo.toISOString());

            if (countError && countError.code !== '42P01') { // Tablo yoksa umursama
                console.error('Rate limit kontrolünde hata:', countError);
            }

            if (count && count >= 50) { // Info isteği limiti (saatlik 50)
                return NextResponse.json({ error: 'Saatlik işlem limitinize ulaştınız. Lütfen daha sonra tekrar deneyiniz.' }, { status: 429 });
            }

            // Log the info request (asenkron, beklemez)
            supabase.from('info_log').insert([{ ip_address: ip, url: url }]).then(({ error }) => {
                 if (error && error.code !== '42P01') console.error("Supabase loglama hatası:", error.message);
            });
        }
        */

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
