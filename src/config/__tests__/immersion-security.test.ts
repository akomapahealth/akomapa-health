import { describe, expect, it } from "vitest";

import {
  IMMERSION_ROUTE,
  IMMERSION_SECURITY_HEADERS,
} from "@/config/immersion-security";
import { FILLOUT_EMBED_ORIGIN } from "@/lib/intake/immersion-registry";

describe("Immersion security headers", () => {
  it("limits frames on the Immersion route to the app and exact Fillout origin", () => {
    const contentSecurityPolicy = IMMERSION_SECURITY_HEADERS.find(
      ({ key }) => key === "Content-Security-Policy",
    );

    expect(IMMERSION_ROUTE).toBe("/global-health-immersion-program");
    expect(contentSecurityPolicy?.value).toBe(
      `base-uri 'self'; object-src 'none'; frame-ancestors 'none'; frame-src 'self' ${FILLOUT_EMBED_ORIGIN};`,
    );
    expect(contentSecurityPolicy?.value).not.toContain("*");
    expect(contentSecurityPolicy?.value).not.toContain("forms.fillout.com");
  });

  it("denies device capabilities excluded from the approved field contract", () => {
    const permissionsPolicy = IMMERSION_SECURITY_HEADERS.find(
      ({ key }) => key === "Permissions-Policy",
    );

    expect(permissionsPolicy?.value).toBe(
      "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    );
  });
});
