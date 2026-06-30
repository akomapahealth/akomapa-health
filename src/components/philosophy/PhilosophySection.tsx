import type { PhilosophySection as PhilosophySectionType } from "@/lib/types";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
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
  const paragraphs = section.content.split("\n\n");
  const headingId = `${section.id}-heading`;

  // Alternate: even index = cream, odd index = teal gradient
  const isTealGradient = index % 2 === 1;

  const sectionBg = isTealGradient
    ? "relative bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF]"
    : "bg-[#FCFAEF] dark:bg-[#1C1F1E]";

  const eyebrowClass = isTealGradient
    ? "text-xs font-semibold uppercase tracking-[0.3em] text-[#F5C94D] sm:text-sm"
    : "text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC] sm:text-sm";

  const headingClass = isTealGradient
    ? "mt-4 text-2xl font-bold leading-tight text-[#FCFAEF] sm:text-3xl md:text-4xl"
    : "mt-4 text-2xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl";

  const bodyClass = isTealGradient
    ? "mt-6 space-y-5 text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg"
    : "mt-6 space-y-5 text-base leading-relaxed text-[#2F3332]/82 dark:text-[#E6E7E7]/82 sm:text-lg";

  const quoteTextClass = isTealGradient
    ? "relative text-xl font-semibold leading-snug text-[#FCFAEF] sm:text-2xl"
    : "relative text-xl font-semibold leading-snug text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-2xl";

  const quoteAuthorClass = isTealGradient
    ? "mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#F5C94D]"
    : "mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0097b2] dark:text-[#66C4DC]";

  const quoteRoleClass = isTealGradient
    ? "block pt-1 normal-case tracking-normal text-[#FCFAEF]/62"
    : "block pt-1 normal-case tracking-normal text-[#2F3332]/62 dark:text-[#FCFAEF]/62";

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className={cn(
        "isolate scroll-mt-28 overflow-hidden py-16 md:py-24",
        sectionBg,
        className,
      )}
    >
      {/* Decorative blurs for teal gradient sections */}
      {isTealGradient && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
      )}

      <div className={cn("container mx-auto max-w-7xl px-4", isTealGradient && "relative z-10")}>
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
              <p className={eyebrowClass}>
                Principle {section.order}
              </p>
              <h2 id={headingId} className={headingClass}>
                {section.title}
              </h2>
              <div className={bodyClass}>
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {section.quote ? (
                <blockquote className="mt-8 border-l-4 border-[#eeba2b] pl-5">
                  <p className={quoteTextClass}>
                    <span
                      aria-hidden="true"
                      className="absolute -left-4 -top-5 text-6xl leading-none text-[#eeba2b]/45"
                    >
                      &ldquo;
                    </span>
                    {section.quote.text}
                  </p>
                  <footer className={quoteAuthorClass}>
                    {section.quote.author}
                    <span className={quoteRoleClass}>
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
