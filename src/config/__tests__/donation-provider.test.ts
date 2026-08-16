import { describe, expect, it } from "vitest";
import {
  GIVEBUTTER_ENABLE_ENV,
  getDonationEntryPoint,
  getDonationProviderConfig,
  isGivebutterDonationsEnabled,
  isSupportedDonationAmount,
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

  it("uses the same approved presets for monthly and one-time entry points", () => {
    const provider = getDonationProviderConfig({});
    const partner = getDonationEntryPoint("partner", provider);
    const oneTime = getDonationEntryPoint("oneTime", provider);

    expect(partner.frequency).toBe("monthly");
    expect(oneTime.frequency).toBeUndefined();
    expect(partner.suggestedAmounts).toEqual([25, 50, 100, 250]);
    expect(oneTime.suggestedAmounts).toEqual(partner.suggestedAmounts);
    expect(isSupportedDonationAmount(50, partner)).toBe(true);
    expect(isSupportedDonationAmount(20, partner)).toBe(false);
  });
});
