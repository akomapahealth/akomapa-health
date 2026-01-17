"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronsDown } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";

const modelPillars = [
  {
    title: "Community-Based Care",
    description: "Clinics operate directly within neighborhoods and rural communities, embedding services in the daily fabric of the places we call home.",
    color: "#0097b2",
    image: "/highlights/Akomapa-41.jpg",
    alt: "Community health screening taking place in Ghana",
    body: [
      "We transform trusted community spaces—schools, churches, markets—into care hubs so families can access screening, counseling, and referrals without long travel or stigma. The clinic experience is intentionally warm, circular, and anchored in community rhythms so patients feel welcomed rather than referred.",
      "Free services focus on non-communicable diseases and health education, delivered alongside local leaders and health authorities to ensure cultural relevance and continuity of care. Every clinic day closes with debriefs that capture the voice of patients, helping us iterate fast and stay accountable.",
      "Because we never parachute in, communities view Akomapa clinics as their own. This shared ownership keeps doors open between clinic days and builds a pipeline for future services, from pharmacy access to nutrition support."
    ]
  },
  {
    title: "Student Leadership",
    description: "Interprofessional student teams run the clinics day-to-day, coordinating care across disciplines with humility and boldness.",
    color: "#eeba2b",
    image: "/highlights/Akomapa-66.jpg",
    alt: "Student healthcare leaders collaborating during training",
    body: [
      "Medical, nursing, pharmacy, nutrition, and public health students design patient flows, lead education sessions, and manage outreach together. They practice leadership that is service-first and rooted in cultural humility.",
      "An intensive leadership curriculum pairs classroom learning with hands-on rotations, helping students grow into ethical, community-minded practitioners. Weekly design sprints and reflective journaling sharpen their voice and build lifelong habits of listening.",
      "By graduation, Akomapa leaders have already stewarded real clinics, giving them the confidence to reimagine care wherever they go next—from regional hospitals to global health systems."
    ]
  },
  {
    title: "Expert Supervision",
    description: "Licensed clinicians and faculty mentors partner with students, reviewing every plan to uphold the highest clinical and ethical standards.",
    color: "#0097b2",
    image: "/highlights/Akomapa-36.jpg",
    alt: "Clinicians supervising students providing community care",
    body: [
      "Supervising physicians, pharmacists, and nurses are present at every clinic session to guide decision-making, triage escalations, and model compassionate care. They ground every encounter in evidence-based practice while giving students space to lead.",
      "Quality reviews, ethics briefings, and robust data practices create a safety net that protects patients while accelerating student learning. Every chart undergoes dual review, and serious cases trigger coordinated referrals with partner hospitals.",
      "The result is a tiered model where learners stretch their skills, communities feel held, and clinicians trust the system enough to recommend it to their peers."
    ]
  },
  {
    title: "Local Partnership",
    description: "Every clinic is co-built with community members, health services, and national agencies so impact lasts long after launch.",
    color: "#eeba2b",
    image: "/highlights/Akomapa-50.jpg",
    alt: "Community partners and clinic team meeting outdoors",
    body: [
      "Traditional authorities, district health teams, and civil society partners shape the clinic footprint, ensuring services respond to real community priorities. We co-create protocols, signage, and patient journeys so the clinic speaks the language of the community.",
      "Shared data dashboards, joint trainings, and referral agreements mean each site strengthens the broader health system rather than standing apart from it. Impact dashboards are accessible to partners so everyone can track progress and iterate together.",
      "This collective ownership gives us the mandate to expand responsibly—from financing NHIS enrollments to launching specialty pop-ups—while ensuring benefits stay rooted locally."
    ]
  }
];

const impactMetrics = [
  {
    value: 1000,
    suffix: "+",
    label: "Patients Served",
    description: "Neighbors receiving chronic disease screening, counseling, and follow-up through our free community clinics.",
    color: "#0097b2"
  },
  {
    value: 75,
    suffix: "+",
    label: "Student Leaders Trained",
    description: "Clinical and public health students completing our intensive leadership and implementation fellowship.",
    color: "#eeba2b"
  },
  {
    value: 3,
    label: "Clinic Sites",
    description: "Active clinic hubs anchoring the Akomapa model across Ghana and the United States.",
    color: "#0097b2"
  },
  {
    value: 5,
    suffix: "+",
    label: "Partners",
    description: "Universities, health systems, and community organizations co-building our care model.",
    color: "#eeba2b"
  }
];

function ImpactCounter({ value, suffix = "", color }: { value: number; suffix?: string; color: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 120, damping: 20, mass: 0.8 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [springValue]);

  const formatted = `${Math.round(displayValue).toLocaleString()}${suffix}`;

  return (
    <span
      ref={ref}
      className="text-4xl font-semibold tracking-tight"
      style={{ color }}
    >
      {formatted}
    </span>
  );
}

const clinicSites = [
  {
    name: "Akomapa UCC Clinic",
    location: "University of Cape Coast",
    country: "Ghana",
    description: "Our first clinic and proof of concept — serving the communities of Abeadze Dominase and Abura in partnership with the University of Cape Coast and the Ghana Health Service.",
    href: "/clinics/akomapa-ucc",
    image: "/highlights/ucc.jpg",
    accentColor: "#0097b2"
  },
  {
    name: "Akomapa UG Clinic",
    location: "University of Ghana",
    country: "Ghana",
    description: "Our second site in development — expanding community-based NCD care to the Greater Accra Region in collaboration with the College of Health Sciences, NHIS, and Ghana Health Service.",
    href: "/clinics/akomapa-ug",
    image: "/highlights/ug.jpg",
    accentColor: "#eeba2b"
  },
  {
    name: "Akomapa–NHP Yale Clinic",
    location: "New Haven, USA",
    country: "United States",
    description: "A transnational adaptation of the Akomapa model, in partnership with the Neighborhood Health Project in New Haven, bringing free screening and counseling to barbershops and salons.",
    href: "/clinics/akomapa-nhp",
    image: "/highlights/yale-uni.jpg",
    accentColor: "#0F4C5C"
  }
];

export default function ClinicsPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 h-full flex flex-col gap-12 sm:gap-14">
          <div className="max-w-5xl pt-4 sm:pt-8">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Student-powered clinics transforming community health.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/80 font-light max-w-3xl"
            >
              Our clinics blend student leadership with expert supervision to deliver primary care, health education, and chronic disease management where it’s needed most.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full"
          >
            <div className="relative w-full h-[280px] sm:h-[360px] md:h-[520px] lg:h-[640px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/highlights/Akomapa-64.jpg"
                alt="Akomapa clinic team supporting community members"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute -top-6 left-6 sm:left-8">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-[#0F4C5C] rounded-full" />
                  <div className="absolute inset-2 bg-gradient-to-br from-[#66C4DC] via-[#0097b2] to-[#0F4C5C] rounded-full opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center text-[#FCFAEF]">
                    <ChevronsDown className="w-8 h-8" />
                  </div>
                  <div className="absolute -bottom-5 inset-x-6 h-7 bg-[#0F4C5C] rounded-b-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Model Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#F5C94D] font-bold text-lg mb-2">
                OUR MODEL
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Four Pillars of Excellence
              </h2>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed max-w-3xl mx-auto">
                Akomapa clinics follow a scalable and replicable model anchored by four core pillars. Each one pairs rigorous training with community insight so clinics operate as both centers of care and living classrooms for leadership.
              </p>
            </motion.div>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {modelPillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div className={`${index % 2 === 0 ? "order-1" : "order-1 lg:order-2"} w-full h-full`}>
                    <div className="relative w-full min-h-[320px] h-[320px] sm:h-[360px] md:h-[420px] lg:h-[450px] xl:h-[500px] rounded-3xl overflow-hidden shadow-xl">
                      <Image
                        src={pillar.image}
                        alt={pillar.alt}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                    </div>
                  </div>
                  <div className={`${index % 2 === 0 ? "order-2" : "order-2 lg:order-1"} h-full flex flex-col justify-center`}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-1 w-8 rounded-full" style={{ backgroundColor: pillar.color }} />
                      <div className="h-1 w-1 rounded-full" style={{ backgroundColor: pillar.color }} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4">
                      {index + 1}. {pillar.title}
                    </h3>
                    <p className="text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed mb-6 max-w-xl">
                      {pillar.description}
                    </p>
                    <div className="space-y-4 text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed max-w-xl">
                      {pillar.body.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#F5C94D] uppercase">
              Our Impact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#FCFAEF] leading-tight">
              Designed for results at scale.
            </h2>
            <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed">
              Every clinic day, fellowship, and partnership is designed to scale sustainably so student-powered care can reach thousands of families with dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.4 }}
                className="group relative rounded-2xl bg-[#FCFAEF]/95 text-[#1C1F1E] shadow-xl border border-[#E6E7E7]/40 overflow-hidden p-6 md:p-8 flex flex-col"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#0097b2]/10 via-transparent to-[#F5C94D]/15" />
                <div className="relative flex flex-col h-full">
                  <ImpactCounter value={metric.value} suffix={metric.suffix} color={metric.color} />
                  <h3 className="mt-4 text-xl font-semibold uppercase tracking-[0.3em] text-[#1C1F1E] mb-3">
                    {metric.label}
                  </h3>
                  <p className="text-sm md:text-base text-[#2F3332]/85 leading-relaxed flex-1">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Clinic Sites Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#F5C94D] font-bold text-lg mb-2">
                OUR CLINIC SITES
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Where We Serve
              </h2>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                Each clinic site represents our commitment to community-rooted, student-powered healthcare.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {clinicSites.map((clinic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#2F3332] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={clinic.image}
                    alt={clinic.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <div 
                      className="flex items-center gap-2 bg-white/90 dark:bg-[#2F3332]/90 backdrop-blur-sm rounded-lg px-3 py-1"
                      style={{ borderLeft: `4px solid ${clinic.accentColor}` }}
                    >
                      <MapPin className="h-4 w-4" style={{ color: clinic.accentColor }} />
                      <span className="text-sm font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">
                        {clinic.country}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {clinic.name}
                  </h3>
                  <p className="text-sm text-[#0097b2] dark:text-[#66C4DC] mb-4 font-medium">
                    {clinic.location}
                  </p>
                  <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6 leading-relaxed">
                    {clinic.description}
                  </p>
                  <Button
                    asChild
                    className="w-full bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] group"
                  >
                    <Link href={clinic.href} className="flex items-center justify-center">
                      Visit Clinic Page
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Bigger Picture & Founder Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#0B2F3A] py-16 md:py-24 text-[#FCFAEF]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 -left-32 h-72 w-72 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.4 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-[#F5C94D] uppercase">
                  The Bigger Picture
                </p>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
                  A Global Learning Ecosystem
                </h2>
              </div>
              <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#FCFAEF]/85">
                <p>
                  Each clinic contributes to a shared learning ecosystem through the Akomapa Network —
                  exchanging data, mentorship, and strategies that strengthen care across borders.
                </p>
                <p className="font-semibold text-[#FCFAEF]">
                  Together, these clinics form a global model of student-powered, community-based healthcare,
                  adaptable to both low-resource and urban settings.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.4 }}
              className="rounded-3xl border border-[#FCFAEF]/15 bg-[#FCFAEF]/10 backdrop-blur-md p-8 md:p-10 shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-6">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden ring-4 ring-[#FCFAEF]/20">
                    <Image
                      src="/images/team/esi-bon-berkoh.jpg"
                      alt="Esi Berkoh"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-lg sm:text-xl italic leading-relaxed">
                    &quot;Every Akomapa Clinic is built with a good heart — where students learn to serve,
                    communities learn to trust, and together, we build a healthier world.&quot;
                  </p>
                  <div className="mt-5">
                    <p className="text-base font-semibold text-[#F5C94D]">
                      Esi Berkoh
                    </p>
                    <p className="text-sm text-[#FCFAEF]/80">
                      Vice President, Akomapa
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

