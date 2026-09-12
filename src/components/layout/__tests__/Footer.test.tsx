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
      within(footer).getByRole("link", { name: "Send us a message" }),
    ).toHaveAttribute("href", "/contact");
    expect(
      within(footer).getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "/privacy");
    expect(
      within(footer).getByRole("link", { name: "Terms of Service" }),
    ).toHaveAttribute("href", "/terms");
  });

  it("reserves announcement FAB clearance around Subscribe and legal links", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    const shell = footer.querySelector(".site-container");
    const newsletterForm = footer.querySelector("[data-newsletter-form]");
    const legal = footer.querySelector("[data-footer-legal]");

    expect(shell?.className).toMatch(
      /pb-\[max\(3\.5rem,calc\(5rem\+env\(safe-area-inset-bottom\)\)\)\]/,
    );
    expect(shell?.className).toMatch(
      /md:pb-\[max\(4rem,calc\(5\.5rem\+env\(safe-area-inset-bottom\)\)\)\]/,
    );
    expect(newsletterForm).toHaveClass("pe-20", "sm:pe-[5.5rem]");
    expect(legal).toHaveClass("pe-20", "sm:pe-[5.5rem]");
  });
});
