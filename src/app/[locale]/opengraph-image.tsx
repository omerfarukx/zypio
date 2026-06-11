import { ImageResponse } from 'next/og';

export const alt = 'Zypio — Free Video & Media Downloader';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = locale === 'tr';
  const heading = tr ? 'Ücretsiz Video ve Medya İndirici' : 'Free Video & Media Downloader';
  const tagline = 'YouTube · Instagram · TikTok · Facebook · X';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0A0A0C 0%, #14142A 60%, #1C1230 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
          <div
            style={{
              width: 96,
              height: 96,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 24,
              background: 'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
              fontSize: 60,
              fontWeight: 800,
            }}
          >
            Z
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -1 }}>Zypio</div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>{heading}</div>
        <div style={{ fontSize: 30, color: '#9CA3AF', marginTop: 28 }}>{tagline}</div>
      </div>
    ),
    { ...size },
  );
}
