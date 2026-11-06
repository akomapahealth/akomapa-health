import { afterEach, describe, expect, it } from "vitest";
import { formatDate } from "@/lib/utils";

const originalTimeZone = process.env.TZ;

// Node applies runtime changes to TZ, so each case runs as a visitor there.
function inTimeZone<T>(timeZone: string, run: () => T): T {
  process.env.TZ = timeZone;
  return run();
}

afterEach(() => {
  if (originalTimeZone === undefined) delete process.env.TZ;
  else process.env.TZ = originalTimeZone;
});

describe("formatDate", () => {
  const timeZones = [
    "America/Los_Angeles",
    "Pacific/Honolulu",
    "UTC",
    "Pacific/Auckland",
  ];

  for (const timeZone of timeZones) {
    it(`shows the same calendar day in ${timeZone}`, () => {
      inTimeZone(timeZone, () => {
        expect(formatDate("2026-10-14")).toBe("October 14, 2026");
        expect(formatDate("2026-10-14T00:00:00.000Z")).toBe("October 14, 2026");
        expect(formatDate("2026-01-01")).toBe("January 1, 2026");
        expect(formatDate("2026-12-31")).toBe("December 31, 2026");
      });
    });
  }

  it("guards against the local-time regression west of UTC", () => {
    inTimeZone("America/Los_Angeles", () => {
      const localTimeFormatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Sanity check: the runtime really is west of UTC for this case.
      expect(localTimeFormatter.format(new Date("2026-10-14"))).toBe(
        "October 13, 2026",
      );
      expect(formatDate("2026-10-14")).toBe("October 14, 2026");
    });
  });

  it("returns invalid input unchanged instead of throwing", () => {
    expect(formatDate("not a date")).toBe("not a date");
    expect(formatDate("")).toBe("");
  });
});
