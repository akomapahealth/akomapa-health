import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// next/image — render a plain <img> element so RTL queries work and we don't
// hit the Next.js image optimization layer in jsdom.
// Strip Next.js-specific props that don't belong on a real <img>; everything
// else (className, data-*, role, style, etc.) is forwarded so RTL queries
// keep working.
const NEXT_IMAGE_OWN_PROPS = new Set([
  "priority",
  "fill",
  "quality",
  "sizes",
  "loader",
  "placeholder",
  "blurDataURL",
  "loading",
  "unoptimized",
  "onLoadingComplete",
  "minWidth",
  "minHeight",
]);

vi.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: Record<string, unknown> & {
      src: string | { src: string };
      alt?: string;
    }
  ) => {
    const { src, alt } = props;
    const passthrough: Record<string, unknown> = {};
    for (const key of Object.keys(props)) {
      if (key === "src" || key === "alt") continue;
      if (NEXT_IMAGE_OWN_PROPS.has(key)) continue;
      passthrough[key] = props[key];
    }
    const resolvedSrc = typeof src === "string" ? src : src?.src ?? "";
    return React.createElement("img", {
      ...passthrough,
      src: resolvedSrc,
      alt: alt ?? "",
    });
  },
}));

// next/link — render a plain <a> element.
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...rest
  }: { href: string; children?: React.ReactNode } & Record<string, unknown>) =>
    React.createElement("a", { href, ...rest }, children),
}));

// next/navigation — minimal stubs covering the most common client APIs.
vi.mock("next/navigation", () => {
  const router = {
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  };
  return {
    useRouter: () => router,
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
    useParams: () => ({}),
    redirect: vi.fn(),
    notFound: vi.fn(),
  };
});

// next/dynamic — return a no-op stub. We don't want to require Suspense
// boundaries or async resolution in unit tests; dynamic imports are exercised
// by the e2e suite. Tests that need the real component should import it
// directly instead of through the dynamic factory.
vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => {
    const Stub: React.FC<Record<string, unknown>> = () => null;
    Stub.displayName = "DynamicStub";
    return Stub;
  },
}));

// framer-motion — strip animation props and render the underlying tag.
vi.mock("framer-motion", async () => {
  const FRAMER_PROPS = new Set([
    "initial",
    "animate",
    "exit",
    "transition",
    "variants",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag",
    "whileInView",
    "viewport",
    "drag",
    "layout",
    "layoutId",
    "onAnimationStart",
    "onAnimationComplete",
  ]);

  const stripFramerProps = (props: Record<string, unknown>) => {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(props)) {
      if (!FRAMER_PROPS.has(key)) out[key] = props[key];
    }
    return out;
  };

  const wrapAsMotion = (
    tagOrComponent: string | React.ElementType
  ): React.FC<Record<string, unknown>> => {
    const Component: React.FC<Record<string, unknown>> = (props) =>
      React.createElement(
        tagOrComponent as React.ElementType,
        stripFramerProps(props)
      );
    Component.displayName =
      typeof tagOrComponent === "string"
        ? `motion.${tagOrComponent}`
        : `motion(${
            (tagOrComponent as { displayName?: string; name?: string })
              .displayName ??
            (tagOrComponent as { name?: string }).name ??
            "Component"
          })`;
    return Component;
  };

  // `motion` must work as both `motion.div` (proxy) and `motion(Component)`
  // (factory). Use a callable function as the proxy target.
  const motionFn = ((tagOrComponent: string | React.ElementType) =>
    wrapAsMotion(tagOrComponent)) as unknown as Record<
    string,
    React.FC<Record<string, unknown>>
  >;

  const motion = new Proxy(motionFn, {
    get: (target, prop: string, receiver) => {
      if (prop in target) return Reflect.get(target, prop, receiver);
      return wrapAsMotion(prop);
    },
  }) as unknown as Record<string, React.FC<Record<string, unknown>>> &
    ((c: React.ElementType) => React.FC<Record<string, unknown>>);

  return {
    motion,
    AnimatePresence: ({ children }: { children?: React.ReactNode }) => children,
    useReducedMotion: () => false,
    useMotionValue: (v: unknown) => ({ get: () => v, set: vi.fn() }),
    useTransform: () => ({ get: () => 0, set: vi.fn() }),
    useScroll: () => ({ scrollY: { get: () => 0 }, scrollYProgress: { get: () => 0 } }),
    useInView: () => true,
    LazyMotion: ({ children }: { children?: React.ReactNode }) => children,
    domAnimation: {},
    m: motion,
  };
});

// swiper/react — render slides as children inside a div.
vi.mock("swiper/react", () => ({
  __esModule: true,
  Swiper: ({ children, className }: { children?: React.ReactNode; className?: string }) =>
    React.createElement("div", { className, "data-testid": "swiper" }, children),
  SwiperSlide: ({ children, className }: { children?: React.ReactNode; className?: string }) =>
    React.createElement("div", { className, "data-testid": "swiper-slide" }, children),
}));

vi.mock("swiper/modules", () => ({
  Autoplay: {},
  EffectFade: {},
  Keyboard: {},
  Navigation: {},
  Pagination: {},
  A11y: {},
}));

vi.mock("swiper/css", () => ({}));
vi.mock("swiper/css/effect-fade", () => ({}));
vi.mock("swiper/css/pagination", () => ({}));
vi.mock("swiper/css/navigation", () => ({}));

// lottie-react — render a placeholder so import alone doesn't fail.
vi.mock("lottie-react", () => ({
  __esModule: true,
  default: () => React.createElement("div", { "data-testid": "lottie" }),
}));

// matchMedia — jsdom doesn't ship one.
if (typeof window !== "undefined" && !window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

// IntersectionObserver — used by lazy/in-view hooks.
if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn().mockReturnValue([]);
  }
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
}

// ResizeObserver — used by Radix and Swiper.
if (typeof window !== "undefined" && !("ResizeObserver" in window)) {
  class MockResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    configurable: true,
    value: MockResizeObserver,
  });
  Object.defineProperty(globalThis, "ResizeObserver", {
    writable: true,
    configurable: true,
    value: MockResizeObserver,
  });
}
