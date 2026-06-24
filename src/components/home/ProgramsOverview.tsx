"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import Image from "@/components/common/Image";
import {
  PublicSection,
  PublicSectionHeader,
} from "@/components/shared/PublicPagePrimitives";
import { pillars } from "@/data/pillars";
import type { Pillar } from "@/lib/types";

function PillarCard({ pillar }: { pillar: Pillar }) {
  const cardStyle = {
    "--pillar-accent": pillar.color,
    "--homepage-hover-border-color": pillar.color,
  } as CSSProperties;

  return (
    <article className="h-full">
      <Link
        href={pillar.link}
        aria-label={`${pillar.ctaLabel}: ${pillar.title}`}
        data-testid="program-pillar-card"
        data-pillar-id={pillar.id}
        data-accent-color={pillar.color}
        className="homepage-hover-card group flex h-full flex-col overflow-hidden rounded-lg border border-[#D8D6C8] bg-white shadow-[0_18px_44px_rgba(28,31,30,0.08)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF] dark:border-[#2F3332] dark:bg-[#1C1F1E] dark:shadow-[0_18px_44px_rgba(0,0,0,0.22)] dark:focus-visible:ring-[#66C4DC] dark:focus-visible:ring-offset-[#121514]"
        style={cardStyle}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#1C1F1E]">
          <Image
            src={pillar.image.src}
            alt={pillar.image.alt}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            style={{ objectPosition: pillar.image.position }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-[var(--pillar-accent)]"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-heading text-2xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF]">
            {pillar.title}
          </h3>
          <p className="mt-4 flex-1 text-base leading-relaxed text-[#2F3332]/82 dark:text-[#E6E7E7]/78">
            {pillar.description}
          </p>
          <span className="mt-8 w-fit border-b border-[var(--pillar-accent)] pb-1 text-sm font-bold text-[#1C1F1E] transition-colors group-hover:text-[var(--pillar-accent)] dark:text-[#FCFAEF]">
            {pillar.ctaLabel}
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function ProgramsOverview() {
  const headingId = "programs-overview-heading";

  return (
    <PublicSection aria-labelledby={headingId} tone="cream" withTexture>
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Our Pillars"
          eyebrowTone="gold"
          title="What We Do"
          titleId={headingId}
          description="Akomapa develops ethical health leaders through community-driven care, leadership education, research, innovation, and equitable partnerships."
          className="mb-12"
          titleClassName="md:text-4xl lg:text-5xl"
        />
      </FadeIn>

      <FadeInStagger className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {pillars.map((pillar) => (
          <FadeInStaggerItem key={pillar.id} className="h-full">
            <PillarCard pillar={pillar} />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </PublicSection>
  );
}
