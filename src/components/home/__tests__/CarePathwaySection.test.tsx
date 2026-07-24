import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CarePathwaySection from "@/components/home/CarePathwaySection";

const heading = "From screening numbers to care outcomes.";

const introduction =
  "Akomapa measures success beyond the number of people reached. Our goal is to understand whether people at risk are identified, referred, connected to care, and supported over time.";

const steps = [
  {
    marker: "01",
    title: "Screened",
    description:
      "Community members screened for blood pressure, glucose, BMI, and related risk factors.",
  },
  {
    marker: "02",
    title: "Identified",
    description:
      "New suspected hypertension, diabetes, or high-risk cases detected.",
  },
  {
    marker: "03",
    title: "Referred",
    description:
      "Patients referred to clinics, providers, or partner facilities.",
  },
  {
    marker: "04",
    title: "Linked to care",
    description:
      "Referred patients who complete a care visit or verified follow-up.",
  },
  {
    marker: "05",
    title: "Followed up",
    description:
      "Patients contacted after outreach to encourage continuity of care.",
  },
  {
    marker: "06",
    title: "Leaders trained",
    description:
      "Student leaders and health professionals trained in NCD prevention, ethical leadership, referral support, and community-based care.",
  },
] as const;

describe("CarePathwaySection", () => {
  it("renders the approved measurement framework as one ordered sequence", () => {
    render(<CarePathwaySection />);

    const section = screen.getByRole("region", { name: heading });

    expect(within(section).getByText("What We Measure")).toBeVisible();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: heading,
      }),
    ).toHaveAttribute("id", "care-pathway-heading");
    expect(section).toHaveAttribute("aria-labelledby", "care-pathway-heading");
    expect(within(section).getByText(introduction)).toBeVisible();

    const list = within(section).getByRole("list");
    const listItems = within(list).getAllByRole("listitem");

    expect(list.tagName).toBe("OL");
    expect(listItems).toHaveLength(steps.length);

    steps.forEach((step, index) => {
      const listItem = listItems[index];

      expect(within(listItem).getByText(step.marker)).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(
        within(listItem).getByRole("heading", {
          level: 3,
          name: step.title,
        }),
      ).toBeVisible();
      expect(within(listItem).getByText(step.description)).toBeVisible();
    });
  });

  it("uses one continuous field of care-stage bands", () => {
    render(<CarePathwaySection />);

    const section = screen.getByRole("region", { name: heading });
    const list = within(section).getByRole("list");

    expect(list).toHaveAttribute("data-care-pathway-bands");
    expect(list.querySelectorAll("[data-care-pathway-marker]")).toHaveLength(
      steps.length,
    );
    expect(list.querySelector(".homepage-hover-card")).not.toBeInTheDocument();
    expect(
      within(section).queryByTestId("care-pathway-mobile-connector"),
    ).not.toBeInTheDocument();
    expect(
      within(section).queryByTestId("care-pathway-desktop-connector"),
    ).not.toBeInTheDocument();

    expect(section).not.toHaveTextContent(/\d{1,3}(?:,\d{3})+\+?/);
    expect(section).not.toHaveTextContent(/\d+%/);
    expect(section).not.toHaveTextContent("3,000+");
    expect(section).not.toHaveTextContent("95%");
  });
});
