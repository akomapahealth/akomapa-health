"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin, ArrowLeft } from "lucide-react";

import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import Gallery, { type GalleryItem } from "@/components/home/Gallery";
import { Button } from "@/components/ui/button";

const servicesOffered = [
  {
    id: "service-1",
    title: "Monthly Community Clinics",
    description: "Free hypertension and diabetes screenings at local barbershops and salons.",
    accentColor: "#0097b2"
  },
  {
    id: "service-2",
    title: "Health Education",
    description: "On-site counseling about nutrition, stress management, and chronic disease prevention.",
    accentColor: "#eeba2b"
  },
  {
    id: "service-3",
    title: "Referrals",
    description: "Coordination with primary care practices and local health systems for follow-up care.",
    accentColor: "#0F4C5C"
  },
  {
    id: "service-4",
    title: "Community Engagement",
    description: "Collaboration with barbers, salon owners, and local leaders to sustain trusted partnerships.",
    accentColor: "#0097b2"
  }
];

const partners = [
  {
    name: "Neighborhood Health Project (NHP)",
    logo: "/images/partners/nhp-logo.png"
  },
  {
    name: "Akomapa Health Foundation",
    logo: "/images/logo.svg"
  },
  {
    name: "Yale University",
    logo: "/images/partners/yale-sm-logo.png"
  }
];

const foundingTeam = [
  {
    name: "Dr. Brian Amu Fleischer",
    role: "Founder & President, Akomapa Health; Resident Physician, Yale",
    bio: "Co-developed the Akomapa–NHP Yale Clinic, building bridges between global innovation and local impact.",
    image: "/team/brian-fleischer.jpg"
  },
  {
    name: "Sedem Dankwa",
    role: "Global Partnerships Lead, Akomapa Health; Co-founder, Akomapa–NHP Initiative",
    bio: "Leads strategic partnerships and co-founded the Akomapa–NHP Initiative to expand community-based care.",
    image: "/team/sedem-dankwa.jpg"
  },
  {
    name: "Nana Ama Ocran",
    role: "Leadership Training Program Lead, Akomapa Health",
    bio: "Develops leadership training programs that empower students to deliver compassionate, community-centered care.",
    image: "/team/nana-ama-ocran.jpg"
  },
  {
    name: "Dr. Jeremy Schwartz",
    role: "Faculty Mentor; Associate Professor of Medicine, Yale University",
    bio: "Provides expert guidance and mentorship, ensuring excellence in education, ethics, and patient care.",
    image: "/team/jeremy-schwartz.jpg"
  },
  {
    name: "Stacy Uchendu",
    role: "Co-Director, Neighborhood Health Project",
    bio: "Co-directs the Neighborhood Health Project, facilitating community partnerships and sustainable care delivery.",
    image: "/team/stacy-uchendu.jpg"
  },
  {
    name: "Dr. Erica Spatz",
    role: "Community Engagement Advisor; Director, Preventive Cardiovascular Health Program, Yale",
    bio: "Advises on community engagement strategies and directs preventive cardiovascular health initiatives.",
    image: "/team/erica-spatz.jpg"
  }
];

const nhpGalleryItems: GalleryItem[] = [
  {
    id: 301,
    src: "/highlights/Akomapa-38.jpg",
    alt: "Student teams with barbers and community partners at screening event",
    category: "community",
    featured: true
  },
  {
    id: 302,
    src: "/highlights/Akomapa-2.jpg",
    alt: "Screening and education session in community space",
    category: "students"
  },
  {
    id: 303,
    src: "/highlights/Akomapa-4.jpg",
    alt: "Leadership and planning meeting with community partners",
    category: "faculty"
  },
  {
    id: 304,
    src: "/highlights/Akomapa-5.jpg",
    alt: "Community health screening in barbershop setting",
    category: "community",
    featured: true
  },
  {
    id: 305,
    src: "/gallery/gallery-pic-1.JPG",
    alt: "Student volunteers conducting health screenings",
    category: "students"
  },
  {
    id: 306,
    src: "/gallery/gallery-pic-2.JPG",
    alt: "Community engagement event in New Haven",
    category: "community"
  }
];

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const primaryCtaClass =
  `${ctaBaseClass} bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#8DD4E6]`;

const secondaryCtaClass =
  `${ctaBaseClass} bg-[#eeba2b] hover:bg-[#eeba2b]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#F5C94D]`;

const outlineBlueCtaClass =
  `${ctaBaseClass} border-2 border-[#0097b2] bg-transparent text-[#0097b2] shadow-none hover:bg-[#0097b2]/10 hover:shadow-lg focus-visible:ring-[#8DD4E6] dark:text-[#8DD4E6] dark:hover:bg-[#0097b2]/20`;

const outlineGoldCtaClass =
  `${ctaBaseClass} border-2 border-[#eeba2b] bg-transparent text-[#eeba2b] shadow-none hover:bg-[#eeba2b]/10 hover:shadow-lg focus-visible:ring-[#F5C94D] dark:text-[#F5C94D] dark:hover:bg-[#eeba2b]/20`;

export default function NHPClinicPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      <section className="relative min-h-[80vh] py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0B2F3A] via-[#0F4C5C] to-[#0097b2] overflow-hidden">
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
              href="/clinics" 
              className="inline-flex items-center text-[#FCFAEF]/80 hover:text-[#FCFAEF] transition-colors text-sm font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Clinics
            </Link>
          </motion.div>
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="uppercase tracking-[0.3em] text-sm font-semibold text-[#FCFAEF]/80 mb-6"
            >
              Akomapa–NHP Yale Clinic
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Trusted Spaces. Transformative Health.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/85 font-light max-w-3xl"
            >
              A student-led community health initiative bringing free screening and counseling to barbershops, salons, and neighborhood centers in New Haven, Connecticut.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <Button asChild className={primaryCtaClass}>
                <Link href="/join" className="whitespace-nowrap">Volunteer with Us</Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/donate" className="whitespace-nowrap">Donate</Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/partners" className="whitespace-nowrap">Partner with Us</Link>
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
                src="/highlights/Akomapa-38.jpg"
                alt="Akomapa–NHP Yale Clinic community screening event"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                About the Clinic
              </h2>
              <div className="space-y-5 text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                <p>
                  The Akomapa–NHP Yale Clinic is a student-led community health initiative in New Haven, Connecticut, created in partnership with the Neighborhood Health Project (NHP) and the Akomapa Health Foundation.
                </p>
                <p>
                  Inspired by the success of the Akomapa model in Ghana, this clinic adapts the same student-powered, expert-supervised, and community-anchored approach to advance health equity locally.
                </p>
                <p>
                  By bringing free blood pressure and glucose screenings into barbershops, salons, and neighborhood centers, the clinic reaches individuals who often experience barriers to primary care — building trust, promoting early detection, and connecting patients to follow-up services.
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
                  src="/highlights/Akomapa-2.jpg"
                  alt="Community health screening in New Haven"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-10 h-56 w-56 bg-[#FCFAEF]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 bg-[#F5C94D]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative order-2 md:order-1 min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] lg:h-full rounded-3xl overflow-hidden border border-white/20 bg-white/10 shadow-2xl shadow-black/30"
            >
              <Image
                src="/highlights/Akomapa-66.jpg"
                alt="Community health education and screening"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#FCFAEF] mb-2 sm:mb-3">Vision</h3>
                <p className="text-xs sm:text-sm md:text-base text-[#FCFAEF]/85 leading-relaxed">
                  To build a replicable, community-based model of preventive care in the United States — where trusted local spaces become gateways to health education, screening, and connection to care.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 md:order-2 w-full max-w-full md:max-w-xl"
            >
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 text-[#FCFAEF]">What We Do</h3>
                <p className="text-xs sm:text-sm text-[#FCFAEF]/75 leading-relaxed">
                  Our programs bring healthcare directly to trusted community spaces, breaking down barriers to access.
                </p>
              </div>
              <div className="w-full space-y-3 sm:space-y-4">
                {servicesOffered.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="overflow-hidden rounded-3xl border border-white/20 bg-[#0B2F3A]/60 text-[#FCFAEF] shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="px-4 sm:px-6 py-4 sm:py-5">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div
                          className="h-2 w-2 rounded-full flex-shrink-0 mt-2"
                          style={{ backgroundColor: service.accentColor }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base sm:text-lg md:text-xl font-semibold leading-tight mb-2">
                            {service.title}
                          </h4>
                          <p className="text-sm sm:text-base text-[#FCFAEF]/85 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
              Key Partners
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              Our partners bring institutional strength, community insight, and healthcare leadership to the Akomapa–NHP Yale Clinic.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {partners.map((partner) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative flex h-16 w-40 sm:h-20 sm:w-48 md:h-24 md:w-56 lg:h-28 lg:w-64 flex-shrink-0 items-center justify-center rounded-2xl sm:rounded-3xl border border-[#E6E7E7]/60 bg-white px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-[#2F3332] dark:bg-[#2F3332]"
              >
                <div className="relative h-10 w-28 sm:h-12 sm:w-36 md:h-16 md:w-44 lg:h-20 lg:w-52">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain transition-transform duration-300 ease-out filter grayscale group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0B2F3A] via-[#0F4C5C] to-[#0097b2] text-[#FCFAEF]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#FCFAEF]">
              Founding & Coordinating Team
            </h2>
            <p className="text-lg text-[#FCFAEF]/85 leading-relaxed">
              The Akomapa–NHP Yale Clinic was co-developed by students and residents from Yale, building bridges between global innovation and local impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {foundingTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-3xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm shadow-2xl flex flex-col"
              >
                <div className="relative h-80 sm:h-96">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-xl font-semibold text-[#FCFAEF]">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-[#F5C94D]">
                    {member.role}
                  </p>
                  <p className="text-sm text-[#FCFAEF]/85 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
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
              Where We Work
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              Our pop-up screening clinics are hosted monthly across barbershops and salons in the New Haven area, in collaboration with trusted community partners.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white dark:bg-[#2F3332] rounded-3xl p-8 md:p-12 shadow-xl border border-[#E6E7E7]/60 dark:border-[#3A3E3D]"
            >
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed mb-6">
                Each site offers free screenings, counseling, and connection to care — transforming everyday spaces into centers of health and empowerment. We are located in:
              </p>
              <div className="flex items-center gap-3 text-[#0097b2] dark:text-[#66C4DC] font-medium">
                <MapPin className="h-5 w-5" />
                <span>Barber Shop and Salon locations across New Haven, Connecticut</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-3xl mx-auto mb-12 space-y-4"
          >
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#F5C94D]">
              Clinic Operations
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Consistent access for every clinic day
            </h2>
            <p className="text-lg text-[#FCFAEF]/85 leading-relaxed">
              Akomapa–NHP Yale Clinic runs on a dependable rhythm so patients know when and where to find care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-3xl bg-[#FFF9EF] border border-[#F5C94D]/40 p-8 shadow-xl flex flex-col gap-4 text-[#1C1F1E]"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F5C94D]/30 text-[#0F4C5C]">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold">
                Hours & Schedule
              </h3>
              <div className="space-y-3 text-[#2F3332]">
                <p className="text-lg font-semibold">
                  Once Monthly (Saturdays) · 10:00 AM – 2:00 PM
                </p>
                <p className="text-sm text-[#5A5E5D]">
                  Regular monthly clinics ensure consistent access to screening and counseling services.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-3xl bg-[#FFF9EF] border border-[#F5C94D]/40 p-8 shadow-xl text-[#1C1F1E]"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0097b2]/15 text-[#0097b2]">
                <MapPin className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-4">
                Locations
              </h3>
              <div className="space-y-3 text-[#2F3332] leading-relaxed">
                <p>
                  Rotating barbershop and salon locations across New Haven, Connecticut
                </p>
                <p className="text-sm text-[#5A5E5D]">
                  Each site is carefully selected in partnership with trusted community leaders and business owners.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Gallery items={nhpGalleryItems} />

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F4C5C] via-[#0097b2] to-[#0B2F3A] text-[#FCFAEF]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">From the Founders</h2>
            <p className="text-lg text-[#FCFAEF]/85 leading-relaxed italic">
              &quot;The Akomapa–NHP Yale Clinic shows that the same spirit driving innovation in Ghana can transform health right here in New Haven. When students lead with empathy, and experts guide with purpose, communities everywhere benefit.&quot;
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-[#F5C94D]/40 shadow-lg flex-shrink-0">
                <Image
                  src="/team/brian-fleischer.jpg"
                  alt="Dr. Brian Fleischer"
                  fill
                  className="object-cover object-center"
                  sizes="64px"
                />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-base font-semibold text-[#F5C94D]">
                  Dr. Brian Fleischer
                </p>
                <p className="text-sm text-[#FCFAEF]/85 leading-relaxed">
                  Founder & President, Akomapa Health; Resident Physician, Yale
                </p>
              </div>
            </div>
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
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
              Get Involved
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              We welcome partners, volunteers, and sponsors who share our commitment to community-based health.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild className={primaryCtaClass}>
                <Link href="/join" className="whitespace-nowrap">Volunteer with Us</Link>
              </Button>
              <Button asChild className={outlineBlueCtaClass}>
                <Link href="/partners" className="whitespace-nowrap">Partner with Us</Link>
              </Button>
              <Button asChild className={outlineGoldCtaClass}>
                <Link href="/donate" className="whitespace-nowrap">Donate</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
