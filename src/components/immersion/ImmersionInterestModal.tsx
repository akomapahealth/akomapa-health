"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";
import ImmersionInterestForm from "@/components/immersion/ImmersionInterestForm";
import { IMMERSION_INTEREST_COPY } from "@/lib/immersion-interest";

type ImmersionInterestModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ImmersionInterestModal({
  open,
  onClose,
}: ImmersionInterestModalProps) {
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (open) {
      setFormKey((current) => current + 1);
    }
  }, [open]);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        className="fixed inset-0 z-50"
        onClose={onClose}
        data-immersion-alert-dialog
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
          <div className="fixed inset-0 bg-[#121514]/75" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-3 sm:items-center sm:p-6">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200 motion-reduce:!opacity-100 motion-reduce:transition-none motion-reduce:transform-none"
              enterFrom="opacity-0 translate-y-3"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-150 motion-reduce:transition-none motion-reduce:transform-none"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-3"
            >
              <DialogPanel className="relative w-full max-w-lg overflow-hidden rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-2xl dark:bg-[#1C1F1E] dark:text-[#FCFAEF]">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close Immersion Program alerts dialog"
                  className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md text-[#1C1F1E] transition-colors hover:bg-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] focus-visible:ring-offset-2 dark:text-[#FCFAEF] dark:hover:bg-[#0F4C5C] dark:focus-visible:ring-[#F5C94D]"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="max-h-[min(90vh,40rem)] overflow-y-auto p-5 sm:p-8">
                  <p className="font-subheading text-xs font-bold uppercase tracking-[0.16em] text-[#0F4C5C] dark:text-[#66C4DC]">
                    Immersion Program
                  </p>
                  <DialogTitle
                    as="h2"
                    className="mt-3 pr-12 font-heading text-2xl font-semibold leading-tight sm:text-[1.75rem]"
                  >
                    {IMMERSION_INTEREST_COPY.modal.title}
                  </DialogTitle>
                  <Description className="mt-3 text-base leading-7 text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                    {IMMERSION_INTEREST_COPY.modal.description}
                  </Description>

                  <div className="mt-7 border-t border-[#1C1F1E]/12 pt-6 dark:border-[#FCFAEF]/15">
                    <ImmersionInterestForm
                      key={formKey}
                      onDone={onClose}
                      onDismiss={onClose}
                    />
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
