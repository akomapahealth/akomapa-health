import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "@/components/layout/Footer";
import { BRAND } from "@/config/brand";
import { CONTACT } from "@/config/contact";

describe("Footer", () => {
  it("renders the editorial footer structure without changing its foundation", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveAttribute("data-site-footer");
    expect(footer).toHaveClass("bg-[#FCFAEF]");
    expect(footer).toHaveTextContent(BRAND.footerMission);
    expect(footer).toHaveTextContent(BRAND.legalNotice);
    expect(
      within(footer).getByRole("heading", { name: "Quick Links" }),
    ).toBeVisible();
    expect(
      within(footer).getByRole("heading", { name: "Our Initiatives" }),
    ).toBeVisible();
    expect(
      within(footer).getByRole("heading", { name: "Contact Us" }),
    ).toBeVisible();
    expect(
      within(footer).getByRole("heading", {
        name: "Join the Akomapa newsletter",
      }),
    ).toBeVisible();
  });

  it("preserves contact, social, and legal destinations", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    for (const social of ["Facebook", "TikTok", "Instagram", "LinkedIn"]) {
      expect(within(footer).getByRole("link", { name: social })).toBeVisible();
    }

    expect(
      within(footer).getByRole("link", { name: CONTACT.email.display }),
    ).toHaveAttribute("href", CONTACT.email.href);
    expect(
      within(footer).getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "/privacy");
    expect(
      within(footer).getByRole("link", { name: "Terms of Service" }),
    ).toHaveAttribute("href", "/terms");
  });
});
