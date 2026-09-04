import { readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const PUBLIC_BUILD_DIRECTORIES = [join(process.cwd(), ".next", "static"), join(process.cwd(), "public")];

async function collectSourceMaps(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return [];
    throw error;
  }

  const matches = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectSourceMaps(path);
    return extname(entry.name) === ".map" ? [relative(process.cwd(), path)] : [];
  }));
  return matches.flat();
}

const sourceMaps = (await Promise.all(PUBLIC_BUILD_DIRECTORIES.map(collectSourceMaps))).flat();
if (sourceMaps.length > 0) {
  throw new Error(`Public source maps are forbidden:\n- ${sourceMaps.join("\n- ")}`);
}
console.log("Verified public assets: no source maps are exposed.");
