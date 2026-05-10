#!/usr/bin/env node
/**
 * Lighthouse runner for QA performance pass.
 *
 * Boots `next start` on http://127.0.0.1:3100 (configurable via PORT), then
 * runs a mobile Lighthouse audit against each route in `ROUTES`. Writes:
 *   - per-route JSON to docs/performance/lighthouse-{label}/{route}.json
 *   - a markdown summary table to docs/performance/lighthouse-{label}.md
 *
 * Usage:
 *   node scripts/lighthouse.mjs                # label = "before"
 *   LIGHTHOUSE_LABEL=after node scripts/lighthouse.mjs
 *
 * Assumes a production build already exists (`npm run build` first).
 */

import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/news", name: "news" },
  { path: "/about/team", name: "about-team" },
  { path: "/programs", name: "programs" },
  { path: "/programs/akomapa-ghltp", name: "programs-akomapa-ghltp" },
];

const LABEL = process.env.LIGHTHOUSE_LABEL || "before";
const PORT = Number.parseInt(process.env.PORT || "3100", 10);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const OUT_DIR = path.resolve("docs/performance");
const RUN_DIR = path.join(OUT_DIR, `lighthouse-${LABEL}`);

async function waitForServer(url, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.status < 500) return;
    } catch {
      /* not ready yet */
    }
    await sleep(500);
  }
  throw new Error(`Server at ${url} did not become ready within ${timeoutMs}ms`);
}

function startNextServer() {
  if (!existsSync(path.resolve(".next"))) {
    throw new Error(
      "No .next build found. Run `npm run build` before this script."
    );
  }
  const proc = spawn(
    "npx",
    ["next", "start", "--hostname", "127.0.0.1", "--port", String(PORT)],
    { stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, NODE_ENV: "production" } }
  );
  proc.stdout?.on("data", () => {});
  proc.stderr?.on("data", (chunk) => {
    process.stderr.write(`[next start] ${chunk}`);
  });
  return proc;
}

async function runLighthouse(url) {
  const lighthouse = (await import("lighthouse")).default;
  const chromeLauncher = await import("chrome-launcher");
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });
  try {
    const result = await lighthouse(
      url,
      {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false,
        },
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
          cpuSlowdownMultiplier: 4,
        },
      }
    );
    return result?.lhr;
  } finally {
    await chrome.kill();
  }
}

function formatScore(score) {
  if (typeof score !== "number") return "—";
  return Math.round(score * 100).toString();
}

async function main() {
  await mkdir(RUN_DIR, { recursive: true });

  const server = startNextServer();
  let exitCode = 0;
  try {
    await waitForServer(BASE_URL);

    const rows = [];
    for (const route of ROUTES) {
      const url = `${BASE_URL}${route.path}`;
      process.stdout.write(`Auditing ${url} ... `);
      try {
        const lhr = await runLighthouse(url);
        await writeFile(
          path.join(RUN_DIR, `${route.name}.json`),
          JSON.stringify(lhr, null, 2),
          "utf8"
        );
        const cats = lhr.categories;
        const audits = lhr.audits;
        rows.push({
          route: route.path,
          performance: formatScore(cats.performance?.score),
          accessibility: formatScore(cats.accessibility?.score),
          bestPractices: formatScore(cats["best-practices"]?.score),
          seo: formatScore(cats.seo?.score),
          lcp: audits["largest-contentful-paint"]?.displayValue ?? "—",
          cls: audits["cumulative-layout-shift"]?.displayValue ?? "—",
          tbt: audits["total-blocking-time"]?.displayValue ?? "—",
        });
        process.stdout.write("ok\n");
      } catch (err) {
        process.stdout.write(`failed: ${err.message}\n`);
        rows.push({
          route: route.path,
          performance: "ERR",
          accessibility: "ERR",
          bestPractices: "ERR",
          seo: "ERR",
          lcp: "—",
          cls: "—",
          tbt: "—",
        });
      }
    }

    const md = [
      `# Lighthouse — ${LABEL}`,
      "",
      `Run at: ${new Date().toISOString()}`,
      `Base URL: ${BASE_URL}`,
      "",
      "| Route | Perf | A11y | BP | SEO | LCP | CLS | TBT |",
      "|---|---:|---:|---:|---:|---|---|---|",
      ...rows.map(
        (r) =>
          `| \`${r.route}\` | ${r.performance} | ${r.accessibility} | ${r.bestPractices} | ${r.seo} | ${r.lcp} | ${r.cls} | ${r.tbt} |`
      ),
      "",
    ].join("\n");

    await writeFile(path.join(OUT_DIR, `lighthouse-${LABEL}.md`), md, "utf8");
    process.stdout.write(`\nWrote ${OUT_DIR}/lighthouse-${LABEL}.md\n`);
  } catch (err) {
    console.error(err);
    exitCode = 1;
  } finally {
    server.kill("SIGTERM");
    // Give next time to release the port.
    await sleep(500);
  }
  process.exit(exitCode);
}

main();
