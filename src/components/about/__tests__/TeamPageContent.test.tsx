import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TeamPageContent from "@/components/about/TeamPageContent";

describe("TeamPageContent", () => {
  it("renders the canonical directory groups in editorial order", () => {
    const { container } = render(<TeamPageContent />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(container.querySelectorAll("[data-team-node-network]")).toHaveLength(
      1,
    );
    expect(
      container.querySelector("[data-team-node-network]"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("[data-team-node-network]")).toHaveClass(
      "min-w-0",
      "overflow-x-auto",
      "lg:flex-col",
    );
    expect(
      container.querySelector("[data-team-node-network]")?.parentElement,
    ).toHaveClass("lg:col-span-7");
    expect(
      container.querySelector("[data-team-node-scroll-hint]"),
    ).toHaveClass("pointer-events-none", "lg:hidden");
    expect(screen.getByText("Executive Team")).toBeInTheDocument();
    expect(screen.getByText("Team Members")).toBeInTheDocument();
    expect(screen.getByText("Advisory Board")).toBeInTheDocument();
    expect(
      Array.from(container.querySelectorAll("[data-team-section]")).map(
        (section) => section.getAttribute("data-team-section"),
      ),
    ).toEqual(["executive", "member", "advisor"]);
    expect(
      container.querySelectorAll('[data-team-role-category="executive"]'),
    ).toHaveLength(12);
    expect(
      container.querySelectorAll('[data-team-role-category="member"]'),
    ).toHaveLength(18);
    expect(
      container.querySelectorAll('[data-team-role-category="advisor"]'),
    ).toHaveLength(8);
    expect(
      screen.getByRole("link", { name: "Meet with Us" }),
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByRole("link", { name: "Join the Movement" }),
    ).toHaveAttribute("href", "/get-involved");
  });

  it("renders complete non-executive profiles from canonical data", () => {
    render(<TeamPageContent />);

    const david = screen
      .getByRole("heading", { name: "David Ofosu" })
      .closest("article");
    expect(david).toHaveAttribute("data-team-role-category", "member");
    expect(
      within(david!).getByText("Medical Student, University of Cape Coast"),
    ).toBeInTheDocument();
    expect(
      within(david!).getByAltText("Headshot of David Ofosu, Co-Director"),
    ).toHaveClass("object-cover", "object-center");
    expect(
      within(david!).getByRole("button", { name: "Read bio" }),
    ).toBeInTheDocument();
  });

  it("renders decorative network portraits with empty alternatives", () => {
    const { container } = render(<TeamPageContent />);
    const network = container.querySelector("[data-team-node-network]");
    const portraitFrames =
      network?.querySelectorAll("[data-team-node-portrait]") ?? [];
    const portraits = network?.querySelectorAll("img") ?? [];

    expect(portraitFrames).toHaveLength(22);
    expect(portraits).toHaveLength(22);
    for (const portrait of portraits) {
      expect(portrait).toHaveAttribute("alt", "");
      expect(portrait).not.toHaveAttribute("data-nimg", "fill");
    }
  });
});
