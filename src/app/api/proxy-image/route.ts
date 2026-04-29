import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return new NextResponse('URL eksik', { status: 400 });
    }

    try {
        const response = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                'Referer': 'https://www.instagram.com/'
            },
        });

        if (!response.ok) {
            throw new Error(`Resim çekilemedi: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Resmin formatını al (yoksa jpeg varsay)
        const contentType = response.headers.get('content-type') || 'image/jpeg';

        // Orijinal resmi proxy üzerinden kendi sunucumuzdan dönüyoruz
        // Böylece tarayıcı CORS veya hotlinking (çalıntı resim) hatasına düşmez
        return new NextResponse(buffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400', // 1 gün önbellekte tut
                'Access-Control-Allow-Origin': '*'
            },
        });
    } catch (error) {
        console.error('Thumbnail Proxy Hatası:', error);
        // Hata olursa varsayılan bir resme yönlendir (redirect)
        return NextResponse.redirect('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop');
    }
}
