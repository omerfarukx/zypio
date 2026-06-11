import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AISummaryBlock } from '@/components/seo/AISummaryBlock';
import { CtaBanner } from '@/components/seo/CtaBanner';
import { InternalLinkBlock } from '@/components/seo/UseCaseGrid';
import { SITE_URL, alternates } from '@/lib/seo/site';
import { getAudiences, uiText } from '@/lib/seo/content';

const isTR = (l: string) => l === 'tr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; audience: string }>;
}): Promise<Metadata> {
  const { locale, audience } = await params;
  const a = getAudiences(locale).find((x) => x.slug === audience);
  if (!a) return {};
  return {
    title: a.title,
    description: a.intro,
    alternates: alternates(locale, `/for/${audience}`),
    openGraph: { title: `${a.title} | Zypio`, description: a.intro, url: `${SITE_URL}/${locale}/for/${audience}`, type: 'article' },
  };
}

export default async function AudiencePage({
  params,
}: {
  params: Promise<{ locale: string; audience: string }>;
}) {
  const { locale, audience } = await params;
  const tr = isTR(locale);
  const ui = uiText(locale);
  const all = getAudiences(locale);
  const a = all.find((x) => x.slug === audience);
  if (!a) notFound();

  return (
    <div className="w-full bg-[#0A0A0C] min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <Breadcrumbs
          items={[
            { name: tr ? 'Kimler için' : 'Audiences', url: `/${locale}/use-cases` },
            { name: a.title, url: `/${locale}/for/${audience}` },
          ]}
        />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">{a.title}</h1>

        <AISummaryBlock label={tr ? 'Kısa cevap' : 'Short answer'}>{a.intro}</AISummaryBlock>

        <ul className="space-y-3 my-8">
          {a.points.map((p, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <InternalLinkBlock
          title={ui.relatedTools}
          links={[
            { label: tr ? 'YouTube İndirici' : 'YouTube Downloader', href: '/platform/youtube' },
            { label: tr ? 'TikTok Filigransız' : 'TikTok No Watermark', href: '/platform/tiktok' },
            { label: tr ? 'Instagram Reels' : 'Instagram Reels', href: '/platform/instagram' },
            { label: ui.useCasesTitle, href: '/use-cases' },
          ]}
        />

        <CtaBanner
          title={tr ? 'Zypio’yu ücretsiz deneyin' : 'Try Zypio free'}
          subtitle={tr ? 'Kayıt yok, kurulum yok. Bir bağlantı yapıştırın ve indirin.' : 'No sign-up, no install. Paste a link and download.'}
          ctaLabel={ui.startFree}
        />
      </article>
    </div>
  );
}
