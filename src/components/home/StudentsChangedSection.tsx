import { FadeIn } from "@/components/animations";
import Image from "@/components/common/Image";
import {
  MediaFrame,
  PublicCta,
  PublicSection,
  SectionEyebrow,
} from "@/components/shared/PublicPagePrimitives";
import { studentsChangedContent } from "@/data/homepage-narrative";

export default function StudentsChangedSection() {
  const headingId = "students-changed-heading";

  return (
    <PublicSection aria-labelledby={headingId} tone="teal" spacing="spacious">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(252,250,239,0.08),transparent_42%,rgba(245,201,77,0.14))]"
      />

      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeIn direction="right" className="lg:col-span-5">
          <MediaFrame className="mx-auto w-full max-w-xl" aspect="portrait">
            <Image
              src={studentsChangedContent.image.src}
              alt={studentsChangedContent.image.alt}
              fill
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 42vw, 100vw"
              className="object-cover"
              style={{
                objectPosition: studentsChangedContent.image.position,
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#121514]/58 via-transparent to-transparent"
            />
          </MediaFrame>
        </FadeIn>

        <FadeIn className="lg:col-span-7">
          <div className="max-w-3xl">
            <SectionEyebrow tone="gold">Students as Changemakers</SectionEyebrow>
            <h2
              id={headingId}
              className="mt-4 font-heading text-4xl font-bold leading-tight text-[#FCFAEF] md:text-5xl lg:text-6xl"
            >
              {studentsChangedContent.heading}
            </h2>
            <div
              aria-hidden="true"
              className="my-7 h-1 w-24 rounded-full bg-[#eeba2b]"
            />
            <p className="text-lg leading-relaxed text-[#FCFAEF]/88 md:text-xl md:leading-relaxed">
              {studentsChangedContent.body}
            </p>
            <PublicCta
              href={studentsChangedContent.cta.href}
              variant="gold"
              className="mt-8"
            >
              {studentsChangedContent.cta.label}
            </PublicCta>
          </div>
        </FadeIn>
      </div>
    </PublicSection>
  );
}
