import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  getDoiUrl,
  getResearchPaperBySlug,
  getResearchPaperSummary,
  PLOS_GLOBAL_PUBLIC_HEALTH_DOI,
  researchPapers,
} from "@/data/research-papers";
import { isImageKitSrc } from "@/lib/imagekit";

const PLOS_SLUG = "stakeholder-support-student-run-free-clinics-ghana";
const THESIS_SLUG = "student-led-interventions";

describe("research collection", () => {
  it("keeps ids and slugs unique", () => {
    const ids = researchPapers.map(({ id }) => id);
    const slugs = researchPapers.map(({ slug }) => slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("points every paper at a committed PDF and an ImageKit image", () => {
    for (const paper of researchPapers) {
      const pdfPath = join(process.cwd(), "public", paper.pdfUrl);
      expect(existsSync(pdfPath)).toBe(true);
      expect(readFileSync(pdfPath).subarray(0, 5).toString("utf8")).toBe("%PDF-");
      expect(isImageKitSrc(paper.image)).toBe(true);
    }
  });

  it("uses a valid ISO date for publishedAt when present", () => {
    for (const paper of researchPapers) {
      if (paper.publishedAt) {
        expect(paper.publishedAt).toMatch(/^\d{4}-\d{2}(-\d{2})?$/);
        expect(Number.isFinite(Date.parse(paper.publishedAt))).toBe(true);
      }
    }
  });

  it("lists papers newest first", () => {
    const dates = researchPapers.map(({ publishedAt }) => Date.parse(publishedAt!));
    expect(dates).toEqual([...dates].sort((a, b) => b - a));
  });

  it("preserves the original thesis entry and deep link", () => {
    const thesis = getResearchPaperBySlug(THESIS_SLUG)!;
    expect(thesis.id).toBe("1");
    expect(thesis.pdfUrl).toBe("/documents/research.pdf");
    expect(thesis.doi).toBeUndefined();
    expect(thesis.journal).toBeUndefined();
    expect(getResearchPaperSummary(thesis)).toBe(thesis.abstract);
  });
});

describe("PLOS Global Public Health study", () => {
  const paper = getResearchPaperBySlug(PLOS_SLUG)!;
  const pdfText = readFileSync(
    join(process.cwd(), "public", "documents", "journal.pgph.0005092.pdf"),
  );

  it("is a distinct entry that reuses the committed publisher PDF", () => {
    expect(paper).toBeDefined();
    expect(paper.id).not.toBe("1");
    expect(paper.pdfUrl).toBe("/documents/journal.pgph.0005092.pdf");
    expect(pdfText.includes(PLOS_GLOBAL_PUBLIC_HEALTH_DOI)).toBe(true);
  });

  it("matches the publisher's citation details", () => {
    expect(PLOS_GLOBAL_PUBLIC_HEALTH_DOI).toBe("10.1371/journal.pgph.0005092");
    expect(paper.doi).toBe(PLOS_GLOBAL_PUBLIC_HEALTH_DOI);
    expect(getDoiUrl(paper.doi!)).toBe(
      "https://doi.org/10.1371/journal.pgph.0005092",
    );
    expect(paper.publisherUrl).toBe(
      "https://journals.plos.org/globalpublichealth/article?id=10.1371/journal.pgph.0005092",
    );
    expect(paper.journal).toBe("PLOS Global Public Health");
    expect(paper.date).toBe("September 21, 2026");
    expect(paper.publishedAt).toBe("2026-09-21");
    expect(paper.title).toBe(
      "Exploring stakeholder support for student-run free clinics to address gaps in non-communicable disease care in Ghana: An exploratory sequential mixed-methods study",
    );
    expect(paper.authors.split(",").map((name) => name.trim())).toEqual([
      "Brian Amu Fleischer",
      "Esi Berkoh",
      "Bismark Amoh",
      "Afriyie Badu",
      "Derek Anamaale Tuoyire",
      "Jeremy I. Schwartz",
    ]);
    expect(paper.citation).toMatch(
      /^Fleischer BA, Berkoh E, Amoh B, Badu A, Tuoyire DA, Schwartz JI \(2026\)/,
    );
    expect(paper.citation).toMatch(/PLOS Glob Public Health 6\(9\): e0005092\.$/);
  });

  it("keeps the listing summary short and free of statistical claims", () => {
    const summary = getResearchPaperSummary(paper);
    expect(summary).toBe(paper.summary);
    expect(summary.length).toBeLessThan(300);
    expect(summary).not.toMatch(/odds ratio|prove[sd]?|86\.7|p\s*=/i);
    expect(paper.abstract.length).toBeGreaterThan(summary.length);
  });
});
