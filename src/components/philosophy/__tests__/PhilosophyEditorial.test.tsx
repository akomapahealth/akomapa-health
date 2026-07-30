import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PhilosophyHero from "@/components/philosophy/PhilosophyHero";
import PhilosophySection from "@/components/philosophy/PhilosophySection";
import PhilosophyVision from "@/components/philosophy/PhilosophyVision";
import { silentEpidemicContent } from "@/data/homepage-narrative";
import { philosophySections } from "@/data/philosophy";

function PhilosophyContent() {
  return (
    <>
      <PhilosophyHero />
      {philosophySections.map((section, index) => (
        <PhilosophySection
          key={section.id}
          section={section}
          index={index}
        />
      ))}
      <PhilosophyVision />
    </>
  );
}

describe("Philosophy editorial content", () => {
  it("preserves one h1 and all nine principles in their approved order", () => {
    const { container } = render(<PhilosophyContent />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const principles = Array.from(
      container.querySelectorAll("[data-philosophy-principle]"),
    );

    expect(principles).toHaveLength(9);
    expect(
      principles.map((principle) =>
        Number(principle.getAttribute("data-philosophy-principle")),
      ),
    ).toEqual(philosophySections.map(({ order }) => order));

    for (const section of philosophySections) {
      expect(
        screen.getByRole("heading", { level: 2, name: section.title }),
      ).toBeInTheDocument();
    }
  });

  it("keeps the cream and teal sequence and semantic pull quotes", () => {
    const { container } = render(<PhilosophyContent />);
    const principles = Array.from(
      container.querySelectorAll("[data-philosophy-principle]"),
    );

    principles.forEach((principle, index) => {
      const band = principle.closest("[data-editorial-band]");
      expect(band).toHaveAttribute(
        "data-editorial-tone",
        index % 2 === 0 ? "cream" : "teal",
      );
    });

    const approvedQuotes = philosophySections.flatMap((section) =>
      section.quote ? [section.quote] : [],
    );
    expect(container.querySelectorAll("blockquote")).toHaveLength(
      approvedQuotes.length,
    );
    for (const quote of approvedQuotes) {
      expect(screen.getByText(quote.text)).toBeInTheDocument();
      expect(screen.getAllByText(quote.author).length).toBeGreaterThan(0);
    }
  });

  it("renders ruled hero metrics and preserves both CTA destinations", () => {
    const { container } = render(<PhilosophyContent />);

    const metrics = container.querySelector("[data-philosophy-metrics]");
    expect(metrics).toHaveClass("border-y");
    expect(screen.getByText("43M")).toBeInTheDocument();
    expect(screen.getByText("73%")).toBeInTheDocument();
    expect(screen.getByText("18M")).toBeInTheDocument();
    for (const metric of silentEpidemicContent.metrics) {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
    }

    expect(
      screen.getAllByRole("link", { name: "Join Us" }),
    ).toSatisfy((links: HTMLElement[]) =>
      links.every((link) => link.getAttribute("href") === "/get-involved"),
    );
    expect(
      screen.getAllByRole("link", { name: "Partner With Us" }),
    ).toSatisfy((links: HTMLElement[]) =>
      links.every((link) => link.getAttribute("href") === "/partnerships"),
    );
  });
});
