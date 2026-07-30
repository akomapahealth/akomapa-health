import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProgramsContent from "@/app/(main)/programs/Content";
import GhltpContent from "@/app/(main)/programs/akomapa-ghltp/Content";
import YoungAdvocatesContent from "@/app/(main)/programs/akomapa-young-advocates/Content";
import GhltpTestimonialsCarousel from "@/components/programs/GhltpTestimonialsCarousel";
import ProgramDetailHero from "@/components/programs/ProgramDetailHero";
import ProgramFactSummary from "@/components/programs/ProgramFactSummary";

describe("Programs listing editorial system", () => {
  it("renders a flat hero and preserves all program destinations", () => {
    render(<ProgramsContent />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: /Students\. Communities\. Partnerships/,
    });
    const hero = heading.closest("section");
    expect(hero).toHaveAttribute("data-editorial-tone", "teal");
    expect(hero?.className).not.toContain("gradient");

    expect(
      screen.getByRole("link", { name: /Explore Akomapa Clinics/i }),
    ).toHaveAttribute("href", "/community-hubs");
    expect(
      screen.getByRole("link", { name: /Discover the Akomapa Network/i }),
    ).toHaveAttribute("href", "/programs/akomapa-network");
    expect(
      screen.getByRole("link", { name: /Join the Leadership Program/i }),
    ).toHaveAttribute("href", "/programs/akomapa-ghltp");
    expect(
      screen.getByRole("link", { name: /Join the Akomapa Young Advocates/i }),
    ).toHaveAttribute("href", "/programs/akomapa-young-advocates");
    expect(
      screen.getByRole("link", { name: /Discover the Akomapa Foods & Stores/i }),
    ).toHaveAttribute("href", "/programs/akomapa-foods");
  });

  it("exposes impact metrics as a semantic definition list", () => {
    render(<ProgramsContent />);

    const section = screen.getByRole("region", {
      name: "Building a Movement, One Program at a Time",
    });
    const list = section.querySelector("dl");
    expect(list).not.toBeNull();
    expect(within(section).getByText("Students Trained")).toBeVisible();
    expect(within(section).getByText("Partner Clinics")).toBeVisible();
    expect(within(section).getByText("Programs & Initiatives")).toBeVisible();
    expect(within(section).getByText("Global Mentors")).toBeVisible();
  });
});

describe("Program detail editorial helpers", () => {
  it("renders ProgramDetailHero with back link, heading, and CTAs", () => {
    render(
      <ProgramDetailHero
        eyebrow="Test Program"
        title="Program Title"
        lead="Program lead copy."
        image="/highlights/Akomapa-40.jpg"
        imageAlt="Program image"
        ctas={[
          { href: "/get-involved", label: "Apply Now", variant: "amber" },
          { href: "/contact", label: "Become a Mentor", variant: "outline-light" },
        ]}
      />,
    );

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Program Title",
    });
    expect(heading.closest("section")).toHaveAttribute(
      "data-editorial-tone",
      "teal",
    );
    expect(screen.getByRole("link", { name: /Back to Programs/i })).toHaveAttribute(
      "href",
      "/programs",
    );
    expect(screen.getByRole("link", { name: "Apply Now" })).toHaveAttribute(
      "href",
      "/get-involved",
    );
    expect(screen.getByRole("link", { name: "Become a Mentor" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("associates fact summary labels with values in a definition list", () => {
    render(
      <ProgramFactSummary
        facts={[
          { label: "Duration", value: "10–16 weeks (semester-long)" },
          { label: "Format", value: "Virtual and hybrid delivery" },
        ]}
      />,
    );

    const list = document.querySelector("[data-program-fact-summary]");
    expect(list?.tagName).toBe("DL");
    expect(list?.querySelectorAll("dt")).toHaveLength(2);
    expect(list?.querySelectorAll("dd")).toHaveLength(2);
    expect(screen.getByText("Duration")).toBeVisible();
    expect(screen.getByText("10–16 weeks (semester-long)")).toBeVisible();
  });
});

describe("GHLTP editorial contracts", () => {
  it("preserves mentor and overview CTA destinations", () => {
    render(<GhltpContent />);

    expect(screen.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      screen.getAllByRole("link", { name: /Become a Mentor/i })[0],
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByRole("link", { name: /Download Program Overview/i }),
    ).toHaveAttribute("href", "/programs");
    expect(document.querySelector("[data-program-fact-summary]")).not.toBeNull();
  });

  it("exposes an accessible labeled carousel region", () => {
    render(<GhltpTestimonialsCarousel />);

    expect(
      screen.getByRole("region", { name: "Voices from participants" }),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: /Previous testimonial/i }),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: /Next testimonial/i }),
    ).toBeVisible();
  });
});

describe("Young Advocates editorial contracts", () => {
  it("preserves impact testids and approved impact heading", () => {
    render(<YoungAdvocatesContent />);

    const section = screen.getByTestId("young-advocates-impact-section");
    expect(
      within(section).getByRole("heading", { name: "Our Impact" }),
    ).toBeVisible();
    expect(screen.getByTestId("young-advocates-impact-grid")).toBeVisible();
    expect(screen.getAllByTestId("young-advocates-impact-card")).toHaveLength(4);
  });
});
