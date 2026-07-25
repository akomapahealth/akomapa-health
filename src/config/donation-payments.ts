export type DonationPaymentMethodId =
  | "mobileMoney"
  | "bankTransfer"
  | "paypal"
  | "venmo"
  | "cashApp"
  | "zelle"
  | "stripeCard";

export type DonationPaymentMethodType =
  | "manualTransfer"
  | "onlineProcessor";

export type DonationPaymentMethodStatus =
  | "available"
  | "comingSoon"
  | "pendingVerification"
  | "disabled";

type DonationPaymentMethodBase = {
  id: DonationPaymentMethodId;
  label: string;
  type: DonationPaymentMethodType;
  description: string;
  instructions: readonly string[];
  supportsRecurring: boolean;
  isManualTransfer: boolean;
};

export type VerifiedBankDetails = {
  accountName: string;
  bankName: string;
  accountNumber: string;
  transferCode: {
    type: "routingNumber" | "swiftBic";
    value: string;
  };
  country: string;
  currency: string;
  donorReferenceInstructions?: string;
};

export type AvailableDonationPaymentMethod = DonationPaymentMethodBase &
  (
    | {
        id: "mobileMoney";
        type: "manualTransfer";
        enabled: true;
        status: "available";
        verified: true;
        accountName: string;
        network: string;
        phone: string;
        verificationNote: string;
        supportsRecurring: false;
        isManualTransfer: true;
      }
    | {
        id: "bankTransfer";
        type: "manualTransfer";
        enabled: true;
        status: "available";
        verified: true;
        bankDetails: VerifiedBankDetails;
        verificationNote: string;
        isManualTransfer: true;
      }
    | {
        id: "venmo" | "cashApp" | "zelle";
        type: "manualTransfer";
        enabled: true;
        status: "available";
        verified: true;
        accountName: string;
        handle: string;
        url?: string;
        verificationNote: string;
        isManualTransfer: true;
      }
    | {
        id: "paypal" | "stripeCard";
        type: "onlineProcessor";
        enabled: true;
        status: "available";
        verified: true;
        url?: string;
        isManualTransfer: false;
      }
  );

export type UnavailableDonationPaymentMethod = DonationPaymentMethodBase & {
  enabled: false;
  status: Exclude<DonationPaymentMethodStatus, "available">;
  verified: false;
  accountName?: never;
  bankDetails?: never;
  network?: never;
  phone?: never;
  handle?: never;
  url?: never;
  verificationNote?: never;
};

export type DonationPaymentMethod =
  | AvailableDonationPaymentMethod
  | UnavailableDonationPaymentMethod;

export const donationPaymentMethods: readonly DonationPaymentMethod[] = [
  {
    id: "mobileMoney",
    label: "MTN Mobile Money",
    type: "manualTransfer",
    enabled: true,
    status: "available",
    verified: true,
    description:
      "Send a manual MTN Mobile Money transfer to Akomapa Health Foundation.",
    instructions: [
      "Send your Mobile Money donation to Akomapa Health Foundation using MTN Mobile Money.",
    ],
    accountName: "Akomapa Health Foundation",
    network: "MTN",
    phone: "0249292898",
    supportsRecurring: false,
    isManualTransfer: true,
    verificationNote:
      "Before completing your transfer, please confirm the account name appears as Akomapa Health Foundation.",
  },
  {
    id: "bankTransfer",
    label: "Bank Transfer",
    type: "manualTransfer",
    enabled: false,
    status: "pendingVerification",
    verified: false,
    description:
      "Bank transfer instructions are being verified and will be available soon.",
    instructions: [],
    supportsRecurring: false,
    isManualTransfer: true,
  },
  {
    id: "paypal",
    label: "PayPal",
    type: "onlineProcessor",
    enabled: false,
    status: "comingSoon",
    verified: false,
    description: "PayPal donations are coming soon.",
    instructions: [],
    supportsRecurring: false,
    isManualTransfer: false,
  },
  {
    id: "venmo",
    label: "Venmo",
    type: "manualTransfer",
    enabled: false,
    status: "comingSoon",
    verified: false,
    description: "Venmo donations are coming soon.",
    instructions: [],
    supportsRecurring: false,
    isManualTransfer: true,
  },
  {
    id: "cashApp",
    label: "Cash App",
    type: "manualTransfer",
    enabled: false,
    status: "comingSoon",
    verified: false,
    description: "Cash App donations are coming soon.",
    instructions: [],
    supportsRecurring: false,
    isManualTransfer: true,
  },
  {
    id: "zelle",
    label: "Zelle",
    type: "manualTransfer",
    enabled: false,
    status: "comingSoon",
    verified: false,
    description: "Zelle donations are coming soon.",
    instructions: [],
    supportsRecurring: false,
    isManualTransfer: true,
  },
  {
    id: "stripeCard",
    label: "Card / ACH",
    type: "onlineProcessor",
    enabled: false,
    status: "comingSoon",
    verified: false,
    description: "Online card and bank-account donations are coming soon.",
    instructions: [],
    supportsRecurring: false,
    isManualTransfer: false,
  },
];

export function getDonationPaymentMethod(
  id: DonationPaymentMethodId,
): DonationPaymentMethod {
  const method = donationPaymentMethods.find((candidate) => candidate.id === id);

  if (!method) {
    throw new Error(`Unknown donation payment method: ${id}`);
  }

  return method;
}

export function getAvailableDonationPaymentMethods(): readonly AvailableDonationPaymentMethod[] {
  return donationPaymentMethods.filter(
    (method): method is AvailableDonationPaymentMethod => method.enabled,
  );
}

export function getUnavailableDonationPaymentMethods(): readonly UnavailableDonationPaymentMethod[] {
  return donationPaymentMethods.filter(
    (method): method is UnavailableDonationPaymentMethod => !method.enabled,
  );
}

export function isDonationPaymentMethodAvailable(
  id: DonationPaymentMethodId,
): boolean {
  return getDonationPaymentMethod(id).enabled;
}
