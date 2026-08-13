"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Linkedin, Mail, X } from "lucide-react";
import HubPortrait from "@/components/community-hubs/HubPortrait";
import type { HubLeader } from "@/lib/types";

type HubLeaderDialogProps = {
  leader: HubLeader;
  hubName: string;
};

export default function HubLeaderDialog({
  leader,
  hubName,
}: HubLeaderDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const email = leader.contact?.email?.trim();
  const linkedin = leader.contact?.linkedin?.trim();
  const portraitAlt = `Portrait of ${leader.name}, ${leader.role} at ${hubName}`;
  const portraitSizes =
    "(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

  return (
    <>
      <article
        data-hub-leader={leader.id}
        data-hub-leader-layout="compact-modal"
        className="group flex h-full flex-col border-t-[3px] border-t-[var(--hub-people-accent,#0097b2)] pt-4"
      >
        <button
          type="button"
          data-hub-leader-portrait-trigger={leader.id}
          onClick={() => setIsOpen(true)}
          aria-label={`Open biography for ${leader.name}`}
          className="relative block w-full overflow-hidden rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-people-accent,#eeba2b)] focus-visible:ring-offset-2"
        >
          <HubPortrait
            name={leader.name}
            image={leader.image}
            alt={portraitAlt}
            sizes={portraitSizes}
          />
        </button>

        <div className="flex flex-1 flex-col pt-4">
          <p className="font-subheading text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#0F4C5C] dark:text-[#66C4DC]">
            {leader.role}
          </p>
          <h3 className="mt-2 font-heading text-lg font-semibold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF]">
            {leader.name}
          </h3>
          <p className="mt-1.5 text-sm font-medium leading-snug text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
            {leader.affiliation}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
            <button
              type="button"
              data-hub-leader-bio-trigger={leader.id}
              onClick={() => setIsOpen(true)}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#0F4C5C] px-4 py-2 text-sm font-semibold text-[#0F4C5C] transition-colors hover:bg-[#0F4C5C] hover:text-[#FCFAEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-people-accent,#eeba2b)] focus-visible:ring-offset-2 dark:border-[#66C4DC] dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#1C1F1E]"
            >
              Bio
            </button>
            {email ? (
              <Link
                href={`mailto:${email}`}
                aria-label={`Email ${leader.name}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#1C1F1E]/45 text-[#1C1F1E] transition-colors hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-people-accent,#eeba2b)] focus-visible:ring-offset-2 dark:border-[#FCFAEF]/45 dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
            {linkedin ? (
              <Link
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${leader.name} on LinkedIn`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#1C1F1E]/45 text-[#1C1F1E] transition-colors hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-people-accent,#eeba2b)] focus-visible:ring-offset-2 dark:border-[#FCFAEF]/45 dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </div>
      </article>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          className="fixed inset-0 z-50"
          onClose={() => setIsOpen(false)}
          data-hub-leader-dialog={leader.id}
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
              data-testid="hub-leader-dialog-backdrop"
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
                <DialogPanel className="relative max-h-[calc(100vh-2rem)] w-full max-w-3xl overflow-y-auto rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-2xl dark:bg-[#1C1F1E] dark:text-[#FCFAEF] sm:max-h-[calc(100vh-3rem)]">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label={`Close ${leader.name} biography`}
                    className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-sm transition-colors hover:bg-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] focus-visible:ring-offset-2 dark:bg-[#1C1F1E] dark:text-[#FCFAEF] dark:hover:bg-[#0F4C5C] dark:focus-visible:ring-[#F5C94D]"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>

                  <div className="grid md:grid-cols-[minmax(14rem,0.85fr)_minmax(0,1.15fr)]">
                    <div className="relative min-h-[16rem] bg-[#E6E7E7] md:min-h-[28rem] dark:bg-[#2F3332]">
                      <HubPortrait
                        name={leader.name}
                        image={leader.image}
                        alt={portraitAlt}
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="h-full rounded-none aspect-auto md:min-h-[28rem]"
                      />
                    </div>

                    <div className="p-6 sm:p-8 md:p-9">
                      <p className="font-subheading text-xs font-bold uppercase tracking-[0.16em] text-[#0F4C5C] dark:text-[#66C4DC]">
                        {leader.role}
                      </p>
                      <DialogTitle
                        as="h2"
                        className="mt-3 pr-12 font-heading text-2xl font-semibold leading-tight sm:text-[1.75rem]"
                      >
                        {leader.name}
                      </DialogTitle>
                      <p className="mt-2 text-base font-semibold text-[#0097b2] dark:text-[#66C4DC]">
                        {leader.affiliation}
                      </p>
                      {leader.bio ? (
                        <p className="mt-6 max-w-[65ch] text-base leading-8 text-[#2F3332]/85 dark:text-[#E6E7E7]/85">
                          {leader.bio}
                        </p>
                      ) : null}

                      {email || linkedin ? (
                        <div className="mt-8 border-t border-[#1C1F1E]/15 pt-6 dark:border-[#FCFAEF]/20">
                          <p className="font-subheading text-xs font-bold uppercase tracking-[0.16em]">
                            Connect
                          </p>
                          <div className="mt-4 flex flex-wrap gap-3">
                            {email ? (
                              <Link
                                href={`mailto:${email}`}
                                aria-label={`Email ${leader.name}`}
                                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#1C1F1E]/20 px-4 py-2 text-sm font-semibold hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] dark:border-[#FCFAEF]/25 dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]"
                              >
                                <Mail className="h-4 w-4" aria-hidden="true" />
                                Email
                              </Link>
                            ) : null}
                            {linkedin ? (
                              <Link
                                href={linkedin}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`View ${leader.name} on LinkedIn`}
                                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#1C1F1E]/20 px-4 py-2 text-sm font-semibold hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] dark:border-[#FCFAEF]/25 dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]"
                              >
                                <Linkedin
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                                LinkedIn
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                    </div>
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
