"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const whatWeDo = [
  {
    title: "Community Farms",
    description:
      "We work alongside farmers and cooperatives to grow fresh produce with regenerative practices, ensuring every harvest strengthens local soil, nutrition, and income.",
    accentColor: "#0097b2"
  },
  {
    title: "Akomapa Stores",
    description:
      "Neighborhood stores make healthy food accessible and affordable, with every purchase reinvested into clinic operations and health education.",
    accentColor: "#eeba2b"
  },
  {
    title: "Nutrition & Wellness Education",
    description:
      "Clinic visits include personalized counseling and cooking demonstrations so families leave with knowledge, recipes, and confidence.",
    accentColor: "#0F4C5C"
  },
  {
    title: "Economic Empowerment",
    description:
      "Agriculture, retail, and distribution roles create dignified jobs for youth and women, expanding leadership pathways tied to community wellbeing.",
    accentColor: "#0097b2"
  },
  {
    title: "Sustainability Cycle",
    description:
      "Every cedi earned flows back into medication, equipment, and leadership training, making care both free at the point of service and financially resilient.",
    accentColor: "#eeba2b"
  }
];

const longTermGoals = [
  {
    title: "Establish 5+ farms and stores by 2030",
    detail:
      "Each site will anchor an Akomapa clinic with reliable access to nutritious food grown and sold by community members.",
    accentColor: "#0097b2"
  },
  {
    title: "Cover 25% of clinic costs annually",
    detail:
      "Proceeds from farms and stores will underwrite essential services, medicines, and logistics across the network.",
    accentColor: "#eeba2b"
  },
  {
    title: "Train local youth and women",
    detail:
      "Hands-on apprenticeships in sustainable farming and agribusiness will expand economic mobility and leadership.",
    accentColor: "#0F4C5C"
  },
  {
    title: "Integrate nutrition education everywhere",
    detail:
      "Every outreach, clinic day, and community event will include live cooking, tastings, and practical guidance for day-to-day wellness.",
    accentColor: "#66C4DC"
  }
];

const partners = [
  {
    name: "Local Farming Cooperatives",
    logo: "/images/partners/local-coops-logo.svg"
  },
  {
    name: "Ministry of Food & Agriculture",
    logo: "/images/partners/mofa-logo.svg"
  },
  {
    name: "Ghana Health Service Nutrition Units",
    logo: "/images/partners/ghana-health-service-logo.png"
  },
  {
    name: "UCC School of Agriculture",
    logo: "/images/partners/ucc.png"
  },
  {
    name: "Global Nutrition & Sustainability Alliance",
    logo: "/images/partners/global-nutrition-logo.svg"
  }
];

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const primaryCtaClass =
  `${ctaBaseClass} bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#8DD4E6]`;

const secondaryCtaClass =
  `${ctaBaseClass} bg-[#eeba2b] hover:bg-[#eeba2b]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#F5C94D]`;

const outlineCtaClass =
  `${ctaBaseClass} border-2 border-[#FCFAEF] text-[#FCFAEF] hover:bg-[#FCFAEF]/10 shadow-none focus-visible:ring-[#FCFAEF]`;

export default function FoodsPage() {
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
              href="/programs"
              className="inline-flex items-center text-[#FCFAEF]/80 hover:text-[#FCFAEF] transition-colors text-sm font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Programs
            </Link>
          </motion.div>
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="w-full lg:w-1/2 max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold text-[#FCFAEF]/80 mb-6"
              >
                Akomapa Foods & Stores Initiative
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
              >
                Nourishing Health. Sustaining Care. Empowering Communities.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/85 font-light"
              >
                Health begins long before patients reach our clinics. By linking agriculture, nutrition, and economic participation, Akomapa ensures that every community can feed, heal, and sustain itself.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              >
                <Button asChild className={primaryCtaClass}>
                  <Link href="/partners">Partner with Us</Link>
                </Button>
                <Button asChild className={secondaryCtaClass}>
                  <Link href="/join">Support the Launch</Link>
                </Button>
                <Button asChild className={secondaryCtaClass}>
                  <Link href="/donate">Donate</Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative h-[340px] sm:h-[420px] md:h-[520px] lg:h-[660px] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <Image
                src="/highlights/Akomapa-47.jpg"
                alt="Akomapa Foods team cultivating community farms"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-2 lg:order-1 relative w-full min-h-[320px] h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/highlights/Akomapa-61.jpg"
                alt="Fresh produce harvested for the Akomapa Foods Initiative"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                About the Initiative
              </h2>
              <div className="space-y-5 text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                <p>
                  The Akomapa Foods & Stores Initiative is the sustainability engine of our health model, connecting food security, economic empowerment, and clinic access in one ecosystem.
                </p>
                <p>
                  Health starts in kitchens, markets, and farms. When communities grow and sell nutritious food, they also strengthen the very clinics that care for them.
                </p>
                <p>
                  By linking agriculture and nutrition to student-run clinics, Akomapa ensures communities receive care and co-own the means to sustain it for generations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
            className="max-w-4xl mx-auto text-center space-y-5"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Our Vision
            </h2>
            <p className="text-lg md:text-xl text-[#FCFAEF]/90 leading-relaxed">
              We are building a network of community-run farms and food stores that make nutritious food accessible while generating revenue to fund free, student-led healthcare. Every clinic becomes part of a thriving local economy where wellness, work, and sustainability reinforce one another.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#F4F1E8] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
              What We Do
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              A full-circle model blends agriculture, retail, education, and reinvestment so communities thrive alongside their clinics.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {whatWeDo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-3xl bg-white dark:bg-[#2F3332] p-6 lg:p-8 shadow-lg border border-[#E6E7E7]/50 dark:border-[#3A3E3D]"
              >
                <div
                  className="h-1 w-16 rounded-full mb-4"
                  style={{ backgroundColor: item.accentColor }}
                />
                <h3 className="text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-[#2F3332] dark:text-[#E6E7E7]/90 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pilot" className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-2 lg:order-1 bg-white/95 dark:bg-[#2F3332]/95 rounded-3xl p-8 md:p-10 shadow-2xl border border-[#E6E7E7]/60 dark:border-[#3A3E3D] space-y-5"
            >
              <div className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2]">
                Spotlight
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                Pilot Project
              </h2>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                Our first Akomapa Farm and Store launches near the University of Cape Coast in 2027. The site will supply fresh produce directly to local families, power free clinic days, and document a model for replication.
              </p>
              <div className="rounded-2xl bg-[#F4F1E8] dark:bg-[#1F2322] border border-[#E6E7E7]/70 dark:border-[#3A3E3D] p-6 space-y-3">
                <p className="text-base text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  Expansion plans are already aligned with future Akomapa clinics across Ghana, Africa, and the United States. Each new location adapts to local crops, culture, and community priorities while staying rooted in our shared standards.
                </p>
                <p className="text-sm font-semibold text-[#0097b2] dark:text-[#66C4DC]">
                  Launch Timeline · 2027
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 lg:order-2 relative w-full h-[260px] sm:h-[320px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/highlights/Akomapa-40.jpg"
                alt="Community members preparing the pilot farm launch"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
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
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Long-Term Goals
            </h2>
            <p className="text-lg text-[#FCFAEF]/90 leading-relaxed">
              Every goal ties nutrition to sustainable healthcare financing and community leadership.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {longTermGoals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/15 p-6 lg:p-8 shadow-xl"
              >
                <div
                  className="h-1 w-16 rounded-full mb-4"
                  style={{ backgroundColor: goal.accentColor }}
                />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {goal.title}
                </h3>
                <p className="text-base text-[#FCFAEF]/85 leading-relaxed">
                  {goal.detail}
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
            className="text-center max-w-4xl mx-auto mb-10 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
              Partnerships Fuel Every Harvest
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              We collaborate with institutions that share a commitment to food security, research, and ethical healthcare delivery.
            </p>
          </motion.div>
          <div className="w-full overflow-x-auto">
            <div className="flex items-stretch gap-4 sm:gap-6 md:gap-8 min-w-max py-2">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="group relative flex h-24 sm:h-28 lg:h-32 w-44 sm:w-56 lg:w-64 flex-shrink-0 flex-col items-center justify-center rounded-3xl border border-[#E6E7E7]/60 dark:border-[#2F3332] bg-white dark:bg-[#2F3332] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative h-10 sm:h-12 md:h-14 lg:h-16 w-28 sm:w-36 md:w-44 lg:w-48">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="(min-width: 1024px) 12rem, 40vw"
                      className="object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-xs font-semibold text-center text-[#1C1F1E] dark:text-[#FCFAEF] px-4">
                    {partner.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F4C5C] to-[#0097b2] text-[#FCFAEF]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">From the Founders</h2>
            <p className="text-lg md:text-xl text-[#FCFAEF]/90 leading-relaxed italic">
              &quot;Our goal is to build communities that not only receive care but help sustain it. Akomapa Foods & Stores redefines healthcare by making every harvest an act of healing.&quot;
            </p>
            <p className="text-base font-semibold text-[#F5C94D]">
              — Akomapa Executive Team
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0B2F3A] via-[#0F4C5C] to-[#0097b2] text-[#FCFAEF]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Join the Movement
            </h2>
            <p className="text-lg text-[#FCFAEF]/85 leading-relaxed">
              Help us make nutrition the foundation of sustainable healthcare. Your partnership advances farms, stores, and clinics that belong to the communities they serve.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild className={primaryCtaClass}>
                <Link href="/partners">Partner with Us</Link>
              </Button>
              <Button asChild className={outlineCtaClass}>
                <Link href="/join">Support the Launch</Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/donate">Donate</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
