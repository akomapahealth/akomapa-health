import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FutureVisionSection from "@/components/impact/FutureVisionSection";
import GrowthTimeline from "@/components/impact/GrowthTimeline";
import HealthImpactSection from "@/components/impact/HealthImpactSection";
import ImpactCTA from "@/components/impact/ImpactCTA";
import ImpactHero from "@/components/impact/ImpactHero";
import ImpactMap from "@/components/impact/ImpactMap";
import LeadershipImpactSection from "@/components/impact/LeadershipImpactSection";
import {
  futureVision,
  healthImpact,
  leadershipImpact,
  mapLocations,
} from "@/data/impact";
import { timeline } from "@/data/timeline";

describe("Impact editorial system", () => {
  it("renders a flat deep-teal hero with one h1 and semantic lead metrics", () => {
    render(<ImpactHero />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Our Impact",
    });
    const hero = heading.closest("section");
    expect(hero).toHaveAttribute("data-editorial-tone", "teal");
    expect(hero?.className).not.toContain("gradient");
    expect(document.querySelectorAll("h1")).toHaveLength(1);

    const metrics = document.querySelector("[data-impact-hero-metrics]");
    expect(metrics?.tagName).toBe("DL");
    expect(metrics?.querySelectorAll("dt")).toHaveLength(3);
    expect(metrics?.querySelectorAll("dd")).toHaveLength(3);
    expect(screen.getByText("Community members screened")).toBeVisible();
    expect(screen.getByText("Student leaders trained")).toBeVisible();
    expect(screen.getByText("Community health hubs")).toBeVisible();
    expect(hero?.querySelector("[data-slot='card']")).toBeNull();
  });

  it("exposes health current results and 2028 targets in a definition list", () => {
    render(<HealthImpactSection />);

    const section = screen.getByRole("region", {
      name: "Community-rooted care in motion",
    });
    expect(section).toHaveAttribute("data-editorial-tone", "cream");
    expect(within(section).getByText("Current results")).toBeVisible();

    const metrics = section.querySelector("[data-health-impact-metrics]");
    expect(metrics?.tagName).toBe("DL");
    expect(metrics?.querySelectorAll("dt")).toHaveLength(
      healthImpact.metrics.length,
    );
    expect(metrics?.querySelectorAll("dd")).toHaveLength(
      healthImpact.metrics.length,
    );

    for (const metric of healthImpact.metrics) {
      expect(within(section).getByText(metric.label)).toBeVisible();
      expect(
        within(section).getByText(`Target ${metric.futureValue}`, {
          exact: false,
        }),
      ).toBeVisible();
    }
    expect(section.querySelector("[data-slot='card']")).toBeNull();
  });

  it("exposes leadership current results and targets without card chrome", () => {
    render(<LeadershipImpactSection />);

    const section = screen.getByRole("region", {
      name: "Students trained to lead with a good heart",
    });
    expect(section).toHaveAttribute("data-editorial-tone", "teal");

    const metrics = section.querySelector("[data-leadership-impact-metrics]");
    expect(metrics?.tagName).toBe("DL");
    expect(metrics?.querySelectorAll("dt")).toHaveLength(
      leadershipImpact.metrics.length,
    );

    for (const metric of leadershipImpact.metrics) {
      expect(within(section).getByText(metric.label)).toBeVisible();
      expect(
        within(section).getByText(`Target ${metric.futureValue}`, {
          exact: false,
        }),
      ).toBeVisible();
    }
  });

  it("keeps map locations, legend shapes, and hub links without color-alone types", () => {
    render(<ImpactMap />);

    const section = screen.getByRole("region", {
      name: "A growing network of hubs",
    });
    expect(section).toHaveAttribute("data-editorial-tone", "cream");
    expect(section.querySelector("[data-testid='impact-map-panel']")).not.toBeNull();

    const legend = section.querySelector("[data-impact-map-legend]");
    expect(legend).not.toBeNull();
    expect(within(legend as HTMLElement).getByText("Active hub")).toBeVisible();
    expect(within(legend as HTMLElement).getByText("Planned hub")).toBeVisible();
    expect(within(legend as HTMLElement).getByText("Partner")).toBeVisible();
    expect(
      legend?.querySelectorAll("[data-legend-shape]").length,
    ).toBeGreaterThanOrEqual(3);

    for (const location of mapLocations) {
      const article = section.querySelector(
        `[data-impact-map-location="${location.id}"]`,
      );
      expect(article).not.toBeNull();
      expect(within(article as HTMLElement).getByText(location.name)).toBeVisible();
      expect(
        within(article as HTMLElement).getByText(location.description),
      ).toBeVisible();
      if (location.href) {
        expect(
          within(article as HTMLElement).getByRole("link", {
            name: location.name,
          }),
        ).toHaveAttribute("href", location.href);
      }
    }
  });

  it("keeps timeline chronology readable without connectors", () => {
    render(<GrowthTimeline />);

    const section = screen.getByRole("region", {
      name: "A timeline of growth",
    });
    const list = section.querySelector("[data-growth-timeline]");
    expect(list?.tagName).toBe("OL");
    const items = within(section).getAllByRole("listitem");
    expect(items).toHaveLength(timeline.length);
    expect(
      items.map(
        (item) => within(item).getByRole("heading", { level: 3 }).textContent,
      ),
    ).toEqual(timeline.map((event) => event.title));
    for (const event of timeline) {
      const item = section.querySelector(
        `[data-timeline-event="${event.id}"]`,
      );
      expect(item).not.toBeNull();
      expect(within(item as HTMLElement).getByText(event.year)).toBeVisible();
      expect(
        within(item as HTMLElement).getByText(event.description),
      ).toBeVisible();
    }
  });

  it("labels future vision targets distinctly from today baselines", () => {
    render(<FutureVisionSection />);

    const section = screen.getByRole("region", {
      name: "Where we are headed",
    });
    expect(section).toHaveAttribute("data-editorial-tone", "teal");
    expect(within(section).getByText("Future targets")).toBeVisible();
    expect(
      within(section).getByText(/By 2028 — not yet achieved/i),
    ).toBeVisible();

    const targets = section.querySelector("[data-future-vision-targets]");
    expect(targets?.tagName).toBe("DL");
    expect(targets?.querySelectorAll("dt")).toHaveLength(futureVision.length);

    for (const target of futureVision) {
      expect(within(section).getByText(target.label)).toBeVisible();
      if (target.currentValue) {
        expect(
          within(section).getByText(`Today: ${target.currentValue}`),
        ).toBeVisible();
      }
    }
    expect(within(section).getAllByText("Target by 2028").length).toBe(
      futureVision.length,
    );
  });

  it("preserves impact CTA destinations", () => {
    render(<ImpactCTA />);

    expect(
      screen.getByRole("link", { name: /Get Involved/i }),
    ).toHaveAttribute("href", "/get-involved");
    expect(screen.getByRole("link", { name: /^Donate$/i })).toHaveAttribute(
      "href",
      "/donate",
    );
  });
});
