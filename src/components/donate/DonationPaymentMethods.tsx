"use client";

import { useId, useState } from "react";
import { Info } from "lucide-react";
import {
  getAvailableDonationPaymentMethods,
  getUnavailableDonationPaymentMethods,
  type DonationPaymentMethodId,
} from "@/config/donation-payments";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type DonationPaymentMethodsProps = {
  flow: "partner" | "oneTime";
  selectedGivingLevel: string;
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
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <Label
            id={methodGroupId}
            className="text-base font-semibold sm:text-lg"
          >
            Available payment method
          </Label>
          <Badge>Available</Badge>
        </div>

        <RadioGroup
          value={selectedMethodId}
          onValueChange={(value) => {
            setSelectedMethodId(value as DonationPaymentMethodId);
            setShowInstructions(false);
          }}
          aria-labelledby={methodGroupId}
        >
          {availableMethods.map((method) => {
            const inputId = `${methodGroupId}-${method.id}`;

            return (
              <div
                key={method.id}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4",
                  method.id === selectedMethodId && "border-primary bg-primary/5",
                )}
              >
                <RadioGroupItem value={method.id} id={inputId} />
                <Label htmlFor={inputId} className="flex flex-1 flex-col gap-1">
                  <span className="font-semibold">{method.label}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {method.description}
                  </span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>
            Selected giving level: <strong>{selectedGivingLevel}</strong>. This
            amount is shown in US dollars as giving context; the site does not
            calculate or display a Mobile Money currency conversion.
          </p>
          <p>{recurringNote}</p>
        </div>

        <Button
          type="button"
          className="w-full"
          aria-expanded={showInstructions}
          aria-controls={instructionsId}
          onClick={() => setShowInstructions((current) => !current)}
        >
          {showInstructions
            ? "Hide Mobile Money instructions"
            : "View Mobile Money instructions"}
        </Button>
      </div>

      {showInstructions ? (
        <Alert id={instructionsId}>
          <Info aria-hidden="true" />
          <AlertTitle>Manual MTN Mobile Money transfer</AlertTitle>
          <AlertDescription>
            <div className="flex flex-col gap-4">
              {selectedMethod.instructions.map((instruction) => (
                <p key={instruction}>{instruction}</p>
              ))}
              <dl className="grid gap-3 sm:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <dt className="font-medium">Account name</dt>
                  <dd>{selectedMethod.accountName}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-medium">Network</dt>
                  <dd>{selectedMethod.network}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-medium">Mobile Money number</dt>
                  <dd className="font-semibold tabular-nums">
                    {selectedMethod.phone}
                  </dd>
                </div>
              </dl>
              <p className="font-medium">{selectedMethod.verificationNote}</p>
            </div>
          </AlertDescription>
        </Alert>
      ) : null}

      <section
        className="flex flex-col gap-3"
        aria-labelledby={`${methodGroupId}-unavailable`}
      >
        <h4 id={`${methodGroupId}-unavailable`} className="font-semibold">
          Additional payment methods
        </h4>
        <ul className="grid gap-3 sm:grid-cols-2">
          {unavailableMethods.map((method) => (
            <li
              key={method.id}
              className="flex items-start justify-between gap-3 rounded-lg border p-3"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{method.label}</span>
                <span className="text-sm text-muted-foreground">
                  {method.description}
                </span>
              </div>
              <Badge variant="outline" className="shrink-0">
                {statusLabels[method.status]}
              </Badge>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
