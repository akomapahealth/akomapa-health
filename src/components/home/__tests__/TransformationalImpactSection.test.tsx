import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TransformationalImpactSection from "@/components/home/TransformationalImpactSection";
import { leadershipImpact } from "@/data/impact";

describe("TransformationalImpactSection", () => {
  it("renders the standout impact band with heading and CTA", () => {
    render(<TransformationalImpactSection />);

    const section = screen.getByRole("region", {
      name: /building healthier communities\. preparing stronger health leaders\./i,
    });

    expect(section).toHaveAttribute("data-transformational-impact");
    expect(section).toHaveClass("bg-[#0097b2]");
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /building healthier communities\. preparing stronger health leaders\./i,
      }),
    ).toBeInTheDocument();
    expect(within(section).getByText(/transformational impact/i)).toBeVisible();
    expect(
      within(section).getByRole("link", { name: /explore our impact/i }),
    ).toHaveAttribute("href", "/impact");
  });

  it("labels each community-care metric", () => {
    render(<TransformationalImpactSection />);

    const labels = [
      "Community members screened",
      "Linkage-to-care rate",
      "Community Learning & Care Hubs",
      "Student leaders trained",
    ];

    for (const label of labels) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }

    expect(
      within(
        screen.getByRole("region", {
          name: /building healthier communities\. preparing stronger health leaders\./i,
        }),
      ).getByText("04"),
    ).toBeVisible();
  });

  it("reuses canonical research impact metrics", () => {
    render(<TransformationalImpactSection />);

    const research = ["academy-graduates", "research-scholars-supported"].map(
      (id) => leadershipImpact.metrics.find((metric) => metric.id === id),
    );

    for (const metric of research) {
      expect(metric).toBeDefined();
      expect(screen.getAllByText(metric?.label ?? "").length).toBeGreaterThan(0);
    }
  });
});
