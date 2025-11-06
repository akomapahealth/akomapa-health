"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Target, Heart, Globe, TrendingUp, CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Roadmap data
const phases = [
  {
    id: 1,
    title: "Phase 1: Launch & Learn",
    period: "October 2025–October 2026",
    focus: "Deliver excellent care, build trust, and lay the legal and strategic foundation.",
    goal: "Deliver care to our first 500 patients and build strong organizational roots.",
    color: "bg-[#0097b2]",
    icon: Target,
    achievements: [
      "Launch free clinic services (screenings, counseling, follow-up)",
      "Train student volunteers from multiple disciplines",
      "Establish referral and patient advocacy pathways",
      "Support NHIS registration for patients",
      "Begin a home health and follow-up program",
      "Launch research and data collection team",
      "Pilot Global Health Leaders Training Program (Yale, UCLA, UCC)",
      "Launch Akomapa Partner Program (monthly giving community)",
      "Formalize nonprofit status in Ghana and the U.S.",
      "Develop early partnerships with local clinics, GHS, and academic institutions"
    ]
  },
  {
    id: 2,
    title: "Phase 2: Pilot Sustainability",
    period: "October 2026–October 2027",
    focus: "Test social enterprise models and strengthen clinical impact.",
    goal: "Test bold, community-driven solutions that support long-term care.",
    color: "bg-[#eeba2b]",
    icon: TrendingUp,
    achievements: [
      "Launch pilot Akomapa Pharmacy (affordable meds with reinvestment)",
      "Begin Akomapa Farms test plot (nutrition + income generation)",
      "Expand NHIS registration and follow-up capacity",
      "Grow the Global Health Training Program",
      "Share early research insights to improve clinic practices"
    ]
  },
  {
    id: 3,
    title: "Phase 3: Scale & Sustain",
    period: "October 2027–October 2028",
    focus: "Build lasting systems, expand impact, and share lessons learned.",
    goal: "Establish Akomapa as a replicable, sustainable care model in Africa.",
    color: "bg-[#2F3332]",
    icon: Globe,
    achievements: [
      "Open a fully functioning Akomapa Pharmacy",
      "Launch Akomapa Farms & Food Store (revenue supports the clinic)",
      "Secure long-term institutional sponsors and grant funders",
      "Present and publish research and program outcomes",
      "Begin planning for clinic replication across Ghana or the Global South"
    ]
  }
];

export default function RoadmapPage() {
  const [activePhase, setActivePhase] = useState(1);

  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="/images/hero-image.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Badge className="bg-[#0097b2] text-[#FCFAEF] mb-4">
                🧭 Akomapa&apos;s 3-Year Roadmap
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6"
            >
              Building sustainable care, one step at a time.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#2F3332] dark:text-[#E6E7E7] mb-8 max-w-3xl mx-auto"
            >
              Our comprehensive 3-year roadmap (2025–2028) outlines our journey from launching essential healthcare services to building sustainable, replicable care models across Ghana and beyond.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Phase Navigation */}
      <section className="py-8 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {phases.map((phase) => (
              <Button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                variant={activePhase === phase.id ? "default" : "outline"}
                className={`rounded-full px-6 py-3 ${
                  activePhase === phase.id
                    ? `${phase.color} text-[#FCFAEF] hover:${phase.color}`
                    : "border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2] hover:text-[#FCFAEF] dark:border-[#66C4DC] dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#1C1F1E]"
                }`}
              >
                <phase.icon className="h-4 w-4 mr-2" />
                {phase.title.split(':')[1]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Phase Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {phases.map((phase) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: activePhase === phase.id ? 1 : 0,
                y: activePhase === phase.id ? 0 : 20
              }}
              transition={{ duration: 0.5 }}
              className={`${activePhase === phase.id ? 'block' : 'hidden'}`}
            >
              <div className="max-w-4xl mx-auto">
                {/* Phase Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full ${phase.color} flex items-center justify-center mr-4`}>
                      <phase.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                        {phase.title}
                      </h2>
                      <p className="text-lg text-[#0097b2] dark:text-[#66C4DC] font-medium">
                        {phase.period}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-[#2F3332] rounded-xl p-6 shadow-lg mb-8">
                    <h3 className="text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-3">
                      Focus
                    </h3>
                    <p className="text-[#2F3332] dark:text-[#E6E7E7] text-lg">
                      {phase.focus}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#0097b2] to-[#eeba2b] rounded-xl p-6 text-white">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Goal
                    </h3>
                    <p className="text-lg">
                      {phase.goal.replace(/'/g, "&apos;")}
                    </p>
                  </div>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {phase.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-[#2F3332] group">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className={`w-8 h-8 rounded-full ${phase.color} flex items-center justify-center mr-4 mt-1`}>
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <p className="text-[#2F3332] dark:text-[#E6E7E7] group-hover:text-[#0097b2] dark:group-hover:text-[#66C4DC] transition-colors">
                              {achievement}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Progress Timeline */}
      <section className="py-16 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center text-[#1C1F1E] dark:text-[#FCFAEF] mb-12"
            >
              Our Journey Timeline
            </motion.h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#0097b2] dark:bg-[#66C4DC] h-full"></div>
              
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex flex-col md:flex-row items-center`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full ${phase.color} border-4 border-white dark:border-[#2F3332] z-10`}></div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} text-center md:text-left`}>
                    <Card className="bg-white dark:bg-[#2F3332] shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {phase.title}
                        </CardTitle>
                        <CardDescription className="text-[#0097b2] dark:text-[#66C4DC] font-medium">
                          {phase.period}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                          {phase.focus}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#0097b2] to-[#eeba2b]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FCFAEF]">
              📣 Help us bring this vision to life
            </h2>
            <p className="text-xl text-[#FCFAEF]/90 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re a donor, global health ally, or community partner — we invite you to walk this road with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-[#FCFAEF] text-[#0097b2] hover:bg-[#FCFAEF]/90 font-semibold"
              >
                <Link href="/partner">
                  <span className="flex items-center">
                    Partner With Us <ArrowRight size={20} className="ml-2" />
                  </span>
                </Link>
              </Button>
              <Button 
                size="lg"
                className="bg-[#eeba2b] text-[#FCFAEF] hover:bg-[#F5C94D] font-semibold"
              >
                <Link href="/partner">
                  <span className="flex items-center">
                    Donate <Heart size={20} className="ml-2" />
                  </span>
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="border-[#FCFAEF] text-[#FCFAEF] bg-transparent hover:bg-[#FCFAEF] hover:text-[#0097b2] font-semibold"
              >
                <Link href="mailto:akomapahealth@gmail.com">
                  <span className="flex items-center">
                    Contact Us <ChevronRight size={20} className="ml-2" />
                  </span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
} 