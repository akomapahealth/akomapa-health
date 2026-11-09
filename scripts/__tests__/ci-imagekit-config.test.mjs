import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function readRepoFile(relativePath) {
  return readFile(new URL(`../../${relativePath}`, import.meta.url), "utf8");
}

function imageKitEndpoints(workflow) {
  return [
    ...workflow.matchAll(/^\s*NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT:\s*(\S+)/gm),
  ].map((match) => match[1]);
}

test("verified E2E builds use the public portrait CDN, not a placeholder", async () => {
  for (const workflowPath of [
    ".github/workflows/ci.yml",
    ".github/workflows/e2e-tests.yml",
  ]) {
    const workflow = await readRepoFile(workflowPath);
    const endpoints = imageKitEndpoints(workflow);
    // E2E reuses this build: NEXT_PUBLIC_* values cannot be fixed at server start.
    assert.deepEqual(endpoints, ["https://ik.imagekit.io/akomapa"], workflowPath);
    assert.match(
      workflow,
      /VERCEL_ENV:\s*production/,
      `${workflowPath} must bake CDN URLs (USE_FIXTURES=0) for the verified E2E artifact`,
    );
    assert.match(
      workflow,
      /NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES:\s*"0"/,
      `${workflowPath} must explicitly bake USE_FIXTURES=0 into the verified E2E artifact`,
    );
  }
});

test("only the CI workflow runs the real-media check", async () => {
  const ci = await readRepoFile(".github/workflows/ci.yml");
  const e2e = await readRepoFile(".github/workflows/e2e-tests.yml");
  const packageJson = JSON.parse(await readRepoFile("package.json"));

  assert.equal(
    packageJson.scripts["test:e2e:real-media"],
    "E2E_REAL_MEDIA=1 playwright test --project=real-media",
  );
  assert.equal(
    [...ci.matchAll(/npm run test:e2e:real-media/g)].length,
    1,
  );
  assert.equal(e2e.includes("test:e2e:real-media"), false);
  assert.equal(e2e.includes("E2E_REAL_MEDIA"), false);
});

test("Lighthouse isolates ImageKit unless explicitly opted out", async () => {
  const script = await readRepoFile("scripts/lighthouse.mjs");
  assert.match(script, /LIGHTHOUSE_IMAGEKIT_FIXTURES !== "0"/);
  assert.match(script, /connectOverCDP/);
  assert.match(script, /localMediaFixture/);
});

test("CI E2E and real-media start keep production ImageKit URLs", async () => {
  const ci = await readRepoFile(".github/workflows/ci.yml");
  const playwright = await readRepoFile("playwright.config.ts");

  assert.match(
    ci,
    /name: Run real ImageKit media check[\s\S]*?VERCEL_ENV:\s*production[\s\S]*?NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES:\s*"0"/,
  );
  assert.match(
    ci,
    /name: Run end-to-end tests[\s\S]*?VERCEL_ENV:\s*production[\s\S]*?NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES:\s*"0"/,
  );
  assert.match(playwright, /VERCEL_ENV: 'production'/);
  assert.match(playwright, /NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES: '0'/);
});

