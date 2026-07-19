import { expect, test, type Page } from "@playwright/test";
import { announcementCampaign } from "../src/data/announcements";

const researchPath = "/research/student-led-interventions";
const pdfPath = "/documents/research.pdf";

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

function trackPdfRequests(page: Page) {
  const requests: string[] = [];

  page.on("request", (request) => {
    const url = request.url();
    if (url.includes(pdfPath) || url.includes("pdf.worker")) {
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

  test("loads the viewer through its explicit action without IntersectionObserver", async ({
    page,
  }) => {
    await preparePage(page, true);
    await page.goto(researchPath, { waitUntil: "domcontentloaded" });

    const pdfRequest = page.waitForRequest((request) =>
      request.url().includes(pdfPath),
    );

    await page.getByRole("link", { name: "View PDF" }).click();
    await page.getByRole("button", { name: "Load PDF viewer" }).click();

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

      // IntersectionObserver uses a -50% bottom rootMargin, so scroll-into-view
      // alone can miss the threshold — click the explicit load control if needed.
      const loadButton = page.getByRole("button", { name: "Load PDF viewer" });
      if (await loadButton.isVisible()) {
        await loadButton.click();
      }

      // Shell mounts before the PDF request finishes — wait for real load.
      await expect(page.getByTestId("pdf-viewer-loaded")).toBeVisible({
        timeout: 15_000,
      });
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
