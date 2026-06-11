import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AISummaryBlock } from '@/components/seo/AISummaryBlock';
import { CtaBanner } from '@/components/seo/CtaBanner';
import { ComparisonTable } from '@/components/seo/ComparisonTable';
import { InternalLinkBlock } from '@/components/seo/UseCaseGrid';
import { SITE_URL, alternates } from '@/lib/seo/site';
import { shortAnswer, uiText } from '@/lib/seo/content';

const isTR = (l: string) => l === 'tr';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = isTR(locale) ? 'Zypio Karşılaştırma: Hangi İndirme Yöntemi Size Uygun?' : 'Zypio Compared: Which Download Method Fits You?';
  const description = isTR(locale)
    ? 'Web tabanlı indiriciler, masaüstü uygulamalar ve tarayıcı eklentilerini ölçütlere göre karşılaştırın ve hangisinin sizin için en uygun olduğunu görün.'
    : 'Compare web-based downloaders, desktop apps and browser extensions by criteria, and see which approach fits your needs.';
  return {
    title,
    description,
    alternates: alternates(locale, '/compare'),
    openGraph: { title: `${title} | Zypio`, description, url: `${SITE_URL}/${locale}/compare`, type: 'article' },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tr = isTR(locale);
  const ui = uiText(locale);

  const columns = tr
    ? ['Zypio (Web)', 'Masaüstü Uygulamalar', 'Tarayıcı Eklentileri']
    : ['Zypio (Web)', 'Desktop Apps', 'Browser Extensions'];

  const rows = [
    { criterion: tr ? 'Kurulum gerekmez' : 'No install required', values: [true, false, false] },
    { criterion: tr ? 'Kayıt gerekmez' : 'No account required', values: [true, true, true] },
    { criterion: tr ? 'Ücretsiz' : 'Free to use', values: [true, tr ? 'Genelde ücretli' : 'Often paid', true] },
    { criterion: tr ? 'Tüm cihazlarda (tarayıcı)' : 'Works on any device (browser)', values: [true, false, false] },
    { criterion: tr ? 'Çoklu platform (5 ağ)' : 'Multi-platform (5 networks)', values: [true, true, tr ? 'Değişken' : 'Varies'] },
    { criterion: tr ? 'Filigransız TikTok' : 'Watermark-free TikTok', values: [true, tr ? 'Değişken' : 'Varies', tr ? 'Değişken' : 'Varies'] },
    { criterion: tr ? 'Dosyaları saklamaz' : 'Does not store files', values: [true, true, true] },
    { criterion: tr ? 'Toplu / yerel işleme' : 'Bulk / offline processing', values: [false, true, false] },
  ];

  return (
    <div className="w-full bg-[#0A0A0C] min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <Breadcrumbs items={[{ name: tr ? 'Karşılaştırma' : 'Compare', url: `/${locale}/compare` }]} />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
          {tr ? 'Zypio’yu Diğer İndirme Yöntemleriyle Karşılaştırın' : 'Zypio vs Other Download Methods'}
        </h1>

        <AISummaryBlock label={tr ? 'Kısa cevap' : 'Short answer'}>{shortAnswer(locale, 'compare')}</AISummaryBlock>

        <p className="text-gray-300 leading-relaxed mb-2">
          {tr
            ? 'Sosyal medya içeriğini indirmenin üç yaygın yolu vardır: web tabanlı araçlar (Zypio gibi), masaüstü uygulamalar ve tarayıcı eklentileri. Aşağıda ölçütlere dayalı, tarafsız bir karşılaştırma bulacaksınız.'
            : 'There are three common ways to download social-media content: web-based tools (like Zypio), desktop apps, and browser extensions. Below is a fair, criteria-based comparison.'}
        </p>

        <ComparisonTable
          columns={columns}
          rows={rows}
          caption={tr ? 'İndirme yöntemleri karşılaştırması' : 'Download methods comparison'}
        />

        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4">
          <h2 className="text-2xl font-bold text-white">{tr ? 'Hangisini seçmelisiniz?' : 'Which should you choose?'}</h2>
          <p>
            <strong className="text-white">{tr ? 'Zypio’yu seçin' : 'Choose Zypio'}</strong>{' '}
            {tr
              ? '— hızlı, tek seferlik indirmeler istiyorsanız, hiçbir şey kurmak istemiyorsanız ve herhangi bir cihazda tarayıcıdan çalışmak istiyorsanız.'
              : '— if you want fast, one-off downloads, prefer not to install anything, and want it to run in a browser on any device.'}
          </p>
          <p>
            <strong className="text-white">{tr ? 'Masaüstü uygulaması seçin' : 'Choose a desktop app'}</strong>{' '}
            {tr
              ? '— düzenli olarak büyük toplu indirmeler yapıyorsanız veya çevrimdışı/yerel işleme ihtiyacınız varsa.'
              : '— if you regularly do large bulk downloads or need offline/local processing.'}
          </p>
          <p>
            <strong className="text-white">{tr ? 'Tarayıcı eklentisi seçin' : 'Choose a browser extension'}</strong>{' '}
            {tr
              ? '— indirme düğmesini ziyaret ettiğiniz sayfaya gömmek istiyorsanız (genelde tek platformla sınırlıdır).'
              : '— if you want a download button embedded into the page you’re visiting (usually limited to one platform).'}
          </p>
          <p className="text-sm text-gray-500">
            {tr
              ? 'Not: Hangi aracı kullanırsanız kullanın, yalnızca indirme hakkına sahip olduğunuz herkese açık içeriği indirin ve platformların kullanım şartlarına saygı gösterin.'
              : 'Note: Whichever tool you use, only download public content you’re entitled to, and respect each platform’s terms of service.'}
          </p>
        </div>

        <InternalLinkBlock
          title={ui.relatedTools}
          links={[
            { label: tr ? 'Zypio Nedir?' : 'What is Zypio?', href: '/what-is-zypio' },
            { label: ui.faqTitle, href: '/faq' },
            { label: ui.useCasesTitle, href: '/use-cases' },
            { label: ui.allTools, href: '/tools' },
          ]}
        />

        <CtaBanner
          title={tr ? 'Web tabanlı indirmeyi deneyin' : 'Try web-based downloading'}
          subtitle={tr ? 'Kurulum yok, kayıt yok — sadece bir bağlantı yapıştırın.' : 'No install, no account — just paste a link.'}
          ctaLabel={ui.startFree}
        />
      </article>
    </div>
  );
}
