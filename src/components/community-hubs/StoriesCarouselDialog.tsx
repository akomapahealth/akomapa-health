"use client";

import { Fragment, useCallback, useEffect, useId, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Story } from "@/lib/types";

type StoriesCarouselDialogProps = {
  stories: Story[];
  /** Index of the story to show when open; null keeps the dialog closed. */
  openIndex: number | null;
  onClose: () => void;
  /** Accessible label prefix, e.g. "Community Stories". */
  label: string;
  tone?: "amber" | "teal";
};

const toneClasses = {
  amber: {
    eyebrow: "text-[#0F4C5C] dark:text-[#66C4DC]",
    ring: "focus-visible:ring-[#eeba2b]",
  },
  teal: {
    eyebrow: "text-[#0097b2] dark:text-[#66C4DC]",
    ring: "focus-visible:ring-[#F5C94D]",
  },
} as const;

/**
 * Reusable story reader: one story at a time with previous/next controls.
 * Mirrors HubLeaderDialog Headless UI focus-trap / ESC / click-outside behavior.
 */
export default function StoriesCarouselDialog({
  stories,
  openIndex,
  onClose,
  label,
  tone = "amber",
}: StoriesCarouselDialogProps) {
  const accents = toneClasses[tone];
  const titleId = useId();
  const isOpen = openIndex !== null && stories.length > 0;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (openIndex === null || stories.length === 0) {
      return;
    }
    const nextIndex =
      ((openIndex % stories.length) + stories.length) % stories.length;
    setActiveIndex(nextIndex);
  }, [openIndex, stories.length]);

  const goTo = useCallback(
    (direction: -1 | 1) => {
      if (stories.length === 0) return;
      setActiveIndex(
        (current) => (current + direction + stories.length) % stories.length,
      );
    },
    [stories.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, isOpen]);

  if (stories.length === 0) {
    return null;
  }

  const story = stories[activeIndex] ?? stories[0];
  const paragraphs = story.content
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        className="fixed inset-0 z-50"
        onClose={onClose}
        data-stories-carousel-dialog={label}
        aria-labelledby={titleId}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200 motion-reduce:!opacity-100 motion-reduce:transition-none"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150 motion-reduce:transition-none"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-[#121514]/75"
            data-testid="stories-carousel-backdrop"
          />
        </TransitionChild>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200 motion-reduce:!opacity-100 motion-reduce:transition-none motion-reduce:transform-none"
              enterFrom="opacity-0 translate-y-3"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-150 motion-reduce:transition-none motion-reduce:transform-none"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-3"
            >
              <DialogPanel className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-2xl dark:bg-[#1C1F1E] dark:text-[#FCFAEF]">
                <div className="flex items-start justify-between gap-4 border-b border-[#1C1F1E]/12 p-6 dark:border-[#FCFAEF]/15 sm:p-8">
                  <div className="min-w-0 pr-2">
                    <p
                      className={`font-subheading text-xs font-bold uppercase tracking-[0.16em] ${accents.eyebrow}`}
                    >
                      {story.role}
                    </p>
                    <DialogTitle
                      id={titleId}
                      as="h2"
                      className="mt-2 font-heading text-2xl font-semibold leading-tight sm:text-[1.75rem]"
                    >
                      {story.title}
                    </DialogTitle>
                    <p className="mt-2 text-sm font-semibold text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                      {story.author}
                    </p>
                    <p
                      className="mt-1 text-xs font-medium text-[#2F3332]/55 dark:text-[#E6E7E7]/55"
                      aria-live="polite"
                    >
                      Story {activeIndex + 1} of {stories.length}
                      <span className="sr-only">: {story.title}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={`Close ${label}`}
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-sm transition-colors hover:bg-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 ${accents.ring} focus-visible:ring-offset-2 dark:bg-[#1C1F1E] dark:text-[#FCFAEF] dark:hover:bg-[#0F4C5C]`}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="max-h-[calc(100vh-16rem)] overflow-y-auto p-6 sm:p-8">
                  <div className="space-y-5">
                    {paragraphs.map((paragraph) => (
                      <p
                        key={`${story.id}-${paragraph.slice(0, 24)}`}
                        className="max-w-[65ch] text-base leading-8 text-[#2F3332]/85 dark:text-[#E6E7E7]/85"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1C1F1E]/12 p-4 dark:border-[#FCFAEF]/15 sm:p-5">
                  <button
                    type="button"
                    onClick={() => goTo(-1)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-md border border-[#0F4C5C] px-4 py-2 text-sm font-semibold text-[#0F4C5C] transition-colors hover:bg-[#0F4C5C] hover:text-[#FCFAEF] focus-visible:outline-none focus-visible:ring-2 ${accents.ring} focus-visible:ring-offset-2 dark:border-[#66C4DC] dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#1C1F1E]`}
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Previous story
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-md border border-[#0F4C5C] px-4 py-2 text-sm font-semibold text-[#0F4C5C] transition-colors hover:bg-[#0F4C5C] hover:text-[#FCFAEF] focus-visible:outline-none focus-visible:ring-2 ${accents.ring} focus-visible:ring-offset-2 dark:border-[#66C4DC] dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#1C1F1E]`}
                  >
                    Next story
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
