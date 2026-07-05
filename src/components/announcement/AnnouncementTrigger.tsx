"use client";

import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnnouncements } from "@/components/announcement/AnnouncementProvider";

/**
 * Floating announcement entry point (bottom-right, chatbot-style).
 * Stays fixed on scroll so users can reopen announcements from any page.
 */
export default function AnnouncementTrigger() {
  const { openAnnouncements, hasUnseenAnnouncements } = useAnnouncements();

  const label = hasUnseenAnnouncements ? "View new announcements" : "View announcements";

  return (
    <button
      type="button"
      data-testid="announcement-trigger"
      onClick={openAnnouncements}
      aria-label={label}
      className={cn(
        "fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full",
        "bg-[#0097b2] text-[#FCFAEF] shadow-lg",
        "transition-transform duration-200 hover:scale-105 hover:bg-[#005A55]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2",
        "sm:bottom-6 sm:right-6"
      )}
    >
      <Bell className="h-6 w-6 shrink-0" aria-hidden="true" />
      {hasUnseenAnnouncements && (
        <span
          className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-[#eeba2b] ring-2 ring-[#0097b2]"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
