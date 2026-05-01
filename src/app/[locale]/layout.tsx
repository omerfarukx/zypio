import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: "Zypio Team" }],
    creator: "Zypio",
    publisher: "Zypio",
    verification: {
      google: "GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE_HERE",
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDesc'),
      url: `https://zypio.online/${locale}`,
      siteName: "Zypio",
      locale: locale === 'tr' ? "tr_TR" : "en_US",
      type: "website",
      images: [
        {
          url: "https://zypio.online/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Zypio Platform",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('twTitle'),
      description: t('twDesc'),
      images: ["https://zypio.online/og-image.jpg"],
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
    alternates: {
      canonical: `https://zypio.online/${locale}`,
      languages: {
        'en-US': 'https://zypio.online/en',
        'tr-TR': 'https://zypio.online/tr',
      },
    },
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

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0F0F13] text-white selection:bg-blue-500/30 selection:text-blue-200">
        <NextIntlClientProvider messages={messages}>
          {/* Google Analytics Placeholder */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `
          }} />

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
