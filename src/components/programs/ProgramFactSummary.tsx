import { cn } from "@/lib/utils";

export type ProgramFact = {
  label: string;
  value: string;
};

type ProgramFactSummaryProps = {
  facts: ProgramFact[];
  /** Use on deep-teal / teal bands. */
  tone?: "light" | "dark";
  className?: string;
};

export default function ProgramFactSummary({
  facts,
  tone = "dark",
  className,
}: ProgramFactSummaryProps) {
  const border =
    tone === "dark"
      ? "border-[#FCFAEF]/25"
      : "border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20";
  const labelColor =
    tone === "dark"
      ? "text-[#FCFAEF]/65"
      : "text-[#2F3332]/70 dark:text-[#E6E7E7]/70";
  const valueColor =
    tone === "dark"
      ? "text-[#FCFAEF]"
      : "text-[#1C1F1E] dark:text-[#FCFAEF]";

  return (
    <dl
      data-program-fact-summary
      className={cn(
        "grid border-y sm:grid-cols-2",
        border,
        className,
      )}
    >
      {facts.map((fact, index) => (
        <div
          key={fact.label}
          className={cn(
            "flex min-h-28 flex-col justify-between px-1 py-6 sm:px-6",
            border,
            index % 2 === 1 ? "sm:border-l" : "",
            index >= 2 ? "border-t" : "",
            facts.length > 2 && index < 2 ? "border-b-0 sm:border-b-0" : "",
          )}
        >
          <dt
            className={cn(
              "font-subheading text-xs font-bold uppercase tracking-[0.2em]",
              labelColor,
            )}
          >
            {fact.label}
          </dt>
          <dd className={cn("mt-3 text-base leading-relaxed", valueColor)}>
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
