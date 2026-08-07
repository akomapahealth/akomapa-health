import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

const captureException = vi.fn();

vi.mock("@/lib/sentry", () => ({
  captureException: (...args: unknown[]) => captureException(...args),
}));

import MainError from "../error";

describe("MainError boundary", () => {
  beforeEach(() => {
    captureException.mockClear();
  });

  it("captures the exception and still offers retry recovery", () => {
    const reset = vi.fn();
    const error = Object.assign(new Error("boom"), { digest: "d1" });

    render(<MainError error={error} reset={reset} />);

    expect(captureException).toHaveBeenCalledWith(error);
    expect(
      screen.getByRole("heading", { level: 1, name: "We hit a snag" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });
});
