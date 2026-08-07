import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Content from "@/app/(main)/news/Content";
import NewsCategoryListing from "@/components/news/NewsCategoryListing";

describe("News listing editorial", () => {
  it("renders a flat editorial hero without gradients or announcement cards", () => {
    const { container } = render(<Content />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /News from the frontlines/i,
      }),
    ).toBeInTheDocument();
    expect(container.querySelector("[data-editorial-band]")).toHaveAttribute(
      "data-editorial-tone",
      "teal",
    );
    expect(container.innerHTML).not.toContain("gradient");
    expect(container.innerHTML).not.toContain("blur-3xl");
    expect(container.innerHTML).not.toContain("AnnouncementCard");
  });

  it("lists news with publication entries and Explore the update CTAs", () => {
    const { container } = render(<NewsCategoryListing />);

    expect(
      screen.getByRole("group", { name: /Filter news by category/i }),
    ).toBeInTheDocument();
    expect(
      container.querySelectorAll("[data-publication-entry]").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Explore the update").length,
    ).toBeGreaterThan(0);
  });
});
