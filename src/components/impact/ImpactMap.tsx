"use client";

import NextImage from "next/image";
import { useState } from "react";
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

// Projection constants — must match scripts that generated
// /public/images/world-equirectangular.svg (Natural Earth, public domain).
const LAT_TOP = 83;
const LAT_SPAN = 139; // 83°N down to 56°S
const LNG_SPAN = 360;

function projectToPercent({ lat, lng }: MapLocation["coordinates"]) {
  return {
    left: ((lng + 180) / LNG_SPAN) * 100,
    top: ((LAT_TOP - lat) / LAT_SPAN) * 100,
  };
}

type LocationTypeMeta = {
  label: string;
  dot: string;
  ring: string;
  badge: string;
};

const typeMeta: Record<MapLocation["type"], LocationTypeMeta> = {
  "active-hub": {
    label: "Active hub",
    dot: "bg-[#0097b2] border-white",
    ring: "bg-[#0097b2]/40",
    badge: "bg-[#0097b2]/10 text-[#0097b2]",
  },
  "planned-hub": {
    label: "Planned hub",
    dot: "bg-[#eeba2b] border-white",
    ring: "bg-[#eeba2b]/40",
    badge: "bg-[#eeba2b]/15 text-[#8a6b12]",
  },
  partner: {
    label: "Partner",
    dot: "bg-white border-[#0097b2]",
    ring: "bg-[#0097b2]/20",
    badge: "bg-[#0F4C5C]/10 text-[#0F4C5C]",
  },
};

export default function ImpactMap() {
  const [activeId, setActiveId] = useState<string | null>(null);

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
        {/* Map panel — intentionally light in both themes, like a printed map. */}
        <div
          className="relative mx-auto aspect-[1000/386] w-full max-w-5xl overflow-hidden rounded-2xl border border-[#0097b2]/20 bg-gradient-to-b from-[#EAF4F6] to-[#DCEEF1] shadow-[0_24px_70px_rgba(15,76,92,0.18)]"
          onMouseLeave={() => setActiveId(null)}
        >
          <NextImage
            src="/images/world-equirectangular.svg"
            alt="World map of Akomapa hub and partner locations"
            fill
            unoptimized
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="pointer-events-none select-none object-contain opacity-90"
          />

          {mapLocations.map((location) => {
            const { left, top } = projectToPercent(location.coordinates);
            const meta = typeMeta[location.type];
            const isActive = activeId === location.id;

            return (
              <div
                key={location.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <button
                  type="button"
                  aria-label={`${location.name} — ${meta.label}`}
                  aria-expanded={isActive}
                  onClick={() =>
                    setActiveId((current) =>
                      current === location.id ? null : location.id,
                    )
                  }
                  onMouseEnter={() => setActiveId(location.id)}
                  onFocus={() => setActiveId(location.id)}
                  onBlur={() => setActiveId(null)}
                  className="group relative flex h-6 w-6 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2"
                >
                  {location.type === "active-hub" ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inline-flex h-4 w-4 animate-ping rounded-full motion-reduce:hidden",
                        meta.ring,
                      )}
                    />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative inline-flex h-3.5 w-3.5 rounded-full border-2 shadow-md transition-transform duration-200 group-hover:scale-125",
                      meta.dot,
                    )}
                  />
                </button>

                {/* Tooltip */}
                {isActive ? (
                  <div
                    role="tooltip"
                    className="absolute bottom-full left-1/2 z-20 mb-3 w-56 -translate-x-1/2 rounded-xl border border-[#E6E7E7] bg-white p-3 text-left shadow-xl"
                  >
                    <span
                      className={cn(
                        "inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                        meta.badge,
                      )}
                    >
                      {meta.label}
                    </span>
                    <p className="mt-1.5 text-sm font-semibold text-[#1C1F1E]">
                      {location.name}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-[#2F3332]/75">
                      {location.description}
                    </p>
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-[#E6E7E7] bg-white"
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </FadeIn>

      {/* Legend */}
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

      {/* Location list — accessible, mobile-friendly fallback */}
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
                  {location.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
                  {location.description}
                </p>
              </div>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStagger>
    </PublicSection>
  );
}
