import { spawnSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputPath = resolve(process.argv[2] ?? "akomapa-health.cdx.json");
const npmCli = process.env.npm_execpath;
const command = npmCli ? process.execPath : "npm";
const args = npmCli
  ? [npmCli, "sbom", "--sbom-format", "cyclonedx"]
  : ["sbom", "--sbom-format", "cyclonedx"];

const result = spawnSync(command, args, {
  cwd: process.cwd(),
  encoding: "utf8",
  env: process.env,
  maxBuffer: 50 * 1024 * 1024,
});

if (result.status !== 0) {
  throw new Error(result.stderr.trim() || "npm SBOM generation failed.");
}

let sbom;
try {
  sbom = JSON.parse(result.stdout);
} catch (error) {
  throw new Error(
    `npm returned an invalid SBOM document: ${error instanceof Error ? error.message : error}`,
  );
}

if (
  sbom.bomFormat !== "CycloneDX" ||
  !Array.isArray(sbom.components) ||
  sbom.components.length === 0
) {
  throw new Error("npm returned an empty or non-CycloneDX SBOM document.");
}

await writeFile(outputPath, `${JSON.stringify(sbom, null, 2)}\n`, {
  encoding: "utf8",
  flag: "w",
});
console.log(
  `Generated CycloneDX SBOM with ${sbom.components.length} components at ${outputPath}.`,
);
