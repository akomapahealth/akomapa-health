import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "framer-motion";
import ImmersionHeroMedia from "../ImmersionHeroMedia";

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();

  return {
    ...actual,
    useReducedMotion: vi.fn(),
  };
});

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

const props = {
  videoSrc: "/immersion-hero.mp4",
  posterSrc: "/highlights/Akomapa-40.jpg",
  posterAlt: "Immersion program poster",
};

describe("ImmersionHeroMedia", () => {
  beforeEach(() => {
    vi.stubEnv(
      "NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT",
      "https://ik.imagekit.io/akomapa",
    );
  });

  it("renders responsive ImageKit video sources over the poster", () => {
    mockedUseReducedMotion.mockReturnValue(false);
    const { container } = render(<ImmersionHeroMedia {...props} />);

    expect(screen.getByAltText(props.posterAlt)).toBeInTheDocument();

    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveProperty("autoplay", true);
    expect(video).toHaveProperty("loop", true);
    expect(video).toHaveProperty("muted", true);
    expect(video).toHaveProperty("playsInline", true);
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).toHaveClass("opacity-0");
    expect(
      container.querySelector(
        '[data-immersion-hero-overlay="horizontal"]',
      ),
    ).toHaveClass("from-[#07191d]/78", "via-[#07191d]/48");
    expect(
      container.querySelector('[data-immersion-hero-overlay="vertical"]'),
    ).toHaveClass("from-[#07191d]/48", "to-[#07191d]/20");

    const sources = container.querySelectorAll("source");
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute("media", "(max-width: 767px)");
    expect(sources[0]?.getAttribute("src")).toContain(
      "ik.imagekit.io/akomapa/immersion-hero.mp4",
    );

    fireEvent.canPlay(video as HTMLVideoElement);
    expect(video).toHaveClass("opacity-100");
  });

  it("keeps the poster and omits motion when reduced motion is requested", () => {
    mockedUseReducedMotion.mockReturnValue(true);
    const { container } = render(<ImmersionHeroMedia {...props} />);

    expect(screen.getByAltText(props.posterAlt)).toBeInTheDocument();
    expect(container.querySelector("video")).not.toBeInTheDocument();
  });
});
