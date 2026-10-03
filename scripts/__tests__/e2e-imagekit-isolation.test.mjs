import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  isImageKitRequestUrl,
  isRealMediaCdnRequest,
  isVideoRequestUrl,
} from "../../e2e/media/imagekit-url.mjs";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
const e2eDir = path.join(repoRoot, "e2e");
const realMediaSpec = "real-media.spec.ts";

function importedNames(clause) {
  return clause
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.replace(/^type\s+/, "").split(/\s+as\s+/)[0].trim());
}

function specImports(source) {
  const imports = [];
  const pattern = /import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g;
  for (const match of source.matchAll(pattern)) {
    imports.push({ names: importedNames(match[1]), from: match[2] });
  }
  return imports;
}

test("ImageKit host and real-media allowlist stay narrow", () => {
  assert.equal(
    isImageKitRequestUrl("https://ik.imagekit.io/akomapa/highlights/photo.jpg"),
    true,
  );
  assert.equal(
    isImageKitRequestUrl("https://cdn.imagekit.io/akomapa/photo.jpg"),
    true,
  );
  assert.equal(isImageKitRequestUrl("https://img.youtube.com/vi/abc/0.jpg"), false);
  assert.equal(isImageKitRequestUrl("https://akomapa.org/photo.jpg"), false);
  assert.equal(
    isVideoRequestUrl("https://ik.imagekit.io/akomapa/immersion-hero.mp4?tr=q-60,w-960"),
    true,
  );
  assert.equal(
    isVideoRequestUrl("https://ik.imagekit.io/akomapa/images/team/jade_kissi.heif?tr=f-auto"),
    false,
  );

  assert.equal(
    isRealMediaCdnRequest(
      "https://ik.imagekit.io/akomapa/images/team/jade_kissi.heif?tr=f-auto,q-75,w-384",
    ),
    true,
  );
  assert.equal(
    isRealMediaCdnRequest(
      "https://ik.imagekit.io/akomapa/images/team/darren_markwei.HEIC?tr=f-auto,q-75,w-384",
    ),
    true,
  );
  assert.equal(
    isRealMediaCdnRequest(
      "https://ik.imagekit.io/akomapa/immersion-hero.mp4?tr=q-60,w-960",
    ),
    true,
  );
  assert.equal(
    isRealMediaCdnRequest(
      "https://ik.imagekit.io/akomapa/immersion-hero.mp4?tr=q-60,w-1280",
    ),
    false,
  );
  assert.equal(
    isRealMediaCdnRequest(
      "https://ik.imagekit.io/akomapa/highlights/Akomapa-28.jpg?tr=f-auto,q-75,w-1920",
    ),
    false,
  );
});

test("routine specs use the isolating Playwright entry and cannot open a raw page", async () => {
  const files = (await readdir(e2eDir)).filter((name) => name.endsWith(".spec.ts"));
  assert.ok(files.includes("imagekit-isolation.spec.ts"));

  for (const file of files) {
    if (file === realMediaSpec) continue;
    const source = await readFile(path.join(e2eDir, file), "utf8");
    const imports = specImports(source);
    const playwrightTest = imports.some(
      (item) => item.from === "@playwright/test" && item.names.includes("test"),
    );
    const isolatedTest = imports.some(
      (item) => item.from === "./media/playwright" && item.names.includes("test"),
    );

    assert.equal(
      playwrightTest,
      false,
      `${file} imports test from @playwright/test and would skip ImageKit isolation`,
    );
    assert.equal(isolatedTest, true, `${file} must import test from ./media/playwright`);
    assert.equal(
      source.includes("browser.newPage("),
      false,
      `${file} calls browser.newPage(), which is outside the newContext isolation wrapper`,
    );
  }
});

test("the real-media spec stays on stock Playwright when it is present", async () => {
  const files = await readdir(e2eDir);
  if (!files.includes(realMediaSpec)) return;

  const source = await readFile(path.join(e2eDir, realMediaSpec), "utf8");
  const imports = specImports(source);
  assert.equal(
    imports.some(
      (item) => item.from === "@playwright/test" && item.names.includes("test"),
    ),
    true,
  );
  assert.equal(
    imports.some((item) => item.from === "./media/playwright"),
    false,
  );
});
