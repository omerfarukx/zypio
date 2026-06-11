import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AISummaryBlock } from '@/components/seo/AISummaryBlock';
import { CtaBanner } from '@/components/seo/CtaBanner';
import { UseCaseGrid } from '@/components/seo/UseCaseGrid';
import { SITE_URL, alternates } from '@/lib/seo/site';
import { getUseCases, uiText } from '@/lib/seo/content';

const isTR = (l: string) => l === 'tr';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = isTR(locale) ? 'Zypio Kullanım Senaryoları' : 'Zypio Use Cases';
  const description = isTR(locale)
    ? 'TikTok filigransız indirme, YouTube’u MP3’e çevirme, Instagram Reels kaydetme, carousel indirme ve profil fotoğrafı büyütme gibi gerçek kullanım senaryoları.'
    : 'Real use cases: download TikTok without watermark, convert YouTube to MP3, save Instagram Reels, download carousels and enlarge profile pictures.';
  return {
    title,
    description,
    alternates: alternates(locale, '/use-cases'),
    openGraph: { title: `${title} | Zypio`, description, url: `${SITE_URL}/${locale}/use-cases`, type: 'website' },
  };
}

export default async function UseCasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tr = isTR(locale);
  const ui = uiText(locale);
  const useCases = getUseCases(locale);

  return (
    <div className="w-full bg-[#0A0A0C] min-h-screen">
      <article className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <Breadcrumbs items={[{ name: ui.useCasesTitle, url: `/${locale}/use-cases` }]} />

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">{ui.useCasesTitle}</h1>

        <AISummaryBlock label={tr ? 'Kısa cevap' : 'Short answer'}>
          {tr
            ? 'Zypio, TikTok’u filigransız indirme, YouTube’u MP3’e çevirme, Instagram Reels ve carousel kaydetme, Facebook videosu indirme ve profil fotoğrafı büyütme gibi günlük görevler için kullanılır.'
            : 'Zypio is used for everyday tasks like downloading TikTok without a watermark, converting YouTube to MP3, saving Instagram Reels and carousels, downloading Facebook videos and enlarging profile pictures.'}
        </AISummaryBlock>

        <UseCaseGrid
          items={useCases.map((uc) => ({
            title: uc.title,
            description: uc.description,
            href: `/use-cases/${uc.slug}`,
          }))}
        />

        <CtaBanner
          title={tr ? 'İhtiyacınıza uygun aracı seçin' : 'Pick the tool you need'}
          subtitle={tr ? 'Tüm araçlar ücretsiz ve kayıt gerektirmez.' : 'Every tool is free and needs no account.'}
          ctaLabel={ui.allTools}
          href="/tools"
        />
      </article>
    </div>
  );
}
