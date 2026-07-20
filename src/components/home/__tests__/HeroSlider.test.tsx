import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSlider from "@/components/home/HeroSlider";
import { BRAND } from "@/config/brand";

describe("HeroSlider", () => {
  it("renders a static brand hero without carousel chrome", () => {
    render(<HeroSlider />);

    const hero = screen.getByTestId("hero-slider");
    expect(hero).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: BRAND.heroHeadline }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("hero-slider-pagination")).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/previous slide/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/next slide/i)).not.toBeInTheDocument();
  });

  it("uses an accessible region label", () => {
    render(<HeroSlider />);
    expect(
      screen.getByRole("region", { name: /akomapa homepage hero/i }),
    ).toBeInTheDocument();
  });

  it("renders the primary and secondary brand CTAs", () => {
    render(<HeroSlider />);
    expect(
      screen.getByRole("link", {
        name: new RegExp(BRAND.heroPrimaryCTA.label, "i"),
      }),
    ).toHaveAttribute("href", BRAND.heroPrimaryCTA.href);
    expect(
      screen.getByRole("link", {
        name: new RegExp(BRAND.heroSecondaryCTA.label, "i"),
      }),
    ).toHaveAttribute("href", BRAND.heroSecondaryCTA.href);
  });
});
