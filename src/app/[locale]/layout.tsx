import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { routing } from '@/i18n/routing';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/seo/StructuredData";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo/structured-data";
import { SITE_URL, alternates, ogLocale } from "@/lib/seo/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: '#0A0A0C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: '%s | Zypio',
    },
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: "Zypio Team" }],
    creator: "Zypio",
    publisher: "Zypio",
    verification: {
      google: "T4syyRQhYHMjQFgx6b9xmS43ezw-v3NozNz-2c_Az2A",
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDesc'),
      url: `${SITE_URL}/${locale}`,
      siteName: "Zypio",
      locale: ogLocale(locale),
      type: "website",
      // Image supplied by the file-based convention (app/[locale]/opengraph-image.tsx)
    },
    twitter: {
      card: "summary_large_image",
      title: t('twTitle'),
      description: t('twDesc'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    manifest: '/manifest.json',
    alternates: alternates(locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';

  // In-app browser (Webview) tespiti
  const isWebview = /Instagram|TikTok|FBAN|FBAV|Snapchat|Line/i.test(userAgent);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0F0F13] text-white selection:bg-blue-500/30 selection:text-blue-200">
        <NextIntlClientProvider messages={messages}>
          {/* Adsterra Reklamları - Webview içindeyse Popunder yükleme (uygulama içi tarayıcılarda uyumluluk sorunu yaratabilir) */}
          {!isWebview && (
            <script type='text/javascript' src='//pl29311910.profitablecpmratenetwork.com/a1/d4/d3/a1d4d3661113c56f73f7a0dfca336e67.js' async></script>
          )}

          {/* Adsterra Social Bar */}
          <script type='text/javascript' src='//pl29311912.profitablecpmratenetwork.com/82/a3/60/82a360ad42f680ed03447b9f22f5df83.js' async></script>

          {/* Ad Overlay Protection — Prevent invisible click-stealing layers from blocking the converter form */}
          <script dangerouslySetInnerHTML={{
            __html: `
              (function(){
                function neutralizeOverlays(){
                  var els=document.querySelectorAll('body > div, body > iframe');
                  for(var i=0;i<els.length;i++){
                    var s=els[i].style;
                    var cs=window.getComputedStyle(els[i]);
                    if(cs.position==='fixed'&&cs.zIndex>9999&&
                       parseInt(cs.width)>=window.innerWidth*0.9&&
                       parseInt(cs.height)>=window.innerHeight*0.9&&
                       (cs.opacity==='0'||cs.background==='transparent'||cs.backgroundColor==='transparent'||cs.background==='')){
                      s.pointerEvents='none';
                    }
                  }
                }
                setInterval(neutralizeOverlays,2000);
                setTimeout(neutralizeOverlays,3000);
              })();
            `
          }} />

          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-DCCRH80TXT"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DCCRH80TXT');
            `
          }} />

          {/* SEO: JSON-LD Structured Data — Organization + WebSite (brand graph) */}
          <StructuredData data={graph(organizationSchema(), websiteSchema(locale))} />

          <div className="flex flex-col min-h-screen w-full relative">
            <Header />
            <div className="pt-20 flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
