import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const BUILD_STATIC_DIRECTORY = join(process.cwd(), ".next", "static");
const CLIENT_FILE_EXTENSIONS = new Set([".js", ".json", ".map"]);
const SERVER_ONLY_MARKERS = [
  "FILLOUT_API_KEY",
  "FILLOUT_FORM_CONFIG",
  "RESEND_API_KEY",
  "INTAKE_ADMIN_TOKEN",
  "INTAKE_NOTIFICATION_RECIPIENT",
];

async function collectClientFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectClientFiles(path);
      }

      return CLIENT_FILE_EXTENSIONS.has(extname(entry.name)) ? [path] : [];
    }),
  );

  return nestedFiles.flat();
}

function getSentinels() {
  return (process.env.INTAKE_CLIENT_SECRET_SENTINELS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

async function main() {
  let files;

  try {
    files = await collectClientFiles(BUILD_STATIC_DIRECTORY);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      throw new Error(
        "No Next.js client bundle was found. Run `npm run build` before this check.",
      );
    }
    throw error;
  }

  const forbiddenValues = [
    ...SERVER_ONLY_MARKERS.map((value) => ({ category: "server env name", value })),
    ...getSentinels().map((value) => ({ category: "secret sentinel", value })),
  ];
  const findings = [];

  for (const file of files) {
    const contents = await readFile(file, "utf8");

    for (const forbidden of forbiddenValues) {
      if (contents.includes(forbidden.value)) {
        findings.push({
          category: forbidden.category,
          file: relative(process.cwd(), file),
        });
      }
    }
  }

  if (findings.length > 0) {
    const summary = findings
      .map(({ category, file }) => `- ${category} found in ${file}`)
      .join("\n");
    throw new Error(`Intake client-bundle boundary check failed:\n${summary}`);
  }

  console.log(`Verified ${files.length} client bundle files: no intake secrets found.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
