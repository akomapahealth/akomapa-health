import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AcademyHero from "@/components/academy/AcademyHero";
import ApplySection from "@/components/academy/ApplySection";
import CurriculumSection from "@/components/academy/CurriculumSection";
import FacultyGrid from "@/components/academy/FacultyGrid";
import WhyEthicalLeadership from "@/components/academy/WhyEthicalLeadership";
import ImmersionInterestProvider from "@/components/immersion/ImmersionInterestProvider";
import {
  academyCurriculum,
  academyFaculty,
  academyOverview,
} from "@/data/academy";

function renderWithProvider(ui: React.ReactElement) {
  return render(
    <ImmersionInterestProvider>{ui}</ImmersionInterestProvider>,
  );
}

describe("Academy editorial sections", () => {
  it("renders a single flat hero with approved copy, metrics, and interest modal CTA", () => {
    renderWithProvider(<AcademyHero />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Akomapa Academy",
    });
    const hero = heading.closest("section");

    expect(hero).toHaveAttribute("data-editorial-tone", "teal");
    expect(hero?.className).not.toContain("gradient");
    expect(screen.getByText(academyOverview.title)).toBeVisible();
    expect(screen.getByText(academyOverview.description)).toBeVisible();
    expect(screen.getByText(academyCurriculum.totalDuration)).toBeVisible();
    expect(screen.getByText("Core Modules")).toBeVisible();
    expect(screen.getByText("Expert Faculty")).toBeVisible();

    expect(
      screen.getByRole("button", { name: /Become a Scholar/i }),
    ).toBeVisible();

    expect(
      screen.getByRole("link", { name: /Explore Curriculum/i }),
    ).toHaveAttribute("href", "#curriculum");
  });

  it("presents why-it-matters as a numbered editorial list without card surfaces", () => {
    render(<WhyEthicalLeadership />);

    const section = screen.getByRole("region", {
      name: "The Case for Ethical Leadership",
    });
    expect(section).toHaveAttribute("data-editorial-tone", "cream");
    expect(screen.getByText(academyOverview.whyItMatters)).toBeVisible();

    const items = within(section).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(section.querySelector("[data-slot='card']")).toBeNull();
  });

  it("keeps curriculum modules in semantic order without glass styling", () => {
    render(<CurriculumSection />);

    const section = screen.getByRole("region", {
      name: "8 Modules. One Transformative Journey.",
    });
    expect(section).toHaveAttribute("id", "curriculum");
    expect(section.className).not.toContain("gradient");

    const list = section.querySelector("ol");
    expect(list).not.toBeNull();

    const items = Array.from(list!.children).filter(
      (child) => child.tagName === "LI",
    );
    expect(items).toHaveLength(academyCurriculum.modules.length);
    expect(
      items.map(
        (item) =>
          within(item as HTMLElement).getByRole("heading", { level: 3 })
            .textContent,
      ),
    ).toEqual(academyCurriculum.modules.map((module) => module.title));
  });

  it("supports long faculty credentials without fixed-height image shells", () => {
    render(<FacultyGrid />);

    const section = screen.getByRole("region", {
      name: "Learn From Leaders in the Field",
    });
    expect(section).toHaveAttribute("data-editorial-tone", "cream");

    for (const faculty of academyFaculty) {
      expect(screen.getByText(faculty.name)).toBeVisible();
      expect(screen.getByText(faculty.title)).toBeVisible();
      expect(screen.getByText(faculty.institution)).toBeVisible();
    }

    const images = section.querySelectorAll("img");
    for (const image of images) {
      const shell = image.closest("div");
      expect(shell?.className ?? "").not.toMatch(/\bh-\d+\b/);
      expect(shell?.className ?? "").not.toMatch(/min-h-\[/);
    }
  });

  it("keeps the apply journey destinations intact", () => {
    renderWithProvider(<ApplySection />);

    expect(
      screen.getByRole("button", { name: /Apply to the Academy/i }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: /Other Ways to Get Involved/i }),
    ).toHaveAttribute("href", "/get-involved");
  });
});
