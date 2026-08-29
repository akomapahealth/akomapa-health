import { describe, expect, it } from "vitest";

import {
  composeSecurityHeaders,
  GLOBAL_SECURITY_HEADERS,
  GLOBAL_SECURITY_ROUTE,
} from "@/config/security-headers";
import { FILLOUT_EMBED_ORIGIN } from "@/lib/intake/immersion-registry";

function value(headers: ReturnType<typeof composeSecurityHeaders>, key: string) {
  return headers.find((header) => header.key === key)?.value;
}

describe("shared security headers", () => {
  it("enforces anti-framing, MIME, referrer, capability, and transport policy", () => {
    expect(GLOBAL_SECURITY_ROUTE).toBe("/:path*");
    expect(value(GLOBAL_SECURITY_HEADERS, "X-Frame-Options")).toBe("DENY");
    expect(value(GLOBAL_SECURITY_HEADERS, "X-Content-Type-Options")).toBe(
      "nosniff",
    );
    expect(value(GLOBAL_SECURITY_HEADERS, "Referrer-Policy")).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(value(GLOBAL_SECURITY_HEADERS, "Permissions-Policy")).toContain(
      "camera=()",
    );
    expect(value(GLOBAL_SECURITY_HEADERS, "Strict-Transport-Security")).toBe(
      "max-age=31536000; includeSubDomains",
    );
  });

  it("enforces stable CSP directives while keeping the broad policy report-only", () => {
    const enforced = value(GLOBAL_SECURITY_HEADERS, "Content-Security-Policy");
    const reportOnly = value(
      GLOBAL_SECURITY_HEADERS,
      "Content-Security-Policy-Report-Only",
    );

    expect(enforced).toContain("object-src 'none'");
    expect(enforced).toContain("base-uri 'self'");
    expect(enforced).toContain("frame-ancestors 'none'");
    expect(enforced).not.toContain("default-src");
    expect(reportOnly).toContain("default-src 'self'");
    expect(reportOnly).toContain(`frame-src 'self' ${FILLOUT_EMBED_ORIGIN}`);
  });

  it("adds the exact Fillout origin only to the immersion enforcement policy", () => {
    const immersion = composeSecurityHeaders({ allowFilloutFrame: true });
    const enforced = value(immersion, "Content-Security-Policy");
    expect(enforced).toContain(`frame-src 'self' ${FILLOUT_EMBED_ORIGIN}`);
    expect(enforced).not.toContain("*");
  });
});
