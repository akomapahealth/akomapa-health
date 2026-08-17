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
import type { TeamMember } from "@/lib/types";
import { cn } from "@/lib/utils";

export type TeamMemberAppearance = "executive" | "member" | "advisor";

export function getValidTeamEmail(value?: string): string | undefined {
  const email = value?.trim();
  if (!email || email === "#" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return undefined;
  }

  return email;
}

export function getValidTeamLinkedIn(value?: string): string | undefined {
  const candidate = value?.trim();
  if (!candidate || candidate === "#") {
    return undefined;
  }

  try {
    const url = new URL(candidate);
    const hostname = url.hostname.toLowerCase();
    const isLinkedIn =
      hostname === "linkedin.com" || hostname.endsWith(".linkedin.com");

    if (url.protocol !== "https:" || !isLinkedIn || url.pathname === "/") {
      return undefined;
    }

    return url.toString();
  } catch {
    return undefined;
  }
}

function TeamPortrait({
  member,
  appearance,
}: {
  member: TeamMember;
  appearance: TeamMemberAppearance;
}) {
  return (
    <div
      data-team-portrait
      className={cn(
        "relative aspect-[4/5] overflow-hidden rounded-md",
        appearance === "advisor" ? "bg-[#2F3332]" : "bg-[#E6E7E7] dark:bg-[#2F3332]",
      )}
    >
      <Image
        src={member.image}
        alt={`Headshot of ${member.name}, ${member.title}`}
        fill
        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
        sizes={
          appearance === "member"
            ? "(min-width: 1024px) 18vw, (min-width: 640px) 32vw, 36vw"
            : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        }
      />
    </div>
  );
}

export default function TeamMemberDialog({
  member,
  appearance = "executive",
}: {
  member: TeamMember;
  appearance?: TeamMemberAppearance;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const email = getValidTeamEmail(member.socialLinks?.email);
  const linkedin = getValidTeamLinkedIn(member.socialLinks?.linkedin);
  const isAdvisor = appearance === "advisor";
  const isMember = appearance === "member";

  const controlClass = cn(
    "inline-flex min-h-11 items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    isAdvisor
      ? "border-[#F5C94D]/70 text-[#F5C94D] hover:bg-[#F5C94D] hover:text-[#1C1F1E] focus-visible:ring-[#F5C94D] focus-visible:ring-offset-[#1C1F1E]"
      : "border-[#0F4C5C] text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-[#FCFAEF] focus-visible:ring-[#0F4C5C] dark:border-[#66C4DC] dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#1C1F1E] dark:focus-visible:ring-[#F5C94D]",
  );

  const iconControlClass = cn(
    "inline-flex h-11 w-11 items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    isAdvisor
      ? "border-[#FCFAEF]/45 text-[#FCFAEF] hover:border-[#F5C94D] hover:text-[#F5C94D] focus-visible:ring-[#F5C94D] focus-visible:ring-offset-[#1C1F1E]"
      : "border-[#1C1F1E]/45 text-[#1C1F1E] hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:ring-[#0F4C5C] dark:border-[#FCFAEF]/45 dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC] dark:focus-visible:ring-[#F5C94D]",
  );

  return (
    <>
      <article
        data-team-member={member.name}
        data-team-role-category={member.roleCategory}
        className={cn(
          "group h-full min-w-0 border-t pt-5",
          isMember
            ? "grid grid-cols-[minmax(7rem,0.78fr)_minmax(0,1.22fr)] gap-5 border-[#0F4C5C]/25 sm:grid-cols-[minmax(8rem,0.8fr)_minmax(0,1.2fr)] dark:border-[#66C4DC]/30"
            : "flex flex-col",
          isAdvisor
            ? "border-[#FCFAEF]/25"
            : !isMember && "border-[#1C1F1E]/20 dark:border-[#FCFAEF]/25",
        )}
      >
        <TeamPortrait member={member} appearance={appearance} />

        <div className={cn("flex min-w-0 flex-1 flex-col", !isMember && "pt-5")}>
          <p
            className={cn(
              "font-subheading text-xs font-bold uppercase tracking-[0.16em]",
              isAdvisor
                ? "text-[#F5C94D]"
                : "text-[#0F4C5C] dark:text-[#66C4DC]",
            )}
          >
            {member.affiliation}
          </p>
          <h3
            className={cn(
              "mt-3 break-words font-heading text-xl font-semibold",
              isAdvisor
                ? "text-[#FCFAEF]"
                : "text-[#1C1F1E] dark:text-[#FCFAEF]",
            )}
          >
            {member.name}
          </h3>
          <p
            className={cn(
              "mt-2 text-base leading-relaxed",
              isAdvisor
                ? "text-[#FCFAEF]/75"
                : "text-[#2F3332]/80 dark:text-[#E6E7E7]/80",
            )}
          >
            {member.title}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
            <button
              type="button"
              data-team-bio-trigger={member.name}
              onClick={() => setIsOpen(true)}
              className={controlClass}
            >
              Read bio
            </button>
            {email ? (
              <Link
                href={`mailto:${email}`}
                aria-label={`Email ${member.name}`}
                className={iconControlClass}
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
                className={iconControlClass}
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </div>
      </article>

      <Transition show={isOpen} as={Fragment}>
        <Dialog className="fixed inset-0 z-50" onClose={() => setIsOpen(false)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200 motion-reduce:!opacity-100 motion-reduce:transition-none"
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
                enter="ease-out duration-200 motion-reduce:!opacity-100 motion-reduce:transition-none motion-reduce:transform-none"
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
                    className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-sm transition-colors hover:bg-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] focus-visible:ring-offset-2 dark:bg-[#1C1F1E] dark:text-[#FCFAEF] dark:hover:bg-[#0F4C5C] dark:focus-visible:ring-[#F5C94D]"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>

                  <div className="grid md:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.2fr)]">
                    <div className="relative aspect-[4/3] bg-[#E6E7E7] md:aspect-auto md:min-h-[32rem] dark:bg-[#2F3332]">
                      <Image
                        src={member.image}
                        alt={`Headshot of ${member.name}, ${member.title}`}
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 768px) 38vw, 100vw"
                      />
                    </div>

                    <div className="p-6 sm:p-8 md:p-10">
                      <p className="font-subheading text-xs font-bold uppercase tracking-[0.16em] text-[#0F4C5C] dark:text-[#66C4DC]">
                        {member.affiliation}
                      </p>
                      <DialogTitle
                        as="h2"
                        className="mt-3 pr-12 font-heading text-2xl font-semibold sm:text-3xl"
                      >
                        {member.name}
                      </DialogTitle>
                      <p className="mt-2 text-base font-semibold text-[#0097b2] dark:text-[#66C4DC] sm:text-lg">
                        {member.title}
                      </p>
                      <p className="mt-7 max-w-[70ch] text-base leading-8 text-[#2F3332]/85 dark:text-[#E6E7E7]/85">
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
                                <Linkedin className="h-4 w-4" aria-hidden="true" />
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
