import type { PhilosophySection as PhilosophySectionType } from "@/lib/types";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import {
  MediaFrame,
  PublicSection,
  SectionEyebrow,
} from "@/components/shared/PublicPagePrimitives";
import { cn } from "@/lib/utils";

type PhilosophySectionProps = {
  section: PhilosophySectionType;
  index: number;
  className?: string;
};

function getTone(index: number) {
  return index % 2 === 0 ? "cream" : "white";
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
    <PublicSection
      id={section.id}
      aria-labelledby={headingId}
      tone={getTone(index)}
      spacing="spacious"
      withTexture={index % 3 === 0}
      className={cn("scroll-mt-28 border-t border-[#0097b2]/10", className)}
      containerClassName="max-w-7xl xl:pr-72"
    >
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">
        <FadeIn
          direction={isImageFirstOnDesktop ? "right" : "left"}
          className={cn(
            "order-1",
            isImageFirstOnDesktop ? "md:order-1" : "md:order-2",
          )}
        >
          <MediaFrame className="mx-auto w-full max-w-xl" aspect="wide">
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
              <div className="h-full w-full bg-[#0097b2]/12" aria-hidden="true" />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#121514]/48 via-transparent to-transparent"
            />
          </MediaFrame>
        </FadeIn>

        <FadeIn
          delay={0.08}
          className={cn(
            "order-2",
            isImageFirstOnDesktop ? "md:order-2" : "md:order-1",
          )}
        >
          <article className="mx-auto max-w-2xl">
            <SectionEyebrow>Principle {section.order}</SectionEyebrow>
            <h2
              id={headingId}
              className="mt-4 font-heading text-3xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-4xl lg:text-5xl"
            >
              {section.title}
            </h2>
            <div className="mt-6 space-y-5 font-body text-lg leading-8 text-[#2F3332]/82 dark:text-[#E6E7E7]/82">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {section.quote ? (
              <blockquote className="mt-8 border-l-4 border-[#eeba2b] pl-5">
                <p className="relative font-heading text-2xl font-semibold leading-snug text-[#1C1F1E] dark:text-[#FCFAEF]">
                  <span
                    aria-hidden="true"
                    className="absolute -left-4 -top-5 text-6xl leading-none text-[#eeba2b]/45"
                  >
                    &ldquo;
                  </span>
                  {section.quote.text}
                </p>
                <footer className="mt-4 font-body text-sm font-semibold uppercase tracking-[0.16em] text-[#0097b2] dark:text-[#66C4DC]">
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
    </PublicSection>
  );
}
