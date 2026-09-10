import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AnnouncementTrigger from "@/components/announcement/AnnouncementTrigger";

vi.mock("@/components/announcement/AnnouncementProvider", () => ({
  useAnnouncements: () => ({
    openAnnouncements: vi.fn(),
    hasUnseenAnnouncements: false,
    isOpen: false,
  }),
}));

describe("AnnouncementTrigger", () => {
  it("pins the FAB above the iOS home indicator", () => {
    render(<AnnouncementTrigger />);

    const group = screen.getByTestId("announcement-trigger-group");
    expect(group.className).toMatch(
      /bottom-\[max\(1rem,calc\(0\.5rem\+env\(safe-area-inset-bottom\)\)\)\]/,
    );
    expect(group.className).toMatch(
      /sm:bottom-\[max\(1\.5rem,calc\(0\.75rem\+env\(safe-area-inset-bottom\)\)\)\]/,
    );
    expect(group).toHaveClass("z-40");
  });
});
