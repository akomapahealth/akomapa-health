import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CommunityModel from "@/components/ncd-impact/CommunityModel";
import NCDDataViz from "@/components/ncd-impact/NCDDataViz";
import NCDFutureVision from "@/components/ncd-impact/NCDFutureVision";
import NCDHero from "@/components/ncd-impact/NCDHero";
import NCDImpactStats from "@/components/ncd-impact/NCDImpactStats";
import WhyNCDsMatter from "@/components/ncd-impact/WhyNCDsMatter";
import WhyStudentsMatter from "@/components/ncd-impact/WhyStudentsMatter";
import {
  communityModelContent,
  ncdDataVizContent,
  ncdFutureVisionContent,
  ncdHeroContent,
  parsedHealthMetrics,
  parsedLeadershipMetrics,
  whyNCDsMatterContent,
  whyStudentsMatterContent,
} from "@/data/ncd-impact";

describe("NCD Impact editorial system", () => {
  it("renders a flat onyx hero with one h1 and labeled key burden stat", () => {
    render(<NCDHero />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: ncdHeroContent.heading,
    });
    const hero = heading.closest("section");
    expect(hero).toHaveAttribute("data-editorial-tone", "onyx");
    expect(hero?.className).not.toContain("gradient");
    expect(document.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByText(/External evidence/i)).toBeVisible();
    expect(screen.getByText(ncdHeroContent.keyStat.label)).toBeVisible();
    expect(
      screen.getByRole("link", { name: ncdHeroContent.ctas[0].label }),
    ).toHaveAttribute("href", ncdHeroContent.ctas[0].href);
  });

  it("separates external burden evidence with source and chart text equivalents", () => {
    render(<WhyNCDsMatter />);

    const section = screen.getByRole("region", {
      name: whyNCDsMatterContent.heading,
    });
    expect(section).toHaveAttribute("data-editorial-tone", "cream");
    expect(within(section).getByText("External evidence")).toBeVisible();

    const stats = section.querySelector("[data-ncd-external-burden-stats]");
    expect(stats?.tagName).toBe("DL");
    expect(stats?.querySelectorAll("dt")).toHaveLength(
      whyNCDsMatterContent.globalStats.length,
    );

    for (const stat of whyNCDsMatterContent.globalStats) {
      expect(within(section).getByText(stat.label)).toBeVisible();
    }

    for (const bar of whyNCDsMatterContent.barChart.items) {
      expect(within(section).getByText(bar.label)).toBeVisible();
      expect(within(section).getByText(`${bar.percentage}%`)).toBeVisible();
    }

    const source = section.querySelector("[data-ncd-external-source]");
    expect(source).not.toBeNull();
    expect(
      within(source as HTMLElement).getByRole("link", {
        name: whyNCDsMatterContent.source.label,
      }),
    ).toHaveAttribute("href", whyNCDsMatterContent.source.href);
    expect(section.querySelector("[data-slot='card']")).toBeNull();
  });

  it("presents student leadership reasons as a numbered list without icons", () => {
    render(<WhyStudentsMatter />);

    const section = screen.getByRole("region", {
      name: whyStudentsMatterContent.heading,
    });
    expect(section).toHaveAttribute("data-editorial-tone", "teal");
    const items = within(section).getAllByRole("listitem");
    expect(items).toHaveLength(whyStudentsMatterContent.reasons.length);
    expect(
      items.map(
        (item) => within(item).getByRole("heading", { level: 3 }).textContent,
      ),
    ).toEqual(whyStudentsMatterContent.reasons.map((reason) => reason.title));
  });

  it("keeps community model stages ordered with who labels on all breakpoints", () => {
    render(<CommunityModel />);

    const section = screen.getByRole("region", {
      name: communityModelContent.heading,
    });
    const list = section.querySelector("[data-ncd-community-model]");
    expect(list?.tagName).toBe("OL");
    const items = within(section).getAllByRole("listitem");
    expect(items).toHaveLength(communityModelContent.stages.length);

    for (const stage of communityModelContent.stages) {
      expect(within(section).getByText(stage.title)).toBeVisible();
      expect(within(section).getByText(stage.who)).toBeVisible();
      expect(within(section).getByText(stage.description)).toBeVisible();
    }
  });

  it("keeps Ghana/Global comparisons labeled with source and non-color legend", () => {
    render(<NCDDataViz />);

    const section = screen.getByRole("region", {
      name: ncdDataVizContent.heading,
    });
    expect(within(section).getByText("External evidence")).toBeVisible();

    for (const comparison of ncdDataVizContent.comparisons) {
      expect(within(section).getByText(comparison.label)).toBeVisible();
      expect(
        within(section).getByText(`${comparison.ghana}${comparison.unit}`),
      ).toBeVisible();
      expect(
        within(section).getByText(`${comparison.global}${comparison.unit}`),
      ).toBeVisible();
    }

    const legend = section.querySelector("[data-ncd-comparison-legend]");
    expect(legend).not.toBeNull();
    expect(
      within(legend as HTMLElement).getByText(/Ghana \(solid/i),
    ).toBeVisible();
    expect(
      within(legend as HTMLElement).getByText(/Global \(square/i),
    ).toBeVisible();
    expect(
      within(section).getByRole("link", {
        name: ncdDataVizContent.source.label,
      }),
    ).toHaveAttribute("href", ncdDataVizContent.source.href);
  });

  it("exposes Akomapa current results separately from future targets", () => {
    render(<NCDImpactStats />);

    const section = screen.getByRole("region", {
      name: "Our Impact So Far",
    });
    expect(within(section).getByText("Akomapa current results")).toBeVisible();

    const health = section.querySelector(
      '[data-ncd-current-metrics="health"]',
    );
    const leadership = section.querySelector(
      '[data-ncd-current-metrics="leadership"]',
    );
    expect(health?.tagName).toBe("DL");
    expect(leadership?.tagName).toBe("DL");
    expect(health?.querySelectorAll("dt")).toHaveLength(
      parsedHealthMetrics.length,
    );
    expect(leadership?.querySelectorAll("dt")).toHaveLength(
      parsedLeadershipMetrics.length,
    );

    for (const metric of [...parsedHealthMetrics, ...parsedLeadershipMetrics]) {
      expect(within(section).getByText(metric.label)).toBeVisible();
    }
    expect(within(section).queryByText(/Target by/i)).toBeNull();
  });

  it("labels future targets distinctly and preserves CTA destinations", () => {
    render(<NCDFutureVision />);

    const section = screen.getByRole("region", {
      name: ncdFutureVisionContent.heading,
    });
    expect(section).toHaveAttribute("data-editorial-tone", "onyx");
    expect(
      within(section).getByText(/Future targets — not yet achieved/i),
    ).toBeVisible();

    const targets = section.querySelector("[data-ncd-future-targets]");
    expect(targets?.tagName).toBe("DL");
    expect(targets?.querySelectorAll("dt")).toHaveLength(
      ncdFutureVisionContent.targets.length,
    );

    for (const target of ncdFutureVisionContent.targets) {
      expect(within(section).getByText(target.label)).toBeVisible();
      expect(within(section).getByText(target.futureValue)).toBeVisible();
    }
    expect(
      within(section).getAllByText(`Target by ${ncdFutureVisionContent.targets[0].futureYear}`),
    ).toHaveLength(ncdFutureVisionContent.targets.length);

    for (const cta of ncdFutureVisionContent.ctas) {
      expect(
        screen.getByRole("link", { name: cta.label }),
      ).toHaveAttribute("href", cta.href);
    }
  });
});
