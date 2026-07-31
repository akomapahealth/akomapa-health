import { cn } from "@/lib/utils";

export type PublicationDocumentAction = {
  href: string;
  label: string;
  /** Primary in-page or primary CTA; secondary for download/print. */
  variant?: "primary" | "secondary";
  download?: string | boolean;
  external?: boolean;
};

type PublicationDocumentActionsProps = {
  actions: PublicationDocumentAction[];
  className?: string;
  "aria-label"?: string;
};

/**
 * Clear hierarchy for document actions (view / download / print).
 * External and download behavior is indicated via attributes and accessible names.
 */
export function PublicationDocumentActions({
  actions,
  className,
  "aria-label": ariaLabel = "Document actions",
}: PublicationDocumentActionsProps) {
  if (actions.length === 0) {
    return null;
  }

  return (
    <nav
      data-publication-document-actions
      aria-label={ariaLabel}
      className={cn("flex flex-wrap gap-3", className)}
    >
      {actions.map((action) => {
        const isPrimary = (action.variant ?? "secondary") === "primary";
        const classes = cn(
          "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2",
          isPrimary
            ? "bg-[#0097b2] text-[#FCFAEF] hover:bg-[#eeba2b] hover:text-[#1C1F1E]"
            : "border border-[#1C1F1E]/20 text-[#1C1F1E] hover:border-[#0097b2] hover:text-[#0097b2] dark:border-[#FCFAEF]/25 dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]",
        );

        return (
          <a
            key={`${action.href}-${action.label}`}
            href={action.href}
            className={classes}
            {...(action.download
              ? {
                  download:
                    typeof action.download === "string"
                      ? action.download
                      : true,
                }
              : {})}
            {...(action.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {action.label}
          </a>
        );
      })}
    </nav>
  );
}
