"use client";

import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import HubCard from "@/components/community-hubs/HubCard";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { communityHubs } from "@/data/community-hubs";

export default function HubCardGrid() {
  return (
    <EditorialBand
      tone="cream"
      marker="03"
      id="our-hubs"
      aria-labelledby="our-hubs-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
            Our Hubs
          </EditorialEyebrow>
          <EditorialHeading id="our-hubs-heading" className="mt-4">
            Three Platforms, One Movement
          </EditorialHeading>
          <EditorialLead className="mt-5">
            Explore Akomapa&apos;s active and in-development community health hubs
            across Ghana and the United States.
          </EditorialLead>
        </div>
      </FadeIn>

      <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {communityHubs.map((hub) => (
          <FadeInStaggerItem key={hub.id} direction="up" className="h-full">
            <HubCard hub={hub} />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </EditorialBand>
  );
}
