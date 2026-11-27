import { describe, expect, it } from "vitest";
import { immersionCheckoutWindow } from "../immersion-terms";

describe("Immersion live checkout windows", () => {
  it("closes new first payments at the refund cutoff", () => {
    expect(immersionCheckoutWindow("deposit", Date.parse("2026-11-30T04:59:59Z")).open).toBe(true);
    expect(immersionCheckoutWindow("full", Date.parse("2026-11-30T05:00:00Z")).open).toBe(false);
  });

  it("keeps the balance option open through the approved grace period", () => {
    expect(immersionCheckoutWindow("balance", Date.parse("2026-12-14T04:59:59Z")).open).toBe(true);
    expect(immersionCheckoutWindow("balance", Date.parse("2026-12-14T05:00:00Z")).open).toBe(false);
  });

  it("applies an individual first-payment deadline without extending other participants or balances", () => {
    const deadline = "2026-12-12T04:59:59Z";
    const afterStandardDeadline = Date.parse("2026-11-30T05:00:00Z");
    expect(immersionCheckoutWindow("deposit", afterStandardDeadline).open).toBe(false);
    for (const choice of ["deposit", "full"] as const) {
      expect(immersionCheckoutWindow(choice, afterStandardDeadline, deadline).open).toBe(true);
      expect(immersionCheckoutWindow(choice, Date.parse(deadline), deadline)).toEqual({ open: true, closeAt: Date.parse(deadline) });
      expect(immersionCheckoutWindow(choice, Date.parse("2026-12-12T05:00:00Z"), deadline).open).toBe(false);
    }
    const balanceClose = Date.parse("2026-12-14T04:59:59Z");
    expect(immersionCheckoutWindow("balance", balanceClose, deadline)).toEqual({ open: true, closeAt: balanceClose });
    expect(immersionCheckoutWindow("balance", balanceClose + 1000, deadline).open).toBe(false);
    expect(immersionCheckoutWindow("full", afterStandardDeadline, "invalid").open).toBe(false);
  });
});
