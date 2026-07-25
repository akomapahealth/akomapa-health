import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ChallengeSection from "@/components/home/ChallengeSection";

const heading =
  "The world's fastest-growing health crisis demands a better system of care.";

const paragraphs = [
  "Noncommunicable diseases—including hypertension, diabetes, cardiovascular disease, and chronic kidney disease—are responsible for 74% of deaths worldwide. Their burden is rising fastest in low- and middle-income countries, where communities face growing rates of chronic illness but often lack reliable access to prevention, early diagnosis, and continuous primary care.",
  "Hypertension and diabetes have become silent epidemics. Millions of people remain undiagnosed until preventable complications such as stroke, heart failure, kidney disease, or blindness occur. Even after diagnosis, too many patients never begin treatment or are lost during follow-up, allowing preventable diseases to become life-threatening.",
  "But the challenge extends beyond access to care. Health systems need stronger community-based models that guide people from screening to diagnosis, treatment, and lifelong care. They also need a new generation of health professionals equipped to lead that transformation through ethical, interprofessional, and community-centred practice.",
] as const;

const emphasis = "That's the gap Akomapa was created to close.";

const metrics = [
  {
    value: "74%",
    label:
      "of deaths worldwide are caused by noncommunicable diseases with 75% of them in low and middle-income countries.",
  },
  {
    value: "34M+",
    label:
      "adults in the WHO African Region are without essential NCD care, many because they remain undiagnosed.",
  },
  {
    value: "1 in 3",
    label:
      "patients with hypertension or diabetes in a large Ghanaian study were lost to follow-up after entering care.",
  },
  {
    value: "Tomorrow's health systems need better-prepared professionals.",
    label:
      "Future healthcare leaders need more opportunities to learn community-based, interprofessional, and ethical models of care before entering practice.",
  },
] as const;

describe("ChallengeSection", () => {
  it("renders the CEO-approved care-gap narrative and semantic evidence", () => {
    render(<ChallengeSection />);

    const section = screen.getByRole("region", { name: heading });

    expect(within(section).getByText("The Care Gap")).toBeVisible();
    expect(
      within(section).getByRole("heading", { level: 2, name: heading }),
    ).toBeVisible();

    for (const paragraph of paragraphs) {
      expect(section).toHaveTextContent(paragraph);
    }
    expect(within(section).getByText(emphasis)).toBeVisible();

    const definitionList = section.querySelector("dl");
    expect(definitionList).not.toBeNull();
    expect(definitionList?.querySelectorAll("dt")).toHaveLength(4);
    expect(definitionList?.querySelectorAll("dd")).toHaveLength(4);

    for (const metric of metrics) {
      expect(within(section).getByText(metric.value)).toBeVisible();
      expect(within(section).getByText(metric.label)).toBeVisible();
    }

    expect(within(section).queryAllByRole("link")).toHaveLength(0);
  });
});
