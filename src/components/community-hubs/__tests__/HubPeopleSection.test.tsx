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
      alt: "UCC Community Hub volunteer portrait 1 of 1",
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
    ).toHaveLength(8);
    expect(
      within(leadership).getByRole("heading", {
        level: 3,
        name: "David Ofosu",
      }),
    ).toBeVisible();
    expect(
      within(volunteers).getAllByRole("button", {
        name: /view volunteer portrait/i,
      }),
    ).toHaveLength(8);
    expect(
      within(volunteers).getByRole("button", {
        name: "Load more volunteers",
      }),
    ).toBeVisible();
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

  it("renders an accessible initials fallback when a leader has no portrait", () => {
    const rosterWithoutImage: HubRoster = {
      leadership: [
        {
          id: "leader-pending-portrait",
          name: "Ama Mensah",
          role: "Community Lead",
          affiliation: "Public Health Student",
        },
      ],
      volunteers: [],
    };

    const { container } = render(
      <HubPeopleSection hubName="Test Hub" roster={rosterWithoutImage} />,
    );

    const leader = document.querySelector(
      "[data-hub-leader='leader-pending-portrait']",
    ) as HTMLElement;
    expect(leader).not.toBeNull();
    expect(
      within(leader).getByRole("img", {
        name: "Portrait pending for Ama Mensah",
      }),
    ).toHaveTextContent("AM");
    expect(leader.querySelector("img")).toBeNull();
    expect(container.querySelector("[data-hub-portrait-fallback]")).not.toBeNull();
  });

  it("renders labeled pending leadership and volunteer bands without fake people", () => {
    const pendingRoster: HubRoster = {
      leadership: [],
      volunteers: [],
      pending: {
        leadership: {
          monogram: "UG",
          description:
            "Student leadership names and portraits will appear here as the University of Ghana hub team is published.",
        },
        volunteers: {
          monogram: "UG",
          description:
            "Volunteer portraits will appear here as the UG cohort grows. Students across all UG campuses are invited to apply.",
          cta: {
            label: "Apply now",
            href: "https://forms.gle/rZFFg2BgsFfH6bJC8",
            external: true,
          },
        },
      },
    };

    render(
      <HubPeopleSection
        hubName="Akomapa–UG Community Health Hub"
        roster={pendingRoster}
        accentColor="#eeba2b"
      />,
    );

    expect(
      screen.getByRole("region", {
        name: "Meet the People Leading the Work",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("region", {
        name: "The People Who Make Service Possible",
      }),
    ).toBeVisible();
    expect(document.querySelectorAll("[data-hub-leader]")).toHaveLength(0);
    expect(
      document.querySelectorAll("[data-volunteer-portrait-trigger]"),
    ).toHaveLength(0);
    expect(document.querySelectorAll("[data-hub-portrait-fallback]").length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getByRole("link", { name: /Apply now/i }),
    ).toHaveAttribute("href", "https://forms.gle/rZFFg2BgsFfH6bJC8");
  });

  it("opens an accessible portrait dialog with the keyboard and traps focus", async () => {
    const user = userEvent.setup();
    render(<HubPeopleSection hubName="Test Hub" roster={smallRoster} />);

    const trigger = screen.getByRole("button", {
      name: "View volunteer portrait 1 of 1",
    });
    trigger.focus();
    await user.keyboard("{Enter}");

    const dialog = await screen.findByRole("dialog", {
      name: "Our Volunteer Community",
    });
    expect(
      within(dialog).getByText(
        "We honor every volunteer whose hard work and care keep our community hub running.",
      ),
    ).toBeVisible();

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
        name: "View volunteer portrait 1 of 1",
      }),
    );
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByTestId("volunteer-dialog-backdrop"));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("loads volunteers in batches and browses the complete gallery in either direction", async () => {
    const user = userEvent.setup();
    render(
      <HubPeopleSection
        hubName="Akomapa–UCC Community Health Hub"
        roster={uccHubRoster}
      />,
    );

    const volunteers = screen.getByRole("region", {
      name: "The People Who Make Service Possible",
    });
    const loadMore = within(volunteers).getByRole("button", {
      name: "Load more volunteers",
    });

    expect(
      volunteers.querySelectorAll("[data-volunteer-portrait-trigger]"),
    ).toHaveLength(8);
    await user.click(loadMore);
    expect(
      volunteers.querySelectorAll("[data-volunteer-portrait-trigger]"),
    ).toHaveLength(16);

    await user.click(
      within(volunteers).getByRole("button", {
        name: "View volunteer portrait 1 of 36",
      }),
    );
    const dialog = await screen.findByRole("dialog", {
      name: "Our Volunteer Community",
    });

    await user.click(
      within(dialog).getByRole("button", {
        name: "View next volunteer portrait",
      }),
    );
    expect(within(dialog).getByText("Portrait 2 of 36")).toBeVisible();

    await user.keyboard("{ArrowLeft}");
    expect(within(dialog).getByText("Portrait 1 of 36")).toBeVisible();

    await user.click(
      within(dialog).getByRole("button", {
        name: "View previous volunteer portrait",
      }),
    );
    expect(within(dialog).getByText("Portrait 36 of 36")).toBeVisible();
  });
});
