import { ConverterForm } from '@/components/ConverterForm';
import { redirect } from 'next/navigation';

export default async function WatchPage({
  searchParams,
  params
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ locale: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  
  const v = resolvedSearchParams.v;
  const locale = resolvedParams.locale;
  
  if (!v || typeof v !== 'string') {
    redirect(`/${locale}`);
  }

  const initialUrl = `https://www.youtube.com/watch?v=${v}`;

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans w-full overflow-hidden min-h-[80vh]">
      <main className="relative flex flex-1 w-full flex-col items-center justify-start pt-28 pb-16 px-4 sm:px-8 bg-gradient-to-b from-[#0A0A0C] to-[#0F0F13]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-red-600/10 rounded-[100%] blur-[100px] pointer-events-none" aria-hidden="true"></div>
        
        <header className="relative z-10 mb-8 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Videonuz İndirilmeye Hazır!
            </span>
          </h1>
          <p className="text-gray-400">
            Aşağıdaki menüden kalite seçip hemen indirebilirsin aga.
          </p>
        </header>

        <section className="w-full max-w-3xl mx-auto z-10">
          <ConverterForm initialUrl={initialUrl} activeContext="youtube" />
        </section>
      </main>
    </div>
  );
}
