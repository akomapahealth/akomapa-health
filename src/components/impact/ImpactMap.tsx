"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
  EditorialArrowLink,
} from "@/components/shared/EditorialPrimitives";
import { mapLocations } from "@/data/impact";
import type { MapLocation } from "@/lib/types";
import { cn } from "@/lib/utils";

type LocationTypeMeta = {
  label: string;
  /** Shape cue so type is not color-alone (matches map markers). */
  shape: "circle-filled" | "square-filled" | "circle-outline";
  shapeClass: string;
  badge: string;
};

const typeMeta: Record<MapLocation["type"], LocationTypeMeta> = {
  "active-hub": {
    label: "Active hub",
    shape: "circle-filled",
    shapeClass: "rounded-full bg-[#0097b2] border-2 border-[#0097b2]",
    badge:
      "border border-[#0097b2]/40 text-[#0097b2] dark:border-[#66C4DC]/50 dark:text-[#66C4DC]",
  },
  "planned-hub": {
    label: "Planned hub",
    shape: "square-filled",
    shapeClass: "rounded-sm bg-[#eeba2b] border-2 border-[#eeba2b]",
    badge:
      "border border-[#C9920F]/40 text-[#8a6b12] dark:border-[#F5C94D]/50 dark:text-[#F5C94D]",
  },
  partner: {
    label: "Partner",
    shape: "circle-outline",
    shapeClass: "rounded-full bg-transparent border-2 border-[#0F4C5C] dark:border-[#FCFAEF]",
    badge:
      "border border-[#0F4C5C]/35 text-[#0F4C5C] dark:border-[#FCFAEF]/40 dark:text-[#FCFAEF]",
  },
};

function MapCanvasPlaceholder() {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-[#EAF4F6] text-sm text-[#0F4C5C]/70 dark:bg-[#1C1F1E] dark:text-[#E6E7E7]/70"
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
    <EditorialBand
      tone="cream"
      marker="03"
      id="impact-map"
      aria-labelledby="impact-map-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow>Global Footprint</EditorialEyebrow>
          <EditorialHeading id="impact-map-heading" className="mt-4">
            A growing network of hubs
          </EditorialHeading>
          <EditorialLead className="mt-5">
            Akomapa&apos;s Community Learning &amp; Care Hubs and partner
            institutions span West Africa and North America — with more sites on
            the way.
          </EditorialLead>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.05}>
        <div
          data-testid="impact-map-panel"
          className="relative mx-auto mt-12 aspect-[1000/386] w-full max-w-5xl overflow-hidden rounded-md border border-[#1C1F1E]/15 bg-[#EAF4F6] dark:border-[#FCFAEF]/20 dark:bg-[#1C1F1E] max-sm:aspect-[4/3] max-sm:min-h-[16rem]"
        >
          <ImpactMapCanvas />
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <ul
          data-impact-map-legend
          className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {(
            Object.entries(typeMeta) as [MapLocation["type"], LocationTypeMeta][]
          ).map(([type, meta]) => (
            <li
              key={type}
              className="flex items-center gap-2 text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80"
            >
              <span
                aria-hidden="true"
                data-legend-shape={meta.shape}
                className={cn("inline-flex h-3.5 w-3.5 shrink-0", meta.shapeClass)}
              />
              <span>{meta.label}</span>
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeInStagger
        className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-0 border-y border-[#1C1F1E]/15 sm:grid-cols-2 lg:grid-cols-3 dark:border-[#FCFAEF]/20"
        staggerDelay={0.08}
      >
        {mapLocations.map((location, index) => {
          const meta = typeMeta[location.type];
          const divider =
            index === 0
              ? ""
              : index === 1
                ? "border-t sm:border-l sm:border-t-0"
                : index === 2
                  ? "border-t lg:border-l lg:border-t-0"
                  : "border-t sm:border-l lg:border-l";

          return (
            <FadeInStaggerItem key={location.id} direction="up">
              <article
                data-impact-map-location={location.id}
                className={cn(
                  "flex h-full flex-col justify-between border-[#1C1F1E]/15 px-1 py-7 sm:px-6 dark:border-[#FCFAEF]/20",
                  divider,
                )}
              >
                <div>
                  <p className="inline-flex items-center gap-2 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                    <span
                      aria-hidden="true"
                      className={cn("inline-flex h-3 w-3", meta.shapeClass)}
                    />
                    <span className={cn("px-0 py-0", meta.badge)}>
                      {meta.label}
                    </span>
                  </p>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {location.href ? (
                      <Link
                        href={location.href}
                        className="inline-flex min-h-11 items-center transition-colors hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:hover:text-[#66C4DC]"
                      >
                        {location.name}
                      </Link>
                    ) : (
                      location.name
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
                    {location.description}
                  </p>
                </div>
                {location.href ? (
                  <EditorialArrowLink href={location.href} className="mt-5">
                    View hub
                  </EditorialArrowLink>
                ) : null}
              </article>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStagger>
    </EditorialBand>
  );
}
