import { describe, expect, it } from "vitest";
import {
  defaultScrollViewport,
  defaultStaggerScrollViewport,
  fadeUpStaggerContainerVariants,
} from "@/lib/motion/tokens";

describe("scroll-reveal viewport tokens", () => {
  it("keeps short FadeIn sections on a 20% threshold", () => {
    expect(defaultScrollViewport).toEqual({ once: true, amount: 0.2 });
  });

  it("lets tall FadeInStagger grids reveal on any intersection", () => {
    expect(defaultStaggerScrollViewport).toEqual({
      once: true,
      amount: "some",
    });
  });

  it("does not hide the stagger container itself", () => {
    const variants = fadeUpStaggerContainerVariants(0.1);

    expect(variants.hidden).toEqual({});
    expect(variants.visible).toMatchObject({
      transition: { staggerChildren: 0.1 },
    });
    expect(variants.hidden).not.toHaveProperty("opacity");
    expect(variants.visible).not.toHaveProperty("opacity");
  });
});
