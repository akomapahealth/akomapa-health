import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import HubPeopleSection from "@/components/community-hubs/HubPeopleSection";
import { uccHubRoster } from "@/data/community-hubs";
import type { HubRoster } from "@/lib/types";

const smallRoster: HubRoster = {
  leadership: [
    {
      id: "leader-with-details",
      name: "Ama Mensah",
      role: "Community Lead",
      affiliation: "Public Health Student",
      image: "/ucc-team/ama-mensah.jpg",
      bio: "Ama coordinates community listening and outreach.",
      contact: {
        email: "ama@example.com",
        linkedin: "https://www.linkedin.com/in/ama-mensah",
      },
    },
    {
      id: "leader-without-details",
      name: "Kojo Owusu",
      role: "Operations Lead",
      affiliation: "Nursing Student",
      image: "/ucc-team/kojo-owusu.jpg",
    },
  ],
  volunteers: [
    {
      id: "volunteer-one",
      image: "/ucc-team/volunteers/volunteer-one.jpg",
      alt: "UCC community hub volunteer in a teal Akomapa shirt outdoors",
    },
  ],
};

describe("HubPeopleSection", () => {
  it("renders the complete UCC leadership and volunteer rosters in separate regions", () => {
    render(
      <HubPeopleSection
        hubName="Akomapa–UCC Community Health Hub"
        roster={uccHubRoster}
      />,
    );

    const leadership = screen.getByRole("region", {
      name: "Meet the People Leading the Work",
    });
    const volunteers = screen.getByRole("region", {
      name: "The People Who Make Service Possible",
    });

    expect(
      leadership.querySelectorAll("[data-hub-leader]"),
    ).toHaveLength(12);
    expect(
      volunteers.querySelectorAll("[data-volunteer-portrait-trigger]"),
    ).toHaveLength(36);
    expect(
      within(leadership).getByRole("heading", {
        level: 3,
        name: "David Ofosu",
      }),
    ).toBeVisible();
    expect(
      within(volunteers).getAllByRole("button", {
        name: /view portrait:/i,
      }),
    ).toHaveLength(36);
  });

  it("omits people markup for an absent or empty roster", () => {
    const { rerender } = render(
      <HubPeopleSection hubName="Hub without a roster" />,
    );

    expect(document.querySelector("#hub-leadership")).toBeNull();
    expect(document.querySelector("#hub-volunteers")).toBeNull();

    rerender(
      <HubPeopleSection
        hubName="Hub with an empty roster"
        roster={{ leadership: [], volunteers: [] }}
      />,
    );

    expect(document.querySelector("#hub-leadership")).toBeNull();
    expect(document.querySelector("#hub-volunteers")).toBeNull();
  });

  it("renders leadership-only and volunteer-only rosters independently", () => {
    const { rerender } = render(
      <HubPeopleSection
        hubName="Leadership-only Hub"
        roster={{ leadership: smallRoster.leadership, volunteers: [] }}
      />,
    );

    expect(document.querySelector("#hub-leadership")).not.toBeNull();
    expect(document.querySelector("#hub-volunteers")).toBeNull();

    rerender(
      <HubPeopleSection
        hubName="Volunteer-only Hub"
        roster={{ leadership: [], volunteers: smallRoster.volunteers }}
      />,
    );

    expect(document.querySelector("#hub-leadership")).toBeNull();
    expect(document.querySelector("#hub-volunteers")).not.toBeNull();
  });

  it("renders optional leader details without producing empty controls", () => {
    render(<HubPeopleSection hubName="Test Hub" roster={smallRoster} />);

    const leaderWithDetails = document.querySelector(
      "[data-hub-leader='leader-with-details']",
    );
    const leaderWithoutDetails = document.querySelector(
      "[data-hub-leader='leader-without-details']",
    );

    expect(leaderWithDetails).not.toBeNull();
    expect(
      within(leaderWithDetails as HTMLElement).getByText(
        "Ama coordinates community listening and outreach.",
      ),
    ).toBeVisible();
    expect(
      within(leaderWithDetails as HTMLElement).getByRole("link", {
        name: "Email Ama Mensah",
      }),
    ).toHaveAttribute("href", "mailto:ama@example.com");
    expect(
      within(leaderWithDetails as HTMLElement).getByRole("link", {
        name: "LinkedIn",
      }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/ama-mensah");
    expect(
      within(leaderWithoutDetails as HTMLElement).queryByRole("link"),
    ).toBeNull();
  });

  it("opens an accessible portrait dialog with the keyboard and traps focus", async () => {
    const user = userEvent.setup();
    render(<HubPeopleSection hubName="Test Hub" roster={smallRoster} />);

    const trigger = screen.getByRole("button", {
      name: `View portrait: ${smallRoster.volunteers[0].alt}`,
    });
    trigger.focus();
    await user.keyboard("{Enter}");

    const dialog = await screen.findByRole("dialog", {
      name: "Volunteer portrait",
    });
    expect(within(dialog).getByText(smallRoster.volunteers[0].alt)).toBeVisible();

    const closeButton = within(dialog).getByRole("button", {
      name: "Close volunteer portrait",
    });
    await waitFor(() => expect(closeButton).toHaveFocus());

    await user.keyboard("{Tab}");
    expect(closeButton).toHaveFocus();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("closes the portrait dialog when its backdrop is activated", async () => {
    const user = userEvent.setup();
    render(<HubPeopleSection hubName="Test Hub" roster={smallRoster} />);

    await user.click(
      screen.getByRole("button", {
        name: `View portrait: ${smallRoster.volunteers[0].alt}`,
      }),
    );
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByTestId("volunteer-dialog-backdrop"));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});
