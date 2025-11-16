"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";

export default function MissionSection() {
  return (
    <section
      id="mission"
      className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] dark:bg-[#1C1F1E] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 dark:bg-[#0097b2]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 dark:bg-[#eeba2b]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 lg:gap-16 items-start lg:items-center">
          {/* Text Content */}
          <motion.div
            className="lg:col-span-7 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="w-full max-w-3xl h-full flex flex-col justify-center text-[#FCFAEF] space-y-6 md:space-y-8 lg:space-y-10">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                Transforming Healthcare. Training Leaders. Building Trust.
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-[#FCFAEF]/90">
                Akomapa is a global network of student-powered, expert-supervised initiatives transforming
                how communities access and sustain primary care. We partner with universities, communities,
                and governments around the world to create new community-based care models, train emerging
                health leaders, and build a connected network that fosters reciprocal innovation,
                peer-to-peer learning, and global immersion. Together, we are redefining preventative care—and
                proving that when students lead with heart, the world’s health systems can change for good.
              </p>
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
            <div className="relative h-[600px] md:h-[700px] lg:h-[750px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/highlights/Akomapa-72.jpg"
                alt="Healthcare professionals training in Ghana"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}