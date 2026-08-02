import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  recoveryLinks,
  RouteErrorState,
  RouteLoadingState,
  RouteNotFoundState,
} from "@/components/shared/RouteBoundaryPrimitives";

describe("RouteBoundaryPrimitives", () => {
  it("renders a calm loading shell with status semantics and reduced-motion spinner", () => {
    render(<RouteLoadingState />);

    const root = document.querySelector("[data-route-loading-state]");
    expect(root).toHaveAttribute("aria-busy", "true");

    expect(screen.getByRole("status")).toHaveTextContent("Loading page…");

    const spinner = document.querySelector("[data-route-loading-spinner]");
    expect(spinner).toBeTruthy();
    expect(spinner?.className).toContain("motion-reduce:animate-none");
    expect(spinner?.className).not.toContain("animate-pulse");
    expect(root?.className).not.toContain("gradient");
  });

  it("renders editorial error recovery with retry and shared recovery links", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(<RouteErrorState onRetry={onRetry} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "We hit a snag" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    const errorRoot = document.querySelector("[data-route-error-state]");
    expect(errorRoot?.innerHTML).toContain("bg-[#eeba2b]");
    expect(errorRoot?.querySelector("svg.lucide-alert-circle")).toBeNull();
    expect(screen.getByRole("link", { name: "Contact us" })).toHaveAttribute(
      "href",
      "/contact",
    );

    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledTimes(1);

    const recovery = screen.getByRole("navigation", { name: "Helpful links" });
    for (const { href, label } of recoveryLinks) {
      expect(
        screen.getByRole("link", { name: label }),
      ).toHaveAttribute("href", href);
    }
    expect(recovery.querySelectorAll("a")).toHaveLength(recoveryLinks.length);
  });

  it("does not expose error diagnostics outside development", () => {
    vi.stubEnv("NODE_ENV", "production");

    render(
      <RouteErrorState
        error={Object.assign(new Error("secret stack"), {
          digest: "abc123",
          stack: "Error: secret stack",
        })}
      />,
    );

    expect(screen.queryByText("secret stack")).not.toBeInTheDocument();
    expect(screen.queryByText(/Digest:/)).not.toBeInTheDocument();

    vi.unstubAllEnvs();
  });

  it("renders not-found recovery with accessible naming and cohesive CTAs", () => {
    render(
      <RouteNotFoundState
        media={<div data-testid="not-found-media" aria-hidden="true" />}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Page Not Found" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByTestId("not-found-media")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(
      screen.getByRole("link", { name: "Back to Homepage" }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Contact us" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(
      screen.getByRole("navigation", { name: "Helpful links" }),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-route-not-found-media]"),
    ).toBeTruthy();
  });
});
