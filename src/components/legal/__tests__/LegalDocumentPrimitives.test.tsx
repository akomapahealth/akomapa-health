import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  LegalLastUpdated,
  LegalProseArticle,
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
