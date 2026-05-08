import { test, expect, Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

/**
 * Hero slider E2E coverage:
 * - brand intro slide visible initially
 * - pagination dots match slide count (1 brand + N announcements)
 * - prev/next + dot nav advance the slider
 * - external CTAs are properly secured
 * - video CTA opens an iframe modal
 * - prefers-reduced-motion disables autoplay
 */

const expectedSlideCount = 1 + announcementCampaign.slides.length;

async function dismissAnnouncementPopup(page: Page) {
  // Pre-set localStorage so the announcement popup never opens during the test.
  await page.addInitScript((version: string) => {
    try {
      localStorage.setItem("akomapa-announcements-dismissed", version);
    } catch {
      /* noop */
    }
  }, announcementCampaign.version);
}

/**
 * After clicking a pagination dot, wait for the Swiper fade transition to
 * complete before further interaction (otherwise the outgoing slide still
 * has pointer events and intercepts clicks).
 */
async function waitForActiveSlide(page: Page, index: number) {
  await page.waitForFunction(
    (i) => {
      const slides = document.querySelectorAll(".swiper-slide");
      const target = slides[i] as HTMLElement | undefined;
      if (!target || !target.classList.contains("swiper-slide-active")) {
        return false;
      }
      const heading = target.querySelector("h1, h2");
      return heading !== null;
    },
    index,
    { timeout: 10000 }
  );
}

test.describe("Hero announcement slider", () => {
  test.beforeEach(async ({ page }) => {
    await dismissAnnouncementPopup(page);
  });

  test("renders brand intro slide and pagination matches campaign", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const hero = page.getByTestId("hero-slider");
    await expect(hero).toBeVisible();

    // Brand headline visible (first slide). Use role + name to avoid duplicates from Swiper clones.
    await expect(
      hero.getByRole("heading", { level: 1, name: /global partnership/i }).first()
    ).toBeVisible();

    const dots = page.getByTestId("hero-slider-pagination").getByRole("tab");
    await expect(dots).toHaveCount(expectedSlideCount);
  });

  test("dot navigation advances to an announcement slide", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const dots = page.getByTestId("hero-slider-pagination").getByRole("tab");
    await expect(dots).toHaveCount(expectedSlideCount);

    // Click the second dot (first announcement).
    await dots.nth(1).click();
    await waitForActiveSlide(page, 1);

    const firstAnnouncement = announcementCampaign.slides[0];
    await expect(
      page.getByRole("heading", { level: 2, name: firstAnnouncement.title }).first()
    ).toBeVisible();

    await expect(dots.nth(1)).toHaveAttribute("aria-selected", "true");
  });

  test("external announcement CTAs use safe target/rel", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const dots = page.getByTestId("hero-slider-pagination").getByRole("tab");

    // Find the first non-video external announcement to assert its CTA attributes.
    const externalIndex = announcementCampaign.slides.findIndex(
      (slide) => slide.isExternal && !slide.videoUrl && slide.ctaLink
    );
    expect(externalIndex).toBeGreaterThanOrEqual(0);

    await dots.nth(externalIndex + 1).click();
    await waitForActiveSlide(page, externalIndex + 1);

    const slide = announcementCampaign.slides[externalIndex];
    const cta = page
      .getByRole("link", { name: new RegExp(`${escapeRegex(slide.ctaText!)}.*${escapeRegex(slide.title)}`, "i") })
      .first();

    await expect(cta).toHaveAttribute("target", "_blank");
    await expect(cta).toHaveAttribute("rel", /noopener/);
    await expect(cta).toHaveAttribute("rel", /noreferrer/);
    await expect(cta).toHaveAttribute("href", slide.ctaLink!);
  });

  test("video CTA opens an embed modal", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const dots = page.getByTestId("hero-slider-pagination").getByRole("tab");
    const videoIndex = announcementCampaign.slides.findIndex((slide) => slide.videoUrl);
    expect(videoIndex).toBeGreaterThanOrEqual(0);

    await dots.nth(videoIndex + 1).click();
    await waitForActiveSlide(page, videoIndex + 1);

    const slide = announcementCampaign.slides[videoIndex];
    const playButton = page.getByRole("button", { name: new RegExp(`Play video: ${escapeRegex(slide.title)}`, "i") });
    await expect(playButton).toBeVisible();
    await playButton.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("iframe")).toHaveCount(1);

    await page.getByRole("button", { name: /close video/i }).click();
    await expect(dialog).not.toBeVisible();
  });

  test("prefers-reduced-motion disables autoplay", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const dots = page.getByTestId("hero-slider-pagination").getByRole("tab");
    await expect(dots.first()).toHaveAttribute("aria-selected", "true");

    // Wait beyond one autoplay interval (~7s) and confirm slide hasn't advanced.
    await page.waitForTimeout(8500);
    await expect(dots.first()).toHaveAttribute("aria-selected", "true");
  });
});

function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
