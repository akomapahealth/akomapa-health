import type { ReactNode } from "react";
import {
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { cn } from "@/lib/utils";

type PublicationEmptyStateProps = {
  title: string;
  description: string;
  headingId?: string;
  action?: ReactNode;
  className?: string;
};

/**
 * Restrained empty-state panel for filter/search result surfaces.
 */
export function PublicationEmptyState({
  title,
  description,
  headingId,
  action,
  className,
}: PublicationEmptyStateProps) {
  return (
    <div
      data-publication-empty-state
      role="status"
      className={cn(
        "max-w-2xl border-l-2 border-[#eeba2b] bg-transparent py-2 pl-6 sm:pl-8",
        className,
      )}
    >
      <EditorialHeading
        as="h3"
        id={headingId}
        className="text-[1.35rem] md:text-[1.5rem] lg:text-[1.65rem]"
      >
        {title}
      </EditorialHeading>
      <EditorialLead className="mt-3">{description}</EditorialLead>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
