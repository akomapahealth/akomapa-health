import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PeopleMotionGrid from "@/components/community-hubs/PeopleMotionGrid";

const COMPONENT_DIR = join(process.cwd(), "src/components/community-hubs");

function sourceFiles() {
  return readdirSync(COMPONENT_DIR)
    .filter((name) => name.endsWith(".tsx"))
    .map((name) => ({ name, source: readFileSync(join(COMPONENT_DIR, name), "utf8") }));
}

describe("PeopleMotionGrid", () => {
  it("reveals each card independently instead of gating the whole list", () => {
    render(
      <PeopleMotionGrid className="grid">
        {Array.from({ length: 16 }, (_, index) => (
          <article key={index}>Leader {index + 1}</article>
        ))}
      </PeopleMotionGrid>,
    );

    const list = screen.getByRole("list");
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(16);

    // The <ul> is a plain element; no list-level reveal state can hold cards hidden.
    expect(list.getAttribute("style")).toBeNull();

    // Every card carries its own reveal marker. Actual opacity after scrolling is
    // asserted in e2e/community-hub-roster-mobile.spec.ts on a real mobile viewport.
    for (const item of items) {
      expect(item).toHaveAttribute("data-people-grid-item");
    }
  });

  it("renders cards visible immediately when the user prefers reduced motion", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );

    try {
      render(
        <PeopleMotionGrid className="grid">
          <article>Leader</article>
        </PeopleMotionGrid>,
      );
      expect(screen.getByRole("listitem")).not.toHaveStyle({ opacity: "0" });
    } finally {
      vi.unstubAllGlobals();
    }
  });
});

describe("community hub scroll-reveal lists", () => {
  // Regression guard for #317: a fractional viewport `amount` can never be
  // satisfied once the observed element (a roster list, or a single card on a
  // phone) is taller than the viewport, so the reveal never fires and the
  // content stays at opacity 0. Roster surfaces must reveal on any intersection.
  it("never use a fractional viewport amount for scroll reveals", () => {
    const fractional = /amount:\s*(0?\.\d+|1)(?![\d.])/g;
    const offenders = sourceFiles().flatMap(({ name, source }) =>
      [...source.matchAll(fractional)].map((match) => `${name}: ${match[0]}`),
    );

    expect(offenders).toEqual([]);
  });

  it("reveal roster surfaces on any intersection", () => {
    const people = sourceFiles().find(({ name }) => name === "PeopleMotionGrid.tsx")!;
    const volunteers = sourceFiles().find(({ name }) => name === "VolunteerPortraitGrid.tsx")!;
    expect(people.source).toMatch(/amount:\s*"some"/);
    expect(volunteers.source).toMatch(/viewport=\{\{\s*once:\s*true,\s*amount:\s*"some"\s*\}\}/);
  });
});
