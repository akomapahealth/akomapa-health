"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";

const networkFeatures = [
  {
    id: "feature-1",
    title: "Peer-to-Peer Mentorship",
    description: "Experienced student teams coach new chapters on operations, patient care, and sustainability.",
    color: "#0097b2"
  },
  {
    id: "feature-2",
    title: "Case-Based Learning",
    description: "Real cases from Akomapa clinics are used for shared discussions across sites, building critical reasoning and global clinical competence.",
    color: "#eeba2b"
  },
  {
    id: "feature-3",
    title: "Leadership & Training Access",
    description: "All Network members have access to the Akomapa Global Health Leadership Training Program — a certificate-bearing course led by faculty from Yale, UCLA, UCC, and UG.",
    color: "#0097b2"
  },
  {
    id: "feature-4",
    title: "Collaborative Research",
    description: "Network partners co-design and publish studies that evaluate student-led interventions, community outcomes, and leadership development.",
    color: "#eeba2b"
  },
  {
    id: "feature-5",
    title: "Immersion Opportunities",
    description: "Clinics across the Network host visiting students and fellows through the Akomapa Global Health Immersion Program, promoting cross-site collaboration and cultural exchange.",
    color: "#0097b2"
  },
  {
    id: "feature-6",
    title: "Knowledge Exchange",
    description: "Members share best practices on community partnership, data collection, and patient-centered education through regular summits and online forums.",
    color: "#eeba2b"
  }
];

const goals = [
  {
    id: "goal-1",
    title: "Strengthen Community-Based Care",
    description: "Through sustainable, student-powered models that make preventative care accessible everywhere.",
    color: "#0097b2",
    value: null,
    suffix: null,
    label: null
  },
  {
    id: "goal-2",
    title: "Train Global Leaders",
    description: "Student leaders globally by 2027 in interprofessional collaboration and ethical leadership.",
    color: "#eeba2b",
    value: 1000,
    suffix: "+",
    label: "Student Leaders by 2027"
  },
  {
    id: "goal-3",
    title: "Establish Global Presence",
    description: "Community clinics across Africa, North America, and beyond.",
    color: "#0097b2",
    value: 10,
    suffix: "+",
    label: "Community Clinics"
  },
  {
    id: "goal-4",
    title: "Facilitate Joint Learning",
    description: "Research that informs health policy and curriculum development.",
    color: "#eeba2b",
    value: null,
    suffix: null,
    label: null
  },
  {
    id: "goal-5",
    title: "Build Global Platform",
    description: "Mentorship and exchange platform connecting students, faculty, and communities.",
    color: "#0097b2",
    value: 5,
    suffix: "+",
    label: "Countries Connected"
  }
];

const partnerClinics = [
  {
    name: "Akomapa UCC Clinic",
    location: "University of Cape Coast, Ghana",
    description: "Our first clinic and proof of concept—serving over 1,000 patients while training 75+ students.",
    href: "/clinics/akomapa-ucc",
    logo: "/images/partners/akomapa-logo.png",
    accentColor: "#0097b2"
  },
  {
    name: "Neighborhood Health Project",
    location: "New Haven, USA",
    description: "A longstanding student-run organization advancing community health equity in Connecticut.",
    href: "https://nhp.sites.yale.edu/",
    logo: "/images/partners/nhp-logo.png",
    accentColor: "#eeba2b",
    external: true
  },
  {
    name: "South Side Student-Run Free Clinic",
    location: "University of Chicago, USA",
    description: "A model clinic empowering students to lead in primary care and chronic disease management.",
    href: "#",
    logo: "/images/partners/uchicago.png",
    accentColor: "#0097b2"
  }
];

function GoalCounter({ value, suffix = "", color }: { value: number; suffix?: string; color: string }) {
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
      className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
      style={{ color }}
    >
      {formatted}
    </span>
  );
}

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";


const primaryCtaClass =
  `${ctaBaseClass} bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#8DD4E6]`;

const secondaryCtaClass =
  `${ctaBaseClass} bg-[#eeba2b] hover:bg-[#eeba2b]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#F5C94D]`;

export default function AkomapaNetworkPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0B2F3A] via-[#0F4C5C] to-[#0097b2] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-4 sm:gap-8">
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
          <div className="max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="uppercase tracking-[0.3em] text-sm font-semibold text-[#FCFAEF]/80 mb-6"
            >
              The Akomapa Network
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Connecting Clinics. Sharing Knowledge. Building the Future of Global Health.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/85 font-light max-w-3xl"
            >
              A global community of student-run clinics, universities, and mentors working together to reimagine how healthcare is delivered and taught.
            </motion.p>
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="mt-8 flex flex-wrap gap-4"
            >
              <Button asChild className={primaryCtaClass}>
                <Link href="/join">Join the Network</Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/partner">Partner with Us</Link>
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
                alt="Global network of student healthcare leaders"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About the Network Section */}
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
                About the Network
              </h2>
              <div className="space-y-5 text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                <p>
                  The Akomapa Network is a global community of student-run clinics, universities, and mentors working together to reimagine how healthcare is delivered and taught.
                </p>
                <p>
                  We connect student-powered, expert-supervised clinics from across Africa and the United States — uniting them through shared learning, leadership training, and collaborative innovation.
                </p>
                <p className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Our goal is simple but bold: to make community-based, preventative care accessible everywhere while training the next generation of global health leaders.
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
                  alt="Students collaborating across the network"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#0B2F3A] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Our Vision
              </h2>
              <p className="text-lg md:text-xl text-[#FCFAEF]/90 leading-relaxed">
                To build a global learning ecosystem where student-run clinics don&apos;t work in isolation but as part of a connected movement — sharing data, stories, and strategies that strengthen both care delivery and education.
              </p>
              <p className="text-base md:text-lg text-[#FCFAEF]/85 leading-relaxed">
                We envision a world where a student team in Ghana can learn from one in Chicago, where a New Haven community project can inspire a rural screening model, and where young leaders everywhere are equipped to bridge the gap between knowledge and action.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What the Network Does Section */}
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
              What the Network Does
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              Six core functions that connect, empower, and amplify student-powered care across the globe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {networkFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
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
                    style={{ backgroundColor: feature.color }}
                  />
                  <h3 className="text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-10 h-56 w-56 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              What We Hope to Accomplish
            </h2>
            <p className="text-lg text-[#FCFAEF]/85 leading-relaxed">
              Bold goals that drive our collective mission forward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative rounded-2xl bg-[#FCFAEF]/95 text-[#1C1F1E] p-6 md:p-8 shadow-xl border border-[#E6E7E7]/40 hover:scale-105 transition-transform duration-300 flex flex-col"
              >
                <div 
                  className="h-1 w-16 rounded-full mb-4"
                  style={{ backgroundColor: goal.color }}
                />
                {goal.value !== null && (
                  <div className="mb-4">
                    <GoalCounter value={goal.value} suffix={goal.suffix || ""} color={goal.color} />
                    {goal.label && (
                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#1C1F1E]/70">
                        {goal.label}
                      </p>
                    )}
                  </div>
                )}
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#1C1F1E]">
                  {goal.title}
                </h3>
                <p className="text-sm md:text-base text-[#2F3332]/85 leading-relaxed flex-1">
                  {goal.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Clinics Section */}
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
              Founding & Partner Clinics
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              Student-powered clinics leading the way in community-based care and global collaboration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {partnerClinics.map((clinic, index) => (
              <motion.div
                key={clinic.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="group relative bg-white dark:bg-[#2F3332] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 hover:-translate-y-1"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-center h-28 md:h-32 mb-6">
                    <div className="relative h-full w-full">
                      <Image
                        src={clinic.logo}
                        alt={clinic.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">
                    {clinic.name}
                  </h3>
                  <p className="text-sm text-[#0097b2] dark:text-[#66C4DC] mb-4 font-medium">
                    {clinic.location}
                  </p>
                  <p className="text-sm md:text-base text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed mb-6">
                    {clinic.description}
                  </p>
                  {clinic.external ? (
                    <a
                      href={clinic.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-semibold"
                      style={{ color: clinic.accentColor }}
                    >
                      Visit Page
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <Link
                      href={clinic.href}
                      className="inline-flex items-center text-sm font-semibold"
                      style={{ color: clinic.accentColor }}
                    >
                      Visit Page
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: clinic.accentColor }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0B2F3A] via-[#0F4C5C] to-[#0097b2] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 -left-32 h-72 w-72 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Why It Matters
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6 text-lg md:text-xl text-[#FCFAEF]/90 leading-relaxed"
            >
              <p>
                The Akomapa Network is more than a collaboration — it&apos;s a global classroom without walls.
              </p>
              <p>
                Every clinic becomes both a site of care and a site of learning, where students grow as clinicians, leaders, and changemakers while improving the health of their communities.
              </p>
              <p className="font-semibold text-[#FCFAEF]">
                By linking student-run clinics into one connected system, we&apos;re making community care smarter, stronger, and sustainable — driven by evidence, compassion, and shared purpose.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join the Movement CTA */}
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
              Join the Movement
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              We invite universities, clinics, and community organizations to join a network redefining what it means to learn, lead, and serve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                className="bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] font-semibold px-8 py-6 h-auto"
              >
                <Link href="/partner" className="flex items-center whitespace-nowrap">
                  Join the Network
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2] hover:text-[#FCFAEF] font-semibold px-8 py-6 h-auto"
              >
                <Link href="/partner" className="flex items-center whitespace-nowrap">
                  Propose a Partnership
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-[#eeba2b] text-[#eeba2b] hover:bg-[#eeba2b] hover:text-[#1C1F1E] font-semibold px-8 py-6 h-auto"
              >
                <Link href="/programs" className="flex items-center whitespace-nowrap">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* From the Founders Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F4C5C] via-[#0097b2] to-[#0B2F3A] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-10 h-56 w-56 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center">From the Founders</h2>
            
            <div className="relative bg-[#FCFAEF]/10 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-xl border border-[#FCFAEF]/20">
              <div className="absolute top-6 left-6 text-[#FCFAEF]/20">
                <Quote size={48} />
              </div>
              <blockquote className="relative z-10 text-lg md:text-xl text-[#FCFAEF]/90 leading-relaxed italic pl-8">
                &quot;The Akomapa Network is building a future where a clinic is not just a place of care but a platform for transformation. Together, we&apos;re proving that student leadership can move systems, and that collaboration across borders can save lives.&quot;
              </blockquote>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-[#F5C94D]/40 shadow-lg flex-shrink-0">
                <Image
                  src="/team/sedem-dankwa.jpg"
                  alt="Sedem Dankwa"
                  fill
                  className="object-cover object-center"
                  sizes="64px"
                />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-base font-semibold text-[#F5C94D]">
                  Sedem Dankwa
                </p>
                <p className="text-sm text-[#FCFAEF]/80">
                  Global Partnerships Team Lead
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
