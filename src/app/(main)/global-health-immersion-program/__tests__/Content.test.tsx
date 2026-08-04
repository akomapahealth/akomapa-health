import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ImmersionInterestProvider from "@/components/immersion/ImmersionInterestProvider";
import Content from "../Content";
import { immersionProgram } from "@/data/immersion-program";
import { IMMERSION_INTEREST_COPY } from "@/lib/immersion-interest";

function renderContent() {
  return render(
    <ImmersionInterestProvider>
      <Content />
    </ImmersionInterestProvider>,
  );
}

describe("Global Health Immersion Program top-level page", () => {
  it("renders one page heading and a logical editorial section hierarchy", () => {
    renderContent();

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
      IMMERSION_INTEREST_COPY.section.heading,
    ].forEach((heading) => {
      expect(
        screen.getByRole("heading", { level: 2, name: heading }),
      ).toBeInTheDocument();
    });
  });

  it("uses semantic facts and preserves every program concept", () => {
    const { container } = renderContent();
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
    const { container } = renderContent();

    const registerButtons = screen.getAllByRole("button", {
      name: "Register Interest",
    });
    expect(registerButtons).toHaveLength(2);
    registerButtons.forEach((button) => {
      expect(button).toHaveAttribute("data-immersion-register-interest");
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
    expect(
      screen.getByRole("button", {
        name: IMMERSION_INTEREST_COPY.section.cta,
      }),
    ).toBeInTheDocument();

    expect(container.textContent).not.toMatch(
      /January 2026|Summer 2026|2026 Pilot Cohort|Program Fees|TBD/,
    );
  });
});
