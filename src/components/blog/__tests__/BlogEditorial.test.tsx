import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFeaturedPost } from "@/components/blog/BlogFeaturedPost";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogPost } from "@/components/blog/BlogPost";
import { blogPosts } from "@/data/blog";

describe("Thought Leadership editorial components", () => {
  it("renders a flat editorial hero with one clear heading and story count", () => {
    const { container } = render(<BlogHero postCount={blogPosts.length} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Thought Leadership" }),
    ).toBeInTheDocument();
    expect(screen.getByText(String(blogPosts.length))).toBeInTheDocument();
    expect(container.querySelector("[data-editorial-band]")).toHaveAttribute(
      "data-editorial-tone",
      "teal",
    );
    expect(container.innerHTML).not.toContain("gradient");
  });

  it("uses engaging, destination-specific prompts instead of read-more copy", () => {
    const post = blogPosts[0];
    const { rerender } = render(<BlogFeaturedPost post={post} />);

    expect(screen.getByText("Step inside this story")).toBeInTheDocument();
    expect(screen.queryByText(/read more|read article/i)).not.toBeInTheDocument();

    rerender(<BlogCard post={post} />);
    expect(screen.getByText("Explore this perspective")).toBeInTheDocument();
    expect(screen.queryByText(/read more|read article/i)).not.toBeInTheDocument();
  });

  it("renders a flat detail header without gradient chrome", () => {
    const post = blogPosts[0];
    const { container } = render(
      <BlogPost post={post} related={[]} hasMoreByAuthor={false} />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: post.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Back to Thought Leadership/i }),
    ).toHaveAttribute("href", "/blog");
    expect(container.querySelector("[data-editorial-band]")).toHaveAttribute(
      "data-editorial-tone",
      "teal",
    );
    expect(container.innerHTML).not.toContain("gradient");
    expect(container.innerHTML).not.toContain("blur-3xl");
  });
});

