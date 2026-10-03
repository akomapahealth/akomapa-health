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
    const endpoints = imageKitEndpoints(await readRepoFile(workflowPath));
    // E2E reuses this build: NEXT_PUBLIC_* values cannot be fixed at server start.
    assert.deepEqual(endpoints, ["https://ik.imagekit.io/akomapa"], workflowPath);
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
