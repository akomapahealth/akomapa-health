"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import {
  ArrowUpRight,
  HeartPulse,
  LineChart,
  Stethoscope,
  WifiOff,
} from "lucide-react";
import {
  IconBadge,
  PublicCta,
  PublicSection,
  SectionEyebrow,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";

const DEMO_URL = "https://staging.nkwapa.app";
const SCREENSHOT_SRC = "/images/nkwapa.png";

const features = [
  {
    icon: HeartPulse,
    title: "Continuity for every patient",
    description:
      "Connects screening, visit history, referrals, and follow-up so care does not end when an outreach day does.",
  },
  {
    icon: Stethoscope,
    title: "Training with clinical oversight",
    description:
      "Gives student teams structured workflows while helping supervisors review care and reinforce responsible practice.",
  },
  {
    icon: WifiOff,
    title: "Built for low connectivity",
    description:
      "Keeps essential patient-management workflows moving in settings where internet access is limited or unreliable.",
  },
  {
    icon: LineChart,
    title: "Evidence for improvement",
    description:
      "Consistent data capture supports quality improvement, community learning, and stronger health-system decisions.",
  },
] as const;

export default function NkwapaSection() {
  const headingId = "nkwapa-heading";

  return (
    <PublicSection
      id="nkwapa"
      data-testid="nkwapa-section"
      aria-labelledby={headingId}
      tone="cream"
      withTexture
    >
      <div className="grid grid-cols-1 items-start gap-10 md:gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Visual: first on mobile, right column on large screens */}
        <motion.div
          className="order-1 lg:order-2 lg:col-span-5"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <SurfaceCard className="relative overflow-hidden p-0">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-[#E6E7E7]/90 bg-[#F8F7F2] px-4 py-3 dark:border-[#2F3332] dark:bg-[#1C1F1E]/90">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/90" />
                </div>
                <div className="min-w-0 flex-1 rounded-md bg-[#E6E7E7]/60 px-3 py-1 text-center text-xs font-medium text-[#2F3332]/70 dark:bg-[#2F3332] dark:text-[#E6E7E7]/80">
                  Nkwapa · Patient Management System
                </div>
              </div>

              <div className="relative h-[420px] md:h-[520px] lg:h-[600px]">
                <Image
                  src={SCREENSHOT_SRC}
                  alt="Nkwapa patient management system dashboard"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-top"
                  data-testid="nkwapa-screenshot"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FCFAEF]/90 to-transparent dark:from-[#1C1F1E]/90" />
              </div>
            </SurfaceCard>
          </div>
        </motion.div>

        {/* Copy + features */}
        <motion.div
          className="order-2 lg:order-1 lg:col-span-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
        >
          <div className="flex max-w-3xl flex-col gap-6 md:gap-8">
            <SectionEyebrow>Responsible Health Innovation</SectionEyebrow>

            <div className="inline-flex w-fit items-center rounded-full bg-[#0097b2]/10 px-3 py-1 text-sm font-semibold text-[#0097b2] dark:bg-[#66C4DC]/15 dark:text-[#66C4DC]">
              Akomapa-built · Public beta
            </div>

            <h2
              id={headingId}
              className="font-heading text-3xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-4xl lg:text-[2.5rem]"
            >
              Nkwapa connects care, learning, and evidence.
            </h2>

            <p className="text-lg leading-relaxed text-[#2F3332]/85 dark:text-[#E6E7E7]/85">
              Nkwapa is Akomapa&apos;s offline-first patient management system,
              built to help community health hubs deliver safer, more continuous
              care while strengthening student training. It supports screening,
              visit documentation, referrals, follow-up, clinical supervision,
              and responsible use of program data—even when connectivity is
              limited.
            </p>

            <ul
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              aria-label="Nkwapa capabilities"
            >
              {features.map(({ icon: Icon, title, description }) => (
                <li key={title} data-testid="nkwapa-feature" className="h-full">
                  <SurfaceCard className="h-full p-4">
                    <div className="flex gap-3">
                      <IconBadge className="h-10 w-10">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </IconBadge>
                      <div className="min-w-0 space-y-1">
                        <p className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {title}
                        </p>
                        <p className="text-sm leading-snug text-[#2F3332]/80 dark:text-[#E6E7E7]/75">
                          {description}
                        </p>
                      </div>
                    </div>
                  </SurfaceCard>
                </li>
              ))}
            </ul>

            <div>
              <PublicCta
                asChild
                variant="teal"
                className="px-10 py-5"
                icon={false}
              >
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="nkwapa-cta"
                  aria-label="Explore Nkwapa demo (opens in a new tab)"
                >
                  Explore Nkwapa
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </PublicCta>
            </div>
          </div>
        </motion.div>
      </div>
    </PublicSection>
  );
}
