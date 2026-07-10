"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  SearchCheck,
  ArrowRightLeft,
  HeartPulse,
  Microscope,
  ChevronRight,
} from "lucide-react";
import { FadeIn } from "@/components/animations";
import { communityModelContent } from "@/data/ncd-impact";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  SearchCheck,
  ArrowRightLeft,
  HeartPulse,
  Microscope,
};

const stageAnimation = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 as const },
};

const connectorAnimation = {
  initial: { opacity: 0, scaleX: 0 },
  whileInView: { opacity: 1, scaleX: 1 },
  viewport: { once: true, amount: 0.5 as const },
};

export default function CommunityModel() {
  const { stages } = communityModelContent;

  return (
    <section
      id="community-model"
      className="scroll-mt-20 bg-[#F4F1E8] py-16 dark:bg-[#1C1F1E] md:py-24"
      aria-labelledby="community-model-heading"
    >
      <div className="site-container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <FadeIn
          direction="up"
          className="mx-auto mb-12 max-w-3xl space-y-4 text-center md:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC] sm:text-sm">
            {communityModelContent.eyebrow}
          </p>
          <h2
            id="community-model-heading"
            className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl"
          >
            {communityModelContent.heading}
          </h2>
          <p className="text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
            {communityModelContent.description}
          </p>
        </FadeIn>

        {/* Desktop: Horizontal flow */}
        <div className="mx-auto hidden max-w-6xl items-start justify-between md:flex">
          {stages.map((stage, i) => {
            const Icon = iconMap[stage.icon];
            return (
              <Fragment key={stage.id}>
                <motion.div
                  className="flex w-1/5 flex-col items-center px-2 text-center"
                  {...stageAnimation}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full transition-shadow duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: `${stage.color}15`,
                      color: stage.color,
                    }}
                  >
                    {Icon ? <Icon className="h-7 w-7" /> : null}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] lg:text-lg">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#2F3332]/70 dark:text-[#E6E7E7]/70 lg:text-sm">
                    {stage.description}
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
                    {stage.who}
                  </p>
                </motion.div>

                {i < stages.length - 1 && (
                  <motion.div
                    className="flex items-center pt-5"
                    {...connectorAnimation}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.12 + 0.08,
                    }}
                  >
                    <ChevronRight className="h-6 w-6 text-[#0097b2]/40 dark:text-[#66C4DC]/40" />
                  </motion.div>
                )}
              </Fragment>
            );
          })}
        </div>

        {/* Mobile: Vertical flow */}
        <div className="flex flex-col items-center gap-0 md:hidden">
          {stages.map((stage, i) => {
            const Icon = iconMap[stage.icon];
            return (
              <Fragment key={stage.id}>
                <motion.div
                  className="flex max-w-xs flex-col items-center text-center"
                  {...stageAnimation}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: `${stage.color}15`,
                      color: stage.color,
                    }}
                  >
                    {Icon ? <Icon className="h-6 w-6" /> : null}
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {stage.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                    {stage.description}
                  </p>
                </motion.div>

                {i < stages.length - 1 && (
                  <motion.div
                    className="my-2 h-8 w-px bg-[#0097b2]/30 dark:bg-[#66C4DC]/30"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.06 }}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
