import { describe, expect, it } from "vitest";
import {
  GIVEBUTTER_ENABLE_ENV,
  ghanaMobileMoneyDonation,
  getDonationEntryPoint,
  getDonationProviderConfig,
  isGivebutterDonationsEnabled,
} from "@/config/donation-provider";

describe("donation provider configuration", () => {
  it("fails closed when the explicit rollout flag is absent", () => {
    const provider = getDonationProviderConfig({});

    expect(provider).toMatchObject({
      id: "givebutter",
      enabled: false,
      status: "pendingVerification",
    });
    expect(isGivebutterDonationsEnabled({})).toBe(false);
  });

  it("enables the provider only for the exact true value", () => {
    const enabledEnv = { [GIVEBUTTER_ENABLE_ENV]: "true" };

    expect(getDonationProviderConfig(enabledEnv)).toMatchObject({
      id: "givebutter",
      enabled: true,
      status: "available",
    });
    expect(
      isGivebutterDonationsEnabled({ [GIVEBUTTER_ENABLE_ENV]: "TRUE" }),
    ).toBe(false);
  });

  it("contains only public campaign identifiers and the official HTTPS widget", () => {
    const provider = getDonationProviderConfig({});

    expect(provider).toMatchObject({
      accountId: "cwQQcFP3IiomlFGf",
      campaignCode: "HE1MLG",
      campaignUrl:
        "https://givebutter.com/akomapa-health-foundation-donations-he1mlg",
      widgetLibraryUrl:
        "https://widgets.givebutter.com/latest.umd.cjs?acct=cwQQcFP3IiomlFGf&p=other",
    });
    expect(Object.keys(provider)).not.toEqual(
      expect.arrayContaining([
        "secret",
        "apiKey",
        "bankDetails",
        "accountNumber",
        "handle",
      ]),
    );
  });

  it("uses one campaign with distinct monthly and one-time defaults", () => {
    const provider = getDonationProviderConfig({});
    const partner = getDonationEntryPoint("partner", provider);
    const oneTime = getDonationEntryPoint("oneTime", provider);

    expect(partner.frequency).toBe("monthly");
    expect(oneTime.frequency).toBeUndefined();
  });

  it("exposes only the verified Ghana Mobile Money destination", () => {
    expect(ghanaMobileMoneyDonation).toMatchObject({
      id: "mtnMobileMoney",
      type: "manualTransfer",
      status: "available",
      enabled: true,
      verified: true,
      accountName: "Akomapa Health Foundation",
      network: "MTN",
      phone: "0249292898",
      supportsRecurring: false,
    });
    expect(ghanaMobileMoneyDonation).not.toHaveProperty("url");
    expect(ghanaMobileMoneyDonation).not.toHaveProperty("handle");
  });
});
