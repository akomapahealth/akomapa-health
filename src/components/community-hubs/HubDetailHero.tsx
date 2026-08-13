"use client";

import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import { getHubStatusLabel } from "@/components/community-hubs/hub-status";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import type { CommunityHub } from "@/lib/types";

type HubDetailHeroProps = {
  hub: CommunityHub;
};

export default function HubDetailHero({ hub }: HubDetailHeroProps) {
  const statusLabel = getHubStatusLabel(hub.status);

  if (hub.heroPresentation === "background") {
    return (
      <section
        aria-labelledby="hub-detail-hero-heading"
        data-editorial-band
        data-editorial-tone="teal"
        data-hub-id={hub.id}
        data-hub-status={hub.status}
        data-hub-hero-presentation="background"
        className="relative isolate flex min-h-[620px] items-center overflow-hidden border-b border-[#FCFAEF]/20 bg-[#0F4C5C] text-[#FCFAEF] sm:min-h-[680px] lg:min-h-[720px]"
      >
        <Image
          src={hub.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
          data-hub-hero-background
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[#07191d]/50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07191d]/45 via-transparent to-[#07191d]/20"
        />

        <div className="site-container mx-auto w-full px-4 py-16 md:py-20 lg:py-24">
          <FadeIn className="max-w-3xl">
            <div
              data-hub-hero-panel
              className="border border-[#FCFAEF]/20 bg-[#07191d]/30 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-8 lg:p-10"
            >
              <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
                {statusLabel}
              </EditorialEyebrow>
              <EditorialHeading
                as="h1"
                id="hub-detail-hero-heading"
                className="mt-5 max-w-4xl text-[2.35rem] text-[#FCFAEF] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem]"
              >
                {hub.name}
              </EditorialHeading>
              <p className="mt-4 text-base font-medium text-[#FCFAEF]/85 sm:text-lg">
                {hub.location}, {hub.country}
              </p>
              <EditorialLead className="mt-6 max-w-2xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
                {hub.description}
              </EditorialLead>
              {hub.cta ? (
                <EditorialButton
                  href={hub.cta.href}
                  external={hub.cta.external}
                  variant="amber"
                  className="mt-8"
                >
                  {hub.cta.label}
                </EditorialButton>
              ) : null}
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <EditorialBand
      tone="teal"
      aria-labelledby="hub-detail-hero-heading"
      className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
      containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
      data-hub-id={hub.id}
      data-hub-status={hub.status}
      data-hub-hero-presentation="split"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
        <FadeIn className="lg:col-span-7 lg:pb-8">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            {statusLabel}
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="hub-detail-hero-heading"
            className="mt-5 max-w-4xl text-[2.35rem] text-[#FCFAEF] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem]"
          >
            {hub.name}
          </EditorialHeading>
          <p className="mt-4 text-base font-medium text-[#FCFAEF]/85 sm:text-lg">
            {hub.location}, {hub.country}
          </p>
          <EditorialLead className="mt-6 max-w-2xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
            {hub.description}
          </EditorialLead>
          {hub.cta ? (
            <EditorialButton
              href={hub.cta.href}
              external={hub.cta.external}
              variant="amber"
              className="mt-8"
            >
              {hub.cta.label}
            </EditorialButton>
          ) : null}
        </FadeIn>

        <FadeIn direction="left" delay={0.15} className="relative lg:col-span-5">
          <span
            aria-hidden="true"
            className="absolute -top-3 left-0 z-10 h-1 w-24 md:w-36"
            style={{ backgroundColor: hub.color }}
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#FCFAEF]/25 bg-[#0F4C5C]">
            <Image
              src={hub.image}
              alt={`${hub.name} community health hub`}
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </div>
    </EditorialBand>
  );
}
