"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Stethoscope,
  FlaskConical,
  HandCoins,
  Users,
} from "lucide-react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import { becomePartnerContent } from "@/data/partnerships";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Stethoscope,
  FlaskConical,
  HandCoins,
  Users,
};

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const ctaStyles = {
  amber:
    "bg-[#eeba2b] text-[#FCFAEF] shadow-lg hover:bg-[#eeba2b]/80 hover:shadow-xl focus-visible:ring-[#F5C94D]",
  teal: "bg-[#0097b2] text-[#FCFAEF] shadow-lg hover:bg-[#0097b2]/80 hover:shadow-xl focus-visible:ring-[#8DD4E6]",
} as const;

export default function BecomePartnerCTA() {
  return (
    <section
      id="become-a-partner"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-16 text-[#FCFAEF] sm:py-20 md:py-28"
      aria-labelledby="become-partner-heading"
    >
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
      </div>

      <div className="site-container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <FadeIn
          direction="up"
          className="mx-auto mb-12 max-w-3xl space-y-4 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5C94D]">
            {becomePartnerContent.eyebrow}
          </p>
          <h2
            id="become-partner-heading"
            className="text-2xl font-bold sm:text-3xl md:text-4xl"
          >
            {becomePartnerContent.heading}
          </h2>
          <p className="text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg">
            {becomePartnerContent.description}
          </p>
        </FadeIn>

        {/* Partnership types */}
        <FadeInStagger
          className="mx-auto mb-12 flex max-w-3xl flex-wrap justify-center gap-3"
          staggerDelay={0.08}
        >
          {becomePartnerContent.partnershipTypes.map((type) => {
            const Icon = iconMap[type.icon];
            return (
              <FadeInStaggerItem key={type.label} direction="up">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/20">
                  {Icon ? <Icon className="h-4 w-4 text-[#F5C94D]" /> : null}
                  {type.label}
                </div>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>

        {/* CTAs */}
        <FadeIn direction="up" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {becomePartnerContent.ctas.map((cta) => (
              <Button
                key={cta.label}
                asChild
                className={`${ctaBaseClass} ${ctaStyles[cta.variant]}`}
              >
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
