import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import NkwapaSection from "@/components/home/NkwapaSection";

describe("NkwapaSection", () => {
  it("renders the labelled section with heading and four feature cards", () => {
    render(<NkwapaSection />);

    const section = screen.getByTestId("nkwapa-section");
    expect(section).toBeInTheDocument();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /offline-first emr/i,
      })
    ).toBeInTheDocument();

    expect(screen.getAllByTestId("nkwapa-feature")).toHaveLength(4);
  });

  it("renders the demo CTA pointing to staging.nkwapa.app and opening in a new tab", () => {
    render(<NkwapaSection />);

    const cta = screen.getByTestId("nkwapa-cta");
    expect(cta).toHaveAttribute("href", "https://staging.nkwapa.app");
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("renders the screenshot with descriptive alt text", () => {
    render(<NkwapaSection />);
    const screenshot = screen.getByTestId("nkwapa-screenshot");
    expect(screenshot).toHaveAttribute("alt", expect.stringMatching(/nkwapa/i));
  });
});
