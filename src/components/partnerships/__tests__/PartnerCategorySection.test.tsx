import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PartnerCategorySection from "@/components/partnerships/PartnerCategorySection";
import { partners } from "@/data/partnerships";

describe("PartnerCategorySection", () => {
  it("renders community collaborators as a text-only collective identity", () => {
    const communityPartners = partners.filter(
      ({ category }) => category === "community",
    );

    render(
      <PartnerCategorySection
        category="community"
        partners={communityPartners}
        index={1}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Community Leaders and Institutions",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(
      screen.getByText(/barbershops, salons, and local organizations/i),
    ).toBeInTheDocument();
  });
});
