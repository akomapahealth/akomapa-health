import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFeaturedPost } from "@/components/blog/BlogFeaturedPost";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogPost } from "@/components/blog/BlogPost";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import type { BlogPost as BlogPostType } from "@/lib/types";

const publishedVideoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

function withPublishedVideo(post: BlogPostType): BlogPostType {
  return { ...post, videoUrl: publishedVideoUrl, videoComingSoon: false };
}

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

  it("keeps Reciprocal Learning unpublished until a real recording URL exists", () => {
    const post = getBlogPostBySlug("reciprocal-learning-in-practice");

    expect(post).toBeDefined();
    expect(post?.videoUrl).toBeUndefined();
    expect(post?.videoComingSoon).toBe(true);
    expect(JSON.stringify(blogPosts)).not.toContain("ysz5S6PUM-U");
  });

  it("does not show Play on Reciprocal Learning listing cards", () => {
    const post = getBlogPostBySlug("reciprocal-learning-in-practice")!;
    const { container, rerender } = render(<BlogCard post={post} />);

    expect(
      screen.queryByRole("button", { name: /play video/i }),
    ).not.toBeInTheDocument();
    expect(container.querySelector("svg.lucide-play")).toBeNull();

    rerender(<BlogFeaturedPost post={post} />);
    expect(
      screen.queryByRole("button", { name: /play video/i }),
    ).not.toBeInTheDocument();
    expect(container.querySelector("svg.lucide-play")).toBeNull();
  });

  it("renders a Coming soon media module instead of a placeholder player", () => {
    const post = getBlogPostBySlug("reciprocal-learning-in-practice")!;
    const { container } = render(
      <BlogPost post={post} related={[]} hasMoreByAuthor={false} />,
    );

    expect(screen.getByRole("status")).toHaveAttribute(
      "data-blog-video-coming-soon",
    );
    expect(screen.getByText("Recording coming soon")).toBeInTheDocument();
    expect(
      screen.getAllByText(
        "This conversation will be published here when the recording is available.",
      ).length,
    ).toBeGreaterThan(0);
    expect(
      screen.queryByRole("button", { name: /play video/i }),
    ).not.toBeInTheDocument();
    expect(container.querySelector("iframe")).toBeNull();
    expect(container.innerHTML).not.toContain("ysz5S6PUM-U");
    expect(container.innerHTML).not.toContain("youtube-nocookie");
  });

  it("shows Play for a published Thought Leadership recording", () => {
    const post = withPublishedVideo(blogPosts[0]);
    const { container, rerender } = render(<BlogCard post={post} />);

    expect(container.querySelector("svg.lucide-play")).not.toBeNull();

    rerender(<BlogFeaturedPost post={post} />);
    expect(container.querySelector("svg.lucide-play")).not.toBeNull();

    rerender(<BlogPost post={post} related={[]} hasMoreByAuthor={false} />);
    expect(
      screen.getByRole("button", { name: /play video/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("prefers a published videoUrl over a leftover coming-soon flag", () => {
    const post = {
      ...getBlogPostBySlug("reciprocal-learning-in-practice")!,
      videoUrl: publishedVideoUrl,
      videoComingSoon: true,
    };
    render(<BlogPost post={post} related={[]} hasMoreByAuthor={false} />);

    expect(
      screen.getByRole("button", { name: /play video/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Recording coming soon")).not.toBeInTheDocument();
  });
});
