"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "@/components/common/Image";
import { TAG_COLORS } from "@/data/announcement-colors";
import type { Announcement } from "@/lib/types";

export function AnnouncementCard({ item }: { item: Announcement }) {
  const isExternal = item.isExternal && item.ctaLink;

  const cardContent = (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "bg-white dark:bg-[#2F3332]",
        "border border-black/[0.04] dark:border-white/[0.06]",
        "shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]",
        "dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)]",
        "h-full"
      )}
    >
      {/* Image */}
      {item.image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />

          {/* Gradient overlay for tag readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />

          {/* Tag badge on image */}
          {item.tag && (
            <span
              className={cn(
                "absolute top-3 left-3 inline-block rounded-full px-3 py-1",
                "text-[11px] font-bold uppercase tracking-wider",
                "backdrop-blur-md shadow-sm",
                TAG_COLORS[item.tagColor ?? "lapis"]
              )}
            >
              {item.tag}
            </span>
          )}
        </div>
      )}

      {/* Tag badge without image */}
      {!item.image && item.tag && (
        <div className="px-5 pt-5 sm:px-6 sm:pt-6">
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1",
              "text-[11px] font-bold uppercase tracking-wider",
              TAG_COLORS[item.tagColor ?? "lapis"]
            )}
          >
            {item.tag}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h4 className="font-heading text-lg font-bold leading-snug text-[#1C1F1E] dark:text-[#FCFAEF] line-clamp-2 mb-2">
          {item.title}
        </h4>

        <p className="text-sm leading-relaxed text-[#2F3332]/70 dark:text-[#E6E7E7]/60 line-clamp-3 mb-4 flex-1">
          {item.description}
        </p>

        {/* CTA */}
        {item.ctaText && item.ctaLink && (
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-semibold",
              "text-[#0097b2] dark:text-[#66C4DC]",
              "transition-colors duration-200",
              "group-hover:text-[#005A55] dark:group-hover:text-[#eeba2b]"
            )}
          >
            {item.ctaText}
            {isExternal ? (
              <ExternalLink className="h-3.5 w-3.5" />
            ) : (
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            )}
          </span>
        )}
      </div>
    </article>
  );

  if (!item.ctaLink) return cardContent;

  if (isExternal) {
    return (
      <a
        href={item.ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="contents"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={item.ctaLink} className="contents">
      {cardContent}
    </Link>
  );
}
