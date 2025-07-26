"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MissionSection() {
  return (
    <section id="mission" className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#007A73]/10 dark:bg-[#007A73]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C37B1E]/10 dark:bg-[#C37B1E]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="lg:col-span-7 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="max-w-3xl">
              <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
                OUR MISSION
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6 leading-tight">
                Transforming Healthcare. Training Leaders. Building Trust.
              </h3>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] mb-8">
              Akomapa is a network of student-powered, faculty-supervised clinics tackling Ghana and Africa's non-communicable disease crisis through early screening, health education, and self-care support. We collaborate with communities, universities, and the Ghana Health Service to deliver free, sustainable, and community-based care—led by the future of medicine.
              </p>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] mb-8">
                Our mission is to increase access to primary care in underserved communities across Ghana 
                by training and empowering health professional students to deliver early screening, 
                education, and self-care support for non-communicable diseases (NCDs). 
                Through expert faculty supervision and deep community partnerships, our clinic addresses 
                today's public health challenges with tomorrow's leaders.
              </p>
              {/* <Button className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] px-6 py-5 h-auto text-base">
                <Link href="/about">Learn More About Us</Link>
              </Button> */}
            </div>
          </motion.div>
          
          {/* Image/Visual Element */}
          <motion.div 
            className="lg:col-span-5 relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/highlights/Akomapa-72.jpg"
                alt="Healthcare professionals training in Ghana"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#007A73]/30 to-transparent"></div>
              
              {/* Stats overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#FCFAEF]/90 dark:bg-[#1C1F1E]/90 p-6 rounded-xl backdrop-blur-sm max-w-xs">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-[#007A73] dark:text-[#63B0AC]">80%</span>
                      <span className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">of NCDs are preventable</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-[#C37B1E] dark:text-[#F3C677]">500+</span>
                      <span className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">Students trained</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-[#C37B1E] dark:text-[#F3C677]">20+</span>
                      <span className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">Communities served</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-[#007A73] dark:text-[#63B0AC]">5,000+</span>
                      <span className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">Patients screened</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}