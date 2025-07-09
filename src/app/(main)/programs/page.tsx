"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Heart, Users, Globe, Building, Mail, CheckCircle, ChevronRight, Star, Leaf, Pill, Home, FileText, CreditCard, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Program data with icons and categories
interface Program {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  category: string;
  details?: string;
}

const currentPrograms: Program[] = [
  {
    id: 1,
    title: "Screening for Hypertension & Diabetes",
    description: "We provide free, community-based screenings for hypertension and diabetes — two of Ghana's most common and underdiagnosed chronic diseases.",
    icon: Heart,
    color: "bg-red-500",
    category: "Current Program"
  },
  {
    id: 2,
    title: "Nutritional Counseling",
    description: "Our team offers personalized, culturally sensitive nutritional guidance to help patients manage chronic conditions and adopt sustainable eating habits.",
    icon: Leaf,
    color: "bg-green-500",
    category: "Current Program"
  },
  {
    id: 3,
    title: "Drug Prescriptions & Counseling",
    description: "We don't just prescribe medications — we counsel patients on how to take them safely and consistently.",
    icon: Pill,
    color: "bg-blue-500",
    category: "Current Program"
  },
  {
    id: 4,
    title: "Referrals & Patient Advocacy Program",
    description: "When patients require advanced care, we refer them to trusted health centers and assign them a patient advocate.",
    icon: Users,
    color: "bg-purple-500",
    category: "Current Program"
  },
  {
    id: 5,
    title: "Home Health & Follow-Up Teams",
    description: "Our home visitation teams monitor patient progress between clinic days and build meaningful relationships.",
    icon: Home,
    color: "bg-orange-500",
    category: "Current Program"
  },
  {
    id: 6,
    title: "Research & Impact Team",
    description: "Our Research Team collects data to evaluate outcomes and generate insights that shape the future of student-led healthcare.",
    icon: FileText,
    color: "bg-indigo-500",
    category: "Current Program"
  },
  {
    id: 7,
    title: "NHIS Registration Support",
    description: "We assist patients with enrollment in the National Health Insurance Scheme, reducing out-of-pocket costs.",
    icon: CreditCard,
    color: "bg-teal-500",
    category: "Current Program"
  },
  {
    id: 8,
    title: "Global Health Leaders Training Partnership",
    description: "In collaboration with Yale University, UCLA, and University of Cape Coast, we offer hands-on training for healthcare changemakers.",
    icon: Globe,
    color: "bg-yellow-500",
    category: "Current Program"
  }
];

const futureInitiatives: Program[] = [
  {
    id: 9,
    title: "Akomapa Pharmacy",
    description: "We are developing a low-cost, high-impact community pharmacy that increases access to essential medications.",
    icon: Building,
    color: "bg-pink-500",
    category: "Future Initiative",
    details: "The pharmacy will reinvest its proceeds to help sustain the clinic's work long-term. We welcome sponsorships, medication donations, and corporate partnerships."
  },
  {
    id: 10,
    title: "Akomapa Farms & Food Stores",
    description: "To address food insecurity and promote healthy eating, we plan to launch a community farm and urban food stores.",
    icon: ShoppingBag,
    color: "bg-emerald-500",
    category: "Future Initiative",
    details: "Proceeds from the sale of organic food products will support clinic operations while encouraging nutrition and local economic development."
  }
];

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState("current");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const handleLearnMore = (program: Program) => {
    setSelectedProgram(program);
  };

  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
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
              <Badge className="bg-[#007A73] text-[#FCFAEF] mb-4">
                🌿 Akomapa Programs & Initiatives
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6"
            >
              Healing. Advocacy. Empowerment.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#2F3332] dark:text-[#E6E7E7] mb-8 max-w-3xl mx-auto"
            >
              At Akomapa, we don't just treat illness — we build systems of care, support, and sustainability for underserved communities in Ghana.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 dark:bg-[#2F3332]/80 backdrop-blur-sm rounded-xl p-6"
            >
              <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                Our work is driven by an interprofessional team of student volunteers, clinicians, and community members who believe in a healthier future for all.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex bg-white dark:bg-[#2F3332] rounded-lg p-1 shadow-lg">
              <Button
                onClick={() => setActiveTab("current")}
                variant={activeTab === "current" ? "default" : "ghost"}
                className={`rounded-md ${
                  activeTab === "current"
                    ? "bg-[#007A73] text-[#FCFAEF] hover:bg-[#007A73]/10 hover:text-[#131313]"
                    : "text-[#2F3332] dark:text-[#E6E7E7] hover:bg-[#007A73]/10 hover:text-[#131313]"
                }`}
              >
                Current Programs
              </Button>
              <Button
                onClick={() => setActiveTab("future")}
                variant={activeTab === "future" ? "default" : "ghost"}
                className={`rounded-md ${
                  activeTab === "future"
                    ? "bg-[#C37B1E] text-[#FCFAEF] hover:bg-[#C37B1E]/10 hover:text-[#131313]"
                    : "text-[#2F3332] dark:text-[#E6E7E7] hover:bg-[#C37B1E]/10 hover:text-[#131313]"
                }`}
              >
                Future Initiatives
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === "current" ? currentPrograms : futureInitiatives).map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-[#2F3332] group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-12 h-12 rounded-full ${program.color} flex items-center justify-center`}>
                        <program.icon className="h-6 w-6 text-white" />
                      </div>
                                             <Badge 
                         className={`${
                           program.category === "Current Program" 
                             ? "bg-[#007A73] text-[#FCFAEF] hover:bg-[#63B0AC] dark:bg-[#63B0AC] dark:text-[#FCFAEF] dark:hover:bg-[#007A73]"
                             : "bg-[#C37B1E] text-[#FCFAEF] hover:bg-[#F3C677] dark:bg-[#F3C677] dark:text-[#1C1F1E] dark:hover:bg-[#C37B1E]"
                         } border-0`}
                       >
                        {program.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF] group-hover:text-[#007A73] dark:group-hover:text-[#63B0AC] transition-colors">
                      {program.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#2F3332] dark:text-[#E6E7E7] mb-4">
                      {program.description}
                    </CardDescription>
                    {program.details && (
                      <div className="mt-4 p-3 bg-[#FCFAEF] dark:bg-[#1C1F1E] rounded-lg">
                        <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                          {program.details}
                        </p>
                      </div>
                    )}
                    
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#007A73] to-[#C37B1E]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FCFAEF]">
              🤝 Be Part of the Movement
            </h2>
            <p className="text-xl text-[#FCFAEF]/90 mb-8 max-w-2xl mx-auto">
              Your support powers every initiative. Whether through financial contributions, in-kind donations, or strategic partnerships — there's a place for you at Akomapa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-[#FCFAEF] text-[#007A73] hover:bg-[#FCFAEF]/90 font-semibold"
              >
                <Link href="/partner">
                  <span className="flex items-center">
                    Partner with us <ArrowRight size={20} className="ml-2" />
                  </span>
                </Link>
              </Button>
              <Button 
                size="lg"
                className="bg-[#C37B1E] text-[#FCFAEF] hover:bg-[#F3C677] font-semibold"
              >
                <Link href="/roadmap">
                  <span className="flex items-center">
                    View Our Roadmap <ArrowRight size={20} className="ml-2" />
                  </span>
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="border-[#FCFAEF] text-[#FCFAEF] bg-transparent hover:bg-[#FCFAEF] hover:text-[#007A73] font-semibold"
              >
                <Link href="mailto:akomapahealth@gmail.com">
                  <span className="flex items-center">
                    <Mail size={20} className="mr-2" />
                    Contact Us
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