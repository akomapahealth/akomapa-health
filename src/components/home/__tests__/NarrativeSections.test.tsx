import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GoodIntentionsSection from "@/components/home/GoodIntentionsSection";
import SilentEpidemicSection from "@/components/home/SilentEpidemicSection";
import StudentsChangedSection from "@/components/home/StudentsChangedSection";
import {
  goodIntentionsContent,
  silentEpidemicContent,
  studentsChangedContent,
} from "@/data/homepage-narrative";

describe("homepage narrative sections", () => {
  it("renders the Good Intentions narrative, image, and philosophy CTA", () => {
    render(<GoodIntentionsSection />);

    const section = screen.getByRole("region", {
      name: goodIntentionsContent.heading,
    });

    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: goodIntentionsContent.heading,
      }),
    ).toBeInTheDocument();
    expect(within(section).getByText(goodIntentionsContent.body)).toBeVisible();
    expect(
      within(section).getByRole("link", {
        name: goodIntentionsContent.cta.label,
      }),
    ).toHaveAttribute("href", goodIntentionsContent.cta.href);
    expect(
      within(section).getByRole("img", {
        name: goodIntentionsContent.image.alt,
      }),
    ).toBeInTheDocument();
  });

  it("renders the Students Changed statement as a labelled section", () => {
    render(<StudentsChangedSection />);

    const section = screen.getByRole("region", {
      name: studentsChangedContent.heading,
    });

    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: studentsChangedContent.heading,
      }),
    ).toBeInTheDocument();
    expect(within(section).getByText(studentsChangedContent.body)).toBeVisible();
  });

  it("renders the Silent Epidemic narrative, verified metrics, and impact CTA", () => {
    render(<SilentEpidemicSection />);

    const section = screen.getByRole("region", {
      name: silentEpidemicContent.heading,
    });

    expect(within(section).getByText(silentEpidemicContent.body)).toBeVisible();
    expect(within(section).getAllByTestId("ncd-metric")).toHaveLength(3);

    for (const metric of silentEpidemicContent.metrics) {
      const accessibleValue = `${metric.prefix ?? ""}${metric.value}${metric.suffix ?? ""}`;
      const metricCard = within(section)
        .getAllByTestId("ncd-metric")
        .find((element) => element.dataset.metricId === metric.id);

      expect(metricCard).toBeDefined();
      expect(
        within(metricCard as HTMLElement).getByLabelText(accessibleValue),
      ).toBeInTheDocument();
      expect(
        within(metricCard as HTMLElement).getByText(metric.label),
      ).toBeVisible();
    }

    expect(
      within(section).getByRole("link", {
        name: new RegExp(silentEpidemicContent.source.label),
      }),
    ).toHaveAttribute("href", silentEpidemicContent.source.href);
    expect(
      within(section).getByRole("link", {
        name: silentEpidemicContent.cta.label,
      }),
    ).toHaveAttribute("href", silentEpidemicContent.cta.href);
    expect(
      within(section).getByRole("img", {
        name: silentEpidemicContent.image.alt,
      }),
    ).toBeInTheDocument();
  });
});
