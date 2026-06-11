import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export type UseCaseItem = {
  title: string;
  description: string;
  href: string;
};

/**
 * Grid of use-case / tool cards with internal links. Reused on the home,
 * use-cases hub and audience pages.
 */
export function UseCaseGrid({ items }: { items: UseCaseItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group h-full rounded-3xl border border-white/10 bg-[#1C1C1E] p-6 hover:border-blue-500/30 transition-colors flex flex-col"
        >
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed flex-1">{item.description}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400">
            {item.title}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}

/**
 * Compact block of contextual internal links (avoids orphan pages, spreads
 * link equity, and gives AI crawlers a clear site map of related content).
 */
export function InternalLinkBlock({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav className="my-10 rounded-2xl border border-white/10 bg-[#0A0A0C] p-6" aria-label={title}>
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">{title}</h2>
      <ul className="flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 hover:text-white hover:border-blue-500/30 transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
