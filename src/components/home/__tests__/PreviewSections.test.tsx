import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AcademyPreviewSection from "@/components/home/AcademyPreviewSection";
import CommunityHubsPreviewSection from "@/components/home/CommunityHubsPreviewSection";
import { academyOverview } from "@/data/academy";
import {
  academyPreviewContent,
  communityHubsPreviewContent,
} from "@/data/homepage-narrative";

describe("homepage program preview sections", () => {
  it("renders the canonical Academy overview, image, and CTA", () => {
    render(<AcademyPreviewSection />);

    const section = screen.getByRole("region", {
      name: academyOverview.title,
    });

    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: academyOverview.title,
      }),
    ).toBeInTheDocument();
    expect(within(section).getByText(academyOverview.description)).toBeVisible();
    expect(
      within(section).getByRole("link", {
        name: academyPreviewContent.cta.label,
      }),
    ).toHaveAttribute("href", academyPreviewContent.cta.href);
    expect(
      within(section).getByRole("img", {
        name: academyPreviewContent.image.alt,
      }),
    ).toBeInTheDocument();
  });

  it("renders three data-driven hub cards with accents and detail links", () => {
    render(<CommunityHubsPreviewSection />);

    const section = screen.getByRole("region", {
      name: communityHubsPreviewContent.heading,
    });
    const cards = within(section).getAllByTestId("community-hub-card");

    expect(cards).toHaveLength(3);

    for (const hub of communityHubsPreviewContent.hubs) {
      const card = cards.find((element) => element.dataset.hubId === hub.id);

      expect(card).toBeDefined();
      expect(card).toHaveAttribute("data-accent-color", hub.color);
      expect(card).toHaveStyle({ borderTopColor: hub.color });
      expect(
        within(card as HTMLElement).getByRole("heading", {
          level: 3,
          name: hub.name,
        }),
      ).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByText(
          `${hub.location}, ${hub.country}`,
        ),
      ).toBeVisible();
      expect(within(card as HTMLElement).getByText(hub.description)).toBeVisible();
      expect(
        within(card as HTMLElement).getByRole("link", {
          name: `Learn more about ${hub.name}`,
        }),
      ).toHaveAttribute("href", hub.href);
      expect(
        within(card as HTMLElement).getByRole("img", {
          name: `${hub.name} in ${hub.location}`,
        }),
      ).toBeInTheDocument();
    }
  });
});
