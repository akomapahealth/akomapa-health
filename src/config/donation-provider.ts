export const GIVEBUTTER_ENABLE_ENV =
  "NEXT_PUBLIC_GIVEBUTTER_DONATIONS_ENABLED" as const;

export type DonationProviderId = "givebutter";
export type DonationProviderStatus = "available" | "pendingVerification";
export type DonationEntryPointId = "partner" | "oneTime";
export type DonationFrequency = "monthly";
export type DonationAmount = 25 | 50 | 100 | 250;

export type DonationEntryPoint = {
  id: DonationEntryPointId;
  label: string;
  frequency?: DonationFrequency;
  suggestedAmounts: readonly DonationAmount[];
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

const suggestedAmounts = [25, 50, 100, 250] as const;

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
      suggestedAmounts,
    },
    oneTime: {
      id: "oneTime",
      label: "One-Time Gift",
      suggestedAmounts,
    },
  },
  unavailableMessage:
    "Online donations are temporarily unavailable while our secure giving account is being verified.",
  configurationErrorMessage:
    "The secure donation form could not be loaded. Please try again or use the Givebutter campaign link.",
} as const satisfies DonationProviderBase;

export function isGivebutterDonationsEnabled(
  env: Readonly<Record<string, string | undefined>> = process.env,
): boolean {
  return env[GIVEBUTTER_ENABLE_ENV] === "true";
}

export function getDonationProviderConfig(
  env: Readonly<Record<string, string | undefined>> = process.env,
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

export function isSupportedDonationAmount(
  amount: number,
  entryPoint: DonationEntryPoint,
): amount is DonationAmount {
  return entryPoint.suggestedAmounts.some(
    (suggestedAmount) => suggestedAmount === amount,
  );
}
