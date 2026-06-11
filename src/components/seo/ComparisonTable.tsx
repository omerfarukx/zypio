import { Check, Minus } from 'lucide-react';

export type CompareRow = {
  criterion: string;
  /** value cells per column; boolean renders a check/dash, string renders text */
  values: (boolean | string)[];
};

/**
 * Honest, criteria-based comparison table. Columns are caller-defined.
 * No fake ratings or unverifiable claims — only factual criteria.
 */
export function ComparisonTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: CompareRow[];
  caption?: string;
}) {
  return (
    <div className="w-full overflow-x-auto my-8 rounded-2xl border border-white/10">
      <table className="w-full text-sm text-left border-collapse">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-[#1C1C1E]">
            <th className="px-4 py-3 font-semibold text-gray-400">&nbsp;</th>
            {columns.map((col, i) => (
              <th
                key={col}
                className={`px-4 py-3 font-bold ${i === 0 ? 'text-blue-400' : 'text-white'}`}
                scope="col"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.criterion} className="border-t border-white/5">
              <th scope="row" className="px-4 py-3 font-medium text-gray-300 whitespace-nowrap">
                {row.criterion}
              </th>
              {row.values.map((v, i) => (
                <td key={i} className="px-4 py-3 text-gray-300">
                  {typeof v === 'boolean' ? (
                    v ? (
                      <Check className="w-5 h-5 text-green-500" aria-label="Yes" />
                    ) : (
                      <Minus className="w-5 h-5 text-gray-600" aria-label="No" />
                    )
                  ) : (
                    v
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
