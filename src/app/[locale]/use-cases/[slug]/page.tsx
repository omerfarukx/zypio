import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ConverterForm } from '@/components/ConverterForm';
import { AISummaryBlock } from '@/components/seo/AISummaryBlock';
import { CtaBanner } from '@/components/seo/CtaBanner';
import { InternalLinkBlock } from '@/components/seo/UseCaseGrid';
import { SITE_URL, alternates } from '@/lib/seo/site';
import { getUseCases, uiText } from '@/lib/seo/content';

const isTR = (l: string) => l === 'tr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const uc = getUseCases(locale).find((u) => u.slug === slug);
  if (!uc) return {};
  return {
    title: uc.title,
    description: uc.description,
    alternates: alternates(locale, `/use-cases/${slug}`),
    openGraph: { title: `${uc.title} | Zypio`, description: uc.description, url: `${SITE_URL}/${locale}/use-cases/${slug}`, type: 'article' },
  };
}

export default async function UseCaseDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tr = isTR(locale);
  const ui = uiText(locale);
  const all = getUseCases(locale);
  const uc = all.find((u) => u.slug === slug);
  if (!uc) notFound();

  const others = all.filter((u) => u.slug !== slug).slice(0, 4);

  return (
    <div className="w-full bg-[#0A0A0C] min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <Breadcrumbs
          items={[
            { name: ui.useCasesTitle, url: `/${locale}/use-cases` },
            { name: uc.title, url: `/${locale}/use-cases/${slug}` },
          ]}
        />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">{uc.title}</h1>

        <AISummaryBlock label={tr ? 'Kısa cevap' : 'Short answer'}>{uc.description}</AISummaryBlock>

        {/* Live tool, deep-linked to the right platform context */}
        <section className="my-8" aria-label={tr ? 'Aracı kullan' : 'Use the tool'}>
          <ConverterForm activeContext={uc.toolHref.replace('/platform/', '')} />
        </section>

        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4">
          <h2 className="text-2xl font-bold text-white">{tr ? 'Nasıl yapılır?' : 'How to do it'}</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>{tr ? 'İndirmek istediğiniz herkese açık bağlantıyı kopyalayın.' : 'Copy the public link you want to download.'}</li>
            <li>{tr ? 'Yukarıdaki kutuya yapıştırın ve “Analiz Et” deyin.' : 'Paste it into the box above and click “Analyze”.'}</li>
            <li>{tr ? 'İstediğiniz kalite/formatı seçin ve indirin.' : 'Choose your quality/format and download.'}</li>
          </ol>
          <p>
            {tr
              ? 'Kayıt gerekmez, dosyalar saklanmaz ve işlem tarayıcıda gerçekleşir. Yalnızca herkese açık içeriklerle çalışır.'
              : 'No account is required, files are not stored, and it runs in your browser. It works only with public content.'}
          </p>
        </div>

        <InternalLinkBlock
          title={ui.relatedTools}
          links={[
            ...others.map((o) => ({ label: o.title, href: `/use-cases/${o.slug}` })),
            { label: ui.allTools, href: '/tools' },
          ]}
        />

        <CtaBanner
          title={tr ? 'Başka bir şey mi indireceksiniz?' : 'Need to download something else?'}
          subtitle={tr ? 'Tüm platform araçlarına göz atın.' : 'Browse every platform tool.'}
          ctaLabel={ui.allTools}
          href="/tools"
        />
      </article>
    </div>
  );
}
