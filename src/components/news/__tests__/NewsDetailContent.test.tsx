import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NewsDetailContent } from "@/components/news/NewsDetailContent";
import type { NewsItem } from "@/lib/types";

function makeItem(overrides: Partial<NewsItem> = {}): NewsItem {
  return {
    id: "test-news-1",
    title: "Test news headline",
    excerpt: "Excerpt text",
    content: ["First paragraph body.", "Second paragraph body."],
    image: "/test/news.jpg",
    videoUrl: null,
    thumbnail: null,
    date: "2026-04-30",
    category: "Recognition",
    categoryColor: "lapis",
    tags: ["Yale", "Health"],
    featured: true,
    ctaText: null,
    ctaLink: null,
    isExternalCta: false,
    source: "news",
    ...overrides,
  };
}

describe("NewsDetailContent", () => {
  it("renders the title, category badge, formatted date, and tags", () => {
    render(<NewsDetailContent item={makeItem()} relatedItems={[]} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /test news headline/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Recognition")).toBeInTheDocument();
    expect(screen.getByText(/april \d{1,2}, 2026/i)).toBeInTheDocument();
    expect(screen.getByText("Yale")).toBeInTheDocument();
    expect(screen.getByText("Health")).toBeInTheDocument();
  });

  it("renders multi-paragraph body content", () => {
    render(<NewsDetailContent item={makeItem()} relatedItems={[]} />);
    expect(screen.getByText(/first paragraph body/i)).toBeInTheDocument();
    expect(screen.getByText(/second paragraph body/i)).toBeInTheDocument();
  });

  it("renders an external CTA when ctaLink + isExternalCta are set", () => {
    render(
      <NewsDetailContent
        item={makeItem({
          ctaText: "Read on Yale",
          ctaLink: "https://medicine.yale.edu",
          isExternalCta: true,
        })}
        relatedItems={[]}
      />
    );
    const cta = screen.getByRole("link", { name: /read on yale/i });
    expect(cta).toHaveAttribute("href", "https://medicine.yale.edu");
    expect(cta).toHaveAttribute("target", "_blank");
  });

  it("renders related items in the 'Continue Reading' section", () => {
    const related = [
      makeItem({ id: "r1", title: "Related one" }),
      makeItem({ id: "r2", title: "Related two" }),
    ];
    render(<NewsDetailContent item={makeItem()} relatedItems={related} />);

    expect(
      screen.getByRole("heading", { level: 3, name: /continue reading/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Related one")).toBeInTheDocument();
    expect(screen.getByText("Related two")).toBeInTheDocument();
  });

  it("omits the related section when no relatedItems are provided", () => {
    render(<NewsDetailContent item={makeItem()} relatedItems={[]} />);
    expect(
      screen.queryByRole("heading", { level: 3, name: /continue reading/i })
    ).not.toBeInTheDocument();
  });
});
