import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeroSlide, { type HeroSlideContent } from "@/components/home/HeroSlide";
import type { Announcement } from "@/lib/types";

const brandSlide: HeroSlideContent = {
  variant: "brand",
  id: "brand-intro",
  backgroundImage: "/test/bg.jpg",
  backgroundAlt: "Brand background",
};

const linkAnnouncement: Announcement = {
  id: "link-announcement",
  tag: "Award",
  tagColor: "amber",
  title: "Recognition headline",
  description: "Brief description of the award.",
  image: "/test/award.jpg",
  ctaText: "Read More",
  ctaLink: "https://example.com/award",
  isExternal: true,
};

const videoAnnouncement: Announcement = {
  id: "video-announcement",
  tag: "Recognition",
  tagColor: "amber",
  title: "Video story",
  description: "Watch the pitch.",
  image: "/test/poster.jpg",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  thumbnail: "/test/thumb.jpg",
  ctaText: "Watch the Pitch",
  ctaLink: "https://example.com/pitch",
  isExternal: true,
};

describe("HeroSlide — brand variant", () => {
  it("renders the headline and the two primary CTAs", () => {
    render(<HeroSlide content={brandSlide} isActive isPrimary />);
    expect(
      screen.getByRole("heading", { level: 1, name: /global partnership/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /join the movement/i })
    ).toHaveAttribute("href", "/join");
    expect(
      screen.getByRole("link", { name: /support our work/i })
    ).toHaveAttribute("href", "/partner");
  });
});

describe("HeroSlide — announcement variant", () => {
  it("renders an external CTA link when no videoUrl is provided", () => {
    render(
      <HeroSlide
        content={{ variant: "announcement", announcement: linkAnnouncement }}
        isActive
        isPrimary={false}
      />
    );
    const cta = screen.getByRole("link", { name: /read more/i });
    expect(cta).toHaveAttribute("href", "https://example.com/award");
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("renders a video play button that calls onPlayVideo", async () => {
    const onPlayVideo = vi.fn();
    render(
      <HeroSlide
        content={{ variant: "announcement", announcement: videoAnnouncement }}
        isActive
        isPrimary={false}
        onPlayVideo={onPlayVideo}
      />
    );
    const playBtn = screen.getByRole("button", {
      name: /play video: video story/i,
    });
    await userEvent.click(playBtn);
    expect(onPlayVideo).toHaveBeenCalledWith(videoAnnouncement);
  });
});
