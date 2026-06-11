import { Sparkles } from 'lucide-react';

/**
 * A concise, citation-friendly "short answer" block.
 *
 * Designed so AI answer engines (ChatGPT Search, Perplexity, Google AI
 * Overviews, etc.) can extract a clean one-paragraph summary. Renders as
 * plain, server-rendered text — no client JS, fully crawlable.
 */
export function AISummaryBlock({
  label = 'Short answer',
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <aside
      data-ai-summary
      className="relative rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-5 sm:p-6 my-8"
    >
      <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
        {label}
      </div>
      <p className="text-gray-200 leading-relaxed text-base">{children}</p>
    </aside>
  );
}
