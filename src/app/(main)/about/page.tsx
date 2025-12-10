"use client";

import Image from "@/components/common/Image";
import Link from "next/link";
import { ArrowRight, ChevronsDown } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AboutPage() {
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
              Transforming healthcare access through innovation, education, and community partnership.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/80 font-light max-w-3xl"
            >
              Akomapa Health Foundation was established in 2025 with a vision to create a world where quality healthcare is accessible to all people, regardless of their location or economic status.
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
                src="/highlights/Akomapa-69.jpg"
                alt="Akomapa Health Foundation Team"
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

      {/* About Content Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6 text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed"
            >
              <p>
                Our team of dedicated healthcare professionals, researchers, and community advocates work together to develop and implement programs that address critical healthcare needs in underserved communities.
              </p>
              <p>
                Working to transform healthcare access and outcomes through innovative programs, education, and community partnerships, Akomapa is building a model of student-powered, community-rooted healthcare that scales sustainably.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Button
                asChild
                className="group bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF]"
              >
                <Link href="/#mission" className="flex items-center">
                  Our Mission & Vision
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* What We Focus On Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#2F3332]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#F5C94D] font-bold text-base sm:text-lg mb-2">
                WHAT WE FOCUS ON
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Key Areas of Impact
              </h2>
              <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed max-w-3xl mx-auto">
                Our work centers around key areas where we can make the most significant impact on healthcare outcomes.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl bg-gradient-to-br from-[#0097b2]/10 to-[#0097b2]/5 dark:from-[#2F3332] dark:to-[#1C1F1E] p-6 sm:p-8 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#0097b2]/10 via-transparent to-[#F5C94D]/10" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#0097b2] rounded-full" />
                  <div className="h-1 w-1 bg-[#0097b2] rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Access to Care
                </h3>
                <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                  Establishing and supporting healthcare facilities in underserved areas to ensure everyone has access to quality healthcare services.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl bg-gradient-to-br from-[#eeba2b]/10 to-[#eeba2b]/5 dark:from-[#2F3332] dark:to-[#1C1F1E] p-6 sm:p-8 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#eeba2b]/10 via-transparent to-[#0097b2]/10" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#eeba2b] rounded-full" />
                  <div className="h-1 w-1 bg-[#eeba2b] rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Health Education
                </h3>
                <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                  Providing educational resources and programs to empower communities with knowledge about preventive care and health management.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl bg-gradient-to-br from-[#0097b2]/10 to-[#0097b2]/5 dark:from-[#2F3332] dark:to-[#1C1F1E] p-6 sm:p-8 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#0097b2]/10 via-transparent to-[#F5C94D]/10" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#0097b2] rounded-full" />
                  <div className="h-1 w-1 bg-[#0097b2] rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Healthcare Workforce
                </h3>
                <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                  Training and supporting healthcare professionals to build capacity in communities that face shortages of qualified medical personnel.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Explore More Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#031C3A] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 -left-32 h-72 w-72 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#F5C94D] font-bold text-base sm:text-lg mb-2">
                EXPLORE MORE ABOUT US
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#FCFAEF]">
                Learn About Our Foundation
              </h2>
              <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed max-w-3xl mx-auto">
                Discover our mission, team, history, and partners working together to improve healthcare.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/about/mission" 
                className="group block relative rounded-2xl bg-[#FCFAEF]/10 backdrop-blur-md border border-[#FCFAEF]/15 p-6 sm:p-8 hover:bg-[#FCFAEF]/15 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#F5C94D] rounded-full" />
                  <div className="h-1 w-1 bg-[#F5C94D] rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[#FCFAEF]">Our Programs</h3>
                <p className="text-sm sm:text-base text-[#FCFAEF]/80 mb-6 leading-relaxed flex-1">
                  Learn about our programs and the impact we&apos;re making.
                </p>
                <span className="text-[#F5C94D] font-medium inline-flex items-center group-hover:translate-x-2 transition-transform">
                  Read More <ArrowRight size={16} className="ml-2" />
                </span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/about/team" 
                className="group block relative rounded-2xl bg-[#FCFAEF]/10 backdrop-blur-md border border-[#FCFAEF]/15 p-6 sm:p-8 hover:bg-[#FCFAEF]/15 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#F5C94D] rounded-full" />
                  <div className="h-1 w-1 bg-[#F5C94D] rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[#FCFAEF]">Our Team</h3>
                <p className="text-sm sm:text-base text-[#FCFAEF]/80 mb-6 leading-relaxed flex-1">
                  Meet the dedicated professionals making our programs possible.
                </p>
                <span className="text-[#F5C94D] font-medium inline-flex items-center group-hover:translate-x-2 transition-transform">
                  Read More <ArrowRight size={16} className="ml-2" />
                </span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/about" 
                className="group block relative rounded-2xl bg-[#FCFAEF]/10 backdrop-blur-md border border-[#FCFAEF]/15 p-6 sm:p-8 hover:bg-[#FCFAEF]/15 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#F5C94D] rounded-full" />
                  <div className="h-1 w-1 bg-[#F5C94D] rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[#FCFAEF]">Our Journey</h3>
                <p className="text-sm sm:text-base text-[#FCFAEF]/80 mb-6 leading-relaxed flex-1">
                  Discover how we started and our journey to becoming a leading healthcare organization.
                </p>
                <span className="text-[#F5C94D] font-medium inline-flex items-center group-hover:translate-x-2 transition-transform">
                  Read More <ArrowRight size={16} className="ml-2" />
                </span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/partner" 
                className="group block relative rounded-2xl bg-[#FCFAEF]/10 backdrop-blur-md border border-[#FCFAEF]/15 p-6 sm:p-8 hover:bg-[#FCFAEF]/15 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#F5C94D] rounded-full" />
                  <div className="h-1 w-1 bg-[#F5C94D] rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[#FCFAEF]">Our Partners</h3>
                <p className="text-sm sm:text-base text-[#FCFAEF]/80 mb-6 leading-relaxed flex-1">
                  See the organizations we collaborate with to expand our impact.
                </p>
                <span className="text-[#F5C94D] font-medium inline-flex items-center group-hover:translate-x-2 transition-transform">
                  Read More <ArrowRight size={16} className="ml-2" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}