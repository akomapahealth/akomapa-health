"use client";

import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  PublicSection,
  PublicSectionHeader,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";
import { BRAND } from "@/config/brand";

export default function MissionVisionSection() {
  return (
    <PublicSection tone="cream" spacing="normal" withTexture id="mission-vision">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Purpose & Direction"
          title="Mission & Vision"
          description="Our mission and vision anchor every program, partnership, and community we serve."
          titleId="mission-vision-heading"
        />
      </FadeIn>

      <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <FadeInStaggerItem direction="up">
          <SurfaceCard className="h-full p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
              Our Mission
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#2F3332]/85 dark:text-[#E6E7E7]/85 sm:text-lg">
              {BRAND.mission}
            </p>
          </SurfaceCard>
        </FadeInStaggerItem>

        <FadeInStaggerItem direction="up">
          <SurfaceCard className="h-full p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
              Our Vision
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#2F3332]/85 dark:text-[#E6E7E7]/85 sm:text-lg">
              {BRAND.vision}
            </p>
          </SurfaceCard>
        </FadeInStaggerItem>
      </FadeInStagger>
    </PublicSection>
  );
}
