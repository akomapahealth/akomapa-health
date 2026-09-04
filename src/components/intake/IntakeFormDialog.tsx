"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import IntakeDialog from "@/components/intake/IntakeDialog";
import type { ResolvedImmersionIntake } from "@/lib/intake/immersion-registry";

export function IntakeFallbackLink({
  href,
  onClick,
}: {
  href: string;
  onClick: () => void;
}) {
  const className =
    "inline-flex min-h-11 items-center justify-center rounded-md border border-[#0F4C5C]/30 px-4 py-2 text-sm font-semibold text-[#0F4C5C] underline decoration-[#eeba2b] decoration-2 underline-offset-4 transition-colors hover:bg-[#0F4C5C] hover:text-[#FCFAEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:border-[#66C4DC]/35 dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#121514] motion-reduce:transition-none";
  const external = href.startsWith("https://");

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className={className}
      >
        Open the secure hosted form
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      Contact Akomapa instead
    </Link>
  );
}

export default function IntakeFormDialog({
  open,
  resolved,
  onClose,
  onAfterLeave,
  onFallback,
  children,
}: {
  open: boolean;
  resolved: ResolvedImmersionIntake;
  onClose: () => void;
  onAfterLeave: () => void;
  onFallback: () => void;
  children: ReactNode;
}) {
  const { definition, intent, provider } = resolved;

  return (
    <IntakeDialog
      open={open}
      onClose={onClose}
      onAfterLeave={onAfterLeave}
      eyebrow="Global Health Immersion Program"
      title={intent.title}
      description={intent.description}
      closeLabel={`Close ${intent.title.toLowerCase()} form`}
    >
      <div className="space-y-5" data-intake-form-dialog>
        <div className="border border-[#eeba2b]/35 bg-[#eeba2b]/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0F4C5C] dark:text-[#F5C94D]">
            Before you continue
          </p>
          <p className="mt-2 text-sm leading-6 text-[#2F3332]/85 dark:text-[#E6E7E7]/85">
            {definition.safetyText}
          </p>
        </div>

        {children}

        <div className="border-t border-[#1C1F1E]/12 pt-4 dark:border-[#FCFAEF]/14">
          <p className="max-w-xl text-sm leading-6 text-[#2F3332]/72 dark:text-[#E6E7E7]/72">
            {definition.resumeText} Review our{" "}
            <Link
              href={definition.privacyUrl}
              className="font-semibold underline underline-offset-2"
            >
              privacy notice
            </Link>
            .
          </p>
          <div className="mt-4">
            <IntakeFallbackLink
              href={provider.fallbackUrl}
              onClick={onFallback}
            />
          </div>
        </div>
      </div>
    </IntakeDialog>
  );
}
