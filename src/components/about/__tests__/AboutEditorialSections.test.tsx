import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutHero from "@/components/about/AboutHero";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import OrganizationalTimeline from "@/components/about/OrganizationalTimeline";
import WhatWeDoSection from "@/components/about/WhatWeDoSection";
import ExploreMoreSection from "@/components/about/ExploreMoreSection";
import { BRAND } from "@/config/brand";
import {
  aboutHero,
  exploreMoreCards,
  whatWeDoCategories,
} from "@/data/about";
import { timeline } from "@/data/timeline";

describe("About editorial sections", () => {
  it("renders a single flat hero heading with the approved story and image", () => {
    render(<AboutHero />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: aboutHero.headline,
    });
    const hero = heading.closest("section");

    expect(hero).toHaveAttribute("data-editorial-tone", "teal");
    expect(hero?.className).not.toContain("gradient");
    expect(screen.getByText(aboutHero.openingParagraph)).toBeVisible();
    expect(
      screen.getByRole("img", {
        name: /akomapa student leaders and community partners/i,
      }),
    ).toBeVisible();
  });

  it("presents mission and vision as one semantic definition list", () => {
    render(<MissionVisionSection />);

    const section = screen.getByRole("region", {
      name: "Mission & Vision",
    });
    expect(section.querySelectorAll("dl")).toHaveLength(1);
    expect(within(section).getByText(BRAND.mission)).toBeVisible();
    expect(within(section).getByText(BRAND.vision)).toBeVisible();
    expect(section.querySelector("[data-slot='card']")).toBeNull();
  });

  it("keeps the organizational story in one ordered chronology", () => {
    render(<OrganizationalTimeline />);

    const section = screen.getByRole("region", {
      name: "Organizational Story",
    });
    const list = section.querySelector("ol");
    expect(list).not.toBeNull();

    const events = list?.querySelectorAll("[data-timeline-event]");
    expect(events).toHaveLength(timeline.length);
    expect(
      Array.from(events ?? []).map((event) =>
        event.getAttribute("data-timeline-event"),
      ),
    ).toEqual(timeline.map((event) => event.id));

    for (const marker of section.querySelectorAll("[aria-hidden='true']")) {
      expect(marker).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("renders numbered pillar and exploration links without card surfaces", () => {
    render(
      <>
        <WhatWeDoSection />
        <ExploreMoreSection />
      </>,
    );

    const pillars = screen.getByRole("region", {
      name: "Five Pillars of Our Work",
    });
    expect(pillars.querySelector("ol")).not.toBeNull();
    for (const category of whatWeDoCategories) {
      expect(
        within(pillars).getByRole("link", { name: new RegExp(category.title) }),
      ).toHaveAttribute("href", category.href);
    }

    const explore = screen.getByRole("region", {
      name: "Learn About Our Foundation",
    });
    expect(explore).toHaveAttribute("data-editorial-tone", "onyx");
    for (const card of exploreMoreCards) {
      expect(
        within(explore).getByRole("link", { name: new RegExp(card.title) }),
      ).toHaveAttribute("href", card.href);
    }
  });
});
