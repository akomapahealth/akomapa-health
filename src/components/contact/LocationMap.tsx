"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MapPin } from "lucide-react";
import {
  EditorialArrow,
  editorialButtonClassName,
} from "@/components/shared/EditorialPrimitives";
import { CONTACT, getContactOffice } from "@/config/contact";
import { MOTION_EASE, motionDurations } from "@/lib/motion/tokens";

type MapStatus = "idle" | "loading" | "loaded";

/**
 * Click-to-load office map. Until the visitor chooses "Show map", nothing is
 * requested from Google, so no third-party cookies or device data are shared
 * just by visiting the Contact page. The choice is not stored.
 */
export default function LocationMap() {
  const [status, setStatus] = useState<MapStatus>("idle");
  const frameRef = useRef<HTMLIFrameElement>(null);
  const noteId = useId();
  const office = getContactOffice(CONTACT.map.officeId);

  // The button that was focused disappears, so hand focus to the new frame.
  useEffect(() => {
    if (status === "loading") frameRef.current?.focus();
  }, [status]);

  return (
    <figure className="flex h-full flex-col bg-white dark:bg-[#1C1F1E]">
      <figcaption className="border-b border-[#1C1F1E]/10 px-4 py-3 font-heading text-sm font-semibold text-[#1C1F1E] dark:border-[#FCFAEF]/15 dark:text-[#FCFAEF] sm:px-5 sm:text-base">
        {CONTACT.map.label}
      </figcaption>

      <div className="relative min-h-0 flex-1">
        {status === "idle" ? (
          <div className="absolute inset-0 overflow-y-auto overscroll-contain">
            <MapGrid />
            <div className="relative flex min-h-full flex-col items-center justify-center gap-3 px-4 py-4 text-center sm:gap-4 sm:px-8 sm:py-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0097b2]/10 text-[#0F4C5C] ring-1 ring-[#0097b2]/25 dark:bg-[#66C4DC]/10 dark:text-[#66C4DC] dark:ring-[#66C4DC]/30">
                  <MapPin aria-hidden="true" className="size-4" strokeWidth={1.75} />
                </span>
                <p className="font-heading text-base font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {office.label}
                </p>
              </div>
              <address className="max-w-sm text-pretty text-sm not-italic leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                {office.addressLines.join(", ")}
              </address>

              <div className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-1">
                <button
                  type="button"
                  onClick={() => setStatus("loading")}
                  aria-describedby={noteId}
                  className={editorialButtonClassName("solid", "w-full min-[400px]:w-auto")}
                >
                  {/* <button> ignores font utilities (global reset, #311). */}
                  <span className="font-body text-sm font-semibold md:text-base">
                    Show map
                  </span>
                </button>
                <a
                  href={CONTACT.map.openUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0097b2] transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC] dark:hover:text-[#F5C94D]"
                >
                  Open in Google Maps{" "}
                  <span className="sr-only">(opens in a new tab)</span>
                  <EditorialArrow className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>

              <p
                id={noteId}
                className="max-w-sm text-pretty text-xs leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75"
              >
                {CONTACT.map.consentNote}
              </p>
            </div>
          </div>
        ) : (
          <>
            <motion.iframe
              ref={frameRef}
              src={CONTACT.map.embedUrl}
              title={CONTACT.map.title}
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setStatus("loaded")}
              initial={{ opacity: 0 }}
              animate={{ opacity: status === "loaded" ? 1 : 0 }}
              transition={{ duration: motionDurations.enter, ease: [...MOTION_EASE] }}
            />
            <AnimatePresence>
              {status === "loading" ? (
                <motion.div
                  key="map-loading"
                  role="status"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: motionDurations.enter, ease: [...MOTION_EASE] }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 text-sm font-medium text-[#2F3332]/80 dark:text-[#E6E7E7]/80"
                >
                  <Loader2
                    aria-hidden="true"
                    className="size-4 animate-spin motion-reduce:animate-none"
                  />
                  Loading map…
                </motion.div>
              ) : null}
            </AnimatePresence>
          </>
        )}
      </div>
    </figure>
  );
}

/** Flat street-grid texture so the placeholder reads as a map, offline. */
function MapGrid() {
  const patternId = useId();

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-[#0097b2]/10 dark:text-[#66C4DC]/10"
    >
      <defs>
        <pattern id={patternId} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
