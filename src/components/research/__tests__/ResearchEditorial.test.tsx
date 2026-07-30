import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Content from "@/app/(main)/research/Content";
import { researchPapers } from "@/data/research-papers";

describe("Research listing editorial", () => {
  it("renders a flat editorial hero and publication entries without gradients", () => {
    const { container } = render(<Content />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Evidence-based research driving healthcare innovation/i,
      }),
    ).toBeInTheDocument();

    const bands = container.querySelectorAll("[data-editorial-band]");
    expect(bands.length).toBeGreaterThanOrEqual(3);
    expect(bands[0]).toHaveAttribute("data-editorial-tone", "teal");

    const paper = researchPapers[0];
    expect(
      screen.getByRole("heading", { level: 3, name: paper.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(paper.authors)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Read Paper/i }),
    ).toHaveAttribute("href", `/research/${paper.slug}`);

    expect(container.innerHTML).not.toContain("gradient");
    expect(container.innerHTML).not.toContain("blur-3xl");
  });

  it("preserves the research contact mailto destination", () => {
    render(<Content />);

    expect(
      screen.getByRole("link", { name: /akomapahealth@gmail.com/i }),
    ).toHaveAttribute("href", "mailto:akomapahealth@gmail.com");
  });
});
