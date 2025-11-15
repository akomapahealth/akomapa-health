"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarIcon, DollarSignIcon, MailIcon, SchoolIcon } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";

const programHighlights = [
  {
    label: "Duration",
    value: "3 weeks",
    description: "Intensive experiential learning program",
    accentColor: "#0097b2"
  },
  {
    label: "First Site",
    value: "Ghana",
    description: "2026, Dates TBD",
    accentColor: "#eeba2b"
  },
  {
    label: "Certification",
    value: "Certificate",
    description: "Akomapa Certificate in Global Health & Community Engagement",
    accentColor: "#0F4C5C"
  }
];

const learningComponents = [
  {
    title: "Service Learning",
    description: "Hands-on participation in Akomapa's community-based clinics and outreach programs.",
    color: "#0097b2"
  },
  {
    title: "Community-Based Research",
    description: "Small-group projects investigating real public-health challenges using qualitative and quantitative methods.",
    color: "#eeba2b"
  },
  {
    title: "Leadership Development",
    description: "Peer-led discussions linking fieldwork to cultural humility, ethics, and systems thinking.",
    color: "#0097b2"
  },
  {
    title: "Expert Seminars",
    description: "Sessions taught by faculty from partner universities and global health organizations on NCD prevention, health systems, and innovation.",
    color: "#eeba2b"
  },
  {
    title: "Capstone Reflection",
    description: "Fellows present project findings and personal insights to peers, mentors, and community partners.",
    color: "#0097b2"
  }
];

const whatToExpect = [
  {
    title: "Student-Run Clinics",
    description: "Join Akomapa clinics delivering free screenings, counseling, and health education alongside local student teams.",
    accentColor: "#0097b2"
  },
  {
    title: "Community Engagement Projects",
    description: "Design outreach initiatives with neighborhood partners to strengthen trust and expand preventative care.",
    accentColor: "#eeba2b"
  },
  {
    title: "Applied Research",
    description: "Conduct field-based studies that investigate public-health challenges and propose context-driven solutions.",
    accentColor: "#0F4C5C"
  },
  {
    title: "Mentored Seminars",
    description: "Participate in interactive case discussions led by Akomapa mentors, faculty, and visiting global health experts.",
    accentColor: "#0097b2"
  },
  {
    title: "Health Systems Immersion",
    description: "Observe how national, regional, and community health systems work together—from policy tables to primary care sites.",
    accentColor: "#eeba2b"
  },
  {
    title: "Leadership Circles",
    description: "Reflect daily with peers through facilitated sessions linking lived experience to ethics, leadership, and humility.",
    accentColor: "#0F4C5C"
  },
  {
    title: "Cultural Excursions",
    description: "Explore historical and cultural landmarks that deepen cultural competence and community understanding.",
    accentColor: "#0097b2"
  }
];

const whoCanApply = [
  {
    title: "Undergraduate & Pre-Med Pathways",
    description: "Students exploring medicine, global health, or public service who want immersive, community-centered experience.",
    accentColor: "#0097b2"
  },
  {
    title: "Health Professional Learners",
    description: "Medical, nursing, pharmacy, public health, and allied health students eager to practice collaborative care.",
    accentColor: "#eeba2b"
  },
  {
    title: "Graduate & Early-Career Professionals",
    description: "Emerging leaders committed to ethical, community-based global engagement and systems innovation.",
    accentColor: "#0F4C5C"
  }
];

const globalImpact = [
  {
    title: "Cross-Cultural Leadership",
    description: "Strengthens collaboration between rising healthcare leaders across continents through shared service.",
    accentColor: "#0097b2"
  },
  {
    title: "Community-Driven Innovation",
    description: "Advances research and interventions that originate from, and are sustained by, local partners.",
    accentColor: "#eeba2b"
  },
  {
    title: "Student-Powered Care",
    description: "Expands Akomapa’s model where students lead with empathy under expert supervision.",
    accentColor: "#0F4C5C"
  },
  {
    title: "Global Network Building",
    description: "Cultivates compassionate, evidence-driven changemakers connected through the Akomapa Network.",
    accentColor: "#0097b2"
  }
];

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const primaryCtaClass =
  `${ctaBaseClass} bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#8DD4E6]`;

const secondaryCtaClass =
  `${ctaBaseClass} bg-[#eeba2b] hover:bg-[#eeba2b]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#F5C94D]`;

export default function GHIPPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      <section className="relative min-h-[80vh] py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-12 sm:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-2"
          >
            <Link 
              href="/programs" 
              className="inline-flex items-center text-[#FCFAEF]/80 hover:text-[#FCFAEF] transition-colors text-sm font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Programs
            </Link>
          </motion.div>
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="uppercase tracking-[0.3em] text-sm font-semibold text-[#FCFAEF]/80 mb-6"
            >
              Akomapa Global Health Immersion Program
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Learn by Serving. Lead by Understanding.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/85 font-light max-w-3xl"
            >
              A three-week experiential global health fellowship that bridges learning and service, bringing together students from across Africa, the United States, and beyond to explore how communities, health systems, and students collaborate to advance care.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button asChild className={primaryCtaClass}>
                <Link href="/join">Apply Now</Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/#">Request Program Brochure</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <div className="relative w-full h-[280px] sm:h-[360px] md:h-[520px] lg:h-[640px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/highlights/Akomapa-40.jpg"
                alt="Global health immersion program participants"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                About the Program
              </h2>
              <div className="space-y-5 text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                <p>
                  The Akomapa Immersion Program is a three-week experiential global health fellowship that bridges learning and service. It brings together undergraduate, pre-medical, and health professional students from across Africa, the United States, and beyond to explore how communities, health systems, and students collaborate to advance care.
                </p>
                <p>
                  The program will expand across several countries through the Akomapa Network, beginning with its inaugural cohort in Ghana. Each site immerses participants in community health delivery, systems learning, and cultural exchange—preparing future leaders to translate experience into impact.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-2"
            >
              <div className="relative w-full min-h-[320px] h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/highlights/Akomapa-66.jpg"
                  alt="Students participating in global health immersion program"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-center max-w-3xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Our Vision
            </h2>
            <p className="text-base sm:text-lg text-[#FCFAEF]/90 leading-relaxed">
              To cultivate global health leaders who are grounded in empathy, cultural humility, and community partnership, and who can transform firsthand experience into sustainable solutions for health equity.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
              What to Expect
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              The Akomapa Immersion Program combines classroom learning, clinical exposure, and cultural discovery. While details vary by country, participants can expect to:
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {whatToExpect.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative rounded-2xl bg-white dark:bg-[#2F3332] p-6 md:p-8 shadow-lg border border-[#E6E7E7]/30 dark:border-[#4F5554]/30 flex flex-col"
                >
                  <div
                    className="h-1 w-16 rounded-full mb-4"
                    style={{ backgroundColor: item.accentColor }}
                  />
                  <h3 className="text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed flex-1">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-center max-w-3xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Program Highlights
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {programHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.4 }}
                className="relative rounded-2xl bg-[#FCFAEF]/95 text-[#1C1F1E] shadow-xl border border-[#E6E7E7]/40 overflow-hidden p-6 md:p-8 flex flex-col"
              >
                <div
                  className="h-1 w-16 rounded-full mb-4"
                  style={{ backgroundColor: highlight.accentColor }}
                />
                <span
                  className="text-4xl font-semibold tracking-tight"
                  style={{ color: highlight.accentColor }}
                >
                  {highlight.value}
                </span>
                <h3 className="mt-4 text-lg font-semibold uppercase tracking-[0.2em] text-[#1C1F1E]/70">
                  {highlight.label}
                </h3>
                <p className="mt-3 text-sm md:text-base text-[#2F3332]/85 leading-relaxed flex-1">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
              Learning Components
            </h2>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {learningComponents.map((component, index) => (
                <motion.div
                  key={component.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="group relative rounded-2xl bg-white dark:bg-[#2F3332] p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#0097b2]/5 via-transparent to-[#eeba2b]/5 rounded-2xl" />
                  <div className="relative">
                    <div 
                      className="h-1 w-16 rounded-full mb-4"
                      style={{ backgroundColor: component.color }}
                    />
                    <h3 className="text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-3">
                      {component.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                      {component.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Who Can Apply
            </h2>
            <p className="text-lg text-[#FCFAEF]/90 leading-relaxed">
              We welcome applicants who are curious, humble, and committed to health equity.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {whoCanApply.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 shadow-xl flex flex-col gap-3"
              >
                <div
                  className="h-1 w-16 rounded-full"
                  style={{ backgroundColor: item.accentColor }}
                />
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-[#FCFAEF]/85 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-base text-[#FCFAEF]/85 italic mt-10">
            Participants are selected for their curiosity, humility, and commitment to health equity.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
              Global Impact
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              By embedding students directly within community systems, the Akomapa Immersion Program:
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {globalImpact.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl bg-white dark:bg-[#2F3332] p-6 md:p-8 shadow-lg border border-[#E6E7E7]/30 dark:border-[#4F5554]/30 flex flex-col gap-3"
              >
                <div
                  className="h-1 w-16 rounded-full"
                  style={{ backgroundColor: item.accentColor }}
                />
              <h3 className="text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
          </div>
      </section>

      <section className="py-16 md:py-24 bg-[#F4F1E8] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                2026 Pilot Cohort
              </h2>
              <div className="space-y-5 text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                <div className="flex items-center">
                <SchoolIcon className="w-6 h-6 text-[#0097b2] dark:text-[#66C4DC] mr-2 flex-shrink-0" />
                  <span className="font-semibold text-[#0097b2] dark:text-[#66C4DC] mr-2">University of Cape Coast, Ghana</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-6 h-6 text-[#0097b2] dark:text-[#66C4DC] mr-2 flex-shrink-0" />
                  <span className="font-semibold text-[#0097b2] dark:text-[#66C4DC] mr-2">Exact Dates: </span>
                  TBD (Summer 2026)
                </div>
                <div className="flex items-center">
                  <MailIcon className="w-6 h-6 text-[#0097b2] dark:text-[#66C4DC] mr-2 flex-shrink-0" />
                  <span className="font-semibold text-[#0097b2] dark:text-[#66C4DC] mr-2">Applications open: </span>
                  January 2026
                </div>
                <div className="flex items-center">
                  <DollarSignIcon className="w-6 h-6 text-[#0097b2] dark:text-[#66C4DC] mr-2 flex-shrink-0" />
                  <span className="font-semibold text-[#0097b2] dark:text-[#66C4DC] mr-2">Program Fees: </span>
                  TBD
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-2"
            >
              <div className="relative w-full min-h-[320px] h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/highlights/Akomapa-12.jpg"
                  alt="2026 Pilot Cohort in Ghana"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F4C5C] via-[#0097b2] to-[#0B2F3A] text-[#FCFAEF]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Apply or Partner</h2>
            <p className="text-lg text-[#FCFAEF]/85 leading-relaxed">
              Join us in building the next generation of global health leaders through immersive, community-centered learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className={primaryCtaClass}
              >
                <Link href="/join" className="flex items-center">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/programs" className="flex items-center">
                  Request Program Brochure
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/partner" className="flex items-center">
                  Partner as a Faculty Mentor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
