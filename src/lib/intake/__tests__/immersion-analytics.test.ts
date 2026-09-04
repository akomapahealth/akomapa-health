import { afterEach, describe, expect, it, vi } from "vitest";
import { trackImmersionOperationalEvent } from "@/lib/intake/immersion-analytics";

afterEach(() => {
  delete (window as unknown as { gtag?: unknown }).gtag;
});

describe("Immersion operational analytics", () => {
  it("emits only bounded identifiers and normalized categories", () => {
    const gtag = vi.fn();
    window.gtag = gtag as typeof window.gtag;

    trackImmersionOperationalEvent({
      type: "provider_failed",
      intent: "request_brochure",
      category: "load_timeout",
    });

    expect(gtag).toHaveBeenCalledWith("event", "intake_provider_failed", {
      form_key: "immersion",
      intent: "request_brochure",
      error_category: "load_timeout",
    });
    expect(JSON.stringify(gtag.mock.calls)).not.toMatch(
      /email|fullName|phone|submissionUuid|providerPayload/,
    );
  });
});
