import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AISummaryBlock } from '@/components/seo/AISummaryBlock';
import { CtaBanner } from '@/components/seo/CtaBanner';
import { FaqList } from '@/components/seo/FaqList';
import { InternalLinkBlock } from '@/components/seo/UseCaseGrid';
import { SITE_URL, alternates } from '@/lib/seo/site';
import { getFullFaq, shortAnswer, uiText } from '@/lib/seo/content';

const isTR = (l: string) => l === 'tr';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = isTR(locale) ? 'Zypio Sıkça Sorulan Sorular (SSS)' : 'Zypio Frequently Asked Questions (FAQ)';
  const description = isTR(locale)
    ? 'Zypio hakkında sık sorulan sorular: ücretsiz mi, güvenli mi, nasıl çalışır, hangi platformları destekler, uygulaması var mı ve daha fazlası.'
    : 'Frequently asked questions about Zypio: is it free, is it safe, how it works, which platforms it supports, does it have an app, and more.';
  return {
    title,
    description,
    alternates: alternates(locale, '/faq'),
    openGraph: { title: `${title} | Zypio`, description, url: `${SITE_URL}/${locale}/faq`, type: 'website' },
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tr = isTR(locale);
  const ui = uiText(locale);
  const faqs = getFullFaq(locale);

  return (
    <div className="w-full bg-[#0A0A0C] min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <Breadcrumbs items={[{ name: ui.faqTitle, url: `/${locale}/faq` }]} />

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">{ui.faqTitle}</h1>

        <AISummaryBlock label={tr ? 'Kısa cevap' : 'Short answer'}>{shortAnswer(locale, 'faq')}</AISummaryBlock>

        {/* FaqList emits the FAQPage JSON-LD for the full list */}
        <FaqList faqs={faqs} />

        <InternalLinkBlock
          title={ui.relatedTools}
          links={[
            { label: tr ? 'Zypio Nedir?' : 'What is Zypio?', href: '/what-is-zypio' },
            { label: tr ? 'Kullanım Senaryoları' : 'Use Cases', href: '/use-cases' },
            { label: tr ? 'Karşılaştırma' : 'Compare', href: '/compare' },
            { label: ui.allTools, href: '/tools' },
          ]}
        />

        <CtaBanner
          title={tr ? 'Sorunuzun cevabını bulamadınız mı?' : 'Didn’t find your answer?'}
          subtitle={tr ? 'Aracı doğrudan deneyin — bir bağlantı yapıştırmanız yeterli.' : 'Just try the tool directly — all you need is a link.'}
          ctaLabel={ui.startFree}
        />
      </article>
    </div>
  );
}
