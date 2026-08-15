"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function IntakeSafetyNotice() {
  return (
    <p className="border-l-4 border-[#eeba2b] bg-[#eeba2b]/10 p-3 text-sm leading-6 text-[#2F3332] dark:text-[#E6E7E7]">
      Do not submit medical details, emergency information, payment data,
      government IDs, or files. For an emergency, contact local emergency
      services.
    </p>
  );
}

export function IntakeConsentText() {
  return (
    <span className="text-sm leading-6 text-[#2F3332]/85 dark:text-[#E6E7E7]/85">
      I consent to Akomapa using these details to respond to this request, as
      described in the{" "}
      <Link
        href="/privacy"
        className="font-semibold underline underline-offset-2"
      >
        privacy notice
      </Link>
      .
    </span>
  );
}

export function DraftRestoredNotice({ onDiscard }: { onDiscard: () => void }) {
  return (
    <div
      role="status"
      className="flex flex-wrap items-center justify-between gap-3 border border-[#0097b2]/25 bg-[#0097b2]/8 p-3 text-sm"
    >
      <p>Your saved draft was restored on this device.</p>
      <Button
        type="button"
        variant="ghost"
        onClick={onDiscard}
        className="min-h-11 px-3 underline underline-offset-2"
      >
        <RotateCcw aria-hidden="true" className="h-4 w-4" />
        Discard draft
      </Button>
    </div>
  );
}
