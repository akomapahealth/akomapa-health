import { ArrowRight, BookOpen, Compass, Users } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { academyPreviewContent } from "@/data/homepage-narrative";

const academyHighlights = [
  { icon: BookOpen, label: "Case-based study" },
  { icon: Users, label: "Faculty mentorship" },
  { icon: Compass, label: "Community practice" },
] as const;

export default function AcademyPreviewSection() {
  const headingId = "academy-preview-heading";

  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate min-h-[680px] overflow-hidden py-16 text-[#FCFAEF] md:flex md:min-h-[760px] md:items-center md:py-24"
    >
      <Image
        src={academyPreviewContent.image.src}
        alt={academyPreviewContent.image.alt}
        fill
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: academyPreviewContent.image.position }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#1C1F1E]/75 md:bg-gradient-to-r md:from-[#121514]/95 md:via-[#121514]/80 md:to-[#121514]/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#121514]/75 via-transparent to-transparent"
      />

      <div className="container relative z-10 mx-auto px-4">
        <FadeIn direction="right" className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-[#eeba2b]/40 bg-[#121514]/40 px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-[#F5C94D] backdrop-blur-sm">
            Akomapa Academy
          </div>
          <h2
            id={headingId}
            className="mt-6 font-heading text-4xl font-bold leading-tight text-[#FCFAEF] md:text-5xl lg:text-7xl"
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
                <Icon className="h-5 w-5 text-[#F5C94D]" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <Button
            asChild
            size="lg"
            className="mt-10 h-auto rounded-half bg-[#eeba2b] px-9 py-4 text-base text-[#1C1F1E] shadow-xl hover:bg-[#FCFAEF] hover:text-[#1C1F1E] md:text-lg"
          >
            <Link href={academyPreviewContent.cta.href}>
              {academyPreviewContent.cta.label}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
