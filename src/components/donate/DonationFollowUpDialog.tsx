"use client";

import { lazy, Suspense } from "react";
import IntakeDialog from "@/components/intake/IntakeDialog";

const DonationFollowUpForm = lazy(
  () => import("@/components/donate/DonationFollowUpForm"),
);

type Props = {
  open: boolean;
  onClose: () => void;
  onAfterLeave?: () => void;
  flow: "partner" | "oneTime";
  selectedGivingLevel: string;
};

export default function DonationFollowUpDialog({
  open,
  onClose,
  onAfterLeave,
  flow,
  selectedGivingLevel,
}: Props) {
  return (
    <IntakeDialog
      open={open}
      onClose={onClose}
      onAfterLeave={onAfterLeave}
      eyebrow="Donation follow-up"
      title="Let us thank you"
      description="After making your transfer, share your contact details so our team can send a personal thank-you. This form does not confirm payment."
      closeLabel="Close donation follow-up form"
    >
      <Suspense fallback={<p role="status">Loading form…</p>}>
        <DonationFollowUpForm
          flow={flow}
          selectedGivingLevel={selectedGivingLevel}
          onDone={onClose}
        />
      </Suspense>
    </IntakeDialog>
  );
}
