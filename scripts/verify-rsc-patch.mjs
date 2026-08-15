import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const REQUIRED_PACKAGES = [
  {
    name: "next",
    ranges: [
      { lowerBound: "15.5.10", upperBound: "15.6.0" },
      { lowerBound: "16.0.7", upperBound: "17.0.0" },
    ],
    requirement: ">=15.5.10 <15.6.0 or >=16.0.7 <17.0.0",
  },
  {
    name: "react",
    lowerBound: "19.2.1",
    requirement: ">=19.2.1",
  },
  {
    name: "react-dom",
    lowerBound: "19.2.1",
    requirement: ">=19.2.1",
  },
];

function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(version);

  if (!match) {
    throw new Error(`Unsupported version format: ${version}`);
  }

  return match.slice(1).map(Number);
}

function compareVersions(left, right) {
  const leftParts = parseVersion(left);
  const rightParts = parseVersion(right);

  for (let index = 0; index < leftParts.length; index += 1) {
    if (leftParts[index] > rightParts[index]) return 1;
    if (leftParts[index] < rightParts[index]) return -1;
  }

  return 0;
}

function satisfiesRequirement(version, requirement) {
  const ranges = requirement.ranges ?? [requirement];

  return ranges.some(
    (range) =>
      compareVersions(version, range.lowerBound) >= 0 &&
      (!range.upperBound || compareVersions(version, range.upperBound) < 0),
  );
}

function getResolvedVersion(lockfile, packageName) {
  return lockfile.packages?.[`node_modules/${packageName}`]?.version;
}

const lockfilePath = path.join(process.cwd(), "package-lock.json");
const lockfile = JSON.parse(await readFile(lockfilePath, "utf8"));
const failures = [];

console.log("React Server Components security patch verification");

for (const requirement of REQUIRED_PACKAGES) {
  const version = getResolvedVersion(lockfile, requirement.name);

  if (!version) {
    failures.push(`${requirement.name}: missing from package-lock.json`);
    continue;
  }

  const status = satisfiesRequirement(version, requirement) ? "ok" : "fail";
  console.log(
    `- ${requirement.name}@${version} (${requirement.requirement}) ${status}`
  );

  if (status === "fail") {
    failures.push(
      `${requirement.name}@${version} does not satisfy ${requirement.requirement}`
    );
  }
}

if (failures.length > 0) {
  console.error("\nRSC patch verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("\nRSC patch verification passed.");
