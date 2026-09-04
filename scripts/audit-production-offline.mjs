import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Reviewed release assets: https://github.com/google/osv-scanner/releases/tag/v2.5.1
const VERSION = "2.5.1";
const SCANNERS = {
  "linux-x64": ["linux_amd64", "f9f25499a2c8cc367b3af45df2ea7eeca7fbccceab9c35079968f4b3652194be"],
  "linux-arm64": ["linux_arm64", "3d0f5aa5a6baa8eb32bcef247388e149ef6030a6634ccae6fa0d62681fb27a6d"],
  "darwin-x64": ["darwin_amd64", "9f89beb6c3d784893cb1cae0a3d56c529bfe91075418c2f9440c45b79654198b"],
  "darwin-arm64": ["darwin_arm64", "75c44d6332f892a1e56286f4105a98ed751ae28d215ca0a8b65cc00d84103054"],
  "win32-x64": ["windows_amd64.exe", "25e42f5ef6711fd8c0fb45390972205891dd44c6bd02ac93f0f63e8e98d9bfb6"],
  "win32-arm64": ["windows_arm64.exe", "33feb0b210a3e5ea7b338c719defc899f8833d990cdd297bcad4ff1a2586ec8b"],
};
const THRESHOLDS = { low: 0, moderate: 4, high: 7, critical: 9 };
const SEVERITIES = { LOW: 0, MODERATE: 4, MEDIUM: 4, HIGH: 7, CRITICAL: 9 };

export function buildProductionInventory(lockfile) {
  if (![2, 3].includes(lockfile?.lockfileVersion) || !lockfile.packages || !lockfile.packages[""]) {
    throw new Error("A version 2 or 3 npm lockfile is required for a complete inventory.");
  }
  const components = new Map();
  for (const [location, pkg] of Object.entries(lockfile.packages)) {
    if (!location) continue;
    if (!pkg || (pkg.dev !== undefined && typeof pkg.dev !== "boolean")) throw new Error("Invalid lockfile package flags.");
    // Match npm audit --omit=dev: devOptional, optional, peer and shared
    // dependencies remain included unless they are explicitly dev-only.
    if (pkg.dev) continue;
    const pathName = location.match(/(?:^|\/)node_modules\/((?:@[^/]+\/)?[^/]+)$/)?.[1];
    const name = pkg.name ?? pathName;
    if (pkg.link || !pathName || typeof name !== "string" || !name || typeof pkg.version !== "string" || !pkg.version) {
      throw new Error(`Unsupported production lockfile entry: ${location}`);
    }
    const purl = `pkg:npm/${name.split("/").map(encodeURIComponent).join("/")}@${encodeURIComponent(pkg.version)}`;
    components.set(`${name}@${pkg.version}`, { type: "library", name, version: pkg.version, purl });
  }
  return validateInventory({ bomFormat: "CycloneDX", components: [...components.values()] });
}

export function verifyScanner(bytes, expectedHash) {
  if (createHash("sha256").update(bytes).digest("hex") !== expectedHash) {
    throw new Error("OSV scanner checksum does not match the reviewed release.");
  }
}

export function validateInventory(sbom) {
  if (sbom?.bomFormat !== "CycloneDX" || !Array.isArray(sbom.components) || !sbom.components.length ||
      sbom.components.some((c) => !c || typeof c.name !== "string" || !c.name ||
        typeof c.version !== "string" || !c.version || !c.purl?.startsWith("pkg:npm/"))) {
    throw new Error("Cannot audit an empty or unsupported production inventory.");
  }
  return sbom.components;
}

export function assessOfflineReport(report, inventory, auditLevel) {
  if (!Object.hasOwn(THRESHOLDS, auditLevel)) throw new Error("Unsupported audit threshold.");
  if (!Array.isArray(report?.results)) throw new Error("Invalid offline audit report.");
  const expected = new Set(inventory.map((c) => `${c.name}@${c.version}`));
  if (!expected.size) throw new Error("Empty production inventory.");
  const scanned = new Set();
  const findings = [];
  for (const result of report.results) {
    if (!Array.isArray(result.packages)) throw new Error("Invalid scanned package list.");
    for (const entry of result.packages) {
      const pkg = entry.package;
      const key = `${pkg?.name}@${pkg?.version}`;
      if (pkg?.ecosystem !== "npm" || !expected.has(key)) throw new Error("Unexpected scanned package.");
      scanned.add(key);
      const vulns = entry.vulnerabilities === undefined ? [] : entry.vulnerabilities;
      if (!Array.isArray(vulns)) throw new Error("Invalid vulnerability list.");
      for (const vuln of vulns) {
        if (typeof vuln?.id !== "string" || !vuln.id) throw new Error("Invalid vulnerability record.");
        const labelScore = SEVERITIES[vuln.database_specific?.severity];
        const scores = (entry.groups ?? []).filter((g) => g.ids?.includes(vuln.id))
          .map((g) => typeof g.max_severity === "string" && g.max_severity.trim() ? Number(g.max_severity) : NaN)
          .filter((n) => Number.isFinite(n) && n >= 0 && n <= 10);
        if (labelScore !== undefined) scores.push(labelScore);
        // Unrated and malicious-package findings must never become implicit passes.
        const score = !scores.length || vuln.id.startsWith("MAL-") ? Infinity : Math.max(...scores);
        findings.push({ package: key, id: vuln.id, score: Number.isFinite(score) ? score : "unknown", blocking: score >= THRESHOLDS[auditLevel] });
      }
    }
  }
  if (scanned.size !== expected.size) throw new Error("Offline audit omitted production packages.");
  return { status: findings.some((f) => f.blocking) ? 1 : 0, scanned: scanned.size, findings };
}

export async function auditProductionOffline({ auditLevel = "high", log = console.error } = {}) {
  const directory = await mkdtemp(join(tmpdir(), "akomapa-offline-audit-"));
  try {
    const release = SCANNERS[`${process.platform}-${process.arch}`];
    if (!release) throw new Error("No reviewed OSV scanner for this platform.");
    const inventory = buildProductionInventory(JSON.parse(await readFile(join(process.cwd(), "package-lock.json"), "utf8")));
    const sbomPath = join(directory, "production.cdx.json");
    await writeFile(sbomPath, JSON.stringify({ bomFormat: "CycloneDX", specVersion: "1.5", version: 1, components: inventory }));

    const response = await fetch(`https://github.com/google/osv-scanner/releases/download/v${VERSION}/osv-scanner_${release[0]}`, {
      signal: AbortSignal.timeout(60000),
    });
    if (!response.ok) throw new Error(`Scanner download failed: HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    verifyScanner(bytes, release[1]);
    const scannerPath = join(directory, process.platform === "win32" ? "osv-scanner.exe" : "osv-scanner");
    await writeFile(scannerPath, bytes, { mode: 0o700 });
    const configPath = join(directory, "osv-scanner.toml");
    await writeFile(configPath, "# No ignored packages or vulnerabilities.\n");
    const reportPath = join(directory, "report.json");
    log(`Scanning ${inventory.length} production components locally with OSV ${VERSION} and a fresh advisory database.`);
    const scan = spawnSync(scannerPath, ["scan", "source", "--offline", "--download-offline-databases",
      "--no-resolve", "--all-packages", "--all-vulns", "--format=json", `--config=${configPath}`,
      `--lockfile=${sbomPath}`, `--output-file=${reportPath}`], {
      encoding: "utf8", timeout: 300000, maxBuffer: 2 * 1024 * 1024,
      // A new cache for each scan requires a successful fresh database download.
      env: { ...process.env, OSV_SCANNER_LOCAL_DB_CACHE_DIRECTORY: join(directory, "database") },
    });
    if (scan.stderr) log(scan.stderr.trim());
    if (scan.error || ![0, 1].includes(scan.status)) throw new Error("Offline scanner could not complete.");
    const assessment = assessOfflineReport(JSON.parse(await readFile(reportPath, "utf8")), inventory, auditLevel);
    if (scan.status === 1 && !assessment.findings.length) throw new Error("Scanner failed without a vulnerability report.");
    log(JSON.stringify({ source: "OSV offline", auditLevel, ...assessment }, null, 2));
    return assessment.status;
  } catch (error) {
    log(`Offline production audit failed: ${error instanceof Error ? error.message : error}`);
    return 1;
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
