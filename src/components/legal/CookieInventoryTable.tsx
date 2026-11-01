import { Fragment } from "react";
import type { CookieInventoryItem } from "@/config/cookies";
import { cn } from "@/lib/utils";

const headerCellClassName =
  "px-4 py-3 text-left font-subheading text-xs font-bold uppercase tracking-[0.12em] text-[#0F4C5C] dark:text-[#66C4DC]";

const cellClassName =
  "px-4 py-4 align-top text-sm leading-relaxed text-[#2F3332] dark:text-[#E6E7E7]";

const nameClassName =
  "break-words font-mono text-[0.8125rem] font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]";

const termClassName =
  "font-subheading text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#0F4C5C] dark:text-[#66C4DC]";

/** Allows long keys to wrap after `-`, `:` or `_` instead of mid-word. */
function CookieName({ name }: { name: string }) {
  return (
    <code className={nameClassName}>
      {name.split(/(?<=[-:_])/).map((part, index) => (
        <Fragment key={index}>
          {index > 0 ? <wbr /> : null}
          {part}
        </Fragment>
      ))}
    </code>
  );
}

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
            <col className="w-[28%]" />
            <col className="w-[15%]" />
            <col />
            <col className="w-[19%]" />
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
                  <CookieName name={item.name} />
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
              <CookieName name={item.name} />
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
