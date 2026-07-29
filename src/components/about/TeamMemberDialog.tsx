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
import Image from "@/components/common/Image";

export type TeamSpotlightMember = {
  name: string;
  role: string;
  org: string;
  image: string;
  email?: string;
  linkedin?: string;
  bio?: string;
};

function getValidContact(value?: string): string | undefined {
  return value && value !== "#" ? value : undefined;
}

export default function TeamMemberDialog({
  member,
}: {
  member: TeamSpotlightMember;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const email = getValidContact(member.email);
  const linkedin = getValidContact(member.linkedin);

  return (
    <>
      <article
        data-team-member={member.name}
        className="flex h-full flex-col border-t border-[#1C1F1E]/20 pt-5 dark:border-[#FCFAEF]/25"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#E6E7E7] dark:bg-[#2F3332]">
          <Image
            src={member.image}
            alt={`Headshot of ${member.name}, ${member.role}`}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          />
        </div>

        <div className="flex flex-1 flex-col pt-5">
          <p className="font-subheading text-xs font-bold uppercase tracking-[0.16em] text-[#0F4C5C]/70 dark:text-[#66C4DC]">
            {member.org}
          </p>
          <h3 className="mt-3 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
            {member.name}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
            {member.role}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
            {member.bio ? (
              <button
                type="button"
                data-team-bio-trigger={member.name}
                onClick={() => setIsOpen(true)}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#0097b2]/35 px-4 py-2 text-sm font-semibold text-[#0097b2] transition-colors hover:bg-[#0097b2] hover:text-[#FCFAEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:border-[#66C4DC]/45 dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#1C1F1E]"
              >
                Read bio
              </button>
            ) : null}
            {email ? (
              <Link
                href={`mailto:${email}`}
                aria-label={`Email ${member.name}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#1C1F1E]/20 text-[#1C1F1E] transition-colors hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:border-[#FCFAEF]/25 dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
            {linkedin ? (
              <Link
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${member.name} on LinkedIn`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#1C1F1E]/20 text-[#1C1F1E] transition-colors hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:border-[#FCFAEF]/25 dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </div>
      </article>

      {member.bio ? (
        <Transition show={isOpen} as={Fragment}>
          <Dialog
            className="relative z-50"
            onClose={() => setIsOpen(false)}
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
              <div className="fixed inset-0 bg-[#121514]/75" />
            </TransitionChild>

            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-200 motion-reduce:transition-none motion-reduce:transform-none"
                  enterFrom="opacity-0 translate-y-3"
                  enterTo="opacity-100 translate-y-0"
                  leave="ease-in duration-150 motion-reduce:transition-none motion-reduce:transform-none"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-3"
                >
                  <DialogPanel className="relative max-h-[calc(100vh-2rem)] w-full max-w-4xl overflow-y-auto rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-2xl dark:bg-[#1C1F1E] dark:text-[#FCFAEF] sm:max-h-[calc(100vh-3rem)]">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      aria-label={`Close ${member.name} biography`}
                      className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-sm transition-colors hover:bg-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 dark:bg-[#1C1F1E] dark:text-[#FCFAEF] dark:hover:bg-[#0F4C5C]"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>

                    <div className="grid md:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.2fr)]">
                      <div className="relative aspect-[4/3] bg-[#E6E7E7] md:aspect-auto md:min-h-[32rem] dark:bg-[#2F3332]">
                        <Image
                          src={member.image}
                          alt={`Headshot of ${member.name}, ${member.role}`}
                          fill
                          className="object-cover object-center"
                          sizes="(min-width: 768px) 38vw, 100vw"
                        />
                      </div>

                      <div className="p-6 sm:p-8 md:p-10">
                        <p className="font-subheading text-xs font-bold uppercase tracking-[0.16em] text-[#0F4C5C]/70 dark:text-[#66C4DC]">
                          {member.org}
                        </p>
                        <DialogTitle
                          as="h2"
                          className="mt-3 pr-12 font-heading text-2xl font-semibold sm:text-3xl"
                        >
                          {member.name}
                        </DialogTitle>
                        <p className="mt-2 text-base font-semibold text-[#0097b2] dark:text-[#66C4DC] sm:text-lg">
                          {member.role}
                        </p>
                        <p className="mt-7 text-base leading-8 text-[#2F3332]/85 dark:text-[#E6E7E7]/85">
                          {member.bio}
                        </p>

                        {email || linkedin ? (
                          <div className="mt-8 border-t border-[#1C1F1E]/15 pt-6 dark:border-[#FCFAEF]/20">
                            <p className="font-subheading text-xs font-bold uppercase tracking-[0.16em]">
                              Connect
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                              {email ? (
                                <Link
                                  href={`mailto:${email}`}
                                  aria-label={`Email ${member.name}`}
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
                                  aria-label={`View ${member.name} on LinkedIn`}
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
      ) : null}
    </>
  );
}
