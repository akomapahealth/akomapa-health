import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TeamPageContent from "@/components/about/TeamPageContent";

describe("TeamPageContent", () => {
  it("renders one decorative node network and the approved directory sections", () => {
    const { container } = render(<TeamPageContent />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(container.querySelectorAll("[data-team-node-network]")).toHaveLength(
      1,
    );
    expect(
      container.querySelector("[data-team-node-network]"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Executive Team")).toBeInTheDocument();
    expect(screen.getByText("Advisory Board")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Meet with Us" }),
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByRole("link", { name: "Join the Movement" }),
    ).toHaveAttribute("href", "/get-involved");
  });

  it("renders decorative network portraits with empty alternatives", () => {
    const { container } = render(<TeamPageContent />);
    const network = container.querySelector("[data-team-node-network]");
    const portraits = network?.querySelectorAll("img") ?? [];

    expect(portraits.length).toBeGreaterThan(0);
    for (const portrait of portraits) {
      expect(portrait).toHaveAttribute("alt", "");
    }
  });
});
