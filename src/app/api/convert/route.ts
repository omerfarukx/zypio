import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
// @ts-ignore
import ytdl from 'ytdl-core-enhanced';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';
import { promisify } from 'util';
import { Readable } from 'stream';

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

    // Güvenlik: Rate Limit Kontrolü (Geçici olarak iptal edildi çünkü veritabanı yoruyor ve yanlış limitliyor)
    /*
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
    */

    const isAudio = format.startsWith('mp3');
    const responseFormat = isAudio ? 'mp3' : 'mp4';

    // Loglama fonksiyonu
    const logDownload = (platform: string) => {
      supabase.from('downloads_log').insert([{
        ip_address: ip,
        platform: platform,
        format: format
      }]).then(({ error }) => {
        if (error) console.error("Supabase loglama hatası:", error.message);
      });
    };

    // EĞER YOUTUBE İSE (ytdl-core-enhanced kullanarak Vercel banını aşıyoruz)
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const stream = ytdl(url, {
        filter: isAudio ? 'audioonly' : 'audioandvideo',
        quality: 'highest'
      });

      // Stream'i direkt Response olarak döndürüyoruz (Memory patlamasın diye)
      const readableWebStream = new ReadableStream({
        start(controller) {
          stream.on('data', (chunk: any) => controller.enqueue(chunk));
          stream.on('end', () => controller.close());
          stream.on('error', (err: any) => controller.error(err));
        }
      });

      logDownload('youtube');

      return new NextResponse(readableWebStream, {
        headers: {
          'Content-Disposition': `attachment; filename="zypio_converted.${responseFormat}"`,
          'Content-Type': isAudio ? 'audio/mpeg' : 'video/mp4',
        },
      });
    }

    // EĞER DİĞER PLATFORMLAR İSE (yt-dlp kullanıyoruz)
    const taskId = uuidv4();
    const downloadsDir = path.join(os.tmpdir(), 'zypio_downloads');

    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    const outputTemplate = path.join(downloadsDir, `${taskId}.%(ext)s`);

    const isWindows = os.platform() === 'win32';
    const ytDlpPath = isWindows ? path.join(process.cwd(), 'bin', 'yt-dlp.exe') : 'yt-dlp';

    if (isWindows && !fs.existsSync(ytDlpPath)) {
      throw new Error(`yt-dlp bulunamadı: ${ytDlpPath}`);
    }

    const args = [
      `"${ytDlpPath}"`,
      `"${url}"`,
      `--no-warnings`,
      `--no-check-certificates`,
      `-o "${outputTemplate}"`
    ];

    if (isAudio) {
      args.push('--extract-audio');
      args.push('--audio-format mp3');
      args.push('--audio-quality 0');
    } else {
      args.push('--merge-output-format mp4');
      args.push('--format "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best"');
    }

    const command = args.join(' ');
    await execAsync(command);

    const files = fs.readdirSync(downloadsDir);
    const downloadedFile = files.find(f => f.startsWith(taskId));

    if (!downloadedFile) {
      throw new Error('Dosya indirilemedi!');
    }

    const filePath = path.join(downloadsDir, downloadedFile);
    const fileBuffer = fs.readFileSync(filePath);

    fs.unlinkSync(filePath);

    let platform = "unknown";
    if (url.includes("tiktok.com")) platform = "tiktok";
    else if (url.includes("facebook.com")) platform = "facebook";
    else if (url.includes("instagram.com")) platform = "instagram";
    else if (url.includes("twitter.com") || url.includes("x.com")) platform = "twitter";

    logDownload(platform);

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
