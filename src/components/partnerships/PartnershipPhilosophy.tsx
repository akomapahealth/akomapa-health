"use client";

import { Handshake, RefreshCw, Shield, Sprout } from "lucide-react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
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
    <section
      className="bg-[#FCFAEF] py-16 dark:bg-[#1C1F1E] md:py-24"
      aria-labelledby="partnership-philosophy-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <FadeIn
          direction="up"
          className="mx-auto mb-12 max-w-3xl space-y-4 text-center md:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC] sm:text-sm">
            {partnershipPhilosophyContent.eyebrow}
          </p>
          <h2
            id="partnership-philosophy-heading"
            className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl"
          >
            {partnershipPhilosophyContent.heading}
          </h2>
          <p className="text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
            {partnershipPhilosophyContent.description}
          </p>
        </FadeIn>

        {/* Principles grid */}
        <FadeInStagger
          className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
          staggerDelay={0.1}
        >
          {partnershipPhilosophyContent.principles.map((principle) => {
            const Icon = iconMap[principle.icon];
            return (
              <FadeInStaggerItem key={principle.title} direction="up">
                <div className="rounded-2xl border border-[#E6E7E7]/80 bg-white/95 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-[#2E3433] dark:bg-[#1C1F1E]/95 sm:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0097b2]/10 text-[#0097b2] dark:bg-[#66C4DC]/10 dark:text-[#66C4DC]">
                    {Icon ? <Icon className="h-6 w-6" /> : null}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                    {principle.description}
                  </p>
                </div>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>

        {/* Blockquote */}
        <FadeIn direction="up" delay={0.2}>
          <blockquote className="mx-auto max-w-2xl border-l-4 border-[#eeba2b] py-4 pl-6">
            <p className="text-xl font-semibold italic text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-2xl">
              &ldquo;{partnershipPhilosophyContent.quote.text}&rdquo;
            </p>
            <cite className="mt-3 block text-sm font-medium not-italic text-[#2F3332]/60 dark:text-[#E6E7E7]/60">
              &mdash; {partnershipPhilosophyContent.quote.attribution}
            </cite>
          </blockquote>
        </FadeIn>
      </div>
    </section>
  );
}
