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
      "src/components/shared/EditorialPrimitives.tsx",
    ]) {
      expect(readSource(path), `${path} should use site-container`).toContain(
        "site-container",
      );
    }
  });

  it("keeps the Team network inside the shared layout system", () => {
    const teamPage = readSource("src/components/about/TeamPageContent.tsx");
    const teamNetwork = readSource(
      "src/components/about/TeamHeroNetwork.tsx",
    );

    expect(teamPage).toContain("<TeamHeroNetwork");
    expect(teamNetwork).toContain("data-team-node-network");
    expect(teamPage).toContain("site-container");
    expect(teamPage).not.toContain("container mx-auto px-4");
  });
});
