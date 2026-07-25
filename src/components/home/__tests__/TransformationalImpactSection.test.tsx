import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TransformationalImpactSection from "@/components/home/TransformationalImpactSection";

describe("TransformationalImpactSection", () => {
  it("renders the approved primary-care impact band with heading and CTA", () => {
    render(<TransformationalImpactSection />);

    const section = screen.getByRole("region", {
      name: "Closing the Primary Care Gap. Building healthier communities. Preparing stronger health leaders.",
    });

    expect(section).toHaveAttribute("data-transformational-impact");
    expect(section).toHaveClass("bg-[#0097b2]");
    expect(
      section.querySelector("[data-home-band-marker]"),
    ).toHaveTextContent("03");
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: "Closing the Primary Care Gap. Building healthier communities. Preparing stronger health leaders.",
      }),
    ).toBeInTheDocument();
    expect(within(section).getByText("Transformational Impact")).toBeVisible();
    expect(section).toHaveTextContent(
      "At Akomapa, we believe lasting improvements in health require more than one-day screenings.",
    );
    expect(
      within(section).getByRole("link", { name: /explore our impact/i }),
    ).toHaveAttribute("href", "/impact");
  });

  it("labels all six approved impact metrics", () => {
    render(<TransformationalImpactSection />);

    const labels = [
      "People screened for chronic disease risk",
      "People identified with previously undetected or untreated hypertension and diabetes",
      "Patients successfully connected to ongoing primary care",
      "Patients successfully followed through community outreach and home visits",
      "Community Learning & Care Hubs",
      "Health professional students trained across seven disciplines",
    ];

    for (const label of labels) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }

    const section = screen.getByRole("region", {
      name: "Closing the Primary Care Gap. Building healthier communities. Preparing stronger health leaders.",
    });
    expect(section.querySelectorAll("dt")).toHaveLength(6);
    expect(section.querySelectorAll("dd")).toHaveLength(6);
    expect(within(section).getByText("06")).toBeVisible();
  });
});
