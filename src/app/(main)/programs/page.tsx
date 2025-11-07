"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import { ArrowRight, Heart, Globe, Leaf, Pill, Home, FileText, CreditCard, Stethoscope, UserCheck, Sprout, Package, Building, Mail } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";

// Core Programs Data
interface CoreProgram {
  id: number;
  title: string;
  emoji: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgGradient: string;
}

const corePrograms: CoreProgram[] = [
  {
    id: 1,
    title: "Screening for Hypertension & Diabetes",
    emoji: "🩺",
    description: "We provide free, community-based screenings for hypertension and diabetes — two of Ghana's most common and underdiagnosed chronic diseases. Early detection allows us to begin life-saving interventions and reduce long-term complications.",
    icon: Stethoscope,
    color: "#0097b2",
    bgGradient: "from-[#0097b2]/10 to-[#0097b2]/5"
  },
  {
    id: 2,
    title: "Nutritional Counseling",
    emoji: "🥗",
    description: "Our team offers personalized, culturally sensitive nutritional guidance to help patients manage chronic conditions, improve energy, and adopt sustainable, healthful eating habits — even with limited resources.",
    icon: Leaf,
    color: "#eeba2b",
    bgGradient: "from-[#eeba2b]/10 to-[#eeba2b]/5"
  },
  {
    id: 3,
    title: "Drug Prescriptions & Counseling",
    emoji: "💊",
    description: "We don't just prescribe medications — we counsel patients on how to take them safely and consistently. Our pharmacy partners and student clinicians ensure medications are both accessible and well-understood.",
    icon: Pill,
    color: "#0097b2",
    bgGradient: "from-[#0097b2]/10 to-[#0097b2]/5"
  },
  {
    id: 4,
    title: "Referrals & Patient Advocacy Program",
    emoji: "🏥",
    description: "When patients require more advanced care, we refer them to trusted health centers and assign them a patient advocate — a trained member of our team who supports them through Ghana's health system, from appointments to NHIS registration.",
    icon: UserCheck,
    color: "#eeba2b",
    bgGradient: "from-[#eeba2b]/10 to-[#eeba2b]/5"
  },
  {
    id: 5,
    title: "Home Health & Follow-Up Teams",
    emoji: "🏡",
    description: "Our home visitation teams monitor patient progress between clinic days, reinforce treatment plans, and build meaningful relationships. This community-rooted model strengthens continuity of care and improves outcomes.",
    icon: Home,
    color: "#0097b2",
    bgGradient: "from-[#0097b2]/10 to-[#0097b2]/5"
  },
  {
    id: 6,
    title: "Research & Impact Team",
    emoji: "📊",
    description: "Our Research Team collects data to evaluate outcomes, improve services, and generate insights that shape the future of student-led healthcare. We aim to contribute evidence that informs national and global health policies.",
    icon: FileText,
    color: "#eeba2b",
    bgGradient: "from-[#eeba2b]/10 to-[#eeba2b]/5"
  },
  {
    id: 7,
    title: "NHIS Registration Support",
    emoji: "🪪",
    description: "We assist patients with enrollment in the National Health Insurance Scheme (NHIS), reducing out-of-pocket costs and connecting them to broader services. This is a key step in our commitment to long-term, equitable care.",
    icon: CreditCard,
    color: "#0097b2",
    bgGradient: "from-[#0097b2]/10 to-[#0097b2]/5"
  },
  {
    id: 8,
    title: "Global Health Leaders Training Partnership",
    emoji: "🌍",
    description: "In collaboration with global health leaders from Yale University, UCLA, and the University of Cape Coast, we offer hands-on training and mentorship for the next generation of healthcare changemakers. This program equips medical students and early-career health professionals with the skills to lead community-centered, equity-driven interventions across Ghana and beyond.",
    icon: Globe,
    color: "#eeba2b",
    bgGradient: "from-[#eeba2b]/10 to-[#eeba2b]/5"
  }
];

// Future Initiatives Data
interface FutureInitiative {
  id: number;
  title: string;
  emoji: string;
  description: string;
  details: string;
  seeking: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgGradient: string;
}

const futureInitiatives: FutureInitiative[] = [
  {
    id: 1,
    title: "Akomapa Pharmacy",
    emoji: "🧴",
    description: "We're developing a low-cost, high-impact community pharmacy that increases access to essential medications. But this isn't just about dispensing pills—it's about creating a closed loop of care. Revenue from the pharmacy will reinvest directly into sustaining the clinic's operations, staff, and outreach services.",
    details: "Whether through bulk purchasing, donated stock, or public-private partnerships, we aim to create a pharmacy that is both affordable and reliable.",
    seeking: "📦 Seeking: sponsorships, corporate partners, and medication donations to make this vision real.",
    icon: Package,
    color: "#0097b2",
    bgGradient: "from-[#0097b2]/10 to-[#0097b2]/5"
  },
  {
    id: 2,
    title: "Akomapa Farms & Food Stores",
    emoji: "🥬",
    description: "Food is medicine—and access matters. We plan to launch a community farm to grow healthy, organic produce and distribute it through urban food stores at subsidized rates. These sales will directly support clinic operations, while simultaneously promoting nutrition, reducing food insecurity, and stimulating local economies.",
    details: "This model dares to turn agriculture into access, and nutrition into impact.",
    seeking: "🌿 We welcome agricultural experts, entrepreneurs, and donors ready to nourish Ghana's future.",
    icon: Sprout,
    color: "#eeba2b",
    bgGradient: "from-[#eeba2b]/10 to-[#eeba2b]/5"
  }
];

export default function ProgramsPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/highlights/Akomapa-47.jpg"
            alt="Akomapa healthcare professionals"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#eeba2b]/20 to-[#0097b2]/20 rounded-full mb-6">
                <span className="text-[#0097b2] dark:text-[#66C4DC] font-bold text-lg">
                  🌿 Akomapa Programs & Initiatives
                </span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-8"
            >
              <span className="text-[#1C1F1E] dark:text-[#FCFAEF]">Healing. Advocacy.</span><br />
              <span className="bg-gradient-to-r from-[#eeba2b] to-[#0097b2] bg-clip-text text-transparent">
                Empowerment.
              </span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 dark:bg-[#2F3332]/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <p className="text-lg md:text-xl text-[#2F3332] dark:text-[#E6E7E7] mb-6 leading-relaxed">
                At Akomapa, we don&apos;t just treat illness — we build systems of care, support, and sustainability for underserved communities in Ghana. Our work is driven by an interprofessional team of student volunteers, clinicians, and community members who believe in a healthier future for all.
              </p>
              <p className="text-base md:text-lg text-[#2F3332] dark:text-[#E6E7E7] font-medium">
                Explore our core programs and visionary future initiatives below:
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Programs Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#0097b2] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#eeba2b] rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-8">
                Core Programs
              </h2>
              <p className="text-lg md:text-xl text-[#2F3332] dark:text-[#E6E7E7] max-w-3xl mx-auto">
                Eight comprehensive programs working together to deliver holistic, community-centered healthcare
              </p>
            </motion.div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {corePrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className={`bg-gradient-to-br ${program.bgGradient} dark:bg-[#2F3332] rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20`}>
                    {/* Header */}
                    <div className="flex items-start mb-6">
                      <div className="relative mr-6">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110"
                          style={{ 
                            backgroundColor: program.color + '20',
                            border: `2px solid ${program.color}30`
                          }}
                        >
                          <program.icon className="h-8 w-8" style={{ color: program.color }} />
                        </div>
                        {/* Number Badge */}
                        <div 
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ backgroundColor: program.color }}
                        >
                          {program.id}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <span className="text-2xl mr-3">{program.emoji}</span>
                          <h3 className="text-xl md:text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] leading-tight">
                            {program.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed text-base md:text-lg">
                      {program.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transition Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FCFAEF]/50 to-[#F8F6F0] dark:from-[#2F3332] dark:via-[#1C1F1E]/50 dark:to-[#252828]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#eeba2b]/20 to-[#0097b2]/20 rounded-full mb-6">
                <span className="text-[#eeba2b] dark:text-[#F5C94D] font-bold text-lg">
                  🌍 Akomapa: Daring to Dream Forward
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Investing in Bold, <br />
                <span className="bg-gradient-to-r from-[#eeba2b] to-[#0097b2] bg-clip-text text-transparent">
                  Sustainable Solutions
                </span>
              </h2>
              <div className="bg-white dark:bg-[#2F3332] rounded-2xl p-6 md:p-8 shadow-xl">
                <p className="text-lg md:text-xl text-[#2F3332] dark:text-[#E6E7E7] mb-6 leading-relaxed">
                  At Akomapa, we are not only responding to today&apos;s care gaps—we are reimagining what tomorrow&apos;s healthcare can look like. Our future is rooted in innovation, shaped by research, and sustained by enterprise.
                </p>
                <p className="text-base md:text-lg text-[#2F3332] dark:text-[#E6E7E7] font-medium">
                  As we serve our first patients, we are also building the systems that will outlast us—systems that are community-owned, self-sustaining, and radically human.
                </p>
                <div className="mt-6 p-4 bg-gradient-to-r from-[#0097b2]/10 to-[#eeba2b]/10 rounded-xl">
                  <p className="text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    This is not just a clinic. It&apos;s a movement.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future Initiatives Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-[#eeba2b] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#0097b2] rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#eeba2b]/20 to-[#0097b2]/20 rounded-full mb-6">
                <span className="text-[#eeba2b] dark:text-[#F5C94D] font-bold text-lg">
                  🌱 Future Initiatives
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-8">
                Healthcare That <br />
                <span className="bg-gradient-to-r from-[#eeba2b] to-[#0097b2] bg-clip-text text-transparent">
                  Sustains Itself
                </span>
              </h2>
              <p className="text-lg md:text-xl text-[#2F3332] dark:text-[#E6E7E7] max-w-3xl mx-auto">
                Food that funds care. A future that feeds its people.
              </p>
            </motion.div>

            {/* Initiatives Grid */}
            <div className="space-y-12">
              {futureInitiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-[#2F3332] rounded-3xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 overflow-hidden relative">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                      <initiative.icon className="w-full h-full" style={{ color: initiative.color }} />
                    </div>

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                            style={{ 
                              backgroundColor: initiative.color + '20',
                              border: `2px solid ${initiative.color}30`
                            }}
                          >
                            <initiative.icon className="h-10 w-10" style={{ color: initiative.color }} />
                          </div>
                          <div>
                            <div className="flex items-center mb-2">
                              <span className="text-3xl mr-3">{initiative.emoji}</span>
                              <h3 className="text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                                {initiative.title}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-6">
                        <p className="text-lg md:text-xl text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                          {initiative.description}
                        </p>
                        
                        <p className="text-base md:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                          {initiative.details}
                        </p>

                        {/* Seeking Section */}
                        <div className={`bg-gradient-to-r ${initiative.bgGradient} rounded-2xl p-6`}>
                          <p className="text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                            {initiative.seeking}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#eeba2b] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-8 h-8 border-2 border-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#FCFAEF]">
              🤝 Be Part of the Movement
            </h2>
            <p className="text-lg md:text-xl text-[#FCFAEF]/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your support powers every initiative. Whether through financial contributions, in-kind donations, or strategic partnerships — there&apos;s a place for you at Akomapa.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/partner">
                <Button 
                  size="lg"
                  className="bg-[#FCFAEF] text-[#0097b2] hover:bg-[#FCFAEF]/90 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Partner with Us
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/corporate-sponsorship">
                <Button 
                  size="lg"
                  className="bg-[#eeba2b] text-[#FCFAEF] hover:bg-[#F5C94D] hover:text-[#1C1F1E] font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Building className="h-5 w-5 mr-2" />
                  Corporate Sponsorship
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <a href="mailto:akomapahealth@gmail.com">
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-2 border-[#FCFAEF] text-[#FCFAEF] bg-transparent hover:bg-[#FCFAEF] hover:text-[#0097b2] font-semibold px-8 py-4 text-lg"
                >
                  <Mail size={20} className="mr-2" />
                  Contact Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}