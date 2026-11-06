import { describe, expect, it } from "vitest";
import * as storageKeys from "@/config/storage-keys";
import {
  cookieInventory,
  IMMERSION_SESSION_COOKIE_NAME,
  INTAKE_DRAFT_KEY_PATTERN,
  thirdPartyServices,
} from "@/config/cookies";
import { CONSENT_STORAGE_KEY, getAnalyticsCookieNames } from "@/lib/consent";
import { getIntakeDraftKey } from "@/lib/intake/drafts";
import { IMMERSION_COOKIE } from "@/lib/payments/immersion";

const names = cookieInventory.map((item) => item.name);

describe("cookie inventory", () => {
  it("documents every browser storage key the site writes", () => {
    for (const key of Object.values(storageKeys)) {
      expect(names).toContain(key);
    }
    expect(names).toContain(CONSENT_STORAGE_KEY);
  });

  it("stays in step with the immersion session cookie", () => {
    expect(IMMERSION_SESSION_COOKIE_NAME).toBe(IMMERSION_COOKIE);
    expect(names).toContain(IMMERSION_COOKIE);
  });

  it("describes intake drafts by their real key prefix", () => {
    const prefix = INTAKE_DRAFT_KEY_PATTERN.slice(0, INTAKE_DRAFT_KEY_PATTERN.indexOf("<"));
    expect(getIntakeDraftKey("general_inquiry", "volunteer")).toBe(
      `${prefix}general_inquiry:volunteer`,
    );
  });

  it("lists the GA4 cookies the consent code clears", () => {
    const analyticsNames = cookieInventory
      .filter((item) => item.category === "analytics")
      .map((item) => item.name);
    const [visitorCookie, sessionCookie] = getAnalyticsCookieNames("G-EXAMPLE");

    expect(analyticsNames).toContain(visitorCookie);
    expect(sessionCookie).toBe("_ga_EXAMPLE");
    expect(analyticsNames).toContain("_ga_<container-id>");
  });

  it("describes the click-to-load Contact page map", () => {
    const maps = thirdPartyServices.find((service) => service.name === "Google Maps");

    expect(maps?.where).toBe("Contact page");
    expect(maps?.detail).toMatch(/only after you select Show map/);
    expect(maps?.detail).not.toMatch(/loads with the page/);
  });

  it("has unique names and HTTPS privacy links", () => {
    expect(new Set(names).size).toBe(names.length);
    for (const service of thirdPartyServices) {
      expect(service.privacyUrl).toMatch(/^https:\/\//);
    }
  });
});
