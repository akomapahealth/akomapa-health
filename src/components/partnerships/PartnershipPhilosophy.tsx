"use client";

import { Handshake, RefreshCw, Shield, Sprout } from "lucide-react";
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
} from "@/components/shared/EditorialPrimitives";
import { partnershipPhilosophyContent } from "@/data/partnerships";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Handshake,
  RefreshCw,
  Shield,
  Sprout,
};

export default function PartnershipPhilosophy() {
  return (
    <EditorialBand
      tone="cream"
      marker="01"
      aria-labelledby="partnership-philosophy-heading"
    >
      <FadeIn className="mx-auto max-w-3xl text-center">
        <EditorialEyebrow>{partnershipPhilosophyContent.eyebrow}</EditorialEyebrow>
        <EditorialHeading
          id="partnership-philosophy-heading"
          className="mt-4"
        >
          {partnershipPhilosophyContent.heading}
        </EditorialHeading>
        <EditorialLead className="mx-auto mt-5 max-w-2xl">
          {partnershipPhilosophyContent.description}
        </EditorialLead>
      </FadeIn>

      <FadeInStagger
        className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10"
        staggerDelay={0.08}
      >
        {partnershipPhilosophyContent.principles.map((principle, index) => {
          const Icon = iconMap[principle.icon];
          return (
            <FadeInStaggerItem key={principle.title} direction="up">
              <article className="border-t border-[#0097b2]/25 pt-6 text-left">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#0097b2]/30 text-[#0097b2] dark:border-[#66C4DC]/35 dark:text-[#66C4DC]"
                  >
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </span>
                  <div>
                    <p className="font-subheading text-xs font-bold uppercase tracking-[0.18em] text-[#C9920F] dark:text-[#F5C94D]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-xl">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75 md:text-base">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </article>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStagger>

      <FadeIn delay={0.15}>
        <blockquote className="mx-auto mt-14 max-w-2xl border-l-2 border-[#eeba2b] py-2 pl-6">
          <p className="font-heading text-xl font-semibold italic text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-2xl">
            &ldquo;{partnershipPhilosophyContent.quote.text}&rdquo;
          </p>
          <cite className="mt-3 block text-sm font-medium not-italic text-[#2F3332]/65 dark:text-[#E6E7E7]/65">
            &mdash; {partnershipPhilosophyContent.quote.attribution}
          </cite>
        </blockquote>
      </FadeIn>
    </EditorialBand>
  );
}
