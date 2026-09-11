import { describe, expect, it } from "vitest";
import { immersionProgram } from "@/data/immersion-program";

describe("immersion program content", () => {
  it("publishes the concise program overview and video source", () => {
    expect(immersionProgram.facts).toEqual([
      expect.objectContaining({
        label: "Dates",
        value: "January 2–15, 2027",
      }),
      expect.objectContaining({
        label: "Locations",
        value: "Accra and Cape Coast, Ghana",
      }),
      expect.objectContaining({
        label: "Cohort size",
        value: "Limited to 12 students",
      }),
    ]);
    expect(immersionProgram.registration).toEqual([
      expect.objectContaining({
        label: "Early registration",
        price: "$2,499",
        deadline: "October 1, 2026",
      }),
      expect.objectContaining({
        label: "Regular registration",
        price: "$2,799",
        deadline: "November 1, 2026",
      }),
    ]);
    expect(immersionProgram.introduction).toContain("two-week");
    expect(immersionProgram.images.hero.videoSrc).toBe(
      "/immersion-hero.mp4",
    );
    expect(immersionProgram.hostCities.name).toBe("Accra and Cape Coast");
    expect(immersionProgram.experiences.map(({ title }) => title)).toEqual([
      "Community Partnership",
      "Primary Care & Global Health",
      "Ethical Leadership",
      "Cultural Immersion & Exchange",
    ]);
    expect(immersionProgram.audiences).toHaveLength(3);
    [...immersionProgram.experiences, ...immersionProgram.audiences].forEach(
      (item) => {
        expect(item.image.src).toMatch(/^\//);
        expect(item.image.alt).not.toBe("");
      },
    );
  });

  it("does not publish expired or placeholder cohort details", () => {
    const serializedContent = JSON.stringify(immersionProgram);

    expect(serializedContent).not.toMatch(
      /January 2026|Summer 2026|2026 Pilot Cohort|Program Fees|TBD|Certificate|University of Ghana|Applied Research|Leadership Circles|Community Partnership Projects|Coming 2027/,
    );
    expect(serializedContent).toContain("January 2–15, 2027");
    expect(serializedContent).toContain("$2,499");
    expect(serializedContent).toContain("$2,799");
    expect(serializedContent).toContain("Limited to 12 students");
  });
});
