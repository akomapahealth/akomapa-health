"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, GraduationCap, Users, HeartHandshake, ArrowRight, HandCoins } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  IconBadge,
  PublicCta,
  PublicSectionHeader,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";

const joinWays = [
  {
    title: "Partner With Us",
    description:
      "Co-design student-powered clinics and leadership pathways with universities, hospitals, and NGOs committed to reimagining preventative care.",
    icon: Building2,
    href: "/partnerships",
    ctaLabel: "Explore Partnerships"
  },
  {
    title: "Sponsor Training & Clinics",
    description:
      "Provide scholarships, clinical supervision, or operating support so students can deliver consistent, community-rooted primary care.",
    icon: GraduationCap,
    href: "/donate",
    ctaLabel: "Fund a Program"
  },
  {
    title: "Volunteer Your Expertise",
    description:
      "Mentor students, support clinic operations, or lend technical skills that strengthen emerging health leaders across Ghana.",
    icon: Users,
    href: "/get-involved",
    ctaLabel: "Apply to Volunteer"
  },
  {
    title: "Donate to Grow Impact",
    description:
      "Invest in new clinics, mobile outreach, and research that help Akomapa scale compassionate, preventative care.",
    icon: HeartHandshake,
    href: "/donate",
    ctaLabel: "Give to Akomapa"
  }
];

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] relative overflow-hidden">
      <div className="relative container mx-auto px-4">
        <PublicSectionHeader
          eyebrow="Get Involved"
          eyebrowTone="gold"
          title="You Can Help Build the Future of Primary Care in Africa."
          className="mb-12"
          titleClassName="text-[#FCFAEF] dark:text-[#FCFAEF]"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 h-full flex flex-col justify-center"
          >
            <div className="flex flex-col items-center lg:items-start justify-center gap-8 px-2 sm:px-0">
              <p className="text-lg sm:text-xl text-[#FCFAEF]/85 leading-relaxed max-w-2xl text-center lg:text-left">
                Join a movement led by students and rooted in community. Partner, sponsor, volunteer, or donate—every pathway fuels preventative primary care across Africa and beyond.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col md:flex-row items-center gap-4 md:gap-6"
              >
                <PublicCta asChild variant="light" icon={false}>
                  <Link href="/get-involved" className="flex items-center">
                    <Users size={20} className="mr-2" />
                    Volunteer
                  </Link>
                </PublicCta>
                <PublicCta asChild variant="gold" icon={false}>
                  <Link
                    href="/donate"
                    onClick={() =>
                      trackEvent({ name: "donation_cta_click", location: "home_call_to_action_donate" })
                    }
                    className="flex items-center"
                  >
                    <HandCoins size={20} className="mr-2" />
                    Donate
                  </Link>
                </PublicCta>
                <PublicCta asChild variant="outline-light" className="border-[#FCFAEF]/75 text-[#FCFAEF] hover:bg-[#FCFAEF] hover:text-[#1C1F1E]" icon={false}>
                  <Link href="/partnerships" className="flex items-center">
                    <Building2 size={20} className="mr-2" />
                    Partner With Us
                  </Link>
                </PublicCta>
              </motion.div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8">
              {joinWays.map((way, index) => (
                <motion.div
                  key={way.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-80px" }}
                >
                  <SurfaceCard className="group flex h-full flex-col bg-[#FCFAEF]/95 p-6 text-[#1C1F1E] md:p-8 dark:bg-[#FCFAEF]/95 dark:text-[#1C1F1E]">
                    <IconBadge className="mb-4">
                      <way.icon className="h-6 w-6" aria-hidden="true" />
                    </IconBadge>
                    <h3 className="text-xl font-semibold mb-3">{way.title}</h3>
                    <p className="text-sm md:text-base text-[#2F3332]/85 flex-1">
                      {way.description}
                    </p>
                    <Link
                      href={way.href}
                      onClick={() => {
                        if (way.href === "/donate") {
                          trackEvent({
                            name: "donation_cta_click",
                            location: "home_call_to_action_card",
                          });
                        }
                      }}
                      className="mt-6 w-fit px-0 text-[#0097b2] hover:text-[#0F4C5C] hover:bg-transparent font-semibold inline-flex items-center gap-2"
                    >
                      {way.ctaLabel}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </SurfaceCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
