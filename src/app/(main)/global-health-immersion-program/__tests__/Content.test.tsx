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
    const { container } = renderContent();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: immersionProgram.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByText(immersionProgram.applicationStatus)).toBeVisible();
    expect(screen.queryByText("Applications Currently Closed")).toBeNull();
    expect(container.querySelector("[data-immersion-hero]")).toHaveClass(
      "min-h-[max(700px,calc(100svh-7.75rem))]",
    );
    expect(
      screen.getByRole("link", { name: "Scroll to the program overview" }),
    ).toHaveAttribute("href", "#program-overview");
    expect(
      container.querySelector("[data-immersion-hero-credit]"),
    ).toHaveTextContent("*Video courtesy Ghana Tourism Authority");
    expect(container.querySelector("#program-overview")).not.toBeNull();

    [
      "At a glance",
      "See health through community, culture, and connection.",
      "What participants experience",
      "Who the program is for",
      immersionProgram.hostCities.name,
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
      ...immersionProgram.audiences,
    ].forEach((item) => {
      expect(
        screen.getByRole("heading", { level: 3, name: item.title }),
      ).toBeInTheDocument();
    });

    expect(container.querySelectorAll("ol")).toHaveLength(1);
    expect(container.querySelectorAll("ul")).toHaveLength(1);

    [...immersionProgram.experiences, ...immersionProgram.audiences].forEach(
      (item) => {
        expect(screen.getByAltText(item.image.alt)).toBeInTheDocument();
      },
    );
  });

  it("uses a lighter hero treatment and alternating teal sections", () => {
    const { container } = renderContent();
    const heroPanel = container.querySelector("[data-immersion-hero-panel]");
    const tealSections = container.querySelectorAll(
      '[data-section-tone="teal"]',
    );

    expect(heroPanel).toHaveClass("bg-[#07191d]/32", "backdrop-blur-sm");
    expect(tealSections).toHaveLength(2);
    tealSections.forEach((section) => {
      expect(section).toHaveClass("bg-[#0F4C5C]", "text-[#FCFAEF]");
    });
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

    expect(
      screen.getByRole("link", { name: "Explore the Experience" }),
    ).toHaveAttribute("href", "#experience");
    expect(
      screen.queryByRole("link", { name: "Request Program Brochure" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Partner as a faculty mentor/ }),
    ).toHaveAttribute("href", "/partnerships");
    expect(
      screen.getByRole("button", {
        name: IMMERSION_INTEREST_COPY.section.cta,
      }),
    ).toBeInTheDocument();

    expect(container.textContent).not.toMatch(
      /January 2026|Summer 2026|2026 Pilot Cohort|Program Fees|TBD|Certificate|University of Ghana|Learning Model|Participant Development|Applied Research|Leadership Circles/,
    );
  });
});
