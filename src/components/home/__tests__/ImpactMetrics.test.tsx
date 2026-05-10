import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ImpactMetrics from "@/components/home/ImpactMetrics";

describe("ImpactMetrics", () => {
  it("renders the section heading and description", () => {
    render(<ImpactMetrics />);
    expect(screen.getByText(/our impact/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /people, partnerships, and momentum/i,
      })
    ).toBeInTheDocument();
  });

  it("renders both the current and 2028 metric groups with their badges", () => {
    render(<ImpactMetrics />);
    expect(screen.getByText(/^today$/i)).toBeInTheDocument();
    expect(screen.getAllByText(/by 2028/i).length).toBeGreaterThan(0);
  });

  it("renders all five current-state metric labels", () => {
    render(<ImpactMetrics />);
    const expectedLabels = [
      "Patients Served",
      "Network Clinics",
      "Student Leaders Trained",
      "Countries Connected",
      "Institutional Partners",
    ];
    for (const label of expectedLabels) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });
});
