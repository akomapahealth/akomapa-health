"use client";

import { motion } from "framer-motion";
import { PenLine } from "lucide-react";

type BlogHeroProps = {
  postCount: number;
};

/**
 * Gradient hero for the Thought Leadership listing page. Mirrors the news
 * hero's decorative-blur treatment while keeping an editorial, text-led layout.
 */
export function BlogHero({ postCount }: BlogHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0097b2] via-[#0A6B7A] to-[#0F4C5C] py-16 sm:py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-[#eeba2b]/15 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-40 w-40 rounded-full bg-[#F5C94D]/15 blur-2xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#eeba2b]/30 bg-[#eeba2b]/20 px-4 py-2"
          >
            <PenLine className="h-4 w-4 text-[#eeba2b]" />
            <span className="text-sm font-medium text-[#eeba2b]">
              {postCount} {postCount === 1 ? "story" : "stories"} and counting
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 font-heading text-4xl font-bold leading-tight text-[#FCFAEF] sm:text-5xl md:text-6xl"
          >
            Thought{" "}
            <span className="text-[#eeba2b]">Leadership</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-base font-light leading-relaxed text-[#FCFAEF]/85 sm:text-lg md:text-xl"
          >
            Student essays, faculty reflections, and community voices on ethical
            global health, community partnership, and the future of care.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
