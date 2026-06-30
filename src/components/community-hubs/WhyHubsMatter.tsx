"use client";

import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  PublicSection,
  PublicSectionHeader,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";
import { whyHubsMatter } from "@/data/community-hubs";

export default function WhyHubsMatter() {
  return (
    <PublicSection tone="teal" spacing="normal" id="why-hubs-matter">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Why Our Hubs Matter"
          title="More Than a Place to Receive Care"
          description="Our hubs strengthen communities, develop ethical leaders, generate evidence, and pilot innovations that can scale."
          titleId="why-hubs-matter-heading"
          eyebrowTone="gold"
          titleClassName="text-[#FCFAEF]"
          descriptionClassName="text-[#FCFAEF]/85"
        />
      </FadeIn>

      <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {whyHubsMatter.map((item) => (
          <FadeInStaggerItem key={item.id} direction="up">
            <SurfaceCard className="h-full border-[#FCFAEF]/15 bg-[#FCFAEF]/10 p-6 text-[#FCFAEF] backdrop-blur-sm">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#FCFAEF]/85">
                {item.description}
              </p>
            </SurfaceCard>
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </PublicSection>
  );
}
