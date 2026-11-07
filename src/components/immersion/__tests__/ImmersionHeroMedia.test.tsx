import { render, screen, waitFor } from "@testing-library/react";
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
  mobileVideoSrc:
    "https://ik.imagekit.io/akomapa/immersion-hero.mp4?tr=q-60,w-960",
  desktopVideoSrc:
    "https://ik.imagekit.io/akomapa/immersion-hero.mp4?tr=q-60,w-1280",
  posterSrc: "/highlights/Akomapa-40.jpg",
  posterAlt: "Immersion program poster",
};

function stubMatchMedia(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

describe("ImmersionHeroMedia", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", ImmediateIntersectionObserver);
    stubMatchMedia(false);
  });

  it("renders one viewport-matched video source without a poster transition", async () => {
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

    await waitFor(() => {
      expect(container.querySelectorAll("source")).toHaveLength(1);
    });
    const source = container.querySelector("source");
    expect(source?.getAttribute("src")).toBe(props.desktopVideoSrc);
    expect(source).not.toHaveAttribute("media");
  });

  it("selects the mobile encode when the viewport media query matches", async () => {
    stubMatchMedia(true);
    mockedUseReducedMotion.mockReturnValue(false);
    const { container } = render(<ImmersionHeroMedia {...props} />);

    await waitFor(() => {
      expect(container.querySelectorAll("source")).toHaveLength(1);
    });
    const source = container.querySelector("source");
    expect(source?.getAttribute("src")).toBe(props.mobileVideoSrc);
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
