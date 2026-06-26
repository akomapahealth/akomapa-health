import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ImpactMetrics from "@/components/home/ImpactMetrics";
import { healthImpact, leadershipImpact } from "@/data/impact";

describe("ImpactMetrics", () => {
  it("renders the section heading and description", () => {
    render(<ImpactMetrics />);
    expect(screen.getByText(/our impact/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /community health impact, leadership development, and momentum/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders both data-driven impact categories with their badges", () => {
    render(<ImpactMetrics />);
    expect(screen.getByText(healthImpact.title)).toBeInTheDocument();
    expect(screen.getByText(leadershipImpact.title)).toBeInTheDocument();
    expect(screen.getAllByText(/by 2028/i).length).toBeGreaterThan(0);
  });

  it("renders the canonical health and leadership metric labels", () => {
    render(<ImpactMetrics />);

    for (const metric of [
      ...healthImpact.metrics,
      ...leadershipImpact.metrics,
    ]) {
      expect(screen.getAllByText(metric.label).length).toBeGreaterThan(0);
    }
  });
});
