import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Content from "../Content";

const privacyHeadings = [
  "Who we are and what this policy covers",
  "Information we collect",
  "How we use information",
  "Forms and applications",
  "Cookies, local storage, and similar technologies",
  "Analytics and performance",
  "How we share information",
  "International transfers",
  "Data security",
  "Your rights and choices",
  "Children's privacy",
  "Changes to this Privacy Policy",
  "Contact us",
] as const;

const privacySectionIds = [
  "scope",
  "information-we-collect",
  "how-we-use-information",
  "forms",
  "cookies-local-storage",
  "analytics",
  "sharing",
  "international",
  "security",
  "rights",
  "children",
  "changes",
  "contact",
] as const;

describe("Privacy Content editorial contracts", () => {
  it("renders one h1 on a flat deep-teal editorial hero without gradient or card chrome", () => {
    const { container } = render(<Content />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Privacy Policy",
    });
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    const hero = heading.closest("[data-editorial-band]");
    expect(hero).toHaveAttribute("data-editorial-tone", "teal");
    expect(hero?.className).toContain("bg-[#0F4C5C]");
    expect(hero?.className).not.toContain("gradient");
    expect(hero?.className).not.toContain("blur-3xl");

    expect(container.innerHTML).not.toContain("shadow-xl");
    expect(container.innerHTML).not.toContain("rounded-2xl shadow");
    expect(container.querySelector("[data-publication-article-measure]")).toBeTruthy();
    expect(container.querySelector("[data-legal-prose-article]")).toBeTruthy();
  });

  it("preserves approved privacy headings, section anchors, date, and links", () => {
    render(<Content />);

    for (const title of privacyHeadings) {
      expect(
        screen.getByRole("heading", { level: 2, name: title }),
      ).toBeInTheDocument();
    }

    for (const id of privacySectionIds) {
      expect(document.getElementById(id)).toBeTruthy();
    }

    expect(screen.getByText("Last updated: May 9, 2026")).toBeInTheDocument();

    const mailLinks = screen.getAllByRole("link", {
      name: "akomapahealth@gmail.com",
    });
    expect(mailLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of mailLinks) {
      expect(link).toHaveAttribute("href", "mailto:akomapahealth@gmail.com");
    }

    expect(
      screen.getByRole("link", { name: "contact page" }),
    ).toHaveAttribute("href", "/contact");

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Contact and partnership messages",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Volunteer applications",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Educational programs and future platforms",
      }),
    ).toBeInTheDocument();
  });

  it("uses a cream body band with restrained mustard/teal section rules", () => {
    render(<Content />);

    const bodyBand = document.querySelector(
      '[data-editorial-band][data-editorial-tone="cream"]',
    );
    expect(bodyBand).toBeTruthy();

    const rules = document.querySelectorAll("[data-legal-section-rule]");
    expect(rules.length).toBeGreaterThanOrEqual(privacyHeadings.length);
    for (const rule of rules) {
      expect(rule).toHaveAttribute("aria-hidden", "true");
    }
  });
});
