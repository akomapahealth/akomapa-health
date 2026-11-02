import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Content from "@/app/(main)/research/Content";
import { CONTACT } from "@/config/contact";
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

    const readLinks = screen.getAllByRole("link", { name: /Read Paper/i });
    expect(readLinks).toHaveLength(researchPapers.length);

    researchPapers.forEach((paper, index) => {
      expect(
        screen.getByRole("heading", { level: 3, name: paper.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(paper.authors)).toBeInTheDocument();
      expect(readLinks[index]).toHaveAttribute(
        "href",
        `/research/${paper.slug}`,
      );
    });

    expect(container.innerHTML).not.toContain("gradient");
    expect(container.innerHTML).not.toContain("blur-3xl");
  });

  it("lists the PLOS study first with its journal and a machine-readable date", () => {
    render(<Content />);

    const plos = researchPapers.find(
      ({ slug }) => slug === "stakeholder-support-student-run-free-clinics-ghana",
    )!;
    expect(researchPapers[0]).toBe(plos);

    const entry = screen
      .getByRole("heading", { level: 3, name: plos.title })
      .closest("[data-publication-entry]")!;
    expect(entry).toHaveTextContent("PLOS Global Public Health");
    expect(entry).toHaveTextContent(plos.summary!);
    expect(entry).not.toHaveTextContent(/odds ratio|86\.7/i);
    expect(entry.querySelector("time")).toHaveAttribute(
      "dateTime",
      "2026-09-21",
    );
  });

  it("preserves the research contact mailto destination", () => {
    render(<Content />);

    expect(
      screen.getByRole("link", { name: CONTACT.email.display }),
    ).toHaveAttribute("href", CONTACT.email.href);
  });
});
