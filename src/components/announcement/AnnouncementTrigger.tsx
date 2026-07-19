"use client";

import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnnouncements } from "@/components/announcement/AnnouncementProvider";

const TIP_DISMISSED_SESSION_KEY = "akomapa-announcement-tip-dismissed";

/**
 * Floating announcement entry point (bottom-right, chatbot-style).
 * Stays fixed on scroll so users can reopen announcements from any page.
 */
export default function AnnouncementTrigger() {
  const { openAnnouncements, hasUnseenAnnouncements, isOpen } = useAnnouncements();
  const [tipDismissed, setTipDismissed] = useState(true);

  useEffect(() => {
    try {
      setTipDismissed(sessionStorage.getItem(TIP_DISMISSED_SESSION_KEY) === "1");
    } catch {
      setTipDismissed(false);
    }
  }, []);

  const showTip = hasUnseenAnnouncements && !isOpen && !tipDismissed;
  const label = hasUnseenAnnouncements ? "View new announcements" : "View announcements";

  const dismissTip = () => {
    setTipDismissed(true);
    try {
      sessionStorage.setItem(TIP_DISMISSED_SESSION_KEY, "1");
    } catch {
      // sessionStorage unavailable
    }
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
      data-testid="announcement-trigger-group"
    >
      {showTip && (
        <div
          className="relative max-w-[min(16rem,calc(100vw-2rem))]"
          data-testid="announcement-trigger-tip"
        >
          <div className="relative rounded-2xl bg-[#FCFAEF] px-3.5 py-2.5 pr-8 text-sm font-medium text-[#1C1F1E] shadow-lg ring-1 ring-[#0097b2]/20 dark:bg-[#2F3332] dark:text-[#FCFAEF] dark:ring-[#66C4DC]/30">
            <button
              type="button"
              onClick={openAnnouncements}
              className="text-left leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2"
            >
              See latest updates
            </button>
            <button
              type="button"
              onClick={dismissTip}
              className="absolute right-1.5 top-1.5 rounded-full p-1 text-[#2F3332]/70 transition-colors hover:bg-[#0097b2]/10 hover:text-[#1C1F1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] dark:text-[#E6E7E7]/80 dark:hover:text-[#FCFAEF]"
              aria-label="Dismiss update tip"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            {/* Bubble tail pointing at the bell */}
            <span
              className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-[#FCFAEF] ring-1 ring-[#0097b2]/20 dark:bg-[#2F3332] dark:ring-[#66C4DC]/30"
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      <button
        type="button"
        data-testid="announcement-trigger"
        onClick={openAnnouncements}
        aria-label={label}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-full",
          "bg-[#0097b2] text-[#FCFAEF] shadow-lg",
          "transition-transform duration-200 hover:scale-105 hover:bg-[#005A55]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2",
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
    </div>
  );
}
