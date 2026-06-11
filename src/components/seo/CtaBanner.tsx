import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

/**
 * Conversion CTA used at the foot of every GEO landing page. Answers first,
 * converts second — the page content sits above this block.
 */
export function CtaBanner({
  title,
  subtitle,
  ctaLabel,
  href = '/',
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
  href?: string;
}) {
  return (
    <section className="my-16 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-8 sm:p-12 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{title}</h2>
      <p className="text-gray-400 max-w-xl mx-auto mb-8">{subtitle}</p>
      <Link
        href={href}
        className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-lg transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
      >
        {ctaLabel}
        <ArrowRight className="w-5 h-5" aria-hidden="true" />
      </Link>
    </section>
  );
}
