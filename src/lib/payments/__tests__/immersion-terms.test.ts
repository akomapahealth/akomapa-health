import { describe, expect, it } from "vitest";
import { immersionCheckoutWindow } from "../immersion-terms";

describe("Immersion live checkout windows", () => {
  it("closes new first payments at the refund cutoff", () => {
    expect(immersionCheckoutWindow("deposit", Date.parse("2026-11-30T04:59:59Z")).open).toBe(true);
    expect(immersionCheckoutWindow("full", Date.parse("2026-11-30T05:00:00Z")).open).toBe(false);
  });

  it("keeps the balance option open through the approved grace period", () => {
    expect(immersionCheckoutWindow("balance", Date.parse("2026-12-04T04:59:59Z")).open).toBe(true);
    expect(immersionCheckoutWindow("balance", Date.parse("2026-12-04T05:00:00Z")).open).toBe(false);
  });
});
