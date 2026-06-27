"use client";

import Link from "next/link";
import {
  ArrowRight,
  FlaskConical,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  IconBadge,
  PublicSection,
  PublicSectionHeader,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";
import { whatWeDoCategories, type AboutCategory } from "@/data/about";

const iconMap: Record<AboutCategory["icon"], LucideIcon> = {
  GraduationCap,
  HeartHandshake,
  FlaskConical,
  Lightbulb,
  Handshake,
};

export default function WhatWeDoSection() {
  return (
    <PublicSection tone="cream" spacing="normal" withTexture id="what-we-do">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="What We Do"
          title="Five Pillars of Our Work"
          description="We develop ethical leaders, strengthen communities, advance research, drive innovation, and build equitable partnerships."
          titleId="what-we-do-heading"
        />
      </FadeIn>

      <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {whatWeDoCategories.map((category) => {
          const Icon = iconMap[category.icon];

          return (
            <FadeInStaggerItem key={category.id} direction="up">
              <Link href={category.href} className="group block h-full">
                <SurfaceCard interactive className="flex h-full flex-col p-6">
                  <IconBadge>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </IconBadge>
                  <h3 className="mt-4 text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {category.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                    {category.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-[#0097b2] transition-transform group-hover:translate-x-1 dark:text-[#66C4DC]">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </span>
                </SurfaceCard>
              </Link>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStagger>
    </PublicSection>
  );
}
