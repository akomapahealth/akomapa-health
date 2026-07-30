import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RoadmapContent from "@/app/(main)/roadmap/Content";
import RoadmapPhases from "@/components/roadmap/RoadmapPhases";
import { phases } from "@/components/roadmap/phases";

describe("Roadmap editorial system", () => {
  it("renders a single h1 and flat hero without emoji ornamentation", () => {
    render(<RoadmapContent />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Building sustainable care, one step at a time.",
    });
    const hero = heading.closest("section");
    expect(hero).toHaveAttribute("data-editorial-band");
    expect(heading.textContent).not.toMatch(/🧭|📣/);
    expect(document.querySelectorAll("h1")).toHaveLength(1);
  });

  it("presents phases as a readable ordered sequence with periods and goals", () => {
    render(<RoadmapPhases />);

    const section = screen.getByRole("region", {
      name: "Akomapa's 3-Year Roadmap",
    });
    const list = section.querySelector("ol.mt-14, ol[class*='mt-14']") ??
      within(section).getAllByRole("list").at(-1);
    expect(list).toBeTruthy();

    for (const phase of phases) {
      expect(screen.getByText(phase.title)).toBeVisible();
      expect(screen.getByText(phase.period)).toBeVisible();
      expect(screen.getByText(phase.focus)).toBeVisible();
      expect(screen.getByText(phase.goal)).toBeVisible();
      expect(document.getElementById(`phase-${phase.id}`)).not.toBeNull();
    }

    expect(section.querySelector("[data-slot='card']")).toBeNull();
  });

  it("preserves roadmap CTA destinations", () => {
    render(<RoadmapContent />);

    const partnerLinks = screen.getAllByRole("link", { name: /Partner With Us/i });
    expect(partnerLinks[0]).toHaveAttribute("href", "/partnerships");
    expect(screen.getByRole("link", { name: /^Donate$/i })).toHaveAttribute(
      "href",
      "/partnerships",
    );
    expect(screen.getByRole("link", { name: /Contact Us/i })).toHaveAttribute(
      "href",
      "mailto:akomapahealth@gmail.com",
    );
  });

  it("keeps chronology independent of color-only status cues", () => {
    render(<RoadmapContent />);

    const timeline = screen.getByRole("region", {
      name: "Our Journey Timeline",
    });
    const items = within(timeline).getAllByRole("listitem");
    expect(items).toHaveLength(phases.length);
    expect(
      items.map((item) => within(item).getByRole("heading", { level: 3 }).textContent),
    ).toEqual(phases.map((phase) => phase.title));
  });
});
