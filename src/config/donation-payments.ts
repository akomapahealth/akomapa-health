/**
 * Temporary compatibility boundary for the legacy payment-method component.
 *
 * No direct payment method is safe to expose. The component that consumes this
 * module is removed in the Givebutter checkout commit.
 */
export type DonationPaymentMethodId =
  | "mobileMoney"
  | "bankTransfer"
  | "paypal"
  | "venmo"
  | "cashApp"
  | "zelle"
  | "stripeCard";

export type AvailableDonationPaymentMethod = {
  id: "mobileMoney";
  label: string;
  enabled: true;
  status: "available";
  description: string;
  instructions: readonly string[];
  accountName: string;
  network: string;
  phone: string;
  verificationNote: string;
};

export type UnavailableDonationPaymentMethod = {
  id: DonationPaymentMethodId;
  label: string;
  enabled: false;
  status: "disabled";
  description: string;
};

export function getAvailableDonationPaymentMethods(): readonly AvailableDonationPaymentMethod[] {
  return [];
}

export function getUnavailableDonationPaymentMethods(): readonly UnavailableDonationPaymentMethod[] {
  return [];
}

export function isDonationPaymentMethodAvailable(
  id?: DonationPaymentMethodId,
): false {
  void id;
  return false;
}
