import { StructuredData } from './StructuredData';
import { faqPageSchema } from '@/lib/seo/structured-data';

export type Faq = { question: string; answer: string };

/**
 * Server-rendered, crawlable FAQ list using native <details>/<summary>.
 * Emits FAQPage JSON-LD automatically (set emitSchema=false to render the
 * markup only, e.g. when the page already has one FAQPage block).
 */
export function FaqList({
  faqs,
  title,
  emitSchema = true,
}: {
  faqs: Faq[];
  title?: string;
  emitSchema?: boolean;
}) {
  return (
    <section className="w-full" aria-label={title ?? 'Frequently asked questions'}>
      {emitSchema && <StructuredData data={faqPageSchema(faqs)} />}
      {title && (
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{title}</h2>
      )}
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-white/10 bg-[#1C1C1E] overflow-hidden"
          >
            <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between text-white font-semibold hover:bg-white/5 transition-colors">
              <span className="pr-4">{faq.question}</span>
              <span className="text-blue-400 transition-transform group-open:rotate-45 text-xl leading-none" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="px-5 pb-5 text-gray-400 leading-relaxed">{faq.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
