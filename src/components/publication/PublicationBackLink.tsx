import Link from "next/link";
import type { ReactNode } from "react";
import { EditorialChevron } from "@/components/shared/EditorialPrimitives";
import { cn } from "@/lib/utils";

type PublicationBackLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Focus ring offset for deep-teal heroes vs cream bodies. */
  tone?: "light" | "dark";
};

/**
 * Accessible back navigation for publication detail pages (44px target).
 */
export function PublicationBackLink({
  href,
  children,
  className,
  tone = "dark",
}: PublicationBackLinkProps) {
  const toneClasses =
    tone === "light"
      ? "text-[#FCFAEF]/85 hover:text-[#eeba2b] focus-visible:ring-offset-[#0F4C5C]"
      : "text-[#0F4C5C] hover:text-[#0097b2] dark:text-[#66C4DC] dark:hover:text-[#eeba2b] focus-visible:ring-offset-[#FCFAEF] dark:focus-visible:ring-offset-[#121514]";

  return (
    <Link
      href={href}
      data-publication-back-link
      className={cn(
        "mb-8 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2",
        toneClasses,
        className,
      )}
    >
      <EditorialChevron className="h-4 w-4" />
      {children}
    </Link>
  );
}
