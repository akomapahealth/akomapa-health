import type { PhilosophySection as PhilosophySectionType } from "@/lib/types";
import Image from "@/components/common/Image";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
} from "@/components/shared/EditorialPrimitives";
import { cn } from "@/lib/utils";

type PhilosophySectionProps = {
  section: PhilosophySectionType;
  index: number;
  className?: string;
};

export default function PhilosophySection({
  section,
  index,
  className,
}: PhilosophySectionProps) {
  const isImageFirstOnDesktop = index % 2 === 1;
  const isTeal = index % 2 === 1;
  const paragraphs = section.content.split("\n\n");
  const headingId = `${section.id}-heading`;

  return (
    <EditorialBand
      id={section.id}
      tone={isTeal ? "teal" : "cream"}
      marker={String(section.order).padStart(2, "0")}
      aria-labelledby={headingId}
      className={cn(
        "scroll-mt-28 border-b",
        isTeal
          ? "border-[#FCFAEF]/20"
          : "border-[#1C1F1E]/10 dark:border-[#FCFAEF]/15",
        className,
      )}
    >
      <div
        data-philosophy-principle={section.order}
        className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16"
      >
        <figure
          className={cn(
            "w-full",
            isImageFirstOnDesktop ? "md:order-1" : "md:order-2",
          )}
        >
          <div
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-md border",
              isTeal
                ? "border-[#FCFAEF]/25 bg-[#0F4C5C]"
                : "border-[#1C1F1E]/15 bg-[#E6E7E7] dark:border-[#FCFAEF]/20 dark:bg-[#2F3332]",
            )}
          >
            {section.image ? (
              <Image
                src={section.image}
                alt={section.imageAlt ?? ""}
                fill
                sizes="(min-width: 1280px) 42rem, (min-width: 768px) 45vw, 100vw"
                className="object-cover"
                style={{ objectPosition: section.imagePosition ?? "center" }}
              />
            ) : (
              <div className="h-full w-full" aria-hidden="true" />
            )}
          </div>
        </figure>

        <article
          className={cn(
            "max-w-[40rem]",
            isImageFirstOnDesktop ? "md:order-2" : "md:order-1",
          )}
        >
          <EditorialEyebrow
            tone={isTeal ? "gold" : "teal"}
            className={isTeal ? "text-[#F5C94D]" : undefined}
          >
            Principle {section.order}
          </EditorialEyebrow>
          <EditorialHeading
            id={headingId}
            className={cn("mt-4", isTeal && "text-[#FCFAEF]")}
          >
            {section.title}
          </EditorialHeading>
          <div
            className={cn(
              "mt-6 space-y-5 text-base leading-8 sm:text-lg",
              isTeal
                ? "text-[#FCFAEF]/85"
                : "text-[#2F3332]/85 dark:text-[#E6E7E7]/85",
            )}
          >
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {section.quote ? (
            <blockquote
              className={cn(
                "mt-8 border-l-2 pl-5",
                isTeal
                  ? "border-[#F5C94D]"
                  : "border-[#0097b2] dark:border-[#66C4DC]",
              )}
            >
              <p
                className={cn(
                  "font-heading text-xl font-semibold leading-snug sm:text-2xl",
                  isTeal
                    ? "text-[#FCFAEF]"
                    : "text-[#1C1F1E] dark:text-[#FCFAEF]",
                )}
              >
                {section.quote.text}
              </p>
              <footer
                className={cn(
                  "mt-4 text-sm font-semibold",
                  isTeal
                    ? "text-[#F5C94D]"
                    : "text-[#0097b2] dark:text-[#66C4DC]",
                )}
              >
                {section.quote.author}
                <span
                  className={cn(
                    "block pt-1 font-normal",
                    isTeal
                      ? "text-[#FCFAEF]/75"
                      : "text-[#2F3332]/75 dark:text-[#E6E7E7]/75",
                  )}
                >
                  {section.quote.role}
                </span>
              </footer>
            </blockquote>
          ) : null}
        </article>
      </div>
    </EditorialBand>
  );
}
