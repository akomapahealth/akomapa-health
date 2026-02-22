"use client";

import Image from "@/components/common/Image";
import Link from "next/link";
import { ArrowRight, Bell, Sparkles, Newspaper, Calendar, TrendingUp } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NewsPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#eeba2b]/15 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-[#F5C94D]/20 rounded-full blur-2xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 h-full flex flex-col lg:flex-row lg:items-center gap-10 sm:gap-12">
          <div className="flex-1 max-w-3xl pt-4 sm:pt-8 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eeba2b]/20 border border-[#eeba2b]/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#eeba2b]" />
              <span className="text-sm font-medium text-[#eeba2b]">Coming Soon</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Big things are brewing at{" "}
              <span className="text-[#eeba2b] font-medium">Akomapa</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-[#FCFAEF]/85 font-light max-w-2xl mb-8"
            >
              We&apos;re building a dedicated space for stories, updates, and milestones from our 
              student-powered healthcare movement. Stay tuned for inspiring news from the field.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                className="group bg-[#eeba2b] hover:bg-[#eeba2b]/90 text-[#1C1F1E] font-medium px-6"
              >
                <Link href="/" className="flex items-center">
                  <Bell className="w-4 h-4 mr-2" />
                  Back to Home
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="group border-[#FCFAEF]/30 text-[#FCFAEF] hover:bg-[#FCFAEF]/10 px-6"
              >
                <Link href="/join" className="flex items-center">
                  Join the Movement
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Decorative Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full lg:max-w-[500px] xl:max-w-[550px]"
          >
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/highlights/Akomapa-2.jpg"
                alt="Akomapa community health activities"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 dark:bg-[#2F3332]/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0097b2]/10 flex items-center justify-center">
                      <Newspaper className="w-5 h-5 text-[#0097b2]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">News Hub</p>
                      <p className="text-xs text-[#2F3332]/70 dark:text-[#E6E7E7]/70">Launching Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Coming Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#F5C94D] font-bold text-base sm:text-lg mb-2">
                WHAT TO EXPECT
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Stories Worth Sharing
              </h2>
              <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed max-w-2xl mx-auto">
                Our news section will feature real stories from the frontlines of student-powered healthcare innovation.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl bg-white dark:bg-[#2F3332] p-6 sm:p-8 border border-[#E6E7E7]/50 dark:border-[#4F5554]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0097b2]/10 flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6 text-[#0097b2]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Impact Stories
              </h3>
              <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                Real outcomes from our clinics, research breakthroughs, and community health improvements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl bg-white dark:bg-[#2F3332] p-6 sm:p-8 border border-[#E6E7E7]/50 dark:border-[#4F5554]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[#eeba2b]/10 flex items-center justify-center mb-5">
                <Calendar className="w-6 h-6 text-[#eeba2b]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Events & Updates
              </h3>
              <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                Upcoming health fairs, workshops, leadership programs, and community events.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl bg-white dark:bg-[#2F3332] p-6 sm:p-8 border border-[#E6E7E7]/50 dark:border-[#4F5554]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0097b2]/10 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6 text-[#0097b2]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Student Spotlights
              </h3>
              <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                Meet the student leaders driving change in healthcare across communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#031C3A] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 -left-32 h-72 w-72 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.4 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCFAEF]/10 border border-[#FCFAEF]/20 mb-2">
                <Bell className="w-4 h-4 text-[#eeba2b]" />
                <span className="text-sm font-medium text-[#FCFAEF]">Don&apos;t Miss Out</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FCFAEF]">
                Want to Stay Updated?
              </h2>
              <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed max-w-2xl mx-auto">
                While we build our news hub, follow our journey and get involved in our mission to transform healthcare.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  asChild
                  className="group bg-[#eeba2b] hover:bg-[#eeba2b]/90 text-[#1C1F1E] font-medium px-8"
                >
                  <Link href="/join" className="flex items-center">
                    Join Our Movement
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="group border-[#FCFAEF]/30 text-[#FCFAEF] hover:bg-[#FCFAEF]/10 px-8"
                >
                  <Link href="/contact" className="flex items-center">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              <div className="pt-8">
                <p className="text-sm text-[#FCFAEF]/60 mb-3">Or reach out directly:</p>
                <a
                  href="mailto:akomapahealth@gmail.com"
                  className="inline-flex items-center text-[#F5C94D] font-medium hover:text-[#FCFAEF] transition-colors"
                >
                  akomapahealth@gmail.com
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
