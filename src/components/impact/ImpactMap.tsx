"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  PublicSection,
  PublicSectionHeader,
} from "@/components/shared/PublicPagePrimitives";
import { mapLocations } from "@/data/impact";
import type { MapLocation } from "@/lib/types";
import { cn } from "@/lib/utils";

type LocationTypeMeta = {
  label: string;
  dot: string;
  badge: string;
};

const typeMeta: Record<MapLocation["type"], LocationTypeMeta> = {
  "active-hub": {
    label: "Active hub",
    dot: "bg-[#0097b2] border-white",
    badge: "bg-[#0097b2]/10 text-[#0097b2]",
  },
  "planned-hub": {
    label: "Planned hub",
    dot: "bg-[#eeba2b] border-white",
    badge: "bg-[#eeba2b]/15 text-[#8a6b12]",
  },
  partner: {
    label: "Partner",
    dot: "bg-white border-[#0097b2]",
    badge: "bg-[#0F4C5C]/10 text-[#0F4C5C]",
  },
};

function MapCanvasPlaceholder() {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#EAF4F6] to-[#DCEEF1] text-sm text-[#0F4C5C]/70"
      aria-hidden="true"
    >
      Loading map…
    </div>
  );
}

const ImpactMapCanvas = dynamic(() => import("./ImpactMapCanvas"), {
  ssr: false,
  loading: () => <MapCanvasPlaceholder />,
});

export default function ImpactMap() {
  return (
    <PublicSection tone="cream" aria-labelledby="impact-map-heading">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Global Footprint"
          eyebrowTone="teal"
          titleId="impact-map-heading"
          title="A growing network of hubs"
          description="Akomapa's Community Learning & Care Hubs and partner institutions span West Africa and North America — with more sites on the way."
          className="mb-12"
        />
      </FadeIn>

      <FadeIn direction="up" delay={0.05}>
        <div
          data-testid="impact-map-panel"
          className="relative mx-auto aspect-[4/3] min-h-[16rem] w-full max-w-5xl overflow-hidden rounded-2xl border border-[#0097b2]/20 bg-gradient-to-b from-[#EAF4F6] to-[#DCEEF1] shadow-[0_24px_70px_rgba(15,76,92,0.18)] sm:aspect-[1000/386] sm:min-h-0"
        >
          <ImpactMapCanvas />
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <ul className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {(
            Object.entries(typeMeta) as [MapLocation["type"], LocationTypeMeta][]
          ).map(([type, meta]) => (
            <li
              key={type}
              className="flex items-center gap-2 text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex h-3.5 w-3.5 rounded-full border-2",
                  meta.dot,
                )}
              />
              {meta.label}
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeInStagger
        className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.08}
      >
        {mapLocations.map((location) => {
          const meta = typeMeta[location.type];
          return (
            <FadeInStaggerItem key={location.id} direction="up" className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-[#E6E7E7] bg-white/90 p-5 shadow-sm dark:border-[#2F3332] dark:bg-[#2F3332]/70">
                <span
                  className={cn(
                    "inline-block w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                    meta.badge,
                  )}
                >
                  {meta.label}
                </span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {location.href ? (
                    <Link
                      href={location.href}
                      className="transition-colors hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] dark:hover:text-[#66C4DC]"
                    >
                      {location.name}
                    </Link>
                  ) : (
                    location.name
                  )}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
                  {location.description}
                </p>
                {location.href ? (
                  <Link
                    href={location.href}
                    className="mt-4 text-sm font-semibold text-[#0097b2] underline-offset-2 hover:underline dark:text-[#66C4DC]"
                  >
                    View hub
                  </Link>
                ) : null}
              </div>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStagger>
    </PublicSection>
  );
}
