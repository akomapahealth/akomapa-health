import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ResearchPaperContent from "@/app/(main)/research/[slug]/ResearchPaperContent";
import {
  getResearchPaperBySlug,
  PLOS_GLOBAL_PUBLIC_HEALTH_DOI,
  researchPapers,
} from "@/data/research-papers";

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
  it.each(researchPapers.map((paper) => [paper.slug, paper] as const))(
    "preserves paper metadata and document action contracts for %s",
    (_slug, paper) => {
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
      expect(screen.getByText(paper.abstract)).toBeInTheDocument();

      expect(screen.getByRole("link", { name: "View PDF" })).toHaveAttribute(
        "href",
        "#pdf-viewer",
      );
      const download = screen.getByRole("link", { name: "Download PDF" });
      expect(download).toHaveAttribute("href", paper.pdfUrl);
      expect(download).toHaveAttribute("download", `${paper.slug}.pdf`);
      const print = screen.getByRole("link", { name: "Print PDF" });
      expect(print).toHaveAttribute("href", paper.pdfUrl);
      expect(print).toHaveAttribute("target", "_blank");
      expect(print).toHaveAttribute("rel", "noopener noreferrer");

      expect(
        screen.getByRole("link", { name: /Back to Research/i }),
      ).toHaveAttribute("href", "/research");
      expect(screen.getByTestId("deferred-pdf-viewer")).toBeInTheDocument();

      expect(container.innerHTML).not.toContain("gradient");
      expect(container.innerHTML).not.toContain("blur-3xl");
    },
  );

  it("shows the journal, DOI, citation, and publisher link for the PLOS study", () => {
    const paper = getResearchPaperBySlug(
      "stakeholder-support-student-run-free-clinics-ghana",
    )!;
    render(<ResearchPaperContent paper={paper} />);

    expect(screen.getByText("PLOS Global Public Health")).toBeInTheDocument();

    const doiUrl = `https://doi.org/${PLOS_GLOBAL_PUBLIC_HEALTH_DOI}`;
    const doiLink = screen.getByRole("link", {
      name: `DOI: ${PLOS_GLOBAL_PUBLIC_HEALTH_DOI}`,
    });
    expect(doiLink).toHaveAttribute("href", doiUrl);
    expect(doiLink).toHaveAttribute("target", "_blank");
    expect(doiLink).toHaveAttribute("rel", "noopener noreferrer");

    const citation = screen.getByTestId("research-citation");
    expect(citation).toHaveTextContent("Cite this paper");
    expect(citation).toHaveTextContent(paper.citation!);
    expect(citation).toHaveTextContent(doiUrl);
    expect(within(citation).queryByRole("link")).not.toBeInTheDocument();

    const publisher = screen.getByRole("link", {
      name: "Read on PLOS Global Public Health",
    });
    expect(publisher).toHaveAttribute("href", paper.publisherUrl);
    expect(publisher).toHaveAttribute("target", "_blank");
    expect(publisher).toHaveAttribute("rel", "noopener noreferrer");

    expect(screen.getByText(`Published: ${paper.date}`).closest("time")).toHaveAttribute(
      "dateTime",
      "2026-09-21",
    );
  });

  it("keeps the thesis entry free of journal and DOI chrome", () => {
    const paper = getResearchPaperBySlug("student-led-interventions")!;
    render(<ResearchPaperContent paper={paper} />);

    expect(screen.getByText("Research Paper")).toBeInTheDocument();
    expect(screen.queryByText(/^DOI:/)).not.toBeInTheDocument();
    expect(screen.queryByTestId("research-citation")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Read on EliScholar" }),
    ).toHaveAttribute("href", "https://elischolar.library.yale.edu/ymtdl/4313");
  });
});
