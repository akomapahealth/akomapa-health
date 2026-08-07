import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CONTACT } from "@/config/contact";
import Content from "../Content";

const termsHeadings = [
  "Agreement to these terms",
  "Acceptable use",
  "Informational content—not medical advice",
  "Healthcare information and relationships",
  "Research and innovation content",
  "Applications and eligibility",
  "Donations and payments",
  "Volunteer responsibilities",
  "Code of conduct",
  "Intellectual property",
  "Limitation of liability",
  "Suspension and termination",
  "Changes to these Terms",
  "Contact",
] as const;

const termsSectionIds = [
  "acceptance",
  "acceptable-use",
  "informational-disclaimer",
  "healthcare-limitations",
  "research",
  "applications",
  "donations",
  "volunteer-conduct",
  "code-of-conduct",
  "intellectual-property",
  "liability",
  "termination",
  "changes",
  "contact",
] as const;

describe("Terms Content editorial contracts", () => {
  it("renders one h1 on a flat deep-teal editorial hero without gradient or card chrome", () => {
    const { container } = render(<Content />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Terms of Service",
    });
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    const hero = heading.closest("[data-editorial-band]");
    expect(hero).toHaveAttribute("data-editorial-tone", "teal");
    expect(hero?.className).toContain("bg-[#0F4C5C]");
    expect(hero?.className).not.toContain("gradient");
    expect(hero?.className).not.toContain("blur-3xl");

    expect(container.innerHTML).not.toContain("shadow-xl");
    expect(container.querySelector("[data-publication-article-measure]")).toBeTruthy();
    expect(container.querySelector("[data-legal-prose-article]")).toBeTruthy();
  });

  it("preserves approved terms headings, section anchors, date, and links", () => {
    render(<Content />);

    for (const title of termsHeadings) {
      expect(
        screen.getByRole("heading", { level: 2, name: title }),
      ).toBeInTheDocument();
    }

    for (const id of termsSectionIds) {
      expect(document.getElementById(id)).toBeTruthy();
    }

    expect(
      screen.getAllByText("Last updated: May 9, 2026").length,
    ).toBeGreaterThanOrEqual(1);

    expect(
      screen
        .getByRole("heading", { level: 2, name: "Agreement to these terms" })
        .closest("section")
        ?.querySelector('a[href="/privacy"]'),
    ).toHaveAttribute("href", "/privacy");

    const mailLinks = screen.getAllByRole("link", {
      name: CONTACT.email.display,
    });
    expect(mailLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of mailLinks) {
      expect(link).toHaveAttribute("href", CONTACT.email.href);
    }

    expect(
      screen.getByRole("link", { name: "contact page" }),
    ).toHaveAttribute("href", "/contact");

    expect(screen.getByText("www.akomapahealth.org")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "On this page" }),
    ).toBeInTheDocument();
  });

  it("uses a cream body band with semantic legal sections and restrained rules", () => {
    render(<Content />);

    const bodyBand = document.querySelector(
      '[data-editorial-band][data-editorial-tone="cream"]',
    );
    expect(bodyBand).toBeTruthy();

    expect(document.querySelectorAll("[data-legal-section]").length).toBe(
      termsHeadings.length,
    );

    const rules = document.querySelectorAll("[data-legal-section-rule]");
    expect(rules.length).toBeGreaterThanOrEqual(termsHeadings.length);
    for (const rule of rules) {
      expect(rule).toHaveAttribute("aria-hidden", "true");
    }
  });
});
