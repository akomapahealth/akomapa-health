"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useCookieConsent } from "@/components/consent/ConsentProvider";
import {
  consentBodyClassName,
  consentButtonLabelClassName,
  consentChoiceButtonClassName,
  consentEyebrowClassName,
  consentSurfaceClassName,
  consentTextButtonClassName,
} from "@/components/consent/styles";

type CookieSettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseAutoFocus?: (event: Event) => void;
};

const categoryClassName =
  "space-y-2 border-t border-[#0F4C5C]/15 pt-5 dark:border-[#FCFAEF]/15";

const categoryTitleClassName =
  "font-heading text-base font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]";

/**
 * Lets visitors revisit or withdraw their choice at any time. Necessary
 * storage is listed for transparency but cannot be switched off.
 */
export default function CookieSettingsDialog({
  open,
  onOpenChange,
  onCloseAutoFocus,
}: CookieSettingsDialogProps) {
  const { analytics, savePreferences } = useCookieConsent();
  const [analyticsDraft, setAnalyticsDraft] = useState(analytics);
  const analyticsId = useId();
  const analyticsDescriptionId = useId();

  // Each opening starts from the saved choice, not an abandoned draft.
  useEffect(() => {
    if (open) setAnalyticsDraft(analytics);
  }, [open, analytics]);

  const handleSave = () => {
    savePreferences({ analytics: analyticsDraft });
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-[#121514]/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <Dialog.Content
          onCloseAutoFocus={onCloseAutoFocus}
          className={cn(
            consentSurfaceClassName,
            "fixed left-1/2 top-1/2 z-[70] flex max-h-[min(90dvh,44rem)] w-[min(calc(100vw-2rem),34rem)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 motion-reduce:animate-none",
          )}
        >
          <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
            <div className="space-y-2">
              <p className={consentEyebrowClassName}>Your privacy</p>
              <Dialog.Title className="font-heading text-xl font-semibold leading-snug text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-2xl">
                Cookie settings
              </Dialog.Title>
            </div>
            <Dialog.Close
              aria-label="Close cookie settings"
              className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-[#2F3332] transition-colors hover:bg-[#0F4C5C]/10 hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] dark:text-[#E6E7E7] dark:hover:bg-[#FCFAEF]/10 dark:hover:text-[#F5C94D] dark:focus-visible:ring-[#F5C94D]"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
            <Dialog.Description className={consentBodyClassName}>
              Choose whether Akomapa Health can use optional cookies. Your
              choice is saved on this device, and you can change it at any time
              from the footer.
            </Dialog.Description>

            <section className={categoryClassName} aria-labelledby={`${analyticsId}-necessary`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 id={`${analyticsId}-necessary`} className={categoryTitleClassName}>
                  Necessary
                </h3>
                <p className="font-subheading text-xs font-bold uppercase tracking-[0.12em] text-[#0F4C5C] dark:text-[#66C4DC]">
                  Always on
                </p>
              </div>
              <p className={consentBodyClassName}>
                Remember your theme, announcement and cookie choices, keep
                unfinished form drafts on this device, secure invite-only
                payment sessions, and report site errors. These cannot be
                switched off.
              </p>
            </section>

            <section className={categoryClassName} aria-labelledby={`${analyticsId}-heading`}>
              <h3 id={`${analyticsId}-heading`} className={categoryTitleClassName}>
                Analytics
              </h3>
              <div className="flex items-start gap-3">
                <Checkbox
                  id={analyticsId}
                  checked={analyticsDraft}
                  onCheckedChange={(checked) => setAnalyticsDraft(checked === true)}
                  aria-describedby={analyticsDescriptionId}
                  className="mt-0.5 size-5 border-[#0F4C5C]/60 data-[state=checked]:border-[#0F4C5C] data-[state=checked]:bg-[#0F4C5C] data-[state=checked]:text-[#FCFAEF] focus-visible:ring-[#eeba2b]/60 dark:border-[#66C4DC]/70 dark:data-[state=checked]:border-[#66C4DC] dark:data-[state=checked]:bg-[#66C4DC] dark:data-[state=checked]:text-[#121514]"
                />
                <div className="space-y-1">
                  <label
                    htmlFor={analyticsId}
                    className="cursor-pointer font-subheading text-sm font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]"
                  >
                    Allow Google Analytics cookies
                  </label>
                  <p id={analyticsDescriptionId} className={consentBodyClassName}>
                    Helps us see which pages are visited and which links are
                    used, so we can improve the site. Google Analytics only
                    loads if you allow it.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#0F4C5C]/15 px-5 py-4 dark:border-[#FCFAEF]/15 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <Link
              href="/cookie-policy"
              onClick={() => onOpenChange(false)}
              className={consentTextButtonClassName}
            >
              Read the Cookie Policy
            </Link>
            <button
              type="button"
              onClick={handleSave}
              className={cn(consentChoiceButtonClassName, "sm:w-auto")}
            >
              <span className={consentButtonLabelClassName}>Save my choices</span>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
