"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import {
  ArrowUpRight,
  ClipboardList,
  HeartPulse,
  Microscope,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DEMO_URL = "https://staging.nkwapa.app";
const SCREENSHOT_SRC = "/images/nkwapa.png";

const features = [
  {
    icon: WifiOff,
    title: "Offline-first by design",
    description:
      "Document visits and continue workflows when connectivity is unreliable.",
  },
  {
    icon: ClipboardList,
    title: "Streamlined clinic workflow",
    description:
      "Supports day-to-day operations so teams can focus on patients, not paperwork.",
  },
  {
    icon: HeartPulse,
    title: "Continuous patient management",
    description:
      "Keeps records organised for follow-up, referrals, and longitudinal care.",
  },
  {
    icon: Microscope,
    title: "Community care + research continuity",
    description:
      "Infrastructure that strengthens frontline care and feeds evidence-led improvement.",
  },
] as const;

export default function NkwapaSection() {
  const headingId = "nkwapa-heading";

  return (
    <section
      id="nkwapa"
      data-testid="nkwapa-section"
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-[#FCFAEF] py-16 text-[#1C1F1E] dark:bg-[#1C1F1E] dark:text-[#FCFAEF] md:py-24"
    >
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0097b2]/10 blur-3xl dark:bg-[#0097b2]/20" />
      <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-[#eeba2b]/10 blur-3xl dark:bg-[#F5C94D]/15" />

      <div className="container relative z-10 mx-auto px-4">
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
              <div className="pointer-events-none absolute -right-8 top-8 hidden h-40 w-40 rounded-full bg-[#0097b2]/15 blur-2xl lg:block dark:bg-[#66C4DC]/10" />
              <div className="pointer-events-none absolute -left-6 bottom-12 h-32 w-32 rounded-full bg-[#F5C94D]/20 blur-2xl dark:bg-[#F5C94D]/10" />

              <div className="relative overflow-hidden rounded-[20px] border border-[#0097b2]/15 bg-white shadow-xl dark:border-[#2F3332] dark:bg-[#2F3332]/60">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 border-b border-[#E6E7E7]/90 bg-[#F8F7F2] px-4 py-3 dark:border-[#2F3332] dark:bg-[#1C1F1E]/90">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/90" />
                  </div>
                  <div className="min-w-0 flex-1 rounded-md bg-[#E6E7E7]/60 px-3 py-1 text-center text-xs font-medium text-[#2F3332]/70 dark:bg-[#2F3332] dark:text-[#E6E7E7]/80">
                    staging.nkwapa.app
                  </div>
                </div>

                <div className="relative h-[420px] md:h-[520px] lg:h-[600px]">
                  <Image
                    src={SCREENSHOT_SRC}
                    alt="Nkwapa EMR product screenshot"
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    loading="eager"
                    className="object-cover object-top"
                    data-testid="nkwapa-screenshot"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FCFAEF]/90 to-transparent dark:from-[#1C1F1E]/90" />
                </div>
              </div>
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
              <p className="text-lg font-bold uppercase tracking-wide text-[#F5C94D]">
                Introducing NKWAPA
              </p>

              <div className="inline-flex w-fit items-center rounded-full bg-skobeloff/10 px-3 py-1 text-sm font-semibold text-skobeloff dark:bg-[#66C4DC]/15 dark:text-[#66C4DC]">
                New · Public beta
              </div>

              <h2
                id={headingId}
                className="font-heading text-3xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-4xl lg:text-[2.5rem]"
              >
                An offline-first EMR built for community clinics.
              </h2>

              <p className="text-lg leading-relaxed text-[#2F3332]/85 dark:text-[#E6E7E7]/85">
                Nkwapa is Akomapa&apos;s electronic medical records platform —
                purpose-built infrastructure for student-powered clinics in
                resource-limited settings. When connectivity drops, care
                shouldn&apos;t: teams capture visits, manage patients, and keep
                workflows moving while staying anchored in community health and
                continuity of care.
              </p>

              <ul
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                aria-label="Nkwapa capabilities"
              >
                {features.map(({ icon: Icon, title, description }) => (
                  <li
                    key={title}
                    data-testid="nkwapa-feature"
                    className="rounded-2xl border border-[#0097b2]/12 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-[#2F3332] dark:bg-[#2F3332]/40"
                  >
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-skobeloff/10 text-skobeloff dark:bg-[#66C4DC]/15 dark:text-[#66C4DC]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <p className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {title}
                        </p>
                        <p className="text-sm leading-snug text-[#2F3332]/80 dark:text-[#E6E7E7]/75">
                          {description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div>
                <Button
                  asChild
                  size="lg"
                  className="inline-flex h-auto items-center gap-2 rounded-half bg-[#0097b2] px-10 py-7 text-lg font-semibold text-[#FCFAEF] shadow-lg transition-all hover:bg-[#0097b2]/85 hover:shadow-xl md:text-xl"
                >
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="nkwapa-cta"
                    aria-label="View Nkwapa demo (opens in a new tab)"
                  >
                    View Demo
                    <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
