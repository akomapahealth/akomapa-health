import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import FeaturedNews from "@/components/home/FeaturedNews";
import { news } from "@/data/news";

describe("FeaturedNews", () => {
  it("renders the section heading and 'View All News' link", () => {
    render(<FeaturedNews />);
    expect(
      screen.getByRole("heading", { level: 2, name: /latest news/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view all news/i })
    ).toHaveAttribute("href", "/news");
  });

  it("renders at most 3 news cards from the data source", () => {
    render(<FeaturedNews />);
    const expected = (news.filter((n) => n.featured).length > 0
      ? news.filter((n) => n.featured)
      : news
    ).slice(0, 3);

    for (const item of expected) {
      expect(
        screen.getAllByRole("link", {
          name: /^discover the story/i,
        }).length,
      ).toBeGreaterThan(0);

      expect(
        screen.getByRole("heading", { level: 3, name: item.title })
      ).toBeInTheDocument();
    }
  });

  it("each story link points to the article slug", () => {
    render(<FeaturedNews />);
    const expected = (news.filter((n) => n.featured).length > 0
      ? news.filter((n) => n.featured)
      : news
    ).slice(0, 3);

    const links = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith("/news/"));

    expect(links.length).toBe(expected.length);
    for (const item of expected) {
      expect(
        links.some((a) => a.getAttribute("href") === `/news/${item.slug}`)
      ).toBe(true);
    }
  });
});
