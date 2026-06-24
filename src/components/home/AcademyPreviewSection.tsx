import { BookOpen, Compass, Users } from "lucide-react";
import { FadeIn } from "@/components/animations";
import Image from "@/components/common/Image";
import {
  IconBadge,
  MediaFrame,
  PublicCta,
  PublicSection,
  SectionEyebrow,
} from "@/components/shared/PublicPagePrimitives";
import { academyPreviewContent } from "@/data/homepage-narrative";

const academyHighlights = [
  { icon: BookOpen, label: "Case-based study" },
  { icon: Users, label: "Faculty mentorship" },
  { icon: Compass, label: "Community practice" },
] as const;

export default function AcademyPreviewSection() {
  const headingId = "academy-preview-heading";

  return (
    <PublicSection
      aria-labelledby={headingId}
      tone="teal"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeIn direction="right" className="lg:col-span-7">
          <SectionEyebrow tone="gold">Akomapa Academy</SectionEyebrow>
          <h2
            id={headingId}
            className="mt-4 font-heading text-4xl font-bold leading-tight text-[#FCFAEF] md:text-5xl lg:text-6xl"
          >
            {academyPreviewContent.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#FCFAEF]/90 md:text-xl">
            {academyPreviewContent.body}
          </p>

          <ul
            aria-label="Academy learning experience"
            className="mt-8 grid gap-3 sm:grid-cols-3"
          >
            {academyHighlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-[#FCFAEF] backdrop-blur-sm"
              >
                <IconBadge className="h-9 w-9 bg-[#FCFAEF]/12 text-[#F5C94D]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </IconBadge>
                {label}
              </li>
            ))}
          </ul>

          <PublicCta
            href={academyPreviewContent.cta.href}
            variant="light"
            className="mt-10"
          >
            {academyPreviewContent.cta.label}
          </PublicCta>
        </FadeIn>

        <FadeIn direction="left" className="lg:col-span-5">
          <MediaFrame aspect="portrait" className="mx-auto w-full max-w-xl bg-[#FCFAEF]/10">
            <Image
              src={academyPreviewContent.image.src}
              alt={academyPreviewContent.image.alt}
              fill
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 42vw, 100vw"
              className="object-cover"
              style={{ objectPosition: academyPreviewContent.image.position }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#121514]/55 via-transparent to-transparent"
            />
          </MediaFrame>
        </FadeIn>
      </div>
    </PublicSection>
  );
}
