import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // Backend - Frontend ayrımı için CORS ayarları (Vercel -> Render iletişimi)
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
