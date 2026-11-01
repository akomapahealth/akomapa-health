import type { CookieInventoryItem } from "@/config/cookies";
import { cn } from "@/lib/utils";

const headerCellClassName =
  "px-4 py-3 text-left font-subheading text-xs font-bold uppercase tracking-[0.12em] text-[#0F4C5C] dark:text-[#66C4DC]";

const cellClassName =
  "px-4 py-4 align-top text-sm leading-relaxed text-[#2F3332] dark:text-[#E6E7E7]";

const nameClassName =
  "break-all font-mono text-[0.8125rem] font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]";

const termClassName =
  "font-subheading text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#0F4C5C] dark:text-[#66C4DC]";

/**
 * Responsive cookie list: a captioned table from `md` up and stacked cards
 * below, so long names and purposes never force sideways scrolling.
 */
export default function CookieInventoryTable({
  items,
  caption,
}: {
  items: readonly CookieInventoryItem[];
  caption: string;
}) {
  return (
    <div data-cookie-inventory>
      <div className="hidden overflow-hidden rounded-lg border border-[#0F4C5C]/15 md:block dark:border-[#FCFAEF]/15">
        <table className="w-full table-fixed border-collapse bg-white dark:bg-[#1C1F1E]">
          <caption className="sr-only">{caption}</caption>
          <colgroup>
            <col className="w-[24%]" />
            <col className="w-[16%]" />
            <col />
            <col className="w-[20%]" />
          </colgroup>
          <thead className="bg-[#0F4C5C]/[0.06] dark:bg-[#FCFAEF]/[0.06]">
            <tr>
              <th scope="col" className={headerCellClassName}>
                Name
              </th>
              <th scope="col" className={headerCellClassName}>
                Type
              </th>
              <th scope="col" className={headerCellClassName}>
                Purpose
              </th>
              <th scope="col" className={headerCellClassName}>
                Duration
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.name}
                className="border-t border-[#0F4C5C]/10 dark:border-[#FCFAEF]/10"
              >
                <th scope="row" className={cn(cellClassName, "text-left font-normal")}>
                  <code className={nameClassName}>{item.name}</code>
                  <span className="mt-1 block text-xs text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
                    {item.provider}
                  </span>
                </th>
                <td className={cellClassName}>{item.storage}</td>
                <td className={cellClassName}>{item.purpose}</td>
                <td className={cellClassName}>{item.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul aria-label={caption} className="space-y-3 md:hidden">
        {items.map((item) => (
          <li
            key={item.name}
            className="rounded-lg border border-[#0F4C5C]/15 bg-white p-4 dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E]"
          >
            <p>
              <code className={nameClassName}>{item.name}</code>
            </p>
            <p className="mt-0.5 text-xs text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
              {item.provider}
            </p>
            <dl className="mt-3 grid gap-2.5 text-sm leading-relaxed text-[#2F3332] dark:text-[#E6E7E7]">
              <div>
                <dt className={termClassName}>Purpose</dt>
                <dd className="mt-0.5">{item.purpose}</dd>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <dt className={termClassName}>Type</dt>
                  <dd className="mt-0.5">{item.storage}</dd>
                </div>
                <div>
                  <dt className={termClassName}>Duration</dt>
                  <dd className="mt-0.5">{item.duration}</dd>
                </div>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
