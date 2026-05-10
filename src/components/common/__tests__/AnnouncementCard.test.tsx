import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnnouncementCard } from "@/components/common/AnnouncementCard";
import type { Announcement } from "@/lib/types";

const externalAnnouncement: Announcement = {
  id: "external",
  tag: "Award",
  tagColor: "amber",
  title: "External announcement",
  description: "Description text",
  image: "/test/poster.jpg",
  ctaText: "Read More",
  ctaLink: "https://example.com/news",
  isExternal: true,
};

const internalAnnouncement: Announcement = {
  id: "internal",
  tag: "Program",
  tagColor: "lapis",
  title: "Internal announcement",
  description: "Description text",
  image: "/test/poster.jpg",
  ctaText: "Learn More",
  ctaLink: "/programs/akomapa-ghltp",
  isExternal: false,
};

const noLinkAnnouncement: Announcement = {
  id: "no-link",
  tag: "Update",
  tagColor: "skobeloff",
  title: "No CTA announcement",
  description: "Description text",
};

describe("AnnouncementCard", () => {
  it("wraps the card in an external <a> with target=_blank when isExternal", () => {
    const { container } = render(<AnnouncementCard item={externalAnnouncement} />);
    const anchor = container.querySelector("a");
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveAttribute("href", "https://example.com/news");
    expect(anchor).toHaveAttribute("target", "_blank");
    expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(screen.getByText("External announcement")).toBeInTheDocument();
  });

  it("wraps the card in an internal <a> (Link) when not external", () => {
    const { container } = render(<AnnouncementCard item={internalAnnouncement} />);
    const anchor = container.querySelector("a");
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveAttribute("href", "/programs/akomapa-ghltp");
    expect(anchor).not.toHaveAttribute("target");
  });

  it("renders the card without a wrapping link when no ctaLink is set", () => {
    const { container } = render(<AnnouncementCard item={noLinkAnnouncement} />);
    expect(container.querySelector("a")).toBeNull();
    expect(screen.getByText("No CTA announcement")).toBeInTheDocument();
  });
});
