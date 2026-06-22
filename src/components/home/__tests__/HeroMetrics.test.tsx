import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroMetrics from "@/components/home/HeroMetrics";
import { BRAND } from "@/config/brand";

describe("HeroMetrics", () => {
  it("renders all metric labels", () => {
    render(<HeroMetrics />);
    for (const metric of BRAND.heroMetrics) {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
    }
  });

  it("renders a list with the correct number of items", () => {
    render(<HeroMetrics />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(BRAND.heroMetrics.length);
  });

  it("has an accessible label on the container", () => {
    render(<HeroMetrics />);
    expect(screen.getByRole("list", { name: /key impact metrics/i })).toBeInTheDocument();
  });
});
