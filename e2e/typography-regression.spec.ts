import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

const pages = [
  { path: "/", headingSelector: "main h1" },
  { path: "/about", headingSelector: "main h1" },
  { path: "/programs", headingSelector: "main h1" },
  { path: "/contact", headingSelector: "main h1" },
] as const;

async function waitForTypography(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForTimeout(400);
}

async function assertNoHorizontalOverflow(page: Page) {
  const overflowState = await page.evaluate(() => {
    const viewport = window.innerWidth;
    const root = document.documentElement;
    const body = document.body;
    const scrollingElement = document.scrollingElement ?? root;
    const maxWidth = Math.max(root.scrollWidth, body.scrollWidth, scrollingElement.scrollWidth);
    const originalScrollX = window.scrollX;

    window.scrollTo(viewport * 2, window.scrollY);
    const horizontalScrollDetected = window.scrollX > originalScrollX + 1;
    window.scrollTo(originalScrollX, window.scrollY);

    return {
      maxWidth,
      viewport,
      horizontalScrollDetected,
    };
  });

  expect.soft(overflowState.maxWidth, "Document scroll width exceeded the viewport").toBeLessThanOrEqual(
    overflowState.viewport + 1
  );
  expect(overflowState.horizontalScrollDetected).toBe(false);
}

async function assertHeadingsFit(page: Page) {
  const headingChecks = await page.locator("main h1, main h2, main h3").evaluateAll((elements) =>
    elements
      .filter((element) => {
        const htmlElement = element as HTMLElement;
        const style = window.getComputedStyle(htmlElement);
        const rect = htmlElement.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      })
      .slice(0, 12)
      .map((element) => {
        const htmlElement = element as HTMLElement;
        const rect = htmlElement.getBoundingClientRect();
        return {
          text: htmlElement.textContent?.trim() ?? "",
          horizontalOverflow: htmlElement.scrollWidth > htmlElement.clientWidth + 1,
          clipped: rect.left < -1 || rect.right > window.innerWidth + 1,
        };
      })
  );

  expect(headingChecks.length).toBeGreaterThan(0);

  for (const heading of headingChecks) {
    expect.soft(heading.horizontalOverflow, `Heading overflowed: ${heading.text}`).toBe(false);
    expect.soft(heading.clipped, `Heading clipped: ${heading.text}`).toBe(false);
  }
}

async function assertButtonsHoldShape(page: Page) {
  const buttonChecks = await page.locator("button.inline-flex, a.inline-flex, [data-slot='select-trigger']").evaluateAll((elements) =>
    elements
      .filter((element) => {
        const htmlElement = element as HTMLElement;
        const style = window.getComputedStyle(htmlElement);
        const rect = htmlElement.getBoundingClientRect();
        const hasBackground = style.backgroundColor !== "rgba(0, 0, 0, 0)";
        const hasBorder = Number.parseFloat(style.borderTopWidth) > 0;
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 72 &&
          rect.height > 0 &&
          (hasBackground || hasBorder)
        );
      })
      .slice(0, 16)
      .map((element) => {
        const htmlElement = element as HTMLElement;
        const style = window.getComputedStyle(htmlElement);
        const rect = htmlElement.getBoundingClientRect();
        return {
          text: htmlElement.textContent?.trim() ?? "",
          height: rect.height,
          paddingLeft: Number.parseFloat(style.paddingLeft),
          paddingRight: Number.parseFloat(style.paddingRight),
          paddingTop: Number.parseFloat(style.paddingTop),
          paddingBottom: Number.parseFloat(style.paddingBottom),
          clipped: htmlElement.scrollWidth > htmlElement.clientWidth + 1,
        };
      })
  );

  expect(buttonChecks.length).toBeGreaterThan(0);

  for (const button of buttonChecks) {
    expect.soft(button.paddingLeft, `Button lost left padding: ${button.text}`).toBeGreaterThanOrEqual(12);
    expect.soft(button.paddingRight, `Button lost right padding: ${button.text}`).toBeGreaterThanOrEqual(12);
    expect.soft(button.paddingTop, `Button lost top padding: ${button.text}`).toBeGreaterThanOrEqual(8);
    expect.soft(button.paddingBottom, `Button lost bottom padding: ${button.text}`).toBeGreaterThanOrEqual(8);
    expect.soft(button.clipped, `Button label clipped: ${button.text}`).toBe(false);
  }
}

async function assertCardsAndStatsFit(page: Page) {
  const cardChecks = await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll("main article, main [data-slot='card']")) as HTMLElement[];

    return candidates
      .filter((element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      })
      .slice(0, 20)
      .map((element) => ({
        text: element.textContent?.trim().slice(0, 80) ?? "",
        overflow: element.scrollWidth > element.clientWidth + 1,
      }));
  });

  for (const card of cardChecks) {
    expect.soft(card.overflow, `Card or stats block overflowed: ${card.text}`).toBe(false);
  }
}

async function assertFormsFit(page: Page) {
  const formChecks = await page.locator("form").evaluateAll((elements) =>
    elements
      .filter((element) => {
        const htmlElement = element as HTMLElement;
        const style = window.getComputedStyle(htmlElement);
        const rect = htmlElement.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      })
      .map((element) => {
        const htmlElement = element as HTMLElement;
        const fields = Array.from(
          htmlElement.querySelectorAll("input, textarea, button, [data-slot='select-trigger']")
        ) as HTMLElement[];

        return {
          overflow: htmlElement.scrollWidth > htmlElement.clientWidth + 1,
          fieldOverflow: fields.some((field) => field.scrollWidth > field.clientWidth + 1),
        };
      })
  );

  expect(formChecks.length).toBeGreaterThan(0);

  for (const form of formChecks) {
    expect.soft(form.overflow, "Form layout overflowed").toBe(false);
    expect.soft(form.fieldOverflow, "Form control content clipped").toBe(false);
  }
}

async function assertDesktopNavSpacing(page: Page) {
  const nav = page.locator("header nav").first();

  if (!(await nav.isVisible())) {
    return;
  }

  const navCheck = await nav.evaluate((element) => {
    const links = Array.from(element.children)
      .map((child) => child.firstElementChild)
      .filter((child): child is HTMLElement => child instanceof HTMLElement && child.tagName === "A");
    const lineHeight = Number.parseFloat(window.getComputedStyle(links[0] ?? element).lineHeight);

    return {
      overflow: element.scrollWidth > element.clientWidth + 1,
      wrapped: links.some((link) => link.getBoundingClientRect().height > lineHeight * 1.6),
    };
  });

  expect(navCheck.overflow).toBe(false);
  expect(navCheck.wrapped).toBe(false);
}

test.describe("Typography regression", () => {
  for (const viewport of viewports) {
    for (const pageConfig of pages) {
      test(`${viewport.name} typography remains stable on ${pageConfig.path}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(pageConfig.path, { waitUntil: "domcontentloaded" });
        await waitForTypography(page);

        await expect(page.locator(pageConfig.headingSelector).first()).toBeVisible();

        await assertNoHorizontalOverflow(page);
        await assertHeadingsFit(page);
        await assertButtonsHoldShape(page);
        await assertCardsAndStatsFit(page);
        await assertFormsFit(page);

        if (viewport.name === "desktop") {
          await assertDesktopNavSpacing(page);
        }
      });
    }
  }
});
