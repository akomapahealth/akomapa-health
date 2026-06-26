import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ImpactSnapshot from "@/components/home/ImpactSnapshot";
import { healthImpact, leadershipImpact } from "@/data/impact";

describe("ImpactSnapshot", () => {
  it("renders a concise top-of-homepage proof section", () => {
    render(<ImpactSnapshot />);

    const section = screen.getByRole("region", {
      name: /early numbers from a growing health leadership movement/i,
    });

    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /early numbers from a growing health leadership movement/i,
      }),
    ).toBeInTheDocument();
    expect(within(section).getByText(/akomapa at a glance/i)).toBeVisible();
    expect(
      within(section).getByRole("link", {
        name: /explore impact/i,
      }),
    ).toHaveAttribute("href", "/impact");
  });

  it("uses canonical health and leadership impact metrics", () => {
    render(<ImpactSnapshot />);

    const expectedMetrics = [
      healthImpact.metrics.find(
        (metric) => metric.id === "community-members-screened",
      ),
      leadershipImpact.metrics.find(
        (metric) => metric.id === "student-leaders-trained",
      ),
      healthImpact.metrics.find((metric) => metric.id === "communities-reached"),
      healthImpact.metrics.find((metric) => metric.id === "referrals-completed"),
    ];

    for (const metric of expectedMetrics) {
      expect(metric).toBeDefined();
      expect(screen.getByText(metric?.currentValue ?? "")).toBeVisible();
      expect(screen.getByText(metric?.label ?? "")).toBeVisible();
    }
  });
});
