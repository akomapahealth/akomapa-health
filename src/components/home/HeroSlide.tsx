"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TAG_COLORS } from "@/data/announcement-colors";
import type { Announcement } from "@/lib/types";

export type BrandSlideContent = {
  variant: "brand";
  id: "brand-intro";
  backgroundImage: string;
  backgroundAlt: string;
};

export type AnnouncementSlideContent = {
  variant: "announcement";
  announcement: Announcement;
};

export type HeroSlideContent = BrandSlideContent | AnnouncementSlideContent;

type Props = {
  content: HeroSlideContent;
  isActive: boolean;
  isPrimary: boolean;
  onPlayVideo?: (announcement: Announcement) => void;
};

const ctaButtonClass =
  "group bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] px-8 py-6 h-auto text-lg font-medium rounded-half transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl";

const secondaryCtaClass =
  "group bg-[#eeba2b] hover:bg-[#eeba2b]/80 text-[#FCFAEF] px-8 py-6 h-auto text-lg font-medium rounded-half transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl";

// Slides whose source media is light/white-dominant or has transparency.
// We crank up the scrim so white-on-light copy stays readable.
const STRONG_SCRIM_IDS = new Set<string>([
  "startup-yale-finalist",
  "mastercard-momentum",
  "nkwapa-emr-launch",
  "yale-african-symposium",
]);

// Title accent — pick a brand color for the tag pill ring.
const ACCENT_BAR_COLOR: Record<NonNullable<import("@/lib/types").Announcement["tagColor"]>, string> = {
  lapis: "bg-[#8DD4E6]",
  amber: "bg-[#eeba2b]",
  skobeloff: "bg-[#66C4DC]",
};

// Brand accent palette for in-title highlight spans (alternates).
// Mirrors the brand-slide treatment of `text-[#8DD4E6]` and `text-[#eeba2b]`.
const HIGHLIGHT_PALETTE: Record<
  NonNullable<import("@/lib/types").Announcement["tagColor"]>,
  readonly [string, string]
> = {
  lapis: ["text-[#8DD4E6] dark:text-[#B0E8F5]", "text-[#eeba2b]"],
  amber: ["text-[#eeba2b]", "text-[#8DD4E6] dark:text-[#B0E8F5]"],
  skobeloff: ["text-[#66C4DC]", "text-[#eeba2b]"],
};

/**
 * Render a title with literal substrings wrapped in alternating brand-accent
 * spans. Matching is case-sensitive, in-order, and non-overlapping. If a
 * highlight isn't found in the title, it's silently skipped.
 */
function renderHighlightedTitle(
  title: string,
  highlights: readonly string[] | undefined,
  palette: readonly [string, string]
) {
  if (!highlights?.length) return title;

  const segments: Array<{ text: string; accent?: string }> = [
    { text: title },
  ];

  highlights.forEach((needle, i) => {
    if (!needle) return;
    const accent = palette[i % palette.length];
    for (let s = 0; s < segments.length; s += 1) {
      const segment = segments[s];
      if (segment.accent) continue;
      const idx = segment.text.indexOf(needle);
      if (idx === -1) continue;
      const before = segment.text.slice(0, idx);
      const after = segment.text.slice(idx + needle.length);
      const replacement: typeof segments = [];
      if (before) replacement.push({ text: before });
      replacement.push({ text: needle, accent });
      if (after) replacement.push({ text: after });
      segments.splice(s, 1, ...replacement);
      break;
    }
  });

  return segments.map((seg, i) =>
    seg.accent ? (
      <span key={i} className={seg.accent}>
        {seg.text}
      </span>
    ) : (
      <span key={i}>{seg.text}</span>
    )
  );
}

function ScrimOverlay({ strong = false }: { strong?: boolean }) {
  return (
    <>
      {/* Bottom-up vignette for global contrast */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          strong
            ? "bg-gradient-to-t from-black/75 via-black/35 to-black/20"
            : "bg-gradient-to-t from-black/55 via-black/20 to-black/10"
        )}
        aria-hidden
      />
      {/* Left-weighted scrim for readable text column */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          strong
            ? "bg-[linear-gradient(105deg,rgba(0,0,0,0.70)_0%,rgba(0,0,0,0.45)_38%,rgba(0,0,0,0.15)_70%,transparent_100%)]"
            : "bg-[linear-gradient(105deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0.30)_42%,rgba(0,0,0,0.08)_72%,transparent_100%)]"
        )}
        aria-hidden
      />
    </>
  );
}

function BrandSlide({ content, isPrimary }: { content: BrandSlideContent; isPrimary: boolean }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 brightness-[0.96] contrast-[1.03]">
        <Image
          src={content.backgroundImage}
          alt={content.backgroundAlt}
          fill
          priority={isPrimary}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <ScrimOverlay />

      <div className="relative z-10 mx-auto flex h-full max-w-[var(--container-max,80rem)] items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-left"
          >
            <h1 className="font-heading hero-heading-shadow mb-6 text-4xl tracking-tight text-balance text-[#FCFAEF] md:text-5xl lg:text-6xl xl:text-7xl leading-[1.02] md:leading-[1.04]">
              Can a{" "}
              <span className="text-[#8DD4E6] dark:text-[#B0E8F5]">global partnership</span> of{" "}
              <span className="text-[#eeba2b]">students</span> lead the fight against{" "}
              <span className="text-[#8DD4E6] dark:text-[#B0E8F5]">non-communicable diseases</span>?
            </h1>

            <p className="font-body hero-body-shadow mb-8 max-w-2xl text-xl font-medium leading-relaxed text-[#FCFAEF] md:text-2xl">
              Student-powered.{" "}
              <span className="text-[#8DD4E6] dark:text-[#B0E8F5]">Expert-supervised</span>. Community-rooted.
              <br />
              Akomapa is redefining preventative primary care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <Button asChild size="lg" className={ctaButtonClass}>
                <Link href="/join" className="flex items-center space-x-2">
                  <span>Join the Movement</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              <Button asChild size="lg" className={secondaryCtaClass}>
                <Link href="/partner" className="flex items-center space-x-2">
                  <span>Support Our Work</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AnnouncementCta({
  announcement,
  onPlayVideo,
}: {
  announcement: Announcement;
  onPlayVideo?: (announcement: Announcement) => void;
}) {
  const { ctaText, ctaLink, isExternal, videoUrl, title } = announcement;
  const accessibleLabel = ctaText ? `${ctaText}: ${title}` : title;

  if (videoUrl && onPlayVideo) {
    return (
      <Button
        size="lg"
        type="button"
        onClick={() => onPlayVideo(announcement)}
        className={ctaButtonClass}
        aria-label={`Play video: ${title}`}
      >
        <span className="flex items-center space-x-2">
          <Play className="h-5 w-5" fill="currentColor" />
          <span>{ctaText || "Watch Video"}</span>
        </span>
      </Button>
    );
  }

  if (!ctaText || !ctaLink) return null;

  if (isExternal) {
    return (
      <Button asChild size="lg" className={ctaButtonClass}>
        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
          aria-label={accessibleLabel}
        >
          <span>{ctaText}</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </Button>
    );
  }

  return (
    <Button asChild size="lg" className={ctaButtonClass}>
      <Link href={ctaLink} className="flex items-center space-x-2" aria-label={accessibleLabel}>
        <span>{ctaText}</span>
        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </Button>
  );
}

function AnnouncementSlide({
  content,
  isActive,
  isPrimary,
  onPlayVideo,
}: {
  content: AnnouncementSlideContent;
  isActive: boolean;
  isPrimary: boolean;
  onPlayVideo?: (announcement: Announcement) => void;
}) {
  const { announcement } = content;
  const {
    id,
    tag,
    tagColor,
    title,
    titleHighlights,
    description,
    image,
    thumbnail,
    videoUrl,
  } = announcement;
  const bgSrc = thumbnail || image;
  const strongScrim = STRONG_SCRIM_IDS.has(id);
  const accentColor = tagColor ?? "lapis";

  return (
    <div className="relative h-full w-full bg-[#1C1F1E]">
      {bgSrc && (
        <div className="absolute inset-0 brightness-[0.94] contrast-[1.04]">
          <Image
            src={bgSrc}
            alt=""
            fill
            priority={isPrimary}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      )}
      <ScrimOverlay strong={strongScrim} />

      <div className="relative z-10 mx-auto flex h-full max-w-[var(--container-max,80rem)] items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl py-16 md:py-24">
          <motion.div
            key={isActive ? "active" : "idle"}
            initial={{ opacity: 0, y: 24 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
            <div
              className={cn(
                "relative inline-block w-full rounded-2xl px-5 py-6 sm:px-7 sm:py-8",
                "bg-black/20 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]",
                "ring-1 ring-white/10"
              )}
            >
              <span
                className={cn(
                  "absolute left-0 top-6 bottom-6 w-1 rounded-r-full",
                  ACCENT_BAR_COLOR[accentColor]
                )}
                aria-hidden
              />

              {tag && (
                <span
                  className={cn(
                    "mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide backdrop-blur-md shadow-sm",
                    TAG_COLORS[accentColor]
                  )}
                >
                  {tag}
                </span>
              )}

              <h2 className="font-heading hero-heading-shadow mb-4 text-3xl tracking-tight text-balance text-[#FCFAEF] md:text-5xl lg:text-[3.5rem] leading-[1.05]">
                {renderHighlightedTitle(title, titleHighlights, HIGHLIGHT_PALETTE[accentColor])}
              </h2>

              <p className="font-body hero-body-shadow mb-7 max-w-2xl text-base leading-relaxed text-[#FCFAEF]/95 md:text-lg">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                <AnnouncementCta announcement={announcement} onPlayVideo={onPlayVideo} />

                {videoUrl && announcement.ctaLink && announcement.ctaText && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-[#FCFAEF]/80 text-[#FCFAEF] hover:bg-[#FCFAEF]/10 hover:border-[#FCFAEF] hover:text-[#FCFAEF] px-8 py-6 h-auto text-lg font-medium rounded-half transition-all duration-300"
                >
                  {announcement.isExternal ? (
                    <a
                      href={announcement.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                      aria-label={`Learn more: ${title}`}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  ) : (
                    <Link
                      href={announcement.ctaLink}
                      className="flex items-center space-x-2"
                      aria-label={`Learn more: ${title}`}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  )}
                </Button>
              )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSlide({ content, isActive, isPrimary, onPlayVideo }: Props) {
  if (content.variant === "brand") {
    return <BrandSlide content={content} isPrimary={isPrimary} />;
  }
  return (
    <AnnouncementSlide
      content={content}
      isActive={isActive}
      isPrimary={isPrimary}
      onPlayVideo={onPlayVideo}
    />
  );
}
