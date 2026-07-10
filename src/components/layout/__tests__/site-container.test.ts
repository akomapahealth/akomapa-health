import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function readSource(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("site container layout contract", () => {
  it("defines the approved max width and responsive gutter scale", () => {
    const styles = readSource("src/app/globals.css");

    expect(styles).toContain(".site-container");
    expect(styles).toContain("max-width: 90rem");
    expect(styles).toContain("padding-inline: 1rem");
    expect(styles).toContain("padding-inline: 1.5rem");
    expect(styles).toContain("padding-inline: 2rem");
    expect(styles).toContain("padding-inline: 2.5rem");
    expect(styles).toContain("padding-inline: 3rem");
    expect(styles).toContain("padding-inline: 4rem");
  });

  it("adopts the shared container in public layout primitives", () => {
    for (const path of [
      "src/components/layout/Header.tsx",
      "src/components/layout/Footer.tsx",
      "src/components/shared/PublicPagePrimitives.tsx",
      "src/components/home/_home-ui.tsx",
    ]) {
      expect(readSource(path), `${path} should use site-container`).toContain(
        "site-container",
      );
    }
  });

  it("preserves the Our Teams network hero composition", () => {
    const teamPage = readSource("src/app/(main)/about/team/ClientPage.tsx");
    const heroContainer =
      'className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-6 flex flex-col gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:items-center"';

    expect(teamPage).toContain(heroContainer);
  });
});
