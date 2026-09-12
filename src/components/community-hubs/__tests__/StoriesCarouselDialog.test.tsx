import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import StoriesCarouselDialog from "@/components/community-hubs/StoriesCarouselDialog";
import type { Story } from "@/lib/types";

const stories: Story[] = [
  {
    id: "story-1",
    title: "First story",
    excerpt: "First excerpt",
    content: "First paragraph.\n\nSecond paragraph.",
    author: "Ada Leader",
    role: "Co-Director",
    date: "2026-03-12",
  },
  {
    id: "story-2",
    title: "Second story",
    excerpt: "Second excerpt",
    content: "Another opening.\n\nAnother closing.",
    author: "Kojo Leader",
    role: "Follow-up Lead",
    date: "2026-03-12",
  },
  {
    id: "story-3",
    title: "Third story",
    excerpt: "Third excerpt",
    content: "Third opening.\n\nThird closing.",
    author: "Ama Leader",
    role: "Liaison",
    date: "2026-03-12",
  },
];

describe("StoriesCarouselDialog", () => {
  it("opens on the selected story and navigates with next/previous controls", () => {
    const onClose = vi.fn();
    render(
      <StoriesCarouselDialog
        stories={stories}
        openIndex={1}
        onClose={onClose}
        label="Community Stories"
      />,
    );

    expect(screen.getByRole("heading", { name: "Second story" })).toBeVisible();
    expect(screen.getByText("Story 2 of 3")).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Next story" }));
    expect(screen.getByRole("heading", { name: "Third story" })).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Next story" }));
    expect(screen.getByRole("heading", { name: "First story" })).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Previous story" }));
    expect(screen.getByRole("heading", { name: "Third story" })).toBeVisible();
  });

  it("supports arrow-key navigation and close", () => {
    const onClose = vi.fn();
    render(
      <StoriesCarouselDialog
        stories={stories}
        openIndex={0}
        onClose={onClose}
        label="Volunteer Stories"
      />,
    );

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByRole("heading", { name: "Second story" })).toBeVisible();

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByRole("heading", { name: "First story" })).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Close Volunteer Stories" }));
    expect(onClose).toHaveBeenCalled();
  });
});
