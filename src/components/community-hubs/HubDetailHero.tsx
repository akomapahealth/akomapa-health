"use client";

import Image from "@/components/common/Image";
import { MapPin } from "lucide-react";
import { FadeIn } from "@/components/animations";
import type { CommunityHub } from "@/lib/types";

const statusLabels = {
  active: "Active",
  "in-development": "In development",
  planned: "Planned",
  future: "Future",
} as const;

type HubDetailHeroProps = {
  hub: CommunityHub;
};

export default function HubDetailHero({ hub }: HubDetailHeroProps) {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 md:py-24"
      style={{
        background: `linear-gradient(135deg, ${hub.color} 0%, #0F4C5C 100%)`,
      }}
      aria-labelledby="hub-detail-hero-heading"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <FadeIn className="lg:col-span-7">
            <span className="inline-flex rounded-full bg-[#FCFAEF]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#FCFAEF]">
              {statusLabels[hub.status as keyof typeof statusLabels]}
            </span>
            <h1
              id="hub-detail-hero-heading"
              className="mt-4 text-3xl font-light leading-tight text-[#FCFAEF] sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {hub.name}
            </h1>
            <div className="mt-4 flex items-start gap-2 text-[#FCFAEF]/85">
              <MapPin className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="text-base sm:text-lg">
                {hub.location}, {hub.country}
              </p>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg">
              {hub.description}
            </p>
          </FadeIn>

          <FadeIn direction="left" delay={0.2} className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Image
                src={hub.image}
                alt={`${hub.name} community health hub`}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
