import { describe, expect, it } from "vitest";
import {
  CONTACT_NETWORK_ERROR_MESSAGE,
  getContactErrorMessage,
} from "@/lib/contact-errors";

describe("contact form error messages", () => {
  it("keeps known API failures consistent when a server message is present", () => {
    expect(
      getContactErrorMessage(503, "Contact service is temporarily unavailable."),
    ).toBe(
      "Our message service is temporarily unavailable. Please try again shortly.",
    );
  });

  it("uses safe server-provided guidance for unknown statuses", () => {
    expect(getContactErrorMessage(409, "Please retry this request.")).toBe(
      "Please retry this request.",
    );
  });

  it.each([
    [400, "Please review the highlighted information and try again."],
    [413, "Your message is too long. Please shorten it and try again."],
    [429, "You have sent several messages recently. Please wait a few minutes before trying again."],
    [500, "Something went wrong on our side. Please try again in a few minutes."],
    [502, "Our message service is temporarily unavailable. Please try again shortly."],
    [503, "Our message service is temporarily unavailable. Please try again shortly."],
  ])("provides actionable guidance for HTTP %i", (status, expected) => {
    expect(getContactErrorMessage(status)).toBe(expected);
  });

  it("falls back safely for unknown responses and network failures", () => {
    expect(getContactErrorMessage(418)).toBe(
      "Something went wrong while sending your message. Please try again.",
    );
    expect(CONTACT_NETWORK_ERROR_MESSAGE).toContain("check your connection");
  });
});
