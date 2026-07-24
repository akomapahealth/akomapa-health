import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AkomapaMeaningSection from "@/components/home/AkomapaMeaningSection";
import VisionSection from "@/components/home/VisionSection";

describe("AkomapaMeaningSection", () => {
  it("presents the values manifesto without changing the cream section tone", () => {
    render(<AkomapaMeaningSection />);

    const section = screen.getByRole("region", {
      name: 'Akomapa means "A Good Heart."',
    });

    expect(section).toHaveAttribute("data-values-section");
    expect(section).toHaveClass("bg-[#FCFAEF]");
    expect(
      within(section).getByRole("img", {
        name: /health professionals offering compassionate community care/i,
      }),
    ).toBeVisible();
    expect(
      within(section).getByRole("link", { name: "Our story" }),
    ).toHaveAttribute("href", "/about");

    const values = within(section).getByRole("list", {
      name: "Akomapa values",
    });
    for (const value of ["Empathy", "Equity", "Excellence"]) {
      expect(within(values).getByText(value)).toBeVisible();
    }
  });
});

describe("VisionSection", () => {
  it("presents the vision as an editorial statement on the white section tone", () => {
    render(<VisionSection />);

    const section = screen.getByRole("region", {
      name: "Every community deserves high-quality chronic disease care.",
    });

    expect(section).toHaveAttribute("data-vision-section");
    expect(section).toHaveClass("bg-white");
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: "Every community deserves high-quality chronic disease care.",
      }),
    ).toHaveAttribute("id", "vision-heading");

    const priorities = within(section).getByRole("list", {
      name: "Vision priorities",
    });
    for (const priority of [
      "Compassionate care",
      "Continuous access",
      "Ethical leadership",
    ]) {
      expect(within(priorities).getByText(priority)).toBeVisible();
    }
  });
});
