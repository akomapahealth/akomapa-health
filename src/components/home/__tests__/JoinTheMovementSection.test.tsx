import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import JoinTheMovementSection from "@/components/home/JoinTheMovementSection";

const { trackEventMock } = vi.hoisted(() => ({
  trackEventMock: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({
  trackEvent: trackEventMock,
}));

const heading =
  "Build healthier communities and stronger health leaders with us.";

describe("JoinTheMovementSection", () => {
  beforeEach(() => {
    trackEventMock.mockClear();
  });

  it("renders the closing invitation and a clear three-action hierarchy", () => {
    render(<JoinTheMovementSection />);

    const section = screen.getByRole("region", { name: heading });

    expect(section).toHaveAttribute("data-join-the-movement");
    expect(section).toHaveClass("bg-[#0F4C5C]");
    expect(section).not.toHaveClass("bg-[#121514]");
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: heading,
      }),
    ).toHaveAttribute("id", "join-heading");
    expect(within(section).getByText("Choose how to take part")).toBeVisible();

    const supportLink = within(section).getByRole("link", {
      name: "Support Our Work",
    });
    const partnershipLink = within(section).getByRole("link", {
      name: "Partner With Us",
    });
    const participationLink = within(section).getByRole("link", {
      name: "Join Akomapa",
    });

    expect(supportLink).toHaveAttribute("href", "/donate");
    expect(supportLink).toHaveClass("bg-[#eeba2b]");
    expect(partnershipLink).toHaveAttribute("href", "/partnerships");
    expect(participationLink).toHaveAttribute("href", "/get-involved");
  });

  it("tracks donation intent from the primary action", () => {
    render(<JoinTheMovementSection />);

    const supportLink = screen.getByRole("link", {
      name: "Support Our Work",
    });
    supportLink.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(supportLink);

    expect(trackEventMock).toHaveBeenCalledOnce();
    expect(trackEventMock).toHaveBeenCalledWith({
      name: "donation_cta_click",
      location: "home_join_the_movement",
    });
  });
});
