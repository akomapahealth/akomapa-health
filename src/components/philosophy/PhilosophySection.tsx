import type { PhilosophySection as PhilosophySectionType } from "@/lib/types";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import { cn } from "@/lib/utils";

type PhilosophySectionProps = {
  section: PhilosophySectionType;
  index: number;
  className?: string;
};

function getSectionBg(index: number) {
  return index % 2 === 0
    ? "bg-[#FCFAEF] dark:bg-[#1C1F1E]"
    : "bg-[#F4F1E8] dark:bg-[#1C1F1E]";
}

export default function PhilosophySection({
  section,
  index,
  className,
}: PhilosophySectionProps) {
  const isImageFirstOnDesktop = index % 2 === 1;
  const paragraphs = section.content.split("\n\n");
  const headingId = `${section.id}-heading`;

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className={cn(
        "relative isolate scroll-mt-28 overflow-hidden border-t border-[#0097b2]/10 py-16 dark:border-[#FCFAEF]/10 md:py-24",
        getSectionBg(index),
        className,
      )}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto grid max-w-6xl items-center justify-items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <FadeIn
            direction={isImageFirstOnDesktop ? "right" : "left"}
            amount="some"
            className={cn(
              "order-1 w-full",
              isImageFirstOnDesktop ? "md:order-1" : "md:order-2",
            )}
          >
            <div className="relative mx-auto h-[280px] w-full max-w-xl overflow-hidden rounded-3xl shadow-2xl sm:h-[340px] md:h-[400px]">
              {section.image ? (
                <Image
                  src={section.image}
                  alt={section.imageAlt ?? ""}
                  fill
                  sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: section.imagePosition ?? "center" }}
                />
              ) : (
                <div
                  className="h-full w-full bg-[#0097b2]/12"
                  aria-hidden="true"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
              />
            </div>
          </FadeIn>

          <FadeIn
            delay={0.08}
            amount="some"
            className={cn(
              "order-2 w-full",
              isImageFirstOnDesktop ? "md:order-2" : "md:order-1",
            )}
          >
            <article className="mx-auto max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC] sm:text-sm">
                Principle {section.order}
              </p>
              <h2
                id={headingId}
                className="mt-4 text-2xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl"
              >
                {section.title}
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-[#2F3332]/82 dark:text-[#E6E7E7]/82 sm:text-lg">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {section.quote ? (
                <blockquote className="mt-8 border-l-4 border-[#eeba2b] pl-5">
                  <p className="relative text-xl font-semibold leading-snug text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-2xl">
                    <span
                      aria-hidden="true"
                      className="absolute -left-4 -top-5 text-6xl leading-none text-[#eeba2b]/45"
                    >
                      &ldquo;
                    </span>
                    {section.quote.text}
                  </p>
                  <footer className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0097b2] dark:text-[#66C4DC]">
                    {section.quote.author}
                    <span className="block pt-1 normal-case tracking-normal text-[#2F3332]/62 dark:text-[#FCFAEF]/62">
                      {section.quote.role}
                    </span>
                  </footer>
                </blockquote>
              ) : null}
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
