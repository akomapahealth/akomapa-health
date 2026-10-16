import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const DOCUMENTS_DIR = join(process.cwd(), "public/documents");
const PUBLISHER_PDF = join(DOCUMENTS_DIR, "journal.pgph.0005092.pdf");
const EXISTING_MANUSCRIPT = join(DOCUMENTS_DIR, "research.pdf");
const PLOS_DOI = "10.1371/journal.pgph.0005092";

function pdfPaths(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return pdfPaths(path);
    return entry.name.toLowerCase().endsWith(".pdf") ? [path] : [];
  });
}

describe("PLOS publisher PDF", () => {
  it("keeps a single unmodified copy of the article", () => {
    const publisher = readFileSync(PUBLISHER_PDF);

    expect(publisher.subarray(0, 5).toString("utf8")).toBe("%PDF-");
    expect(readFileSync(EXISTING_MANUSCRIPT).includes(PLOS_DOI)).toBe(false);
    expect(
      pdfPaths(DOCUMENTS_DIR).filter((path) =>
        readFileSync(path).includes(PLOS_DOI),
      ),
    ).toEqual([PUBLISHER_PDF]);
  });
});
