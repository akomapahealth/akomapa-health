import { expect, type Page } from "@playwright/test";
import { test } from "./media/playwright";
import { announcementCampaign } from "../src/data/announcements";

const researchPath = "/research/student-led-interventions";
const pdfPath = "/documents/research.pdf";
const plosPath = "/research/stakeholder-support-student-run-free-clinics-ghana";
const plosPdfPath = "/documents/journal.pgph.0005092.pdf";
const plosDoiUrl = "https://doi.org/10.1371/journal.pgph.0005092";
const plosArticleUrl =
  "https://journals.plos.org/globalpublichealth/article?id=10.1371/journal.pgph.0005092";

async function preparePage(page: Page, disableIntersectionObserver = false) {
  await page.addInitScript(
    ({ version, disableObserver }) => {
      localStorage.setItem("akomapa-announcements-dismissed", version);

      if (disableObserver) {
        Object.defineProperty(window, "IntersectionObserver", {
          configurable: true,
          value: undefined,
        });
      }
    },
    {
      version: announcementCampaign.version,
      disableObserver: disableIntersectionObserver,
    },
  );
}

function trackPdfRequests(page: Page, documentPath = pdfPath) {
  const requests: string[] = [];

  page.on("request", (request) => {
    const url = request.url();
    if (url.includes(documentPath) || url.includes("pdf.worker")) {
      requests.push(url);
    }
  });

  return requests;
}

async function expectNoPageOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth <= 1,
      ),
    )
    .toBe(true);
}

test.describe("research detail PDF lazy loading", () => {
  test("renders the paper content and actions without requesting PDF assets", async ({
    page,
  }) => {
    await preparePage(page);
    const pdfRequests = trackPdfRequests(page);

    await page.goto(researchPath, { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Exploring Health Professional Student-Led Interventions/i,
      }),
    ).toBeVisible();
    await expect(page.getByText("B. A. Fleischer")).toBeVisible();
    await expect(page.getByText("Published: January 2025")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Abstract" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View PDF" })).toBeVisible();

    const download = page.getByRole("link", { name: "Download PDF" });
    await expect(download).toHaveAttribute("href", pdfPath);
    await expect(download).toHaveAttribute(
      "download",
      "student-led-interventions.pdf",
    );

    const print = page.getByRole("link", { name: "Print PDF" });
    await expect(print).toHaveAttribute("href", pdfPath);
    await expect(print).toHaveAttribute("target", "_blank");
    await expect(print).toHaveAttribute("rel", /noopener/);

    await page.waitForTimeout(500);
    expect(pdfRequests).toEqual([]);
  });

  test("renders the PLOS study with publisher links and the same lazy PDF behavior", async ({
    page,
  }) => {
    await preparePage(page);
    const pdfRequests = trackPdfRequests(page, plosPdfPath);

    await page.goto(plosPath, { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Exploring stakeholder support for student-run free clinics/i,
      }),
    ).toBeVisible();
    await expect(page.getByText("PLOS Global Public Health", { exact: true })).toBeVisible();
    await expect(page.getByText("Published: September 21, 2026")).toBeVisible();
    await expect(page.getByText(/Jeremy I\. Schwartz/)).toBeVisible();

    const doi = page.getByRole("link", { name: "DOI: 10.1371/journal.pgph.0005092" });
    await expect(doi).toHaveAttribute("href", plosDoiUrl);
    await expect(doi).toHaveAttribute("target", "_blank");

    const citation = page.getByTestId("research-citation");
    await expect(citation).toContainText("Cite this paper");
    await expect(citation).toContainText("PLOS Glob Public Health 6(9): e0005092.");

    const publisher = page.getByRole("link", { name: "Read on PLOS Global Public Health" });
    await expect(publisher).toHaveAttribute("href", plosArticleUrl);
    await expect(publisher).toHaveAttribute("target", "_blank");
    await expect(publisher).toHaveAttribute("rel", /noopener/);

    const download = page.getByRole("link", { name: "Download PDF" });
    await expect(download).toHaveAttribute("href", plosPdfPath);
    await expect(download).toHaveAttribute(
      "download",
      "stakeholder-support-student-run-free-clinics-ghana.pdf",
    );

    // JSON-LD carries the verified publication details.
    const jsonLdBlocks = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const data = jsonLdBlocks
      .map((block) => JSON.parse(block))
      .find((block) => block["@type"] === "ScholarlyArticle");
    expect(data).toBeDefined();
    expect(data.datePublished).toBe("2026-09-21");
    expect(data.sameAs).toEqual([plosDoiUrl, plosArticleUrl]);
    expect(data.author).toHaveLength(6);

    await page.waitForTimeout(500);
    expect(pdfRequests).toEqual([]);

    await page.getByTestId("deferred-pdf-viewer").scrollIntoViewIfNeeded();
    const loaded = page.getByTestId("pdf-viewer-loaded");
    const loadButton = page.getByRole("button", { name: "Load PDF viewer" });
    await Promise.race([
      loaded.waitFor({ state: "visible", timeout: 15_000 }),
      loadButton
        .click({ timeout: 5_000 })
        .catch(() => undefined)
        .then(() => loaded.waitFor({ state: "visible", timeout: 15_000 })),
    ]);
    await expect(page.getByText(/Page 1 of \d+/)).toBeVisible({ timeout: 15_000 });
    await expect
      .poll(() => pdfRequests.some((url) => url.includes(plosPdfPath)))
      .toBe(true);
  });

  test("centers the PDF viewer beneath the abstract", async ({ page }) => {
    await preparePage(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(researchPath, { waitUntil: "domcontentloaded" });

    const measure = page.locator("[data-publication-article-measure]");
    const viewer = page.locator("#pdf-viewer");
    await expect(measure).toBeVisible();
    await expect(viewer).toBeAttached();
    await viewer.scrollIntoViewIfNeeded();

    const measureBox = await measure.boundingBox();
    const viewerBox = await viewer.boundingBox();
    expect(measureBox).not.toBeNull();
    expect(viewerBox).not.toBeNull();

    const measureCenter = measureBox!.x + measureBox!.width / 2;
    const viewerCenter = viewerBox!.x + viewerBox!.width / 2;
    expect(Math.abs(viewerCenter - measureCenter)).toBeLessThanOrEqual(2);
    expect(viewerBox!.width).toBeGreaterThan(measureBox!.width);
  });

  test("loads the viewer through its explicit action without IntersectionObserver", async ({
    page,
  }) => {
    await preparePage(page, true);
    await page.goto(researchPath, { waitUntil: "domcontentloaded" });

    await page.getByRole("link", { name: "View PDF" }).click();
    const loadButton = page.getByRole("button", { name: "Load PDF viewer" });
    const pdfRequest = page.waitForRequest(
      (request) => request.url().includes(pdfPath),
      { timeout: 20_000 },
    );

    await expect(async () => {
      if (await loadButton.isVisible()) {
        await loadButton.click();
      }
      await expect(page.getByTestId("pdf-viewer-loaded")).toBeVisible({
        timeout: 2_000,
      });
    }).toPass({ timeout: 15_000 });

    await pdfRequest;
    await expect(page.getByTestId("pdf-viewer-loaded")).toBeVisible();
    await expect(page.getByText(/Page 1 of \d+/)).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Rotate PDF clockwise" }),
    ).toBeVisible();
  });

  test("loads on scroll and contains overflow across responsive viewports", async ({
    page,
  }) => {
    await preparePage(page);
    const pdfRequests = trackPdfRequests(page);

    for (const viewport of [
      { width: 375, height: 812 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto(researchPath, { waitUntil: "domcontentloaded" });
      await page.getByTestId("deferred-pdf-viewer").scrollIntoViewIfNeeded();

      const loaded = page.getByTestId("pdf-viewer-loaded");
      const loadButton = page.getByRole("button", { name: "Load PDF viewer" });

      // IntersectionObserver may auto-load after scroll, or we click the button.
      // Race both so a mid-click detach from auto-load does not fail the test.
      await Promise.race([
        loaded.waitFor({ state: "visible", timeout: 15_000 }),
        loadButton
          .click({ timeout: 5_000 })
          .catch(() => undefined)
          .then(() => loaded.waitFor({ state: "visible", timeout: 15_000 })),
      ]);

      // Shell mounts before the PDF request finishes — wait for real load.
      await expect(page.getByText(/Page 1 of \d+/)).toBeVisible({
        timeout: 15_000,
      });
      await expectNoPageOverflow(page);
    }

    await expect
      .poll(() => pdfRequests.some((url) => url.includes(pdfPath)))
      .toBe(true);
    await expect
      .poll(() => pdfRequests.some((url) => url.includes("pdf.worker")))
      .toBe(true);
  });
});
