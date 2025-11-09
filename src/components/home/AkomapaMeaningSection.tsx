"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";

export default function AkomapaMeaningSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#0097b2]/10 dark:bg-[#0097b2]/20 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#eeba2b]/10 dark:bg-[#eeba2b]/20 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/images/patterns/dots-pattern.webp"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start lg:items-center">
          {/* Visual Element */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Main image container - taller height */}
              <div className="relative h-[600px] md:h-[700px] lg:h-[750px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/highlights/Akomapa-47.jpg"
                  alt="Healthcare professionals showing compassion and care"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0097b2]/40 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating card with heart icon */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-[#FCFAEF] dark:bg-[#1C1F1E] p-6 rounded-xl shadow-xl border border-[#E6E7E7] dark:border-[#2F3332] max-w-xs"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-[#0097b2] dark:bg-[#66C4DC] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#FCFAEF]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-[#0097b2] dark:text-[#66C4DC]">Nya Akomapa</span>
                </div>
                <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7] text-center">
                  &quot;Have a good heart&quot;
                </p>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#eeba2b]/20 dark:bg-[#F5C94D]/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-[#eeba2b] dark:bg-[#F5C94D] rounded-full"></div>
              </div>
              
              <div className="absolute top-1/2 -left-8 w-16 h-16 bg-[#0097b2]/20 dark:bg-[#66C4DC]/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-[#0097b2] dark:bg-[#66C4DC] rounded-full"></div>
              </div>
            </div>
          </motion.div>
          
          {/* Text Content */}
          <motion.div 
            className="lg:col-span-7 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="w-full max-w-3xl h-full flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-8 md:space-y-10 lg:space-y-12 text-lg md:text-xl text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed"
              >
                <p className="text-2xl md:text-3xl font-medium text-[#0097b2] dark:text-[#66C4DC]">
                  In Akan, Akomapa means &quot;a good heart.&quot;
                </p>
                
                <p className="text-lg md:text-xl">
                  It&apos;s more than just a name — it&apos;s our guiding belief.
                </p>
                
                <p className="text-lg md:text-xl leading-relaxed">
                  At Akomapa, we care for the physical heart — screening for hypertension, managing diabetes, offering nutrition support — but we also care for the moral heart of healthcare. The part that listens. The part that sees dignity in every patient. The part that refuses to walk away from people just because they are poor.
                </p>
                
                <div className="bg-[#FCFAEF]/50 dark:bg-[#1C1F1E]/50 p-6 md:p-8 rounded-xl border-l-4 border-[#eeba2b] dark:border-[#F5C94D]">
                  <p className="text-lg md:text-xl font-medium text-[#1C1F1E] dark:text-[#FCFAEF] leading-relaxed">
                    To have akomapa is to lead with empathy, to live in health, and to believe that everyone deserves to be well — in body, mind, and spirit.
                  </p>
                </div>
                
                <p className="text-lg md:text-xl">
                  Whether you&apos;re a patient, a volunteer, or a partner — welcome to the Akomapa family.
                </p>
                
                <p className="text-xl md:text-2xl font-semibold text-[#eeba2b] dark:text-[#F5C94D]">
                  Welcome to a family with a good heart.
                </p>

                <div>
                  <Button
                    asChild
                  className="inline-flex items-center justify-center bg-[#0097b2] text-[#FCFAEF] hover:bg-[#0097b2]/85 px-10 py-7 rounded-half text-lg md:text-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
                  >
                    <Link href="/about">Our Story</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 