import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ResearchPaperContent from "@/app/(main)/research/[slug]/ResearchPaperContent";
import { researchPapers } from "@/data/research-papers";

vi.mock("@/app/(main)/research/[slug]/DeferredPdfViewer", () => ({
  default: function MockDeferredPdfViewer() {
    return (
      <section data-testid="deferred-pdf-viewer" id="pdf-viewer">
        <button type="button">Load PDF viewer</button>
      </section>
    );
  },
}));

describe("Research detail editorial", () => {
  const paper = researchPapers[0];

  it("preserves paper metadata and document action contracts", () => {
    const { container } = render(<ResearchPaperContent paper={paper} />);

    expect(
      screen.getByRole("heading", { level: 1, name: paper.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(paper.authors)).toBeInTheDocument();
    expect(
      screen.getByText(`Published: ${paper.date}`),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Abstract" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "View PDF" })).toHaveAttribute(
      "href",
      "#pdf-viewer",
    );
    expect(screen.getByRole("link", { name: "Download PDF" })).toHaveAttribute(
      "download",
      `${paper.slug}.pdf`,
    );
    const print = screen.getByRole("link", { name: "Print PDF" });
    expect(print).toHaveAttribute("target", "_blank");
    expect(print).toHaveAttribute("rel", "noopener noreferrer");

    expect(
      screen.getByRole("link", { name: /Back to Research/i }),
    ).toHaveAttribute("href", "/research");

    expect(container.innerHTML).not.toContain("gradient");
    expect(container.innerHTML).not.toContain("blur-3xl");
  });
});
