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

      expect(
        within(card as HTMLElement).getByRole("heading", {
          level: 3,
          name: pillar.title,
        }),
      ).toBeVisible();
      expect(within(card as HTMLElement).getByText(pillar.description)).toBeVisible();
      expect(card).toHaveAccessibleName(`Learn more about ${pillar.title}`);
      expect(card).toHaveAttribute("href", pillar.link);
      expect(
        within(card as HTMLElement).getByRole("img", {
          name: pillar.image.alt,
        }),
      ).toHaveAttribute("src", pillar.image.src);

      for (const feature of pillar.features) {
        expect(within(card as HTMLElement).queryByText(feature)).not.toBeInTheDocument();
      }

      expect((card as HTMLElement).querySelector("svg")).toBeNull();
    }
  });
});
