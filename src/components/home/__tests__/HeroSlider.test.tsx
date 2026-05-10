import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import HeroSlider from "@/components/home/HeroSlider";
import { announcementCampaign } from "@/data/announcements";

describe("HeroSlider", () => {
  it("renders one slide per announcement plus the brand intro", () => {
    render(<HeroSlider />);

    const slider = screen.getByTestId("hero-slider");
    expect(slider).toBeInTheDocument();
    const slides = within(slider).getAllByTestId("swiper-slide");
    expect(slides).toHaveLength(announcementCampaign.slides.length + 1);
  });

  it("renders the pagination tablist with one tab per slide", () => {
    render(<HeroSlider />);

    const pagination = screen.getByTestId("hero-slider-pagination");
    const tabs = within(pagination).getAllByRole("tab");
    expect(tabs).toHaveLength(announcementCampaign.slides.length + 1);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });

  it("renders prev/next navigation controls with accessible labels", () => {
    render(<HeroSlider />);
    expect(screen.getByLabelText(/previous slide/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next slide/i)).toBeInTheDocument();
  });

  it("uses an accessible region label", () => {
    render(<HeroSlider />);
    expect(
      screen.getByRole("region", { name: /akomapa hero announcements/i })
    ).toBeInTheDocument();
  });
});
