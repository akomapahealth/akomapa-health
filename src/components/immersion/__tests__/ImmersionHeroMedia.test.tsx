import { render, screen } from "@testing-library/react";
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

class ImmediateIntersectionObserver {
  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.callback(
      [
        {
          isIntersecting: true,
          target,
          time: 0,
          intersectionRatio: 1,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
        },
      ],
      this as unknown as IntersectionObserver,
    );
  }

  disconnect() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
}

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
    vi.stubGlobal("IntersectionObserver", ImmediateIntersectionObserver);
  });

  it("renders the optimized video immediately without a poster transition", () => {
    mockedUseReducedMotion.mockReturnValue(false);
    const { container } = render(<ImmersionHeroMedia {...props} />);

    expect(container.firstElementChild).toHaveAttribute(
      "data-immersion-hero-hydrated",
      "true",
    );
    expect(screen.queryByAltText(props.posterAlt)).not.toBeInTheDocument();

    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveProperty("autoplay", true);
    expect(video).toHaveProperty("loop", true);
    expect(video).toHaveProperty("muted", true);
    expect(video).toHaveProperty("playsInline", true);
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).not.toHaveAttribute("poster");
    expect(video).toHaveClass("motion-reduce:hidden");
    expect(video).not.toHaveClass("opacity-70");
    expect(
      container.querySelector(
        '[data-immersion-hero-overlay="horizontal"]',
      ),
    ).toHaveClass("from-[#07191d]/55", "via-[#07191d]/28");
    expect(
      container.querySelector('[data-immersion-hero-overlay="vertical"]'),
    ).toHaveClass("from-[#07191d]/40", "to-[#07191d]/16");

    const sources = container.querySelectorAll("source");
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute("media", "(max-width: 767px)");
    expect(sources[0]?.getAttribute("src")).toContain(
      "ik.imagekit.io/akomapa/immersion-hero.mp4",
    );
    expect(sources[0]?.getAttribute("src")).toContain("w-960");
    expect(sources[1]?.getAttribute("src")).toContain("w-1280");
    expect(sources[1]?.getAttribute("src")).not.toContain("w-1920");

  });

  it("renders the video during the server-safe motion preference state", () => {
    mockedUseReducedMotion.mockReturnValue(null);
    const { container } = render(<ImmersionHeroMedia {...props} />);

    expect(container.querySelector("video")).toBeInTheDocument();
    expect(screen.queryByAltText(props.posterAlt)).not.toBeInTheDocument();
  });

  it("keeps the poster and omits motion when reduced motion is requested", () => {
    mockedUseReducedMotion.mockReturnValue(true);
    const { container } = render(<ImmersionHeroMedia {...props} />);

    expect(screen.getByAltText(props.posterAlt)).toBeInTheDocument();
    expect(container.querySelector("video")).not.toBeInTheDocument();
  });
});
