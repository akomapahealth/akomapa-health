"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnnouncements } from "@/components/announcement/AnnouncementProvider";

/**
 * User-triggered entry point for announcements. Hidden on the homepage where
 * the hero carousel already surfaces the same campaign slides.
 */
export default function AnnouncementTrigger({
  className,
  showLabel = false,
  compact = false,
}: {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}) {
  const pathname = usePathname();
  const { openAnnouncements, hasUnseenAnnouncements } = useAnnouncements();

  if (pathname === "/") return null;

  const label = hasUnseenAnnouncements ? "New announcements" : "Announcements";

  return (
    <button
      type="button"
      data-testid="announcement-trigger"
      onClick={openAnnouncements}
      className={cn(
        "relative inline-flex items-center justify-center rounded-md",
        compact ? "p-1.5" : "p-2",
        "text-[#2F3332] dark:text-[#FCFAEF]",
        "hover:text-[#eeba2b] hover:bg-[#eeba2b]/10 dark:hover:bg-[#eeba2b]/20",
        "focus:outline-none focus:ring-2 focus:ring-[#0097b2] focus:ring-offset-2",
        className
      )}
      aria-label={showLabel ? undefined : label}
    >
      <Bell
        className={cn("shrink-0", compact ? "h-4 w-4" : "h-5 w-5")}
        aria-hidden="true"
      />
      {showLabel ? <span className="ml-3">{label}</span> : null}
      {hasUnseenAnnouncements && (
        <span
          className={cn(
            "absolute h-2 w-2 rounded-full bg-[#0097b2] ring-2 ring-[#FCFAEF] dark:ring-[#121514]",
            showLabel ? "top-3 right-3" : compact ? "top-1 right-1" : "top-1.5 right-1.5"
          )}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
