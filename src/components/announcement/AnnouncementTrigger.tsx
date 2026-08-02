"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOTION_EASE, motionDurations } from "@/lib/motion/tokens";
import { useAnnouncements } from "@/components/announcement/AnnouncementProvider";

const TIP_DISMISSED_SESSION_KEY = "akomapa-announcement-tip-dismissed";
const TIP_REVEAL_DELAY_MS = 2000;

/**
 * Floating announcement entry point (bottom-right, chatbot-style).
 * Stays fixed on scroll so users can reopen announcements from any page.
 *
 * The "nudge" tip resurfaces once per browser session for every visitor
 * (new and returning). Dismissing it — or opening the modal — silences it
 * for the rest of the session; it can reappear on the next visit.
 */
export default function AnnouncementTrigger() {
  const { openAnnouncements, hasUnseenAnnouncements, isOpen } = useAnnouncements();
  const [tipDismissed, setTipDismissed] = useState(true);
  const [revealReady, setRevealReady] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(TIP_DISMISSED_SESSION_KEY) === "1";
    } catch {
      dismissed = false;
    }
    setTipDismissed(dismissed);
    if (dismissed) return;

    const timer = setTimeout(() => setRevealReady(true), TIP_REVEAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismissTipForSession = useCallback(() => {
    setTipDismissed(true);
    try {
      sessionStorage.setItem(TIP_DISMISSED_SESSION_KEY, "1");
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  // Opening the modal (via bell, tip, or first-visit auto-open) silences the
  // tip for the rest of the session so it doesn't bounce back on close.
  useEffect(() => {
    if (isOpen) dismissTipForSession();
  }, [isOpen, dismissTipForSession]);

  const showTip = revealReady && !isOpen && !tipDismissed;
  const label = hasUnseenAnnouncements ? "View new announcements" : "View announcements";

  return (
    <div
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
      data-testid="announcement-trigger-group"
    >
      <AnimatePresence>
        {showTip && (
          <motion.div
            key="announcement-tip"
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: motionDurations.enter, ease: [...MOTION_EASE] }}
            className="relative max-w-[min(17rem,calc(100vw-2rem))]"
            data-testid="announcement-trigger-tip"
          >
            <div className="relative rounded-md border border-[#1C1F1E]/10 bg-[#FCFAEF] p-3 pr-9 shadow-sm dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E]">
              <button
                type="button"
                onClick={openAnnouncements}
                className="flex w-full items-start gap-3 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#0097b2]/30 bg-white text-[#0097b2] dark:border-[#66C4DC]/40 dark:bg-[#121514] dark:text-[#66C4DC]">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-subheading text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#0F4C5C] dark:text-[#66C4DC]">
                    Updates
                  </span>
                  <span className="font-heading text-sm font-semibold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF]">
                    What&apos;s new at Akomapa
                  </span>
                  <span className="text-xs leading-snug text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                    See our latest updates and milestones.
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={dismissTipForSession}
                className="absolute right-1.5 top-1.5 inline-flex h-8 w-8 items-center justify-center rounded-md text-[#2F3332]/50 transition-colors hover:bg-[#eeba2b]/25 hover:text-[#1C1F1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] dark:text-[#E6E7E7]/60 dark:hover:bg-[#0F4C5C] dark:hover:text-[#FCFAEF]"
                aria-label="Dismiss update tip"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        data-testid="announcement-trigger"
        onClick={openAnnouncements}
        aria-label={label}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-full",
          "bg-[#0097b2] text-[#FCFAEF] shadow-sm",
          "transition-colors duration-200 hover:bg-[#eeba2b] hover:text-[#1C1F1E]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2",
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
