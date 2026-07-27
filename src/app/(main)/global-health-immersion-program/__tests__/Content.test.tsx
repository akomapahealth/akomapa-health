import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Content from "../Content";
import { immersionProgram } from "@/data/immersion-program";

describe("Global Health Immersion Program top-level page", () => {
  it("renders one page heading and a logical editorial section hierarchy", () => {
    render(<Content />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: immersionProgram.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    [
      "At a glance",
      "Global health education grounded in place and partnership.",
      "What participants experience",
      "How participants learn",
      "Who the program is for",
      "What participants develop",
      immersionProgram.hostSite.name,
    ].forEach((heading) => {
      expect(
        screen.getByRole("heading", { level: 2, name: heading }),
      ).toBeInTheDocument();
    });
  });

  it("uses semantic facts and preserves every program concept", () => {
    const { container } = render(<Content />);
    const factList = container.querySelector("dl");

    expect(factList).not.toBeNull();
    const factScope = within(factList as HTMLElement);
    immersionProgram.facts.forEach((fact) => {
      expect(factScope.getByText(fact.label)).toBeInTheDocument();
      expect(factScope.getByText(fact.value)).toBeInTheDocument();
    });

    [
      ...immersionProgram.experiences,
      ...immersionProgram.learningComponents,
      ...immersionProgram.audiences,
      ...immersionProgram.outcomes,
    ].forEach((item) => {
      expect(
        screen.getByRole("heading", { level: 3, name: item.title }),
      ).toBeInTheDocument();
    });

    expect(container.querySelectorAll("ol")).toHaveLength(2);
    expect(container.querySelectorAll("ul")).toHaveLength(2);
  });

  it("provides accurate inquiry actions without stale cohort language", () => {
    const { container } = render(<Content />);

    screen.getAllByRole("link", { name: "Register Interest" }).forEach((link) => {
      expect(link).toHaveAttribute("href", "/contact?type=immersion");
    });
    screen
      .getAllByRole("link", { name: "Request Program Brochure" })
      .forEach((link) => {
        expect(link).toHaveAttribute(
          "href",
          "/contact?type=immersion-brochure",
        );
      });
    expect(
      screen.getByRole("link", { name: /Partner as a faculty mentor/ }),
    ).toHaveAttribute("href", "/partnerships");

    expect(container.textContent).not.toMatch(
      /January 2026|Summer 2026|2026 Pilot Cohort|Program Fees|TBD/,
    );
  });
});
