import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  PublicationArticleMeasure,
  PublicationBackLink,
  PublicationDocumentActions,
  PublicationEmptyState,
  PublicationEntry,
  PublicationFilterChip,
  PublicationMeta,
} from "@/components/publication";

describe("Publication primitives", () => {
  it("renders metadata labels for assistive technology with visible values", () => {
    render(
      <PublicationMeta
        items={[
          { label: "Category", value: "Recognition" },
          { label: "Published", value: "July 1, 2026", dateTime: "2026-07-01" },
          { label: "Author", value: "Ada Lovelace" },
        ]}
      />,
    );

    const meta = document.querySelector("[data-publication-meta]");
    expect(meta).toBeTruthy();
    expect(meta?.className).not.toContain("gradient");
    expect(screen.getByText("Recognition")).toBeInTheDocument();
    expect(screen.getByText("July 1, 2026")).toBeInTheDocument();
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("Category")).toHaveClass("sr-only");
  });

  it("exposes document actions with download and external semantics", () => {
    render(
      <PublicationDocumentActions
        actions={[
          { href: "#pdf-viewer", label: "View PDF", variant: "primary" },
          {
            href: "/documents/research.pdf",
            label: "Download PDF",
            download: "paper.pdf",
          },
          {
            href: "/documents/research.pdf",
            label: "Print PDF",
            external: true,
          },
        ]}
      />,
    );

    const nav = screen.getByRole("navigation", { name: "Document actions" });
    expect(nav).toHaveAttribute("data-publication-document-actions");

    expect(screen.getByRole("link", { name: "View PDF" })).toHaveAttribute(
      "href",
      "#pdf-viewer",
    );
    expect(screen.getByRole("link", { name: "Download PDF" })).toHaveAttribute(
      "download",
      "paper.pdf",
    );
    const print = screen.getByRole("link", { name: "Print PDF" });
    expect(print).toHaveAttribute("target", "_blank");
    expect(print).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders an empty state status region without marketing card chrome", () => {
    const { container } = render(
      <PublicationEmptyState
        title="No Resources Found"
        description="Try adjusting your filters."
      />,
    );

    expect(screen.getByRole("status")).toHaveAttribute(
      "data-publication-empty-state",
    );
    expect(screen.getByRole("heading", { level: 3, name: "No Resources Found" })).toBeInTheDocument();
    expect(container.innerHTML).not.toContain("gradient");
    expect(container.innerHTML).not.toContain("shadow-");
  });

  it("communicates filter selection with aria-pressed and a selected cue", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <PublicationFilterChip label="Recognition" selected onClick={onClick} />,
    );

    const chip = screen.getByRole("button", {
      name: /Recognition/,
    });
    expect(chip).toHaveAttribute("aria-pressed", "true");
    expect(chip).toHaveAttribute("data-selected", "true");
    expect(chip).toHaveClass("min-h-11");
    expect(chip.className).toContain("font-bold");

    await user.click(chip);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders a border-led publication entry with durable CTA target sizing", () => {
    const { container } = render(
      <PublicationEntry
        href="/research/student-led-interventions"
        title="Student-led interventions"
        description="An abstract about community care."
        ctaLabel="Read Paper"
        meta={[
          { label: "Authors", value: "A. Researcher" },
          { label: "Published", value: "2025" },
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Student-led interventions",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/research/student-led-interventions",
    );
    expect(screen.getByText("Read Paper")).toHaveClass("min-h-11");
    expect(container.querySelector("[data-publication-entry]")).toBeTruthy();
    expect(container.innerHTML).not.toContain("gradient");
    expect(container.innerHTML).not.toContain("hover:shadow");
  });

  it("provides back navigation and a readable article measure", () => {
    render(
      <>
        <PublicationBackLink href="/news" tone="light">
          Back to News
        </PublicationBackLink>
        <PublicationArticleMeasure>
          <p>Long-form body copy.</p>
        </PublicationArticleMeasure>
      </>,
    );

    const back = screen.getByRole("link", { name: /Back to News/ });
    expect(back).toHaveAttribute("data-publication-back-link");
    expect(back).toHaveClass("min-h-11");
    expect(
      document.querySelector("[data-publication-article-measure]"),
    ).toHaveClass("max-w-[65ch]");
  });
});
