import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ChallengeSection from "@/components/home/ChallengeSection";

const heading =
  "The crisis is not only disease burden. It is the gap between risk, diagnosis, and care.";

const paragraphs = [
  "Noncommunicable diseases such as hypertension, diabetes, cardiovascular disease, chronic kidney disease, and stroke are among the defining health challenges of our time. Globally, NCDs caused at least 43 million deaths in 2021, with most NCD deaths occurring in low- and middle-income countries. In Ghana and across similar contexts, the challenge is not only disease burden. It is the gap between early risk, diagnosis, referral, follow-up, and long-term primary care.",
  "Too many people learn their risk only after preventable complications have already begun. Screening can reveal danger earlier, but screening alone is not enough. Communities need systems that help people move from risk identification to care, and health professionals need training to lead that process with competence, humility, and ethical responsibility.",
] as const;

const emphasis =
  "A stronger response must do two things at once: catch preventable disease earlier and prepare ethical health leaders who can keep communities connected to care.";

const metrics = [
  {
    value: "43M",
    label: "people died from NCDs globally in 2021.",
    source: "WHO NCD Fact Sheet, updated 2025; mortality data year 2021",
    href: "https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases",
  },
  {
    value: "75%",
    label:
      "of non-pandemic-related global deaths were caused by NCDs in 2021.",
    source: "WHO NCD Fact Sheet, updated 2025; mortality data year 2021",
    href: "https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases",
  },
  {
    value: "73%",
    label:
      "of all NCD deaths occur in low- and middle-income countries.",
    source: "WHO NCD Fact Sheet, updated 2025; mortality data year 2021",
    href: "https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases",
  },
  {
    value: "51.1%",
    label:
      "of Ghanaian adults aged 18–69 with elevated blood pressure had not previously been diagnosed.",
    source: "Ghana STEPS Report 2023",
    href: "https://www.afro.who.int/sites/default/files/2024-11/GHANA%20STEPS%20REPORT%202023.pdf",
  },
] as const;

describe("ChallengeSection", () => {
  it("renders the approved care-gap narrative and sourced semantic evidence", () => {
    render(<ChallengeSection />);

    const section = screen.getByRole("region", { name: heading });

    expect(within(section).getByText("The Care Gap")).toBeVisible();
    expect(
      within(section).getByRole("heading", { level: 2, name: heading }),
    ).toBeVisible();

    for (const paragraph of paragraphs) {
      expect(within(section).getByText(paragraph)).toBeVisible();
    }
    expect(within(section).getByText(emphasis)).toBeVisible();

    const definitionList = section.querySelector("dl");
    expect(definitionList).not.toBeNull();
    expect(definitionList?.querySelectorAll("dt")).toHaveLength(4);
    expect(definitionList?.querySelectorAll("dd")).toHaveLength(4);

    for (const metric of metrics) {
      expect(within(section).getByText(metric.value)).toBeVisible();
      expect(within(section).getByText(metric.label)).toBeVisible();

      const link = within(section).getByRole("link", {
        name: `Source for ${metric.value}: ${metric.source} (opens in a new tab)`,
      });
      expect(link).toHaveTextContent(metric.source);
      expect(link).toHaveAttribute("href", metric.href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
