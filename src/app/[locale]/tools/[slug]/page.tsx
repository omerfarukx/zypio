import { Link } from '@/i18n/routing';
import { Metadata } from 'next';
import Ad728x90 from '@/components/Ad728x90';
import AdBanner from '@/components/AdBanner';

// These are placeholder "coming soon" pages — keep them out of the index to
// avoid thin-content / soft-404 signals until the real tool ships.
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Çok Yakında',
    robots: { index: false, follow: true },
  };
}

export default async function ComingSoonPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  
  const toolName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans w-full overflow-hidden min-h-[80vh]">
      <main className="relative flex flex-1 w-full flex-col items-center justify-start pt-28 pb-16 px-4 sm:px-8 bg-gradient-to-b from-[#0A0A0C] to-[#0F0F13]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-600/10 rounded-[100%] blur-[100px] pointer-events-none" aria-hidden="true"></div>
        
        <aside className="w-full hidden md:flex items-center justify-center z-10 mb-12">
          <Ad728x90 />
        </aside>
        <aside className="w-full flex md:hidden items-center justify-center z-10 mb-12">
          <AdBanner />
        </aside>

        <header className="relative z-10 mb-12 max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
            Çok Yakında
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              {toolName}
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bu aracı senin için hazırlıyoruz aga! Geliştirici ekibimiz şu an kodların içinden geçiyor. Çok yakında efsane bir şekilde burada olacak.
          </p>

          <Link 
            href="/tools" 
            className="inline-flex items-center justify-center h-14 px-8 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold transition-colors border border-white/5"
          >
            &larr; Diğer Araçlara Göz At
          </Link>
        </header>

      </main>
    </div>
  );
}
