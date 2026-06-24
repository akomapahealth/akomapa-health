"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  GraduationCap,
  HeartPulse,
  Lightbulb,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  IconBadge,
  PublicSection,
  PublicSectionHeader,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";
import { pillars } from "@/data/pillars";
import type { Pillar, PillarIconName } from "@/lib/types";

const pillarIcons: Record<PillarIconName, LucideIcon> = {
  HeartPulse,
  GraduationCap,
  Users,
  Lightbulb,
};

function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = pillarIcons[pillar.icon];
  const cardStyle = {
    borderTopColor: pillar.color,
    "--homepage-hover-border-color": pillar.color,
  } as CSSProperties;

  return (
    <article className="h-full">
      <SurfaceCard
        interactive
        accentColor={pillar.color}
        data-testid="program-pillar-card"
        data-pillar-id={pillar.id}
        data-accent-color={pillar.color}
        className="group flex h-full flex-col overflow-hidden border-t-4 p-0"
        style={cardStyle}
      >
        <Link
          href={pillar.link}
          aria-label={`Learn more about ${pillar.title}`}
          className="flex h-full flex-col rounded-xl p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-[#66C4DC] dark:focus-visible:ring-offset-[#121514]"
        >
          <div className="flex items-start gap-4">
            <IconBadge
              className="h-12 w-12"
              style={
                {
                  backgroundColor: `${pillar.color}1A`,
                  color: pillar.color,
                } as CSSProperties
              }
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </IconBadge>
            <h3 className="text-xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF]">
              {pillar.title}
            </h3>
          </div>

          <p className="mt-5 flex-1 text-base leading-relaxed text-[#2F3332]/85 dark:text-[#E6E7E7]/85">
            {pillar.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2" aria-label={`${pillar.title} features`}>
            {pillar.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full border px-3 py-1 text-xs font-bold leading-5 text-[#1C1F1E] dark:text-[#FCFAEF]"
                style={
                  {
                    borderColor: `${pillar.color}66`,
                    backgroundColor: `${pillar.color}1A`,
                  } as CSSProperties
                }
              >
                {feature}
              </span>
            ))}
          </div>

          <span
            className="mt-8 inline-flex items-center text-sm font-bold transition-colors group-hover:text-[#eeba2b] dark:group-hover:text-[#F5C94D]"
            style={{ color: pillar.color }}
          >
            Learn More
            <ArrowRight
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              aria-hidden="true"
            />
          </span>
        </Link>
      </SurfaceCard>
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
