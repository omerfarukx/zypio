import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
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

export const metadata: Metadata = {
  title: "Zypio - Ücretsiz Video ve Görsel İndirici",
  description: "YouTube, TikTok, Instagram ve daha fazlasından yüksek kalitede, ücretsiz ve filigransız video/görsel indirin. Dönüştürme araçlarıyla PDF, MP4, MP3 işlemlerini saniyeler içinde tamamlayın.",
  keywords: "video indir, youtube dönüştürücü, tiktok indirici, instagram reels indir, filigransız video, pdf dönüştürücü, zypio, mp4 indir, sahibinden görsel indir",
  authors: [{ name: "Zypio Team" }],
  creator: "Zypio",
  publisher: "Zypio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Zypio - Hızlı ve Ücretsiz Medya İndirici",
    description: "Tüm sosyal medya platformlarından anında yüksek kaliteli video ve görsel indirin. Sınırsız ve tamamen ücretsiz.",
    url: "https://zypio.vercel.app",
    siteName: "Zypio",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "https://zypio.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zypio Platform",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zypio - Ücretsiz Video ve Görsel İndirici",
    description: "YouTube, TikTok, Instagram videolarını ve görsellerini tek tıkla yüksek kalitede indirin.",
    images: ["https://zypio.vercel.app/og-image.jpg"],
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
    canonical: "https://zypio.vercel.app/tr",
    languages: {
      'en-US': 'https://zypio.vercel.app/en',
      'tr-TR': 'https://zypio.vercel.app/tr',
    },
  },
};

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
