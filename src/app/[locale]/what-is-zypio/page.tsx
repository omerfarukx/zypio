import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AISummaryBlock } from '@/components/seo/AISummaryBlock';
import { CtaBanner } from '@/components/seo/CtaBanner';
import { FaqList } from '@/components/seo/FaqList';
import { InternalLinkBlock } from '@/components/seo/UseCaseGrid';
import { RelatedQuestions } from '@/components/seo/RelatedQuestions';
import { StructuredData } from '@/components/seo/StructuredData';
import { webApplicationSchema } from '@/lib/seo/structured-data';
import { SITE_URL, alternates, SUPPORTED_NETWORKS } from '@/lib/seo/site';
import { getFullFaq, shortAnswer, uiText } from '@/lib/seo/content';

const isTR = (l: string) => l === 'tr';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = isTR(locale) ? 'Zypio Nedir? Ücretsiz Sosyal Medya İndirici' : 'What Is Zypio? Free Social Media Downloader';
  const description = isTR(locale)
    ? 'Zypio, YouTube, Instagram, TikTok, Facebook ve X’ten herkese açık video, fotoğraf ve profil fotoğraflarını kayıt olmadan indiren ücretsiz, web tabanlı bir araçtır.'
    : 'Zypio is a free, web-based tool that downloads public videos, photos and profile pictures from YouTube, Instagram, TikTok, Facebook and X — no account required.';
  return {
    title,
    description,
    alternates: alternates(locale, '/what-is-zypio'),
    openGraph: { title: `${title} | Zypio`, description, url: `${SITE_URL}/${locale}/what-is-zypio`, type: 'article' },
  };
}

export default async function WhatIsZypioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tr = isTR(locale);
  const ui = uiText(locale);
  const faqs = getFullFaq(locale).slice(0, 8);

  const breadcrumbs = [{ name: tr ? 'Zypio Nedir?' : 'What is Zypio?', url: `/${locale}/what-is-zypio` }];

  return (
    <div className="w-full bg-[#0A0A0C] min-h-screen">
      <StructuredData
        data={webApplicationSchema({
          locale,
          description: tr
            ? 'YouTube, Instagram, TikTok, Facebook ve X için ücretsiz, kayıt gerektirmeyen medya indirici.'
            : 'Free, no-account media downloader for YouTube, Instagram, TikTok, Facebook and X.',
          url: `${SITE_URL}/${locale}/what-is-zypio`,
        })}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
          {tr ? 'Zypio Nedir?' : 'What Is Zypio?'}
        </h1>

        <AISummaryBlock label={tr ? 'Kısa cevap' : 'Short answer'}>
          {shortAnswer(locale, 'whatIs')}
        </AISummaryBlock>

        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-5">
          <p>
            {tr
              ? 'Zypio (marka adıyla “Zypio Convert”), sosyal medyadaki herkese açık içerikleri cihazınıza kaydetmenizi sağlayan tarayıcı tabanlı bir indirme ve dönüştürme aracıdır. Bir bağlantı yapıştırırsınız, Zypio platformu otomatik tanır, içeriği önizler ve kalite/format seçtikten sonra doğrudan indirme sunar.'
              : 'Zypio (brand name “Zypio Convert”) is a browser-based downloader and converter that lets you save public social-media content to your device. You paste a link, Zypio auto-detects the platform, previews the content, and after you choose a quality/format it hands you a direct download.'}
          </p>

          <h2 className="text-2xl font-bold text-white">{tr ? 'Ne yapar?' : 'What does it do?'}</h2>
          <p>
            {tr
              ? `Beş büyük platformu — ${SUPPORTED_NETWORKS.join(', ')} — üç iş türünde destekler: video (YouTube için MP3 ses çıkarma dahil MP4), fotoğraf (Instagram/TikTok carousel ve slayt gönderileri dahil) ve profil fotoğrafı (DP) büyütme.`
              : `It supports five major platforms — ${SUPPORTED_NETWORKS.join(', ')} — across three job types: video (MP4, plus MP3 audio extraction for YouTube), photo (including Instagram/TikTok carousels and slideshows), and profile-picture (DP) enlargement.`}
          </p>

          <h2 className="text-2xl font-bold text-white">{tr ? 'Kimler için?' : 'Who is it for?'}</h2>
          <p>
            {tr
              ? 'Kayıt olmadan ve uygulama kurmadan herkese açık bir video, fotoğraf veya profil fotoğrafı kaydetmek isteyen herkes için. Filigransız klip arayan içerik üreticileri, kaynak medya toplayan editörler ve ders videolarını MP3’e çeviren öğrenciler tipik kullanıcılardır.'
              : 'Anyone who wants to save a public video, photo or profile picture without registering or installing an app. Typical users include creators wanting watermark-free clips, editors collecting source media, and students converting lecture videos to MP3.'}
          </p>

          <h2 className="text-2xl font-bold text-white">{tr ? 'Neden farklı?' : 'How is it different?'}</h2>
          <p>
            {tr
              ? 'Her işlem tek bir karmaşık sayfaya yığılmaz; her platform için ayrı, sade bir sayfa vardır. Kayıt yoktur, dosyalar saklanmaz ve yalnızca herkese açık içerik işlenir. Mobil uygulaması yoktur; tamamen web tabanlıdır.'
              : 'It doesn’t cram every task onto one cluttered page — each platform gets its own clean page. There’s no registration, files are not stored, and only public content is processed. There is no mobile app; it is fully web-based.'}
          </p>

          <h2 className="text-2xl font-bold text-white">{tr ? 'Ücretsiz mi? Meşru mu?' : 'Is it free? Is it legit?'}</h2>
          <p>
            {tr
              ? 'Evet, Zypio tamamen ücretsizdir ve reklamlarla desteklenir; gizli ücret veya zorunlu kayıt yoktur. Yalnızca herkese açık bağlantılarla çalışır ve telif haklarına saygı gösterir — indirdiğiniz içeriği yalnızca hakkınız olan şekilde kullanmalısınız.'
              : 'Yes — Zypio is completely free and ad-supported, with no hidden fees or mandatory sign-up. It works only with public links and respects copyright — you should only use downloaded content in ways you’re entitled to.'}
          </p>
        </div>

        <InternalLinkBlock
          title={ui.relatedTools}
          links={[
            { label: tr ? 'YouTube İndirici' : 'YouTube Downloader', href: '/platform/youtube' },
            { label: tr ? 'TikTok Filigransız' : 'TikTok No Watermark', href: '/platform/tiktok' },
            { label: tr ? 'Instagram Reels' : 'Instagram Reels', href: '/platform/instagram' },
            { label: tr ? 'Tüm Araçlar' : 'All Tools', href: '/tools' },
          ]}
        />

        <FaqList faqs={faqs} title={ui.faqTitle} />

        <RelatedQuestions
          title={ui.relatedQuestions}
          items={[
            { label: tr ? 'Zypio nasıl çalışır?' : 'How does Zypio work?', href: '/faq' },
            { label: tr ? 'Kullanım senaryoları' : 'Use cases', href: '/use-cases' },
            { label: tr ? 'Karşılaştırma' : 'Compare', href: '/compare' },
          ]}
        />

        <CtaBanner
          title={tr ? 'Hemen denemeye hazır mısınız?' : 'Ready to try it?'}
          subtitle={tr ? 'Bir bağlantı yapıştırın ve saniyeler içinde indirin — kayıt gerekmez.' : 'Paste a link and download in seconds — no account needed.'}
          ctaLabel={ui.startFree}
        />
      </article>
    </div>
  );
}
