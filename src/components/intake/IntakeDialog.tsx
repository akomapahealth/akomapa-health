"use client";

import { Fragment, type ReactNode } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";

type IntakeDialogProps = {
  open: boolean;
  onClose: () => void;
  onAfterLeave?: () => void;
  eyebrow: string;
  title: string;
  description: string;
  closeLabel?: string;
  children: ReactNode;
};

export default function IntakeDialog({
  open,
  onClose,
  onAfterLeave,
  eyebrow,
  title,
  description,
  closeLabel = "Close form dialog",
  children,
}: IntakeDialogProps) {
  return (
    <Transition show={open} as={Fragment} afterLeave={onAfterLeave}>
      <Dialog
        className="fixed inset-0 z-50"
        onClose={onClose}
        data-intake-dialog
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
          <div className="fixed inset-0 bg-[#121514]/75" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 z-50 overflow-hidden sm:overflow-y-auto">
          <div className="flex min-h-full items-end justify-center sm:items-center sm:p-6">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200 motion-reduce:transition-none motion-reduce:transform-none"
              enterFrom="opacity-0 translate-y-3"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-150 motion-reduce:transition-none motion-reduce:transform-none"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-3"
            >
              <DialogPanel className="relative flex h-[100dvh] w-full max-w-2xl flex-col overflow-hidden bg-[#FCFAEF] text-[#1C1F1E] shadow-2xl sm:h-auto sm:max-h-[min(92dvh,52rem)] sm:rounded-md dark:bg-[#1C1F1E] dark:text-[#FCFAEF]">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={closeLabel}
                  className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md transition-colors hover:bg-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] focus-visible:ring-offset-2 dark:hover:bg-[#0F4C5C] dark:focus-visible:ring-[#F5C94D]"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8">
                  <p className="font-subheading text-xs font-bold uppercase tracking-[0.16em] text-[#0F4C5C] dark:text-[#66C4DC]">
                    {eyebrow}
                  </p>
                  <DialogTitle
                    as="h2"
                    className="mt-3 pr-12 font-heading text-2xl font-semibold leading-tight sm:text-[1.75rem]"
                  >
                    {title}
                  </DialogTitle>
                  <Description className="mt-3 max-w-xl text-base leading-7 text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                    {description}
                  </Description>
                  <div className="mt-7 border-t border-[#1C1F1E]/12 pt-6 dark:border-[#FCFAEF]/15">
                    {open ? children : null}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
