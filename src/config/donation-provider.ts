export const GIVEBUTTER_ENABLE_ENV =
  "NEXT_PUBLIC_GIVEBUTTER_DONATIONS_ENABLED" as const;

export type DonationProviderId = "givebutter";
export type DonationProviderStatus = "available" | "pendingVerification";
export type DonationEntryPointId = "partner" | "oneTime";
export type DonationFrequency = "monthly";

export type DonationEntryPoint = {
  id: DonationEntryPointId;
  label: string;
  frequency?: DonationFrequency;
};

export type GhanaDonationMethod = {
  id: "mtnMobileMoney";
  type: "manualTransfer";
  status: "available";
  enabled: true;
  verified: true;
  label: string;
  description: string;
  instructions: string;
  accountName: string;
  network: "MTN";
  phone: string;
  supportsRecurring: false;
  verificationNote: string;
};

type DonationProviderBase = {
  id: DonationProviderId;
  accountId: string;
  campaignCode: string;
  campaignUrl: string;
  widgetLibraryUrl: string;
  entryPoints: Readonly<Record<DonationEntryPointId, DonationEntryPoint>>;
  unavailableMessage: string;
  configurationErrorMessage: string;
};

export type AvailableDonationProvider = DonationProviderBase & {
  enabled: true;
  status: "available";
};

export type UnavailableDonationProvider = DonationProviderBase & {
  enabled: false;
  status: "pendingVerification";
};

export type DonationProviderConfig =
  | AvailableDonationProvider
  | UnavailableDonationProvider;

const givebutterProviderBase = {
  id: "givebutter",
  accountId: "cwQQcFP3IiomlFGf",
  campaignCode: "HE1MLG",
  campaignUrl:
    "https://givebutter.com/akomapa-health-foundation-donations-he1mlg",
  widgetLibraryUrl:
    "https://widgets.givebutter.com/latest.umd.cjs?acct=cwQQcFP3IiomlFGf&p=other",
  entryPoints: {
    partner: {
      id: "partner",
      label: "Partners Program",
      frequency: "monthly",
    },
    oneTime: {
      id: "oneTime",
      label: "One-Time Gift",
    },
  },
  unavailableMessage:
    "Online donations are temporarily unavailable while our secure giving account is being verified.",
  configurationErrorMessage:
    "The secure donation form could not be loaded. Please try again or use the Givebutter campaign link.",
} as const satisfies DonationProviderBase;

export const ghanaMobileMoneyDonation = {
  id: "mtnMobileMoney",
  type: "manualTransfer",
  status: "available",
  enabled: true,
  verified: true,
  label: "MTN Mobile Money",
  description:
    "Send a one-time donation directly to Akomapa Health Foundation in Ghana.",
  instructions:
    "Use MTN Mobile Money to send your chosen amount in Ghana cedis to the number below.",
  accountName: "Akomapa Health Foundation",
  network: "MTN",
  phone: "0249292898",
  supportsRecurring: false,
  verificationNote:
    "Before completing your transfer, please confirm the account name appears as Akomapa Health Foundation.",
} as const satisfies GhanaDonationMethod;

export function isGivebutterDonationsEnabled(
  env?: Readonly<Record<string, string | undefined>>,
): boolean {
  const configuredValue = env
    ? env[GIVEBUTTER_ENABLE_ENV]
    : process.env.NEXT_PUBLIC_GIVEBUTTER_DONATIONS_ENABLED;

  return configuredValue === "true";
}

export function getDonationProviderConfig(
  env?: Readonly<Record<string, string | undefined>>,
): DonationProviderConfig {
  if (isGivebutterDonationsEnabled(env)) {
    return {
      ...givebutterProviderBase,
      enabled: true,
      status: "available",
    };
  }

  return {
    ...givebutterProviderBase,
    enabled: false,
    status: "pendingVerification",
  };
}

export function getDonationEntryPoint(
  id: DonationEntryPointId,
  config: DonationProviderConfig = getDonationProviderConfig(),
): DonationEntryPoint {
  return config.entryPoints[id];
}
