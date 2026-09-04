import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the verified E2E build uses the public portrait CDN, not a placeholder", async () => {
  const workflow = await readFile(
    new URL("../../.github/workflows/ci.yml", import.meta.url),
    "utf8",
  );
  const endpoints = [...workflow.matchAll(/^\s*NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT:\s*(\S+)/gm)];

  // E2E reuses this build: NEXT_PUBLIC_* values cannot be fixed at server start.
  assert.equal(endpoints.length, 1);
  assert.equal(endpoints[0][1], "https://ik.imagekit.io/akomapa");
});
