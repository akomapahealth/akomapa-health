"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";
import type { Story } from "@/lib/types";

type MoreStoriesDialogProps = {
  /** Full list of stories to show inside the modal's scrollable pane. */
  stories: Story[];
  /** Modal heading, e.g. "More Community Stories" or "More Volunteer Stories". */
  title?: string;
  /** Text on the button that opens the modal. */
  triggerLabel?: string;
  /** Visual accent to match the surrounding section. */
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
 * A single "Read more" trigger for an entire stories section. Opens a modal
 * containing every story in `stories`, each rendered as its own div inside
 * a scrollable pane — for browsing several stories at once, as opposed to
 * StoryDialog, which opens one story's full content from its own card.
 *
 * Same Headless UI Dialog/Transition pattern as HubLeaderDialog and
 * StoryDialog, so focus trap, ESC-to-close, click-outside-to-close, and
 * focus return to the trigger all behave identically across the site.
 */
export default function MoreStoriesDialog({
  stories,
  title = "More Stories",
  triggerLabel = "Read more",
  tone = "amber",
}: MoreStoriesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const accents = toneClasses[tone];

  if (stories.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          data-more-stories-trigger
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          className={`inline-flex min-h-11 items-center rounded-md border border-[#0F4C5C] px-6 py-2.5 text-sm font-semibold text-[#0F4C5C] transition-colors hover:bg-[#0F4C5C] hover:text-[#FCFAEF] focus-visible:outline-none focus-visible:ring-2 ${accents.ring} focus-visible:ring-offset-2 dark:border-[#66C4DC] dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#1C1F1E]`}
        >
          {triggerLabel}
        </button>
      </div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          className="fixed inset-0 z-50"
          onClose={() => setIsOpen(false)}
          data-more-stories-dialog
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
              data-testid="more-stories-dialog-backdrop"
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
                    <DialogTitle
                      as="h2"
                      className="font-heading text-2xl font-semibold leading-tight sm:text-[1.75rem]"
                    >
                      {title}
                    </DialogTitle>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      aria-label={`Close ${title}`}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-sm transition-colors hover:bg-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] focus-visible:ring-offset-2 dark:bg-[#1C1F1E] dark:text-[#FCFAEF] dark:hover:bg-[#0F4C5C] dark:focus-visible:ring-[#F5C94D]"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>

                  {/*
                    Scrollable pane: each story is its own div, stacked and
                    divided, capped to a viewport-relative max height so the
                    modal itself never grows taller than the screen.
                  */}
                  <div className="max-h-[calc(100vh-14rem)] overflow-y-auto p-6 sm:p-8">
                    <div className="divide-y divide-[#1C1F1E]/10 dark:divide-[#FCFAEF]/15">
                      {stories.map((story) => (
                        <div
                          key={story.id}
                          data-story-id={story.id}
                          className="py-6 first:pt-0 last:pb-0"
                        >
                          <p
                            className={`font-subheading text-xs font-bold uppercase tracking-[0.16em] ${accents.eyebrow}`}
                          >
                            {story.role}
                          </p>
                          <h3 className="mt-2 font-heading text-lg font-semibold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF]">
                            {story.title}
                          </h3>
                          <p className="mt-1 text-sm font-semibold text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                            {story.author} · {story.date}
                          </p>
                          <p className="mt-3 max-w-[65ch] text-sm leading-7 text-[#2F3332]/85 dark:text-[#E6E7E7]/85">
                            {story.content}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p className="mt-8 border-t border-[#1C1F1E]/12 pt-4 text-xs italic text-[#2F3332]/55 dark:border-[#FCFAEF]/15 dark:text-[#E6E7E7]/55">
                      These are anonymous editorial vignettes, not verified
                      testimonials, shared as placeholders pending
                      contributor-approved stories.
                    </p>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
