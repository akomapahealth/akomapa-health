import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { BRAND } from "@/config/brand";
import Image from "@/components/common/Image";
import {
  IconBadge,
  MediaFrame,
  PublicCta,
  PublicSection,
  PublicSectionHeader,
  SectionEyebrow,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";

type Highlight = {
  title: string;
  description: string;
};

type RebrandPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: readonly Highlight[];
};

const fallbackImages = [
  {
    src: "/highlights/Akomapa-62.jpg",
    alt: "Akomapa clinicians serving community members",
    position: "center",
  },
  {
    src: "/highlights/Akomapa-20.jpg",
    alt: "Akomapa community health outreach in progress",
    position: "center",
  },
  {
    src: "/gallery/gallery-pic-1.jpg",
    alt: "Akomapa students and faculty gathered after training",
    position: "center",
  },
] as const;

function pickShellImage(title: string, eyebrow: string) {
  const key = `${title} ${eyebrow}`.toLowerCase();

  if (key.includes("academy") || key.includes("faculty")) {
    return {
      src: "/gallery/gallery-pic-5.jpg",
      alt: "Akomapa student learning session",
      position: "center",
    };
  }

  if (key.includes("hub") || key.includes("ncd") || key.includes("impact")) {
    return fallbackImages[0];
  }

  if (key.includes("partner") || key.includes("research")) {
    return {
      src: "/highlights/Akomapa-10.jpg",
      alt: "Akomapa partners and student leaders in community",
      position: "center",
    };
  }

  if (key.includes("get involved") || key.includes("blog")) {
    return fallbackImages[2];
  }

  return fallbackImages[1];
}

export default function RebrandPageShell({
  eyebrow,
  title,
  description,
  highlights,
}: RebrandPageShellProps) {
  const heroImage = pickShellImage(title, eyebrow);

  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <PublicSection
        tone="cream"
        spacing="spacious"
        withTexture
        className="border-y border-[#0097b2]/15 dark:border-[#FCFAEF]/10"
      >
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionEyebrow tone="teal">{eyebrow}</SectionEyebrow>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl font-body text-lg leading-8 text-[#2F3332]/80 dark:text-[#FCFAEF]/75 sm:text-xl">
              {description}
            </p>
            <p className="mt-4 max-w-3xl font-body text-sm leading-6 text-[#2F3332]/65 dark:text-[#FCFAEF]/60">
              {BRAND.taglineSecondary}
            </p>
            <div className="mt-8">
              <PublicCta href="/contact" variant="teal">
                Connect With Akomapa
              </PublicCta>
            </div>
          </div>

          <div className="lg:col-span-5">
            <MediaFrame className="mx-auto max-w-xl" aspect="portrait">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                style={{ objectPosition: heroImage.position }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#121514]/50 via-transparent to-transparent"
              />
            </MediaFrame>
          </div>
        </div>
      </PublicSection>

      <PublicSection tone="cream">
        <PublicSectionHeader
          eyebrow="What This Builds"
          title="Focused work. Shared standards. One mission."
          description="Each page carries the same visual language while leaving space for its own story, program, and next step."
          className="mb-10"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((highlight) => (
            <article key={highlight.title} className="h-full">
              <SurfaceCard interactive className="h-full p-6">
                <IconBadge className="mb-5">
                  <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                </IconBadge>
                <h2 className="font-heading text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {highlight.title}
                </h2>
                <p className="mt-3 font-body leading-7 text-[#2F3332]/75 dark:text-[#FCFAEF]/70">
                  {highlight.description}
                </p>
              </SurfaceCard>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-xl bg-[#0097b2] p-6 text-floralwhite shadow-[0_18px_45px_rgba(0,151,178,0.22)] sm:p-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-heading text-2xl font-bold">
              Help shape what comes next
            </h2>
            <p className="mt-2 max-w-2xl font-body text-floralwhite/85">
              Connect with Akomapa to learn more, collaborate, or support this
              work as the site experience continues to grow.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md bg-[#eeba2b] px-5 py-3 font-body font-semibold text-[#1C1F1E] transition-colors hover:bg-[#F5C94D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floralwhite focus-visible:ring-offset-2 focus-visible:ring-offset-[#0097b2]"
          >
            Contact Us
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </PublicSection>
    </div>
  );
}
