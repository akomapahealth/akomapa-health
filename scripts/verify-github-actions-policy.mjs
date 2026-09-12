import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const WORKFLOW_DIRECTORY = join(process.cwd(), ".github", "workflows");
const FULL_SHA = /^[0-9a-f]{40}$/;
const USES_PATTERN = /^\s*-?\s*uses:\s*([^\s#]+)(?:\s+#\s*(.+))?$/;

const entries = await readdir(WORKFLOW_DIRECTORY, { withFileTypes: true });
const errors = [];

for (const entry of entries) {
  if (!entry.isFile() || !/\.ya?ml$/.test(entry.name)) continue;
  const path = join(WORKFLOW_DIRECTORY, entry.name);
  const lines = (await readFile(path, "utf8")).split(/\r?\n/);
  lines.forEach((line, index) => {
    const match = line.match(USES_PATTERN);
    if (!match) return;
    const reference = match[1];
    if (reference.startsWith("./") || reference.startsWith("docker://")) return;
    const at = reference.lastIndexOf("@");
    const sha = at === -1 ? "" : reference.slice(at + 1);
    if (!FULL_SHA.test(sha)) {
      errors.push(`${relative(process.cwd(), path)}:${index + 1} must pin ${reference} to a full commit SHA`);
    }
    if (!match[2] || !/\bv\d/.test(match[2])) {
      errors.push(`${relative(process.cwd(), path)}:${index + 1} must document the reviewed release version`);
    }
  });
}

if (errors.length > 0) {
  throw new Error(`GitHub Actions policy failed:\n- ${errors.join("\n- ")}`);
}
console.log("Verified all external workflow actions use documented full-SHA pins.");
