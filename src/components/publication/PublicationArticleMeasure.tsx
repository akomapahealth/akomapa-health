import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PublicationArticleMeasureProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

/**
 * Long-form reading measure for publication bodies (~65ch rhythm).
 */
export function PublicationArticleMeasure({
  children,
  className,
  as: Tag = "div",
}: PublicationArticleMeasureProps) {
  return (
    <Tag
      data-publication-article-measure
      className={cn("mx-auto w-full max-w-[65ch]", className)}
    >
      {children}
    </Tag>
  );
}
