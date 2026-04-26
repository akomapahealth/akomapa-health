"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motionDurations } from "@/lib/motion/tokens";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import { Button } from "@/components/ui/button";
import { announcementCampaign } from "@/data/announcements";
import { AnnouncementCard } from "@/components/common/AnnouncementCard";

/** Number of cards shown on the homepage. */
const FEATURED_COUNT = 3;

export default function UpdatesFeed() {
  const featured = announcementCampaign.slides.slice(0, FEATURED_COUNT);

  return (
    <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E] text-[#1C1F1E] dark:text-[#FCFAEF] relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <FadeIn
          className="text-center max-w-3xl mx-auto mb-14"
          duration={motionDurations.enter}
        >
          <h2 className="text-[#F5C94D] font-bold text-lg mb-2">
            UPDATES & ANNOUNCEMENTS
          </h2>
          <h3 className="mb-4 font-heading text-3xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-4xl">
            What&apos;s happening at Akomapa
          </h3>
          <p className="text-base text-[#2F3332]/70 dark:text-[#E6E7E7]/60 max-w-2xl mx-auto leading-relaxed">
            Awards, milestones, and new initiatives driving our mission forward.
            Stay connected with everything shaping the future of Akomapa Health.
          </p>
        </FadeIn>

        {/* Card grid — 3 featured */}
        <FadeInStagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          staggerDelay={motionDurations.staggerContainer}
        >
          {featured.map((item) => (
            <FadeInStaggerItem key={item.id} direction="up">
              <AnnouncementCard item={item} />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>

        {/* View All CTA */}
        <FadeIn className="mt-12 text-center" duration={motionDurations.enter}>
          <Button
            asChild
            variant="outline"
            className="group border-[#0097b2]/30 text-[#0097b2] hover:bg-[#0097b2] hover:text-white dark:border-[#66C4DC]/30 dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#1C1F1E] px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            <Link href="/news" className="inline-flex items-center gap-2">
              View All Updates
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
