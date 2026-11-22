import { expect, type Locator, type Page } from "@playwright/test";
import { test } from "./media/playwright";
import { announcementCampaign } from "../src/data/announcements";

/**
 * Tailwind font utilities must style form controls like any other element.
 *
 * Normal declarations outside a cascade layer beat every layered one, so an
 * unlayered `button { font: inherit }` silently overrode Tailwind's
 * `@layer utilities` classes on every button and field (#311). Preflight,
 * which Tailwind injects into `@layer base`, already sets `font: inherit` on
 * form controls (see node_modules/tailwindcss/preflight.css).
 * https://developer.mozilla.org/en-US/docs/Web/CSS/@layer
 * https://tailwindcss.com/docs/preflight
 */

type Typography = {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
};

function typography(locator: Locator): Promise<Typography> {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      lineHeight: style.lineHeight,
    };
  });
}

async function preparePage(page: Page) {
  await page.addInitScript((version) => {
    localStorage.setItem("akomapa-announcements-dismissed", version);
  }, announcementCampaign.version);
}

test.describe("form control typography", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  test("no unlayered stylesheet rule sets fonts on form controls", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const offenders = await page.evaluate(() => {
      const formControl = /(^|[^\w-])(button|input|textarea|select)(?![\w-])/;
      const fontProperties = [
        "font",
        "font-family",
        "font-size",
        "font-weight",
        "line-height",
      ];
      const found: string[] = [];

      // Walk conditional groups (@media, @supports) but stop at @layer blocks:
      // rules inside a layer lose to Tailwind utilities, as intended.
      const visit = (rules: CSSRuleList) => {
        for (const rule of Array.from(rules)) {
          if (rule instanceof CSSLayerBlockRule) continue;
          if (rule instanceof CSSStyleRule) {
            const setsFont = fontProperties.some((property) =>
              rule.style.getPropertyValue(property),
            );
            if (setsFont && formControl.test(rule.selectorText)) {
              found.push(rule.cssText);
            }
          }
          if (rule instanceof CSSGroupingRule) visit(rule.cssRules);
        }
      };

      for (const sheet of Array.from(document.styleSheets)) {
        visit(sheet.cssRules);
      }
      return found;
    });

    expect(offenders).toEqual([]);
  });

  test("desktop nav menu triggers match the nav links beside them", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/about", { waitUntil: "domcontentloaded" });

    const nav = page.locator("header").first().getByRole("navigation", {
      name: "Main",
    });
    const homeLink = nav.getByRole("link", { name: "Home" });
    const aboutTrigger = nav.getByRole("button", { name: "About" });
    await expect(aboutTrigger).toBeVisible();

    const trigger = await typography(aboutTrigger);
    expect(trigger).toMatchObject({ fontSize: "14px", fontWeight: "500" });
    expect(trigger.fontSize).toBe((await typography(homeLink)).fontSize);
    expect(trigger.fontFamily).toBe((await typography(homeLink)).fontFamily);
  });

  test.describe("cookie choices", () => {
    test.use({ cookieConsent: "unset" });

    test("buttons use their own label typography", async ({ page }) => {
      await page.goto("/privacy", { waitUntil: "domcontentloaded" });

      const banner = page.getByRole("region", {
        name: "Can we use optional analytics cookies?",
      });
      const accept = banner.getByRole("button", {
        name: "Accept optional cookies",
      });
      const settings = banner.getByRole("button", { name: "Cookie settings" });
      const policyLink = banner.getByRole("link", { name: "Cookie Policy" });
      await expect(accept).toBeVisible();

      expect(await typography(accept)).toMatchObject({
        fontSize: "14px",
        fontWeight: "600",
      });
      // The text button and the link next to it share one class.
      expect(await typography(settings)).toEqual(await typography(policyLink));
    });
  });

  test("contact fields follow their size utilities at each breakpoint", async ({
    page,
  }) => {
    // shadcn inputs use `text-base md:text-sm`. Mobile must stay at 16px, the
    // size below which iOS Safari zooms the page when a field takes focus.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    const email = page.locator("main").getByLabel("Email address");
    await expect(email).toBeVisible();
    expect((await typography(email)).fontSize).toBe("16px");

    await page.setViewportSize({ width: 1440, height: 900 });
    await expect
      .poll(async () => (await typography(email)).fontSize)
      .toBe("14px");
  });
});
