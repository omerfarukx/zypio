import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
// Basit In-Memory Rate Limiting (Vercel instance başına çalışır)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 dakika
const MAX_REQUESTS = 15; // 1 dakikada maks 15 işlem isteği

  if (req.nextUrl.pathname.startsWith('/api/')) {
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // Rate Limit Sadece Dönüştürme/Analiz İsteklerine Uygulanır
    if (req.nextUrl.pathname.startsWith('/api/video') || req.nextUrl.pathname.startsWith('/api/info')) {
      const ip = req.headers.get('x-forwarded-for') || 'unknown';
      const now = Date.now();
      const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };

      if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + RATE_LIMIT_WINDOW;
      } else {
        record.count++;
      }

      rateLimitMap.set(ip, record);

      if (record.count > MAX_REQUESTS) {
        return new NextResponse(
          JSON.stringify({ error: "Sistem güvenliği: Çok fazla istek gönderdiniz. Lütfen 1 dakika bekleyip tekrar deneyin." }), 
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Retry-After': Math.ceil((record.resetTime - now) / 1000).toString(),
            }
          }
        );
      }
    }

    const res = NextResponse.next();
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res;
  }

  // Çoklu dil (i18n) yönlendirmesi
  return intlMiddleware(req);
}

export const config = {
  // API rotalarını da middleware'e dahil et
  matcher: ['/', '/(tr|en)/:path*', '/watch', '/api/:path*']
};
