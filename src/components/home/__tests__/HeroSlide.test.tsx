import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSlide, { type HeroSlideContent } from "@/components/home/HeroSlide";
import { BRAND } from "@/config/brand";

const brandSlide: HeroSlideContent = {
  variant: "brand",
  id: "brand-intro",
  backgroundImage: "/test/bg.jpg",
  backgroundAlt: "Brand background",
};

describe("HeroSlide", () => {
  it("renders the headline and the two primary CTAs", () => {
    render(<HeroSlide content={brandSlide} isPrimary />);
    expect(
      screen.getByRole("heading", { level: 1, name: BRAND.heroHeadline }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: new RegExp(BRAND.heroPrimaryCTA.label, "i"),
      }),
    ).toHaveAttribute("href", "/academy");
    expect(
      screen.getByRole("link", {
        name: new RegExp(BRAND.heroSecondaryCTA.label, "i"),
      }),
    ).toHaveAttribute("href", "/partnerships");
  });
});
