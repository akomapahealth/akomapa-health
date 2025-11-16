"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building2, GraduationCap, Users, HeartHandshake, ArrowRight, HandCoins } from "lucide-react";

const joinWays = [
  {
    title: "Partner With Us",
    description:
      "Co-design student-powered clinics and leadership pathways with universities, hospitals, and NGOs committed to reimagining preventative care.",
    icon: Building2,
    href: "/partner",
    ctaLabel: "Explore Partnerships"
  },
  {
    title: "Sponsor Training & Clinics",
    description:
      "Provide scholarships, clinical supervision, or operating support so students can deliver consistent, community-rooted primary care.",
    icon: GraduationCap,
    href: "/sponsor",
    ctaLabel: "Fund a Program"
  },
  {
    title: "Volunteer Your Expertise",
    description:
      "Mentor students, support clinic operations, or lend technical skills that strengthen emerging health leaders across Ghana.",
    icon: Users,
    href: "/join",
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-[#F5C94D] font-bold text-lg mb-2">
          GET INVOLVED
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#FCFAEF]">
          You Can Help Build the Future of Primary Care in Africa.
        </h3>
      </div>
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
                <Button className="bg-[#FCFAEF] text-[#0097b2] hover:bg-[#F5C94D] hover:text-[#1C1F1E] px-6 py-6 h-auto text-lg font-semibold">
                  <Link href="/join" className="flex items-center">
                    <Users size={20} className="mr-2" />
                    Volunteer
                  </Link>
                </Button>
                <Button className="bg-[#eeba2b] text-[#1C1F1E] hover:bg-[#F5C94D] hover:text-[#1C1F1E] px-6 py-6 h-auto text-lg font-semibold">
                  <Link href="/donate" className="flex items-center">
                    <HandCoins size={20} className="mr-2" />
                    Donate
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-[#FCFAEF] text-[#FCFAEF] hover:text-[#1C1F1E] hover:bg-[#FCFAEF] px-6 py-6 h-auto text-lg font-semibold"
                >
                  <Link href="/partner" className="flex items-center">
                    <Building2 size={20} className="mr-2" />
                    Partner With Us
                  </Link>
                </Button>
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
                  className="group relative rounded-2xl bg-[#FCFAEF]/95 text-[#1C1F1E] shadow-xl border border-[#E6E7E7]/40 overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#0097b2]/10 via-transparent to-[#F5C94D]/15" />
                  <div className="relative p-6 md:p-8 flex flex-col h-full">
                    <div className="h-12 w-12 rounded-xl bg-[#0097b2]/10 flex items-center justify-center text-[#0097b2] mb-4">
                      <way.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{way.title}</h3>
                    <p className="text-sm md:text-base text-[#2F3332]/85 flex-1">
                      {way.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="mt-6 w-fit px-0 text-[#0097b2] hover:text-[#0F4C5C] hover:bg-transparent font-semibold inline-flex items-center gap-2"
                      asChild
                    >
                      <Link href={way.href}>
                        {way.ctaLabel}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}