import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const { parseAndValidateFlightRouterState } = require(
  "next/dist/server/app-render/parse-and-validate-flight-router-state"
) as {
  parseAndValidateFlightRouterState: (stateHeader: string) => unknown;
};

function encodeRouterState(state: unknown[]): string {
  return encodeURIComponent(JSON.stringify(state));
}

describe("Next.js router-state version-skew removal sentinel", () => {
  it("continues to reject the stale Next 15 shape with E10", () => {
    try {
      parseAndValidateFlightRouterState(
        encodeRouterState(["", {}, null, "refresh", false])
      );
      throw new Error(
        "Next.js now accepts the stale shape; remove the temporary telemetry filter"
      );
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe(
        "The router state header was sent but could not be parsed."
      );
      expect(
        (error as Error & { __NEXT_ERROR_CODE?: string }).__NEXT_ERROR_CODE
      ).toBe("E10");
    }
  });

  it("accepts the current Next 16 shape", () => {
    expect(() =>
      parseAndValidateFlightRouterState(
        encodeRouterState(["", {}, null, "refetch", 0])
      )
    ).not.toThrow();
  });
});
