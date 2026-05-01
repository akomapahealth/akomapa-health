"use client";

import { useState } from "react";
import Image from "@/components/common/Image";
import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { motionDurations } from "@/lib/motion/tokens";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import { AnnouncementCard } from "@/components/common/AnnouncementCard";
import { getAllNewsItems, newsItemToAnnouncement } from "@/data/unified-news";
import { cn } from "@/lib/utils";

const allItems = getAllNewsItems();

const categories = [
  "All",
  ...Array.from(new Set(allItems.map((item) => item.category))),
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      <div className="flex flex-col gap-y-section-mobile md:gap-y-section-tablet lg:gap-y-section-desktop">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] overflow-hidden">
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
                <Megaphone className="w-4 h-4 text-[#eeba2b]" />
                <span className="text-sm font-medium text-[#eeba2b]">
                  Updates & Announcements
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#FCFAEF] mb-6 leading-tight"
              >
                News from the{" "}
                <span className="text-[#eeba2b] font-medium">frontlines</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
                className="text-base sm:text-lg md:text-xl text-[#FCFAEF]/85 font-light max-w-2xl mb-8"
              >
                Awards, partnerships, program launches, and milestones — stay
                connected with everything shaping the future of student-powered
                healthcare.
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
                  <Link href="/join" className="flex items-center">
                    Get Involved
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="group border-[#FCFAEF]/30 text-[#FCFAEF] hover:bg-[#FCFAEF]/10 px-6"
                >
                  <Link href="/" className="flex items-center">
                    Back to Home
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
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 dark:bg-[#2F3332]/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0097b2]/10 flex items-center justify-center">
                        <Megaphone className="w-5 h-5 text-[#0097b2]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {allItems.length} Updates
                        </p>
                        <p className="text-xs text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                          Latest news & announcements
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Full Announcement Grid */}
        <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeIn
              className="text-center max-w-3xl mx-auto mb-10"
              duration={motionDurations.enter}
            >
              <h2 className="text-[#F5C94D] font-bold text-base sm:text-lg mb-2">
                ALL UPDATES
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Everything You Need to Know
              </h2>
              <p className="text-base sm:text-lg text-[#2F3332]/70 dark:text-[#E6E7E7]/60 leading-relaxed max-w-2xl mx-auto">
                Browse all our announcements, awards, and milestones in one
                place.
              </p>
            </FadeIn>

            {/* Category Filter Pills */}
            <FadeIn className="mb-10" duration={motionDurations.enter}>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                      activeCategory === cat
                        ? "bg-[#0097b2] text-[#FCFAEF] shadow-md"
                        : "bg-white dark:bg-[#2F3332] text-[#2F3332]/70 dark:text-[#E6E7E7]/70 border border-black/[0.06] dark:border-white/[0.08] hover:border-[#0097b2]/30 hover:text-[#0097b2] dark:hover:text-[#66C4DC]"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </FadeIn>

            <FadeInStagger
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
              staggerDelay={motionDurations.staggerContainer}
            >
              {filtered.map((item) => (
                <FadeInStaggerItem key={item.id} direction="up">
                  <AnnouncementCard item={newsItemToAnnouncement(item)} />
                </FadeInStaggerItem>
              ))}
            </FadeInStagger>

            {filtered.length === 0 && (
              <p className="text-center text-[#2F3332]/50 dark:text-[#E6E7E7]/40 mt-12">
                No updates in this category yet.
              </p>
            )}
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FCFAEF]">
                  Want to Be Part of the Story?
                </h2>
                <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed max-w-2xl mx-auto">
                  Join our movement of student leaders transforming healthcare
                  delivery in underserved communities.
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
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
