import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TeamPageContent from "@/components/about/TeamPageContent";
import { buildTeamHeroRows } from "@/components/about/TeamHeroNetwork";
import { people } from "@/data/team";

describe("TeamPageContent", () => {
  it("builds balanced hero rows for changing portrait counts", () => {
    expect(buildTeamHeroRows([])).toEqual([]);
    expect(buildTeamHeroRows(people.slice(0, 3)).map((row) => row.length)).toEqual([2, 1]);
    expect(buildTeamHeroRows(people.slice(0, 8)).map((row) => row.length)).toEqual([2, 3, 3]);
    expect(buildTeamHeroRows(people.slice(0, 22)).map((row) => row.length)).toEqual([
      2, 3, 4, 4, 4, 3, 2,
    ]);
  });
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
    expect(container.querySelector("[data-team-node-scroll-hint]")).toBeInTheDocument();
    expect(screen.getByText("Executive Leadership")).toBeInTheDocument();
    expect(screen.getByText("Our Departments")).toBeInTheDocument();
    expect(screen.getByText("Advisory Board")).toBeInTheDocument();
    expect(
      Array.from(container.querySelectorAll("[data-team-section]")).map(
        (section) => section.getAttribute("data-team-section"),
      ),
    ).toEqual(["executive", "departments", "advisor"]);
    expect(
      container.querySelectorAll('[data-team-role-category="executive"]'),
    ).toHaveLength(3);
    expect(
      container.querySelectorAll('[data-team-role-category="member"]'),
    ).toHaveLength(17);
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

  it("renders department profiles from canonical data", () => {
    render(<TeamPageContent />);

    const wilfred = screen
      .getByRole("heading", { name: "Wilfred Obeng" })
      .closest("article");
    expect(wilfred).toHaveAttribute("data-team-role-category", "member");
    expect(
      within(wilfred!).getByText("Medical Student, University of Cape Coast"),
    ).toBeInTheDocument();
    expect(
      within(wilfred!).getByAltText("Headshot of Wilfred Obeng, Clinical Standards Lead"),
    ).toHaveClass("object-cover", "object-center");
    expect(
      within(wilfred!).getByRole("button", { name: "Read bio" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "David Ofosu" })).not.toBeInTheDocument();
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
