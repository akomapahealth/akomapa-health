"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "@/components/common/Image";
import { cn } from "@/lib/utils";
import { MOTION_EASE } from "@/lib/motion/tokens";
import type { HubVolunteerPortrait } from "@/lib/types";

const featurePortraitIndexes = new Set([0, 11, 24, 35]);
const landscapePortraitIndexes = new Set([5, 18, 29]);
const initialPortraitCount = 8;
const portraitBatchSize = 8;
const volunteerTribute =
  "We honor every volunteer whose hard work and care keep our community hub running.";

function getPortraitLayout(index: number): string {
  if (featurePortraitIndexes.has(index)) {
    return "col-span-2 row-span-3";
  }

  if (landscapePortraitIndexes.has(index)) {
    return "col-span-2 row-span-2";
  }

  return "col-span-1 row-span-2";
}

type VolunteerPortraitGridProps = {
  hubName: string;
  portraits: HubVolunteerPortrait[];
};

export default function VolunteerPortraitGrid({
  hubName,
  portraits,
}: VolunteerPortraitGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialPortraitCount);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const displayedPortraits = portraits.slice(0, visibleCount);
  const selectedPortrait =
    selectedIndex === null ? null : portraits[selectedIndex];
  const selectedPosition = selectedIndex === null ? 0 : selectedIndex + 1;
  const hasMultiplePortraits = portraits.length > 1;
  const remainingCount = Math.max(portraits.length - visibleCount, 0);

  function openPortrait(index: number) {
    setSelectedIndex(index);
    setIsDialogOpen(true);
  }

  function selectPreviousPortrait() {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) return null;
      return (currentIndex - 1 + portraits.length) % portraits.length;
    });
  }

  function selectNextPortrait() {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) return null;
      return (currentIndex + 1) % portraits.length;
    });
  }

  return (
    <>
      <motion.ul
        data-hub-volunteer-grid
        className="mt-12 grid auto-rows-[7.5rem] grid-cols-2 grid-flow-dense gap-3 motion-reduce:!transform-none motion-reduce:!opacity-100 sm:auto-rows-[9rem] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[10.5rem] lg:grid-cols-4"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [...MOTION_EASE] }}
        viewport={{ once: true, amount: 0.04 }}
      >
        {displayedPortraits.map((portrait, index) => {
          const isFeatured = featurePortraitIndexes.has(index);

          return (
            <li
              key={portrait.id}
              className={cn("min-w-0", getPortraitLayout(index))}
            >
              <button
                type="button"
                data-volunteer-portrait-trigger={portrait.id}
                aria-label={`View volunteer portrait ${index + 1} of ${portraits.length}`}
                onClick={() => openPortrait(index)}
                className="group relative h-full w-full overflow-hidden rounded-md border border-[#FCFAEF]/20 bg-[#0F4C5C] text-left shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#F5C94D]/80 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C94D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0F4C5C] motion-reduce:hover:translate-y-0 motion-reduce:transition-none"
              >
                <Image
                  src={portrait.image}
                  alt={portrait.alt}
                  fill
                  sizes={
                    isFeatured
                      ? "(min-width: 1280px) 584px, (min-width: 1024px) 50vw, (min-width: 640px) 66vw, 100vw"
                      : "(min-width: 1280px) 288px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  }
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] motion-reduce:group-hover:scale-100 motion-reduce:transition-none"
                  style={{ objectPosition: portrait.objectPosition ?? "center" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#121514]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                />
                <span className="sr-only">Open volunteer portrait</span>
              </button>
            </li>
          );
        })}
      </motion.ul>

      {remainingCount > 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((currentCount) =>
                Math.min(currentCount + portraitBatchSize, portraits.length),
              )
            }
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#FCFAEF]/60 px-6 text-sm font-semibold text-[#FCFAEF] transition-colors hover:border-[#F5C94D] hover:bg-[#F5C94D] hover:text-[#1C1F1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C94D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0F4C5C] motion-reduce:transition-none"
          >
            Load more volunteers
          </button>
          <p className="text-sm text-[#FCFAEF]/70" aria-live="polite">
            Showing {displayedPortraits.length} of {portraits.length} portraits
          </p>
        </div>
      ) : (
        <p className="mt-8 text-center text-sm text-[#FCFAEF]/70" aria-live="polite">
          Showing all {portraits.length} portraits
        </p>
      )}

      <Transition show={isDialogOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsDialogOpen(false)}
          onKeyDown={(event) => {
            if (!hasMultiplePortraits) return;
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              selectPreviousPortrait();
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              selectNextPortrait();
            }
          }}
          className="fixed inset-0 z-[70]"
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200 motion-reduce:transition-none"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150 motion-reduce:transition-none"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop
              data-testid="volunteer-dialog-backdrop"
              className="fixed inset-0 bg-[#121514]/85 backdrop-blur-sm"
            />
          </TransitionChild>

          <div className="fixed inset-0 z-[70] w-screen overflow-y-auto p-4 sm:p-6">
            <div className="flex min-h-full items-center justify-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-200 motion-reduce:transition-none motion-reduce:transform-none"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-150 motion-reduce:transition-none motion-reduce:transform-none"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                <DialogPanel
                  className="relative w-full max-w-3xl overflow-hidden rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-2xl dark:bg-[#1C1F1E] dark:text-[#FCFAEF]"
                >
                  {selectedPortrait ? (
                    <>
                      <button
                        type="button"
                        data-autofocus
                        onClick={() => setIsDialogOpen(false)}
                        aria-label="Close volunteer portrait"
                        className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-md transition-colors hover:bg-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] focus-visible:ring-offset-2 dark:bg-[#1C1F1E] dark:text-[#FCFAEF] dark:hover:bg-[#0F4C5C] dark:focus-visible:ring-[#F5C94D]"
                      >
                        <X className="h-5 w-5" aria-hidden="true" />
                      </button>

                      <div className="grid md:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)]">
                        <div className="relative aspect-[4/5] min-h-0 bg-[#0F4C5C] md:aspect-auto md:min-h-[34rem]">
                          <Image
                            src={selectedPortrait.image}
                            alt={selectedPortrait.alt}
                            fill
                            sizes="(min-width: 768px) 60vw, 100vw"
                            className="object-cover"
                            style={{
                              objectPosition:
                                selectedPortrait.objectPosition ?? "center",
                            }}
                          />

                          {hasMultiplePortraits ? (
                            <div className="absolute inset-x-3 top-1/2 z-10 flex -translate-y-1/2 justify-between">
                              <button
                                type="button"
                                onClick={selectPreviousPortrait}
                                aria-label="View previous volunteer portrait"
                                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#121514]/75 text-[#FCFAEF] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#F5C94D] hover:text-[#1C1F1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C94D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121514] motion-reduce:transition-none"
                              >
                                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                onClick={selectNextPortrait}
                                aria-label="View next volunteer portrait"
                                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#121514]/75 text-[#FCFAEF] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#F5C94D] hover:text-[#1C1F1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C94D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121514] motion-reduce:transition-none"
                              >
                                <ChevronRight className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          ) : null}
                        </div>

                        <div className="flex flex-col justify-end p-6 sm:p-8 md:p-9">
                          <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
                            {hubName}
                          </p>
                          <DialogTitle className="mt-3 pr-10 font-heading text-2xl font-semibold leading-tight">
                            Our Volunteer Community
                          </DialogTitle>
                          <DialogDescription className="mt-4 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                            {volunteerTribute}
                          </DialogDescription>
                          <p className="sr-only" aria-live="polite">
                            Portrait {selectedPosition} of {portraits.length}
                          </p>
                          {hasMultiplePortraits ? (
                            <p className="mt-6 border-t border-[#1C1F1E]/15 pt-4 text-xs leading-relaxed text-[#2F3332]/65 dark:border-[#FCFAEF]/20 dark:text-[#E6E7E7]/65">
                              Use the previous and next buttons or the Left and Right arrow keys to browse.
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </>
                  ) : null}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
