"use client";

import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { PublicSection, PublicSectionHeader } from "@/components/shared/PublicPagePrimitives";
import { communityHubs } from "@/data/community-hubs";
import HubCard from "@/components/community-hubs/HubCard";

export default function HubCardGrid() {
  return (
    <PublicSection tone="cream" spacing="normal" withTexture id="our-hubs">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Our Hubs"
          title="Three Platforms, One Movement"
          description="Explore Akomapa's active and in-development community health hubs across Ghana and the United States."
          titleId="our-hubs-heading"
        />
      </FadeIn>

      <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {communityHubs.map((hub) => (
          <FadeInStaggerItem key={hub.id} direction="up" className="h-full">
            <HubCard hub={hub} />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </PublicSection>
  );
}
