import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import TeamMemberDialog from "@/components/about/TeamMemberDialog";
import type { TeamMember } from "@/lib/types";

const member: TeamMember = {
  id: "member-ama-mensah",
  roleCategory: "member",
  name: "Ama Mensah",
  title: "Clinical Lead",
  affiliation: "Akomapa Health Foundation",
  image: "/images/team/placeholder.jpg",
  socialLinks: {
    email: "ama@example.com",
    linkedin: "https://www.linkedin.com/in/ama-mensah",
  },
  bio: "Ama supports community-rooted clinical care and helps volunteers prepare to serve with consistency and respect.",
};

describe("TeamMemberDialog", () => {
  it("renders a complete member profile and restores focus after Escape", async () => {
    const user = userEvent.setup();
    render(<TeamMemberDialog member={member} appearance="member" />);

    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-team-member", member.name);
    expect(article).toHaveAttribute("data-team-role-category", "member");
    expect(screen.getByText(member.affiliation)).toBeInTheDocument();
    expect(screen.getByText(member.title)).toBeInTheDocument();
    expect(
      screen.getByAltText(`Headshot of ${member.name}, ${member.title}`),
    ).toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: "Read bio" });
    expect(trigger).toHaveAttribute("data-team-bio-trigger", member.name);
    expect(trigger).toHaveClass("min-h-11");

    await user.click(trigger);

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByRole("heading", { name: member.name }),
    ).toBeInTheDocument();
    expect(within(dialog).getByText(member.bio)).toBeInTheDocument();
    expect(
      within(dialog).getByRole("button", {
        name: `Close ${member.name} biography`,
      }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  });

  it("renders valid contacts and suppresses placeholders or malformed values", () => {
    const { rerender } = render(<TeamMemberDialog member={member} />);

    expect(screen.getByRole("link", { name: `Email ${member.name}` })).toHaveAttribute(
      "href",
      "mailto:ama@example.com",
    );
    expect(
      screen.getByRole("link", { name: `View ${member.name} on LinkedIn` }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/ama-mensah");

    rerender(
      <TeamMemberDialog
        member={{
          ...member,
          socialLinks: {
            email: "not-an-email",
            linkedin: "http://example.com/profile",
          },
        }}
      />,
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Read bio" })).toBeInTheDocument();
  });
});
