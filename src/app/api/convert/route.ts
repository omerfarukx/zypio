import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';
import { promisify } from 'util';
import { supabase } from '@/lib/supabase';

const execAsync = promisify(exec);

export const maxDuration = 300; // API zaman aşımını uzatıyoruz (5 dakika)
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, format = 'mp4-best' } = body;

    // IP adresini al
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    if (!url) {
      return NextResponse.json({ error: 'Lütfen geçerli bir bağlantı (URL) giriniz.' }, { status: 400 });
    }

    // Basit güvenlik - URL format kontrolü
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?.*)?$/;
    if (!urlRegex.test(url)) {
      return NextResponse.json({ error: 'Girdiğiniz bağlantı geçersiz. Lütfen kontrol edip tekrar deneyiniz.' }, { status: 400 });
    }

    // Güvenlik: Rate Limit Kontrolü (Supabase üzerinden)
    if (ip !== 'unknown') {
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);

      const { count, error: countError } = await supabase
        .from('downloads_log')
        .select('*', { count: 'exact', head: true })
        .eq('ip_address', ip)
        .gte('created_at', oneHourAgo.toISOString());

      if (countError) {
        console.error('Rate limit kontrolünde hata:', countError);
      }

      if (count && count >= 20) {
        return NextResponse.json({ error: 'Saatlik işlem limitinize (20) ulaştınız. Lütfen daha sonra tekrar deneyiniz.' }, { status: 429 });
      }
    }

    const taskId = uuidv4();
    const downloadsDir = path.join(os.tmpdir(), 'zypio_downloads');

    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    const outputTemplate = path.join(downloadsDir, `${taskId}.%(ext)s`);

    console.log(`[${taskId}] İndirme işlemi başladı: ${url} -> ${format}`);

    const ytDlpPath = path.join(process.cwd(), 'bin', 'yt-dlp.exe');

    if (!fs.existsSync(ytDlpPath)) {
      throw new Error(`yt-dlp bulunamadı baba: ${ytDlpPath}`);
    }

    const args = [
      `"${ytDlpPath}"`,
      `"${url}"`,
      `--output "${outputTemplate}"`,
      `--no-check-certificates`,
      `--no-warnings`,
      `--prefer-free-formats`,
      `--add-header "referer:youtube.com"`,
      `--add-header "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"`
    ];

    // Format ve Kalite Seçenekleri
    if (format.startsWith('mp3')) {
      args.push('--extract-audio');
      args.push('--audio-format mp3');

      if (format === 'mp3-128k') {
        args.push('--audio-quality 128K');
      } else {
        args.push('--audio-quality 0'); // En iyi kalite (genelde 320k)
      }
    } else {
      // Video (MP4) Kaliteleri
      args.push('--merge-output-format mp4');

      switch (format) {
        case 'mp4-720p':
          args.push('--format "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720][ext=mp4]/best"');
          break;
        case 'mp4-480p':
          args.push('--format "bestvideo[height<=480][ext=mp4]+bestaudio[ext=m4a]/best[height<=480][ext=mp4]/best"');
          break;
        case 'mp4-360p':
          args.push('--format "bestvideo[height<=360][ext=mp4]+bestaudio[ext=m4a]/best[height<=360][ext=mp4]/best"');
          break;
        default: // mp4-best
          args.push('--format "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best"');
          break;
      }
    }

    const command = args.join(' ');

    // yt-dlp motorunu ateşle!
    await execAsync(command);

    const files = fs.readdirSync(downloadsDir);
    const downloadedFile = files.find(f => f.startsWith(taskId));

    if (!downloadedFile) {
      throw new Error('Dosya indirilemedi baba, platform veya yt-dlp patladı!');
    }

    const filePath = path.join(downloadsDir, downloadedFile);
    const fileBuffer = fs.readFileSync(filePath);

    fs.unlinkSync(filePath);
    console.log(`[${taskId}] Dosya sunucudan anında silindi. Teliften yırttık!`);

    const isAudio = format.startsWith('mp3');
    const responseFormat = isAudio ? 'mp3' : 'mp4';

    // Başarılı indirmeyi Supabase'e logla (Arka planda çalışır, response'u bekletmez)
    let platform = "unknown";
    if (url.includes("youtube.com") || url.includes("youtu.be")) platform = "youtube";
    else if (url.includes("tiktok.com")) platform = "tiktok";
    else if (url.includes("facebook.com")) platform = "facebook";
    else if (url.includes("instagram.com")) platform = "instagram";
    else if (url.includes("twitter.com") || url.includes("x.com")) platform = "twitter";

    supabase.from('downloads_log').insert([{
      ip_address: ip,
      platform: platform,
      format: format
    }]).then(({ error }) => {
      if (error) console.error("Supabase loglama hatası:", error.message);
    });

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Disposition': `attachment; filename="zypio_converted_${taskId}.${responseFormat}"`,
        'Content-Type': isAudio ? 'audio/mpeg' : 'video/mp4',
      },
    });

  } catch (error: any) {
    console.error('Hata patladı:', error);
    return NextResponse.json({ error: 'Sistem patladı: ' + error.message }, { status: 500 });
  }
}
