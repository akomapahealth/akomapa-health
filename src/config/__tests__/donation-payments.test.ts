import { describe, expect, it } from "vitest";
import {
  donationPaymentMethods,
  getAvailableDonationPaymentMethods,
  getDonationPaymentMethod,
  getUnavailableDonationPaymentMethods,
} from "@/config/donation-payments";

describe("donation payment configuration", () => {
  it("exposes verified MTN Mobile Money as the only available method", () => {
    const availableMethods = getAvailableDonationPaymentMethods();

    expect(availableMethods).toHaveLength(1);
    expect(availableMethods[0]).toMatchObject({
      id: "mobileMoney",
      enabled: true,
      status: "available",
      verified: true,
      accountName: "Akomapa Health Foundation",
      network: "MTN",
      phone: "0249292898",
      supportsRecurring: false,
      isManualTransfer: true,
    });
  });

  it("keeps every unavailable method free of recipient details and actions", () => {
    const unavailableMethods = getUnavailableDonationPaymentMethods();

    expect(unavailableMethods).toHaveLength(donationPaymentMethods.length - 1);
    for (const method of unavailableMethods) {
      expect(method.enabled).toBe(false);
      expect(method.verified).toBe(false);
      expect(method).not.toHaveProperty("accountName");
      expect(method).not.toHaveProperty("bankDetails");
      expect(method).not.toHaveProperty("network");
      expect(method).not.toHaveProperty("phone");
      expect(method).not.toHaveProperty("handle");
      expect(method).not.toHaveProperty("url");
      expect(method.instructions).toEqual([]);
    }
  });

  it("shows only the approved pending-verification copy for bank transfer", () => {
    expect(getDonationPaymentMethod("bankTransfer")).toEqual({
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
    });
  });
});
