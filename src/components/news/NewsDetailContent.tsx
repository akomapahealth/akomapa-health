"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLink,
  Tag,
} from "lucide-react";
import Image from "@/components/common/Image";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { AnnouncementCard } from "@/components/common/AnnouncementCard";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
  motionDurations,
} from "@/components/animations";
import { TAG_COLORS } from "@/data/announcement-colors";
import { newsItemToAnnouncement } from "@/data/unified-news";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

interface Props {
  item: NewsItem;
  relatedItems: NewsItem[];
}

export function NewsDetailContent({ item, relatedItems }: Props) {
  const isRichContent = item.content.length > 1;

  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-br from-[#0097b2] via-[#0A6B7A] to-[#0F4C5C] overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#FCFAEF]/8 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#eeba2b]/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-[#F5C94D]/15 rounded-full blur-2xl" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-[#FCFAEF]/70 hover:text-[#FCFAEF] transition-colors mb-8 text-sm font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to News
              </Link>
            </motion.div>

            <div className="max-w-3xl">
              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <span
                  className={cn(
                    "inline-block rounded-full px-3.5 py-1.5 mb-5",
                    "text-xs font-bold uppercase tracking-wider",
                    "backdrop-blur-md shadow-sm",
                    TAG_COLORS[item.categoryColor]
                  )}
                >
                  {item.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#FCFAEF] leading-tight mb-6"
              >
                {item.title}
              </motion.h1>

              {/* Meta row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center gap-4 text-sm text-[#FCFAEF]/70"
              >
                {item.date && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(item.date)}
                  </span>
                )}
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="h-3.5 w-3.5" />
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#FCFAEF]/10 px-2.5 py-0.5 text-xs font-medium text-[#FCFAEF]/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Hero Image — overlaps hero by pulling up */}
        {item.image && (
          <section className="relative z-10 -mt-8 sm:-mt-12 md:-mt-16 mb-12 md:mb-16">
            <div className="container mx-auto px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
              >
                <div className="relative aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 56rem, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Content Body */}
        <section className="py-8 md:py-12 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              {isRichContent ? (
                <FadeIn duration={motionDurations.enter}>
                  <div className="space-y-6">
                    {item.content.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={cn(
                          "text-base sm:text-lg leading-relaxed text-[#2F3332] dark:text-[#E6E7E7]/90",
                          idx === 0 &&
                            "text-lg sm:text-xl font-medium text-[#1C1F1E] dark:text-[#FCFAEF]"
                        )}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </FadeIn>
              ) : (
                <FadeIn duration={motionDurations.enter}>
                  <div className="relative rounded-2xl bg-gradient-to-br from-[#0097b2]/5 to-[#eeba2b]/5 dark:from-[#0097b2]/10 dark:to-[#eeba2b]/10 p-8 sm:p-10 border border-[#0097b2]/10 dark:border-[#0097b2]/20">
                    <div className="absolute top-6 left-6 text-[#0097b2]/20 dark:text-[#0097b2]/30 text-6xl font-serif leading-none select-none">
                      &ldquo;
                    </div>
                    <p className="relative text-lg sm:text-xl md:text-2xl leading-relaxed text-[#1C1F1E] dark:text-[#FCFAEF] font-light pl-4 sm:pl-6">
                      {item.content[0]}
                    </p>
                  </div>
                </FadeIn>
              )}

              {/* CTA */}
              {item.ctaLink && item.ctaText && (
                <FadeIn
                  className="mt-10 sm:mt-12"
                  duration={motionDurations.enter}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {item.isExternalCta ? (
                      <Button
                        asChild
                        className="group bg-[#eeba2b] hover:bg-[#eeba2b]/90 text-[#1C1F1E] font-medium px-6"
                      >
                        <a
                          href={item.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          {item.ctaText}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button
                        asChild
                        className="group bg-[#0097b2] hover:bg-[#0097b2]/90 text-[#FCFAEF] font-medium px-6"
                      >
                        <Link
                          href={item.ctaLink}
                          className="flex items-center"
                        >
                          {item.ctaText}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </section>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <section className="py-16 md:py-24 bg-white dark:bg-[#2F3332]/30 border-t border-black/[0.04] dark:border-white/[0.04]">
            <div className="container mx-auto px-4 sm:px-6">
              <FadeIn
                className="text-center max-w-3xl mx-auto mb-12"
                duration={motionDurations.enter}
              >
                <h2 className="text-[#F5C94D] font-bold text-base sm:text-lg mb-2">
                  MORE UPDATES
                </h2>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Continue Reading
                </h3>
              </FadeIn>

              <FadeInStagger
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
                staggerDelay={motionDurations.staggerContainer}
              >
                {relatedItems.map((related) => (
                  <FadeInStaggerItem key={related.id} direction="up">
                    <AnnouncementCard
                      item={newsItemToAnnouncement(related)}
                    />
                  </FadeInStaggerItem>
                ))}
              </FadeInStagger>

              <FadeIn
                className="mt-12 text-center"
                duration={motionDurations.enter}
              >
                <Button
                  asChild
                  variant="outline"
                  className="group border-[#0097b2]/30 text-[#0097b2] hover:bg-[#0097b2] hover:text-white dark:border-[#66C4DC]/30 dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#1C1F1E] px-8 py-3 rounded-full font-semibold transition-all duration-300"
                >
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-2"
                  >
                    View All Updates
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </FadeIn>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
