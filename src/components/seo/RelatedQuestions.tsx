import { Link } from '@/i18n/routing';
import { HelpCircle } from 'lucide-react';

/**
 * "People also ask" style block of internal links. Helps both users and AI
 * engines discover related intents and reduces orphan pages.
 */
export function RelatedQuestions({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <section className="w-full my-12">
      <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-5">
        <HelpCircle className="w-5 h-5 text-blue-400" aria-hidden="true" />
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-white/10 bg-[#1C1C1E] px-4 py-3 text-gray-300 hover:text-white hover:border-blue-500/30 transition-colors flex items-center justify-between group"
          >
            <span>{item.label}</span>
            <span className="text-gray-600 group-hover:text-blue-400 transition-colors" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
