import { describe, expect, it } from "vitest";
import { immersionProgram } from "@/data/immersion-program";

describe("immersion program content", () => {
  it("preserves the verified program facts and complete learning model", () => {
    expect(immersionProgram.facts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Duration", value: "2 weeks" }),
        expect.objectContaining({
          label: "First host site",
          value: "University of Ghana, Legon",
        }),
        expect.objectContaining({ label: "Credential", value: "Certificate" }),
      ]),
    );
    expect(immersionProgram.introduction).toContain("two-week");
    expect(immersionProgram.hostSite.name).toBe(
      "University of Ghana, Legon",
    );
    expect(immersionProgram.experiences).toHaveLength(7);
    expect(immersionProgram.learningComponents).toHaveLength(5);
    expect(immersionProgram.audiences).toHaveLength(3);
    expect(immersionProgram.outcomes).toHaveLength(4);
  });

  it("does not publish expired or placeholder cohort details", () => {
    const serializedContent = JSON.stringify(immersionProgram);

    expect(serializedContent).not.toMatch(
      /January 2026|Summer 2026|2026 Pilot Cohort|Program Fees|TBD/,
    );
    expect(serializedContent).toContain("Next cohort details forthcoming");
  });
});
