import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>(
    "framer-motion",
  );
  return {
    ...actual,
    useReducedMotion: () => true,
  };
});

vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => () => null,
}));

vi.mock("@/components/layout/Header", () => ({
  __esModule: true,
  default: () => <header>Header</header>,
}));

vi.mock("@/components/layout/Footer", () => ({
  __esModule: true,
  default: () => <footer>Footer</footer>,
}));

vi.mock("@/components/layout/SkipToMainContent", () => ({
  __esModule: true,
  default: () => <a href="#main-content">Skip to main content</a>,
}));

import NotFound from "../not-found";

describe("NotFound page", () => {
  it("renders accessible not-found recovery without loading Lottie under reduced motion", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    render(<NotFound />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Page Not Found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to Homepage" }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("navigation", { name: "Helpful links" }),
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
  });
});
