"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BentoTone = "teal" | "gold";

export type BentoGridItem = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  span?: "default" | "wide" | "tall";
  eyebrow?: string;
};

export type BentoMetricItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  eyebrow?: string;
  span?: "default" | "wide";
};

type FeatureSectionWithBentoGridProps = {
  badge: string;
  title: string;
  description: string;
  tone?: BentoTone;
  compact?: boolean;
  icon?: React.ReactNode;
  highlightLabel: string;
  highlightValue: string;
  supportingCopy?: string;
  items: BentoGridItem[];
  className?: string;
  itemClassName?: string;
};

const toneStyles: Record<
  BentoTone,
  {
    badge: string;
    iconWrap: string;
    highlight: string;
    itemGlow: string;
    border: string;
    eyebrow: string;
  }
> = {
  teal: {
    badge: "border-[#66C4DC]/30 bg-[#66C4DC]/10 text-[#66C4DC]",
    iconWrap: "bg-[#66C4DC]/10 text-[#66C4DC] border-[#66C4DC]/20",
    highlight: "from-[#66C4DC]/14 via-[#66C4DC]/8 to-transparent",
    itemGlow: "before:bg-[#66C4DC]/12",
    border: "#66C4DC",
    eyebrow: "text-[#66C4DC]"
  },
  gold: {
    badge: "border-[#F5C94D]/30 bg-[#F5C94D]/10 text-[#F5C94D]",
    iconWrap: "bg-[#F5C94D]/10 text-[#F5C94D] border-[#F5C94D]/20",
    highlight: "from-[#F5C94D]/16 via-[#F5C94D]/8 to-transparent",
    itemGlow: "before:bg-[#F5C94D]/12",
    border: "#F5C94D",
    eyebrow: "text-[#F5C94D]"
  }
};

const spanClasses: Record<NonNullable<BentoGridItem["span"]>, string> = {
  default: "md:col-span-1 md:row-span-1",
  wide: "md:col-span-2 md:row-span-1",
  tall: "md:col-span-1 md:row-span-2"
};

const metricSpanClasses: Record<NonNullable<BentoMetricItem["span"]>, string> = {
  default: "md:col-span-1",
  wide: "md:col-span-2"
};

function FeatureSectionWithBentoGrid({
  badge,
  title,
  description,
  tone = "teal",
  compact = false,
  icon,
  highlightLabel,
  highlightValue,
  supportingCopy,
  items,
  className,
  itemClassName
}: FeatureSectionWithBentoGridProps) {
  const styles = toneStyles[tone];

  if (compact) {
    return (
      <article
        className={cn(
          "relative h-full overflow-hidden rounded-[30px] border border-[#FCFAEF]/10 bg-[#0F4C5C]/55 p-4 shadow-[0_24px_70px_rgba(15,76,92,0.18)] backdrop-blur-sm sm:p-5 md:p-6",
          className
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-br opacity-90",
            styles.highlight
          )}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white/5 to-transparent" />

        <div className="relative z-10 flex h-full flex-col gap-3 md:gap-4">
          <div className="grid gap-3 xl:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] md:gap-4">
            <div className="relative overflow-hidden rounded-[26px] border border-[#FCFAEF]/10 bg-[#FCFAEF]/[0.06] p-5 md:p-6 xl:min-h-[280px]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]",
                    styles.badge
                  )}
                >
                  {badge}
                </Badge>
                {icon ? (
                  <div className={cn("flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border", styles.iconWrap)}>
                    {icon}
                  </div>
                ) : null}
              </div>

              <div className="mt-6 max-w-xl">
                <h3 className="text-[1.6rem] font-semibold leading-tight text-[#FCFAEF] md:text-[1.9rem]">
                  {title}
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-[#E6E7E7] md:text-base">
                  {description}
                </p>
              </div>

              {supportingCopy ? (
                <div className="mt-6 border-t border-[#FCFAEF]/10 pt-4">
                  <p className="max-w-xl text-sm leading-6 text-[#E6E7E7]/90 md:text-[15px]">
                    {supportingCopy}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="grid gap-3 md:gap-4">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#FCFAEF]/10 bg-[#FCFAEF]/[0.07] p-5 md:p-6 xl:min-h-[280px]">
                <div
                  className="absolute left-0 top-0 h-1 w-20 rounded-full"
                  style={{ backgroundColor: styles.border }}
                />
                <div>
                  <p className={cn("text-[11px] font-semibold uppercase tracking-[0.24em]", styles.eyebrow)}>
                    {highlightLabel}
                  </p>
                  <p className="mt-4 text-[2.5rem] font-semibold tracking-tight text-[#FCFAEF] md:text-[2.9rem]">
                    {highlightValue}
                  </p>
                </div>
                <p className="mt-6 max-w-xs text-sm leading-6 text-[#E6E7E7] md:text-[15px]">
                  Stronger health systems start earlier, closer to communities, and with people equipped to sustain care.
                </p>
              </div>
            </div>
          </div>

          <ul
            className="grid auto-rows-fr gap-3 md:grid-cols-2 md:gap-4"
            aria-label={`${title} supporting points`}
          >
            {items.map((item, index) => (
              <li
                key={item.title}
                className={cn(
                  "relative isolate overflow-hidden rounded-[24px] border border-[#FCFAEF]/10 bg-[#FCFAEF]/[0.05] p-4 md:p-5",
                  "before:absolute before:right-0 before:top-0 before:h-20 before:w-20 before:rounded-full before:blur-2xl before:content-['']",
                  styles.itemGlow,
                  spanClasses[item.span ?? "default"]
                )}
              >
                <div
                  className="absolute left-0 top-0 h-1 w-16 rounded-full"
                  style={{ backgroundColor: styles.border }}
                />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    {item.icon ? (
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-2xl border", styles.iconWrap)}>
                        {item.icon}
                      </div>
                    ) : (
                      <span className={cn("inline-flex min-w-10 items-center justify-center rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.22em]", styles.badge)}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                    <span className={cn("text-[10px] font-semibold uppercase tracking-[0.22em]", styles.eyebrow)}>
                      {item.eyebrow ?? "Key point"}
                    </span>
                  </div>

                  <div className="mt-5 md:mt-6">
                    <h4 className="text-[0.98rem] font-semibold text-[#FCFAEF] md:text-lg">{item.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-[#E6E7E7] md:text-[15px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[30px] border border-[#FCFAEF]/10 bg-[#0F4C5C]/50 shadow-[0_24px_70px_rgba(15,76,92,0.18)] backdrop-blur-sm",
        compact ? "p-5 md:p-6" : "p-6 md:p-8",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-br opacity-90",
          styles.highlight
        )}
      />
      <div className="pointer-events-none absolute inset-y-8 right-0 w-px bg-gradient-to-b from-transparent via-[#FCFAEF]/12 to-transparent" />

      <div className={cn("relative z-10 flex flex-col", compact ? "gap-4" : "gap-6")}>
        <div className={cn("flex items-start justify-between gap-4 border-b border-[#FCFAEF]/10", compact ? "pb-4" : "pb-6")}>
          <div className="max-w-xl space-y-4">
            <Badge
              variant="outline"
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]",
                styles.badge
              )}
            >
              {badge}
            </Badge>
            <div className={cn(compact ? "space-y-2" : "space-y-3")}>
              <h3 className={cn("font-heading font-semibold leading-tight text-[#FCFAEF]", compact ? "text-[1.8rem] md:text-[2.15rem]" : "text-2xl md:text-[2rem]")}>
                {title}
              </h3>
              <p className={cn("text-[#E6E7E7]", compact ? "text-[15px] leading-6 md:text-base" : "text-base leading-7 md:text-lg")}>
                {description}
              </p>
            </div>
          </div>

          <div className={cn("flex flex-shrink-0 items-center justify-center rounded-2xl border", compact ? "h-12 w-12" : "h-14 w-14", styles.iconWrap)}>
            {icon}
          </div>
        </div>

        <div className={cn("grid items-start", compact ? "gap-3 md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] md:gap-4" : "gap-4 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)] md:gap-5")}>
          <div className={cn("rounded-[26px] border border-[#FCFAEF]/10 bg-[#FCFAEF]/[0.05]", compact ? "p-4 md:p-5" : "p-5 md:p-6")}>
            <div>
              <p className={cn("text-[11px] font-semibold uppercase tracking-[0.24em]", styles.eyebrow)}>
                {highlightLabel}
              </p>
              <p className={cn("font-heading font-semibold tracking-tight text-[#FCFAEF]", compact ? "mt-2 text-[2.5rem] md:text-[2.9rem]" : "mt-3 text-4xl md:text-5xl")}>
                {highlightValue}
              </p>
            </div>
            {supportingCopy ? (
              <p className={cn("text-[#E6E7E7]", compact ? "mt-4 text-sm leading-5.5 md:text-[15px]" : "mt-6 text-sm leading-6 md:text-base")}>
                {supportingCopy}
              </p>
            ) : null}
          </div>

          <ul
            className={cn(
              "grid auto-rows-fr",
              compact ? "gap-3 md:grid-cols-2 md:gap-4" : "gap-4 md:grid-cols-2 md:gap-5"
            )}
            aria-label={`${title} supporting points`}
          >
            {items.map((item) => (
              <li
                key={item.title}
                className={cn(
                  "relative isolate overflow-hidden rounded-[24px] border border-[#FCFAEF]/10 bg-[#FCFAEF]/[0.05] p-5 md:p-6",
                  "before:absolute before:right-0 before:top-0 before:h-24 before:w-24 before:rounded-full before:blur-2xl before:content-['']",
                  compact && "p-4 md:p-5",
                  styles.itemGlow,
                  spanClasses[item.span ?? "default"],
                  itemClassName
                )}
              >
                <div
                  className="absolute left-0 top-0 h-1 w-20 rounded-full"
                  style={{ backgroundColor: styles.border }}
                />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className={cn("flex items-center justify-center rounded-2xl border", compact ? "h-10 w-10" : "h-11 w-11", styles.iconWrap)}>
                      {item.icon}
                    </div>
                    {item.eyebrow ? (
                      <span className={cn("text-[10px] font-semibold uppercase tracking-[0.22em]", styles.eyebrow)}>
                        {item.eyebrow}
                      </span>
                    ) : null}
                  </div>

                  <div className={cn(compact ? "mt-5" : "mt-8")}>
                    <h4 className={cn("font-heading font-semibold text-[#FCFAEF]", compact ? "text-base md:text-lg" : "text-lg md:text-xl")}>
                      {item.title}
                    </h4>
                    <p className={cn("text-[#E6E7E7]", compact ? "mt-2 text-sm leading-5.5 md:text-[15px]" : "mt-3 text-sm leading-6 md:text-base")}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

type BentoMetricsGroupProps = {
  badge: string;
  title: string;
  description: string;
  tone?: BentoTone;
  leadValue: string;
  leadLabel: string;
  leadIcon?: React.ReactNode;
  supportingCopy?: string;
  items: BentoMetricItem[];
  className?: string;
};

function BentoMetricsGroup({
  badge,
  title,
  description,
  tone = "teal",
  leadValue,
  leadLabel,
  leadIcon,
  supportingCopy,
  items,
  className
}: BentoMetricsGroupProps) {
  const styles = toneStyles[tone];

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[30px] border border-[#E6E7E7] bg-white/80 p-5 shadow-[0_24px_60px_rgba(28,31,30,0.08)] backdrop-blur-sm md:p-8 lg:p-10 dark:border-[#2F3332] dark:bg-[#1C1F1E]/80",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-br from-white/60 via-transparent to-transparent dark:from-white/5" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#F5C94D]/10 blur-3xl dark:bg-[#66C4DC]/10" />

      <div className="relative z-10">
        <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:gap-5">
          <div className="rounded-[28px] border border-[#E6E7E7] bg-[#FCFAEF]/75 p-6 md:p-8 dark:border-[#2F3332] dark:bg-[#2F3332]/70">
            <Badge
              variant="outline"
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]",
                styles.badge
              )}
            >
              {badge}
            </Badge>
            <h3 className="mt-5 max-w-2xl font-heading text-2xl font-semibold leading-tight text-[#1C1F1E] md:text-[2rem] dark:text-[#FCFAEF]">
              {title}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#2F3332]/80 md:text-lg dark:text-[#E6E7E7]/80">
              {description}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-1">
            <div className="relative overflow-hidden rounded-[28px] border border-[#E6E7E7] bg-white/90 p-6 dark:border-[#2F3332] dark:bg-[#1C1F1E]/75">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-black/5 blur-3xl dark:bg-white/5" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <p className={cn("text-[11px] font-semibold uppercase tracking-[0.24em]", styles.eyebrow)}>
                    Lead indicator
                  </p>
                  <p className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[#1C1F1E] md:text-5xl dark:text-[#FCFAEF]">
                    {leadValue}
                  </p>
                  <p className="mt-3 text-base font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {leadLabel}
                  </p>
                </div>
                {leadIcon ? (
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl border", styles.iconWrap)}>
                    {leadIcon}
                  </div>
                ) : (
                  <span className={cn("inline-flex min-w-10 items-center justify-center rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.22em]", styles.badge)}>
                    01
                  </span>
                )}
              </div>
            </div>

            {supportingCopy ? (
              <div className="rounded-[28px] border border-[#E6E7E7] bg-[#FCFAEF]/65 p-6 dark:border-[#2F3332] dark:bg-[#2F3332]/65">
                <p className={cn("text-[11px] font-semibold uppercase tracking-[0.24em]", styles.eyebrow)}>
                  What this unlocks
                </p>
                <p className="mt-4 text-sm leading-6 text-[#2F3332]/80 md:text-base dark:text-[#E6E7E7]/80">
                  {supportingCopy}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <ul className="mt-4 grid auto-rows-fr gap-3 sm:grid-cols-2 2xl:grid-cols-4 md:gap-4" aria-label={`${title} metrics`}>
          {items.map((item, index) => (
            <li
              key={`${item.value}-${item.label}`}
              className={cn(
                "relative overflow-hidden rounded-[24px] border border-[#E6E7E7] bg-white/85 p-4 dark:border-[#2F3332] dark:bg-[#2F3332]/70 md:p-5",
                metricSpanClasses[item.span ?? "default"]
              )}
            >
              <div
                className="absolute left-0 top-0 h-1 w-20 rounded-full"
                style={{ backgroundColor: styles.border }}
              />
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-black/5 blur-3xl dark:bg-white/5" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  {item.icon ? (
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-2xl border", styles.iconWrap)}>
                      {item.icon}
                    </div>
                  ) : (
                    <span className={cn("inline-flex min-w-10 items-center justify-center rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.22em]", styles.badge)}>
                      {String(index + 2).padStart(2, "0")}
                    </span>
                  )}
                  {item.icon && item.eyebrow ? (
                    <span className={cn("text-[10px] font-semibold uppercase tracking-[0.22em]", styles.eyebrow)}>
                      {item.eyebrow}
                    </span>
                  ) : null}
                </div>
                <div className="mt-6">
                  <p className="font-heading text-3xl font-semibold tracking-tight text-[#1C1F1E] md:text-4xl dark:text-[#FCFAEF]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#2F3332]/80 md:text-base dark:text-[#E6E7E7]/80">
                    {item.label}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export { BentoMetricsGroup, FeatureSectionWithBentoGrid };
