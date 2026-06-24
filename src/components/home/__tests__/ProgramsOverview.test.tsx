import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProgramsOverview from "@/components/home/ProgramsOverview";
import { pillars } from "@/data/pillars";

describe("ProgramsOverview", () => {
  it("renders the four organizational pillars from canonical data", () => {
    render(<ProgramsOverview />);

    const section = screen.getByRole("region", {
      name: "What We Do",
    });
    const cards = within(section).getAllByTestId("program-pillar-card");

    expect(cards).toHaveLength(4);

    for (const pillar of pillars) {
      const card = cards.find((element) => element.dataset.pillarId === pillar.id);

      expect(card).toBeDefined();
      expect(card).toHaveAttribute("data-accent-color", pillar.color);
      expect(card).toHaveStyle({ borderTopColor: pillar.color });

      expect(
        within(card as HTMLElement).getByRole("heading", {
          level: 3,
          name: pillar.title,
        }),
      ).toBeVisible();
      expect(within(card as HTMLElement).getByText(pillar.description)).toBeVisible();
      expect(
        within(card as HTMLElement).getByRole("link", {
          name: `Learn more about ${pillar.title}`,
        }),
      ).toHaveAttribute("href", pillar.link);

      for (const feature of pillar.features) {
        expect(within(card as HTMLElement).getByText(feature)).toBeVisible();
      }
    }
  });
});
