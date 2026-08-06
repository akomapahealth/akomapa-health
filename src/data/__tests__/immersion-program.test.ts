import { describe, expect, it } from "vitest";
import { immersionProgram } from "@/data/immersion-program";

describe("immersion program content", () => {
  it("publishes the concise program overview and video source", () => {
    expect(immersionProgram.facts).toEqual([
      expect.objectContaining({ label: "Duration", value: "Two weeks" }),
      expect.objectContaining({
        label: "Host cities",
        value: "Accra & Cape Coast",
      }),
      expect.objectContaining({ label: "Next cohort", value: "Coming 2027" }),
    ]);
    expect(immersionProgram.introduction).toContain("two-week");
    expect(immersionProgram.images.hero.videoSrc).toBe(
      "/immersion-hero.mp4",
    );
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
      /January 2026|Summer 2026|2026 Pilot Cohort|Program Fees|TBD|Certificate/,
    );
    expect(serializedContent).toContain("Coming 2027");
  });
});
