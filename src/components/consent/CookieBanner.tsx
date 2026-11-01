"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MOTION_EASE, motionDurations } from "@/lib/motion/tokens";
import { useCookieConsent } from "@/components/consent/ConsentProvider";
import {
  consentBodyClassName,
  consentButtonLabelClassName,
  consentChoiceButtonClassName,
  consentEyebrowClassName,
  consentSurfaceClassName,
  consentTextButtonClassName,
  consentTextButtonLabelClassName,
} from "@/components/consent/styles";

type BannerPhase = "hidden" | "prompt" | "confirmed";

/**
 * First-visit cookie choice. Non-modal: it never traps or steals focus while
 * prompting, and it sits first in the DOM so keyboard and screen-reader users
 * reach it before page content, while staying pinned to the bottom visually.
 *
 * After a choice it swaps to a short confirmation (GOV.UK pattern) and moves
 * focus there, so focus is not lost when the buttons disappear.
 */
export default function CookieBanner() {
  const {
    status,
    analytics,
    hasChosenInThisTab,
    acceptOptional,
    rejectOptional,
    openSettings,
    isSettingsOpen,
  } = useCookieConsent();
  const [phase, setPhase] = useState<BannerPhase>("hidden");
  const confirmationRef = useRef<HTMLDivElement>(null);
  const shouldFocusConfirmationRef = useRef(false);
  const pathname = usePathname();
  const lastPathnameRef = useRef(pathname);
  const headingId = useId();

  useEffect(() => {
    if (status === "undecided") {
      setPhase("prompt");
    } else if (status === "decided") {
      // A choice from another tab just retires the prompt; only a choice made
      // here earns the confirmation (and its focus move).
      const next = hasChosenInThisTab ? "confirmed" : "hidden";
      shouldFocusConfirmationRef.current = hasChosenInThisTab;
      setPhase((current) => (current === "prompt" ? next : current));
    }
  }, [status, hasChosenInThisTab]);

  // Move focus once, after the settings dialog (if open) has closed. Later
  // dialog openings must keep their own focus return.
  useEffect(() => {
    if (phase !== "confirmed" || isSettingsOpen) return;
    if (!shouldFocusConfirmationRef.current) return;
    shouldFocusConfirmationRef.current = false;
    confirmationRef.current?.focus();
  }, [phase, isSettingsOpen]);

  // The confirmation is transient: leaving the page dismisses it.
  useEffect(() => {
    if (lastPathnameRef.current === pathname) return;
    lastPathnameRef.current = pathname;
    setPhase((current) => (current === "confirmed" ? "hidden" : current));
  }, [pathname]);

  return (
    <AnimatePresence>
      {phase !== "hidden" ? (
        <motion.section
          key="cookie-banner"
          aria-labelledby={headingId}
          data-cookie-banner
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: motionDurations.enter, ease: [...MOTION_EASE] }}
          className={cn(
            consentSurfaceClassName,
            // Height stays below the sticky header (~4.5rem) on short screens.
            "fixed inset-x-0 bottom-0 z-[45] max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-x-0 border-b-0",
            "px-4 pt-5 pb-[max(1rem,calc(0.75rem+env(safe-area-inset-bottom)))]",
            "sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-h-[calc(100dvh-6rem)] sm:w-[min(32rem,calc(100vw-2rem))] sm:rounded-lg sm:border sm:p-6 lg:left-6",
          )}
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-1 w-16 bg-[#eeba2b] sm:left-6 sm:w-20 sm:rounded-b-full dark:bg-[#F5C94D]"
          />

          {phase === "prompt" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className={consentEyebrowClassName}>Cookie choices</p>
                <h2
                  id={headingId}
                  className="font-heading text-lg font-semibold leading-snug text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-xl"
                >
                  Can we use optional analytics cookies?
                </h2>
                <p className={consentBodyClassName}>
                  We use necessary storage to keep this site working. With your
                  permission, Google Analytics cookies would help us understand
                  which pages are useful. We don&apos;t use advertising cookies.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={acceptOptional}
                  className={consentChoiceButtonClassName}
                >
                  <span className={consentButtonLabelClassName}>
                    Accept optional cookies
                  </span>
                </button>
                <button
                  type="button"
                  onClick={rejectOptional}
                  className={consentChoiceButtonClassName}
                >
                  <span className={consentButtonLabelClassName}>
                    Reject optional cookies
                  </span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={openSettings}
                  className={consentTextButtonClassName}
                >
                  <span className={consentTextButtonLabelClassName}>
                    Cookie settings
                  </span>
                </button>
                <Link href="/cookie-policy" className={consentTextButtonClassName}>
                  Cookie Policy
                </Link>
              </div>
            </div>
          ) : (
            <div
              ref={confirmationRef}
              tabIndex={-1}
              className="space-y-4 rounded-sm focus:outline-none"
            >
              <div className="space-y-2">
                <h2
                  id={headingId}
                  className="font-heading text-lg font-semibold leading-snug text-[#1C1F1E] dark:text-[#FCFAEF]"
                >
                  {analytics
                    ? "You've accepted optional cookies."
                    : "You've rejected optional cookies."}
                </h2>
                <p className={consentBodyClassName}>
                  You can change your choice at any time from{" "}
                  <strong className="font-semibold">Cookie settings</strong> in
                  the footer.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPhase("hidden")}
                className={cn(consentChoiceButtonClassName, "sm:w-auto")}
              >
                <span className={consentButtonLabelClassName}>
                  Hide this message
                </span>
              </button>
            </div>
          )}
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
