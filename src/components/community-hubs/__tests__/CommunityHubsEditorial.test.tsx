import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CommunityHubDetailPage from "@/components/community-hubs/CommunityHubDetailPage";
import FiveMissions from "@/components/community-hubs/FiveMissions";
import HubActivities from "@/components/community-hubs/HubActivities";
import HubCard from "@/components/community-hubs/HubCard";
import HubCardGrid from "@/components/community-hubs/HubCardGrid";
import HubMetrics from "@/components/community-hubs/HubMetrics";
import HubsHero from "@/components/community-hubs/HubsHero";
import WhyHubsMatter from "@/components/community-hubs/WhyHubsMatter";
import { getHubStatusLabel } from "@/components/community-hubs/hub-status";
import {
  communityHubs,
  communityHubsListing,
  getHubHref,
  hubActivities,
  hubEmptyStates,
  hubMissions,
  whyHubsMatter,
} from "@/data/community-hubs";

describe("Community hubs listing editorial sections", () => {
  it("renders a single flat hero heading with approved copy and image", () => {
    render(<HubsHero />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: communityHubsListing.headline,
    });
    const hero = heading.closest("section");

    expect(hero).toHaveAttribute("data-editorial-tone", "teal");
    expect(hero?.className).not.toContain("gradient");
    expect(screen.getByText(communityHubsListing.subheadline)).toBeVisible();
    expect(
      screen.getByRole("img", {
        name: /community health hub volunteers serving community members/i,
      }),
    ).toBeVisible();
  });

  it("presents the five missions as one ordered model without card surfaces", () => {
    render(<FiveMissions />);

    const section = screen.getByRole("region", {
      name: "What Our Hubs Are Built to Do",
    });
    const list = section.querySelector("ol");
    expect(list).not.toBeNull();

    const items = within(section).getAllByRole("listitem");
    expect(items).toHaveLength(hubMissions.length);
    expect(items.map((item) => within(item).getByRole("heading", { level: 3 }).textContent)).toEqual(
      hubMissions.map((mission) => mission.title),
    );
    expect(section.querySelector("[data-slot='card']")).toBeNull();
  });

  it("keeps hub activities scannable and correctly ordered", () => {
    render(<HubActivities />);

    const section = screen.getByRole("region", {
      name: "Learning, Care, and Partnership in Action",
    });
    const items = within(section).getAllByRole("listitem");
    expect(items).toHaveLength(hubActivities.length);
    expect(items.map((item) => within(item).getByRole("heading", { level: 3 }).textContent)).toEqual(
      hubActivities.map((activity) => activity.title),
    );
    expect(section.querySelector("[data-slot='card']")).toBeNull();
  });

  it("exposes hub location, status text, and accessible destination links", () => {
    render(<HubCardGrid />);

    const cards = screen.getAllByTestId("community-hub-card");
    expect(cards).toHaveLength(communityHubs.length);

    for (const hub of communityHubs) {
      const card = cards.find((node) => node.getAttribute("data-hub-id") === hub.id);
      expect(card).toBeDefined();
      expect(card).toHaveAttribute("data-hub-status", hub.status);
      expect(within(card!).getByText(getHubStatusLabel(hub.status))).toBeVisible();
      expect(
        within(card!).getByText((_, element) => {
          return (
            element?.tagName === "P" &&
            (element.textContent ?? "").includes(hub.location) &&
            (element.textContent ?? "").includes(hub.country)
          );
        }),
      ).toBeVisible();
      expect(
        within(card!).getByRole("link", { name: new RegExp(hub.name) }),
      ).toHaveAttribute("href", getHubHref(hub));
    }
  });

  it("renders the value proposition as numbered editorial rows", () => {
    render(<WhyHubsMatter />);

    const section = screen.getByRole("region", {
      name: "More Than a Place to Receive Care",
    });
    expect(section).toHaveAttribute("data-editorial-tone", "teal");
    expect(within(section).getAllByRole("listitem")).toHaveLength(whyHubsMatter.length);
    expect(section.querySelector("[data-slot='card']")).toBeNull();
  });
});

describe("Community hub detail editorial system", () => {
  it("uses the UCC hub image as a full-bleed hero background", () => {
    const uccHub = communityHubs.find(({ routeSlug }) => routeSlug === "ucc")!;
    const ugHub = communityHubs.find(({ routeSlug }) => routeSlug === "ug")!;
    const { rerender } = render(<CommunityHubDetailPage hub={uccHub} />);

    const uccHero = screen
      .getByRole("heading", { level: 1, name: uccHub.name })
      .closest("section");
    expect(uccHero).toHaveAttribute("data-hub-hero-presentation", "background");
    expect(uccHero?.querySelector("[data-hub-hero-background]")).toHaveAttribute(
      "src",
      uccHub.image,
    );
    expect(uccHero?.querySelector("[data-hub-hero-background]")).toHaveAttribute(
      "alt",
      "",
    );
    expect(uccHero?.querySelector("[data-hub-hero-panel]")).toHaveClass(
      "bg-[#07191d]/30",
    );

    rerender(<CommunityHubDetailPage hub={ugHub} />);
    expect(
      screen.getByRole("heading", { level: 1, name: ugHub.name }).closest("section"),
    ).toHaveAttribute("data-hub-hero-presentation", "split");
  });

  it.each(communityHubs)(
    "preserves approved data and semantic metrics for $name",
    (hub) => {
      render(<CommunityHubDetailPage hub={hub} />);

      expect(
        screen.getByRole("heading", { level: 1, name: hub.name }),
      ).toBeVisible();
      expect(screen.getByText(getHubStatusLabel(hub.status))).toBeVisible();
      expect(
        screen.getByText((_, element) => {
          return (
            element?.tagName === "P" &&
            (element.textContent ?? "").includes(hub.location) &&
            (element.textContent ?? "").includes(hub.country)
          );
        }),
      ).toBeVisible();
      expect(screen.getByText(hub.description)).toBeVisible();

      const metrics = document.querySelector("[data-hub-metrics]");
      expect(metrics?.tagName).toBe("DL");
      expect(metrics?.querySelectorAll("dt")).toHaveLength(4);
      expect(metrics?.querySelectorAll("dd")).toHaveLength(4);
      expect(screen.getByText("Community members served")).toBeVisible();
      expect(screen.getByText("Students trained")).toBeVisible();
      expect(screen.getByText("Communities reached")).toBeVisible();
      expect(screen.getByText("Partners engaged")).toBeVisible();

      if (hub.status === "in-development") {
        expect(
          screen.getByText(/This hub is in development/i),
        ).toBeVisible();
      }

      expect(screen.getByText(hub.facultyMentorship!.model)).toBeVisible();
      expect(screen.getByText(hubEmptyStates.communityStories.title)).toBeVisible();
      expect(screen.getByText(hubEmptyStates.studentStories.title)).toBeVisible();
      expect(screen.getByText(hubEmptyStates.research.title)).toBeVisible();
      expect(screen.getByText(hubEmptyStates.innovation.title)).toBeVisible();

      expect(
        screen.getByRole("link", {
          name: hubEmptyStates.communityStories.cta.label,
        }),
      ).toHaveAttribute("href", hubEmptyStates.communityStories.cta.href);
      expect(
        screen.getByRole("link", {
          name: hubEmptyStates.studentStories.cta.label,
        }),
      ).toHaveAttribute("href", hubEmptyStates.studentStories.cta.href);
      expect(
        screen.getByRole("link", {
          name: hubEmptyStates.research.cta.label,
        }),
      ).toHaveAttribute("href", hubEmptyStates.research.cta.href);
      expect(
        screen.getByRole("link", {
          name: hubEmptyStates.innovation.cta.label,
        }),
      ).toHaveAttribute("href", hubEmptyStates.innovation.cta.href);

      expect(document.querySelectorAll("h1")).toHaveLength(1);
      expect(document.querySelector("[data-slot='card']")).toBeNull();
    },
  );

  it("uses the gold accent for metrics on the dark teal band", () => {
    const hub = communityHubs[0];
    render(<HubMetrics hub={hub} />);

    expect(screen.getByRole("region", { name: "Hub Metrics" })).toHaveAttribute(
      "data-editorial-tone",
      "onyx",
    );
    const values = document.querySelectorAll("[data-hub-metrics] dd");
    expect(values).toHaveLength(4);
    for (const value of values) {
      expect(value).toHaveClass("text-[#F5C94D]");
    }
  });

  it("alternates non-hero UCC bands between dark teal and cream", () => {
    const hub = communityHubs.find(({ routeSlug }) => routeSlug === "ucc")!;
    render(<CommunityHubDetailPage hub={hub} />);

    const sectionIds = [
      "hub-metrics",
      "hub-leadership",
      "hub-volunteers",
      "community-stories",
      "student-stories",
      "faculty-mentorship",
      "hub-research",
      "hub-innovation",
    ];
    const tones = sectionIds.map((id) =>
      document.getElementById(id)?.getAttribute("data-editorial-tone"),
    );

    expect(tones).toEqual([
      "onyx",
      "cream",
      "teal",
      "cream",
      "onyx",
      "cream",
      "onyx",
      "cream",
    ]);
  });

  it("renders a single hub card with navigational accessible name", () => {
    const hub = communityHubs[0];
    render(<HubCard hub={hub} />);

    expect(
      screen.getByRole("link", { name: new RegExp(hub.name) }),
    ).toHaveAttribute("href", getHubHref(hub));
    expect(screen.getByText(getHubStatusLabel(hub.status))).toBeVisible();
  });
});
