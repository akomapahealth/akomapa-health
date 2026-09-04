import { spawnSync } from "node:child_process";
import { setTimeout } from "node:timers/promises";
import { pathToFileURL } from "node:url";

function runNpmAudit() {
  // Use the same npm CLI that invoked this script, including on Windows.
  const command = process.env.npm_execpath ? process.execPath : "npm";
  const args = process.env.npm_execpath ? [process.env.npm_execpath] : [];
  return spawnSync(command, [...args, "audit", "--omit=dev", "--audit-level=high", "--json",
    "--fetch-retries=0", "--fetch-timeout=30000", ...process.argv.slice(2)], {
    encoding: "utf8", timeout: 90000, maxBuffer: 10 * 1024 * 1024,
  });
}

export async function auditProduction({ run = runNpmAudit, wait = setTimeout, log = console.error } = {}) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const result = run();
    if (result.stdout) log(result.stdout.trim());
    if (result.stderr) log(result.stderr.trim());
    let report;
    try {
      report = JSON.parse(result.stdout);
    } catch {
      // Empty, timed-out, and invalid responses are operational failures.
    }
    const counts = report?.metadata?.vulnerabilities;
    const hasReport = !report?.error && ["high", "critical", "total"].every(
      (key) => Number.isInteger(counts?.[key]) && counts[key] >= 0,
    );
    if (hasReport) {
      // Never retry or hide vulnerability findings or a nonzero npm exit.
      return result.status === 0 && counts.high === 0 && counts.critical === 0 ? 0 : 1;
    }
    if (attempt < 3) {
      log(`npm audit could not complete (attempt ${attempt}/3); retrying in ${attempt * 10}s.`);
      await wait(attempt * 10000);
    }
  }
  log("Production audit unavailable after 3 attempts; failing without a verified audit report.");
  return 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = await auditProduction();
}
