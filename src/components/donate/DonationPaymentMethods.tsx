"use client";

import type { ComponentType } from "react";
import { useId, useState } from "react";
import { Info, Landmark, Smartphone } from "lucide-react";
import {
  SiCashapp,
  SiPaypal,
  SiStripe,
  SiVenmo,
  SiZelle,
} from "react-icons/si";
import DonationFollowUpForm from "@/components/donate/DonationFollowUpForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  getAvailableDonationPaymentMethods,
  getUnavailableDonationPaymentMethods,
  type DonationPaymentMethodId,
} from "@/config/donation-payments";
import { cn } from "@/lib/utils";

type DonationPaymentMethodsProps = {
  flow: "partner" | "oneTime";
  selectedGivingLevel: string;
};

type PaymentIcon = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

const paymentMethodIcons: Record<DonationPaymentMethodId, PaymentIcon> = {
  mobileMoney: Smartphone,
  bankTransfer: Landmark,
  paypal: SiPaypal,
  venmo: SiVenmo,
  cashApp: SiCashapp,
  zelle: SiZelle,
  stripeCard: SiStripe,
};

const paymentIconClasses: Record<DonationPaymentMethodId, string> = {
  mobileMoney: "h-7 w-7",
  bankTransfer: "h-6 w-6",
  paypal: "h-7 w-7",
  venmo: "h-5 w-10",
  cashApp: "h-7 w-7",
  zelle: "h-7 w-7",
  stripeCard: "h-8 w-8",
};

const statusLabels = {
  pendingVerification: "Pending verification",
  comingSoon: "Coming soon",
  disabled: "Unavailable",
} as const;

export default function DonationPaymentMethods({
  flow,
  selectedGivingLevel,
}: DonationPaymentMethodsProps) {
  const availableMethods = getAvailableDonationPaymentMethods();
  const unavailableMethods = getUnavailableDonationPaymentMethods();
  const [selectedMethodId, setSelectedMethodId] =
    useState<DonationPaymentMethodId>(availableMethods[0]?.id ?? "mobileMoney");
  const [showInstructions, setShowInstructions] = useState(false);
  const instructionsId = useId();
  const methodGroupId = useId();
  const selectedMethod = availableMethods.find(
    (method) => method.id === selectedMethodId,
  );

  if (!selectedMethod || selectedMethod.id !== "mobileMoney") {
    return (
      <Alert>
        <Info aria-hidden="true" />
        <AlertTitle>Donation instructions unavailable</AlertTitle>
        <AlertDescription>
          No verified donation method is currently available. Please check back
          soon.
        </AlertDescription>
      </Alert>
    );
  }

  const recurringNote =
    flow === "partner"
      ? "Mobile Money does not create an automatic recurring donation. Complete a new manual transfer for each month you wish to give."
      : "This is a one-time manual transfer. No recurring payment will be created.";

  return (
    <div
      className="flex flex-col gap-6"
      data-testid={`donation-payment-methods-${flow}`}
    >
      <section aria-labelledby={methodGroupId} className="space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <h4
              id={methodGroupId}
              className="text-lg font-semibold text-[#1C1F1E] sm:text-xl dark:text-[#FCFAEF]"
            >
              Choose how to give
            </h4>
            <p className="mt-1 text-sm text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
              MTN Mobile Money is available now. More secure options are on the
              way.
            </p>
          </div>
          <Badge className="w-fit bg-[#0097b2] text-[#FCFAEF] hover:bg-[#0097b2]">
            1 method available
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <RadioGroup
            value={selectedMethodId}
            onValueChange={(value) => {
              setSelectedMethodId(value as DonationPaymentMethodId);
              setShowInstructions(false);
            }}
            aria-labelledby={methodGroupId}
            className="contents"
          >
            {availableMethods.map((method) => {
              const inputId = `${methodGroupId}-${method.id}`;
              const Icon = paymentMethodIcons[method.id];
              const isSelected = method.id === selectedMethodId;

              return (
                <div
                  key={method.id}
                  className={cn(
                    "relative min-h-40 overflow-hidden rounded-md border-2 bg-white transition-colors duration-200 dark:bg-[#1C1F1E]/40",
                    isSelected
                      ? "border-[#0097b2] ring-1 ring-[#0097b2]/40"
                      : "border-[#2F3332]/12 hover:border-[#0097b2]/50 dark:border-[#FCFAEF]/15",
                  )}
                >
                  <RadioGroupItem
                    value={method.id}
                    id={inputId}
                    className="absolute right-3 top-3 border-[#0097b2] text-[#0097b2]"
                  />
                  <Label
                    htmlFor={inputId}
                    className="flex h-full min-h-40 cursor-pointer flex-col items-center justify-center gap-3 p-4 text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center border border-[#eeba2b]/50 bg-[#FCFAEF] text-[#1C1F1E] dark:bg-[#121514] dark:text-[#F5C94D]">
                      <Icon
                        aria-hidden="true"
                        className={paymentIconClasses[method.id]}
                      />
                    </span>
                    <span>
                      <span className="block font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                        {method.label}
                      </span>
                      <span className="mt-1 block text-xs font-normal text-[#0097b2] dark:text-[#66C4DC]">
                        {isSelected ? "Selected · Available now" : "Available now"}
                      </span>
                    </span>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>

          {unavailableMethods.map((method) => {
            const Icon = paymentMethodIcons[method.id];

            return (
              <div
                key={method.id}
                aria-disabled="true"
                data-testid={`payment-method-${method.id}`}
                className="flex min-h-40 cursor-not-allowed flex-col items-center justify-center gap-3 rounded-md border border-[#2F3332]/12 bg-[#2F3332]/[0.025] p-4 text-center opacity-55 grayscale select-none dark:border-[#FCFAEF]/15 dark:bg-[#FCFAEF]/[0.035]"
              >
                <span className="flex h-12 w-12 items-center justify-center border border-current/15 bg-white/70 text-[#2F3332] dark:bg-[#FCFAEF]/10 dark:text-[#E6E7E7]">
                  <Icon
                    aria-hidden="true"
                    className={paymentIconClasses[method.id]}
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {method.label}
                  </span>
                  <span className="mt-1 block text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                    {statusLabels[method.status]}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        <p className="rounded-lg border-l-2 border-[#F5C94D] bg-[#F5C94D]/8 px-3 py-2 text-xs leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
          <strong>Bank Transfer:</strong>{" "}
          {
            unavailableMethods.find((method) => method.id === "bankTransfer")
              ?.description
          }
        </p>
      </section>

      <div className="rounded-xl bg-[#0097b2]/6 p-4 text-sm leading-relaxed text-[#2F3332]/80 dark:bg-[#66C4DC]/8 dark:text-[#E6E7E7]/80">
        <p>
          Selected giving level: <strong>{selectedGivingLevel}</strong>. This
          amount is shown in US dollars as giving context; the site does not
          calculate or display a Mobile Money currency conversion.
        </p>
        <p className="mt-2">{recurringNote}</p>
      </div>

      <Button
        type="button"
        size="lg"
        className="h-12 min-h-12 w-full rounded-md bg-[#0097b2] py-3 text-[#FCFAEF] shadow-none hover:bg-[#007f96] focus-visible:ring-[#F5C94D]"
        aria-expanded={showInstructions}
        aria-controls={instructionsId}
        onClick={() => setShowInstructions((current) => !current)}
      >
        {showInstructions
          ? "Hide Mobile Money instructions"
          : "View Mobile Money instructions"}
      </Button>

      {showInstructions ? (
        <div id={instructionsId} className="space-y-4">
          <Alert className="border-[#0097b2]/30 bg-[#0097b2]/6">
            <Info aria-hidden="true" className="text-[#0097b2]" />
            <AlertTitle>Manual MTN Mobile Money transfer</AlertTitle>
            <AlertDescription>
              <div className="flex flex-col gap-4">
                {selectedMethod.instructions.map((instruction) => (
                  <p key={instruction}>{instruction}</p>
                ))}
                <dl className="grid gap-3 sm:grid-cols-3">
                  <div className="border border-[#1C1F1E]/10 bg-white p-3 dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E]/30">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Account name
                    </dt>
                    <dd className="mt-1 break-words font-semibold">
                      {selectedMethod.accountName}
                    </dd>
                  </div>
                  <div className="border border-[#1C1F1E]/10 bg-white p-3 dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E]/30">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Network
                    </dt>
                    <dd className="mt-1 break-words font-semibold">
                      {selectedMethod.network}
                    </dd>
                  </div>
                  <div className="border border-[#1C1F1E]/10 bg-white p-3 dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E]/30">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Mobile Money number
                    </dt>
                    <dd className="mt-1 break-all font-semibold tabular-nums">
                      {selectedMethod.phone}
                    </dd>
                  </div>
                </dl>
                <p className="font-medium">
                  {selectedMethod.verificationNote}
                </p>
              </div>
            </AlertDescription>
          </Alert>

          <DonationFollowUpForm
            flow={flow}
            selectedGivingLevel={selectedGivingLevel}
          />
        </div>
      ) : null}
    </div>
  );
}
