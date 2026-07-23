import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WhyAkomapaSection from "@/components/home/WhyAkomapaSection";

const heading = "One model. Two challenges. Lasting impact.";

const introduction =
  "Most interventions focus on either community care or professional training. Akomapa brings both together. Through Community Learning & Care Hubs, we support early NCD detection, referral, follow-up, and health education while training student leaders and health professionals to serve with clinical competence, cultural humility, and ethical leadership.";

const steps = [
  {
    marker: "01",
    title: "Catch cases earlier",
    body: "We screen for hypertension, diabetes, and related risk factors so communities can identify preventable complications before they become emergencies.",
  },
  {
    marker: "02",
    title: "Close the loop to care",
    body: "We track referrals, linkage to care, and follow-up so outreach does not end at screening day.",
  },
  {
    marker: "03",
    title: "Train ethical health leaders",
    body: "We prepare students and professionals to lead community-centered NCD prevention, education, data collection, referral support, and patient advocacy.",
  },
] as const;

const closingStatement =
  "Akomapa is building healthier communities by caring for today's patients and preparing tomorrow's NCD-ready health leaders.";

describe("WhyAkomapaSection", () => {
  it("renders the approved care-and-leadership narrative as a semantic sequence", () => {
    render(<WhyAkomapaSection />);

    const section = screen.getByRole("region", { name: heading });

    expect(within(section).getByText("Why Akomapa")).toBeVisible();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: heading,
      }),
    ).toHaveAttribute("id", "why-akomapa-heading");
    expect(section).toHaveAttribute(
      "aria-labelledby",
      "why-akomapa-heading",
    );
    expect(within(section).getByText(introduction)).toBeVisible();
    expect(within(section).getByText(closingStatement)).toBeVisible();

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
      expect(within(listItem).getByText(step.body)).toBeVisible();
    });

    expect(within(section).queryByRole("link")).not.toBeInTheDocument();
    expect(within(section).queryByRole("button")).not.toBeInTheDocument();
    expect(
      section.querySelector(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).not.toBeInTheDocument();
  });

  it("keeps every decorative connector hidden from assistive technology", () => {
    render(<WhyAkomapaSection />);

    const section = screen.getByRole("region", { name: heading });
    const connectors = within(section).getAllByTestId(
      "why-akomapa-connector",
    );

    expect(connectors).toHaveLength(2);
    connectors.forEach((connector) => {
      expect(connector).toHaveAttribute("aria-hidden", "true");
    });
  });
});
