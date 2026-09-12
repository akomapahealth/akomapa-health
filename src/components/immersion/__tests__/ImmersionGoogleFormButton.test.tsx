import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ImmersionGoogleFormButton from "@/components/immersion/ImmersionGoogleFormButton";
import {
  IMMERSION_APPLICATION_FORM_URL,
  IMMERSION_INFO_SESSION_FORM_URL,
} from "@/config/links";

describe("ImmersionGoogleFormButton", () => {
  it.each([
    ["application", "Apply Now", IMMERSION_APPLICATION_FORM_URL],
    [
      "info-session",
      "RSVP for the Info Session",
      IMMERSION_INFO_SESSION_FORM_URL,
    ],
  ] as const)(
    "renders the %s destination as a safe external link",
    (form, label, href) => {
      render(<ImmersionGoogleFormButton form={form} />);

      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    },
  );
});
