import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  LegalContentsNav,
  LegalLastUpdated,
  LegalProseArticle,
  LegalSection,
  LegalSectionRule,
  legalBodyClassName,
  legalLinkClassName,
} from "@/components/legal/LegalDocumentPrimitives";

describe("LegalDocumentPrimitives", () => {
  it("renders a decorative section rule that is hidden from assistive technology", () => {
    const { container } = render(<LegalSectionRule variant="amber" />);

    const rule = container.querySelector("[data-legal-section-rule]");
    expect(rule).toBeTruthy();
    expect(rule).toHaveAttribute("aria-hidden", "true");
    expect(rule).toHaveAttribute("data-legal-section-rule-variant", "amber");
    expect(rule?.className).not.toContain("gradient");
    expect(rule?.className).not.toContain("shadow");
  });

  it("renders semantic legal sections with headings and section rules", () => {
    render(
      <LegalSection id="scope" ruleVariant="teal" title="Who we are">
        <p className={legalBodyClassName}>Body copy</p>
      </LegalSection>,
    );

    const section = document.getElementById("scope");
    expect(section?.tagName).toBe("SECTION");
    expect(section).toHaveAttribute("data-legal-section");
    expect(
      screen.getByRole("heading", { level: 2, name: "Who we are" }),
    ).toHaveAttribute("id", "scope-heading");
    expect(section?.querySelector("[data-legal-section-rule]")).toBeTruthy();
  });

  it("renders an on-this-page contents nav with numbered anchors", () => {
    render(
      <LegalContentsNav
        items={[
          { href: "#scope", label: "Who we are" },
          { href: "#contact", label: "Contact us" },
        ]}
      />,
    );

    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(nav).toHaveAttribute("data-legal-contents");
    expect(screen.getByRole("link", { name: /Who we are/i })).toHaveAttribute(
      "href",
      "#scope",
    );
    expect(screen.getByRole("link", { name: /Contact us/i })).toHaveAttribute(
      "href",
      "#contact",
    );
  });

  it("renders the last-updated line with the provided date", () => {
    render(<LegalLastUpdated date="May 9, 2026" />);

    expect(screen.getByText("Last updated: May 9, 2026")).toBeInTheDocument();
    expect(
      document.querySelector("[data-legal-last-updated]"),
    ).toBeInTheDocument();
  });

  it("renders a semantic prose article without card or gradient chrome", () => {
    render(
      <LegalProseArticle labelledBy="privacy-policy-title">
        <h2 id="privacy-policy-title">Privacy Policy</h2>
        <p className={legalBodyClassName}>Body copy</p>
        <a className={legalLinkClassName} href="mailto:akomapahealth@gmail.com">
          akomapahealth@gmail.com
        </a>
      </LegalProseArticle>,
    );

    const article = document.querySelector("[data-legal-prose-article]");
    expect(article).toBeTruthy();
    expect(article).toHaveAttribute("aria-labelledby", "privacy-policy-title");
    expect(article?.className).not.toContain("rounded-2xl");
    expect(article?.className).not.toContain("shadow-xl");
    expect(article?.className).not.toContain("gradient");
    expect(
      screen.getByRole("link", { name: "akomapahealth@gmail.com" }),
    ).toHaveAttribute("href", "mailto:akomapahealth@gmail.com");
  });
});
