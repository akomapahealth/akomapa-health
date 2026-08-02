import { cn } from "@/lib/utils";

/** Shared field chrome for conversion-family forms (contact + donate). */
export const editorialFieldClassName = cn(
  "h-12 min-h-12 w-full rounded-md border border-[#0097b2]/45 bg-[#FCFAEF] px-4 font-body text-base text-[#1C1F1E] shadow-none",
  "placeholder:text-[#2F3332]/45",
  "transition-[border-color,box-shadow,background-color] duration-200 ease-out",
  "hover:border-[#0097b2]/75 hover:bg-white",
  "focus-visible:border-[#eeba2b] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#eeba2b]/45 focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-60",
  "dark:border-[#66C4DC]/45 dark:bg-[#121514] dark:text-[#FCFAEF] dark:placeholder:text-[#E6E7E7]/45",
  "dark:hover:border-[#66C4DC]/75 dark:hover:bg-[#1C1F1E]",
  "dark:focus-visible:border-[#F5C94D] dark:focus-visible:bg-[#1C1F1E] dark:focus-visible:ring-[#F5C94D]/40",
);

export const editorialTextareaClassName = cn(
  editorialFieldClassName,
  "h-auto min-h-[10rem] resize-y py-3 leading-relaxed",
);

export const editorialLabelClassName = cn(
  "font-subheading text-xs font-bold uppercase tracking-[0.14em] text-[#0F4C5C]",
  "dark:text-[#66C4DC]",
);

export const editorialSelectTriggerClassName = cn(
  editorialFieldClassName,
  "justify-between gap-2 data-[placeholder]:text-[#2F3332]/45 dark:data-[placeholder]:text-[#E6E7E7]/45",
);

export const editorialPrimaryButtonClassName = cn(
  "h-12 min-h-12 w-full rounded-md bg-[#0097b2] px-6 py-3 font-subheading text-sm font-semibold text-[#FCFAEF] shadow-none",
  "hover:bg-[#eeba2b] hover:text-[#1C1F1E]",
  "focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-55",
  "sm:w-auto md:text-base",
);

export const editorialAmberButtonClassName = cn(
  "h-12 min-h-12 w-full rounded-md bg-[#eeba2b] px-6 py-3 font-subheading text-sm font-semibold text-[#1C1F1E] shadow-none",
  "hover:bg-[#1C1F1E] hover:text-[#FCFAEF]",
  "focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-55",
  "sm:w-auto md:text-base",
);

export const editorialFormShellClassName = cn(
  "border border-[#1C1F1E]/10 bg-white p-6 shadow-[0_1px_0_rgba(28,31,30,0.04)] sm:p-8",
  "dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E] dark:shadow-none",
);
