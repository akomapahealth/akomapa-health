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

type StoryDialogProps = {
  story: Story;
  /** Visual accent to match the surrounding section (Community vs. Volunteer). */
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
 * Renders a single Story as a card with a "Read more" trigger that opens
 * the full content in a modal. Modal pattern mirrors HubLeaderDialog so
 * story detail and leader bio dialogs behave identically across the site
 * (focus trap, ESC-to-close, click-outside-to-close, focus return to the
 * trigger button are all handled by Headless UI's Dialog).
 *
 * NOTE (editorial integrity): Story content sourced from `communityStories`
 * / `studentStories` in src/data/community-hubs.ts for hubs without
 * verified testimonials is anonymous, editorial placeholder copy pending
 * contributor-approved stories. See the content note in that data file.
 * The disclaimer below surfaces that same fact to the reader.
 */
export default function StoryDialog({ story, tone = "amber" }: StoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const accents = toneClasses[tone];

  return (
    <>
      <article
        data-story-id={story.id}
        className="flex h-full flex-col border-t-[3px] border-t-[#0097b2] pt-4 dark:border-t-[#66C4DC]"
      >
        <p
          className={`font-subheading text-xs font-bold uppercase tracking-[0.18em] ${accents.eyebrow}`}
        >
          {story.role}
        </p>
        <h3 className="mt-3 font-heading text-xl font-semibold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF]">
          {story.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
          {story.excerpt}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#1C1F1E]/10 pt-4 text-sm dark:border-[#FCFAEF]/15">
          <div>
            <p className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
              {story.author}
            </p>
            <p className="text-[#2F3332]/60 dark:text-[#E6E7E7]/60">{story.date}</p>
          </div>
          <button
            type="button"
            data-story-read-more={story.id}
            onClick={() => setIsOpen(true)}
            aria-haspopup="dialog"
            className={`inline-flex min-h-11 shrink-0 items-center rounded-md border border-[#0F4C5C] px-4 py-2 text-sm font-semibold text-[#0F4C5C] transition-colors hover:bg-[#0F4C5C] hover:text-[#FCFAEF] focus-visible:outline-none focus-visible:ring-2 ${accents.ring} focus-visible:ring-offset-2 dark:border-[#66C4DC] dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#1C1F1E]`}
          >
            Read more
          </button>
        </div>
      </article>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          className="fixed inset-0 z-50"
          onClose={() => setIsOpen(false)}
          data-story-dialog={story.id}
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
              data-testid="story-dialog-backdrop"
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
                <DialogPanel className="relative max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-2xl dark:bg-[#1C1F1E] dark:text-[#FCFAEF] sm:max-h-[calc(100vh-3rem)]">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label={`Close story: ${story.title}`}
                    className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-sm transition-colors hover:bg-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] focus-visible:ring-offset-2 dark:bg-[#1C1F1E] dark:text-[#FCFAEF] dark:hover:bg-[#0F4C5C] dark:focus-visible:ring-[#F5C94D]"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>

                  <div className="p-6 sm:p-8 md:p-9">
                    <p
                      className={`font-subheading text-xs font-bold uppercase tracking-[0.16em] ${accents.eyebrow}`}
                    >
                      {story.role}
                    </p>
                    <DialogTitle
                      as="h2"
                      className="mt-3 pr-12 font-heading text-2xl font-semibold leading-tight sm:text-[1.75rem]"
                    >
                      {story.title}
                    </DialogTitle>
                    <p className="mt-2 text-sm font-semibold text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                      {story.author} · {story.date}
                    </p>
                    <p className="mt-6 max-w-[65ch] text-base leading-8 text-[#2F3332]/85 dark:text-[#E6E7E7]/85">
                      {story.content}
                    </p>
                    <p className="mt-8 border-t border-[#1C1F1E]/15 pt-4 text-xs italic text-[#2F3332]/55 dark:border-[#FCFAEF]/20 dark:text-[#E6E7E7]/55">
                      Anonymous editorial vignette — a placeholder story
                      shared while Akomapa collects contributor-approved
                      accounts, not a verified testimonial or direct
                      quotation.
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
