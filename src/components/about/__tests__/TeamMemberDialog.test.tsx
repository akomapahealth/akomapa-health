import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import TeamMemberDialog, {
  type TeamSpotlightMember,
} from "@/components/about/TeamMemberDialog";

const member: TeamSpotlightMember = {
  name: "Ama Mensah",
  role: "Clinical Lead",
  org: "Akomapa Health Foundation",
  image: "/images/team/placeholder.jpg",
  email: "ama@example.com",
  linkedin: "https://www.linkedin.com/in/ama-mensah",
  bio: "Ama supports community-rooted clinical care.",
};

describe("TeamMemberDialog", () => {
  it("uses an explicit control and returns focus after Escape closes the biography", async () => {
    const user = userEvent.setup();
    render(<TeamMemberDialog member={member} />);

    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-team-member", member.name);
    expect(article).not.toHaveClass("h-[32rem]", "cursor-pointer");

    const trigger = screen.getByRole("button", { name: "Read bio" });
    expect(trigger).toHaveAttribute("data-team-bio-trigger", member.name);
    expect(trigger).toHaveClass("min-h-11");

    await user.click(trigger);

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByRole("heading", { name: member.name }),
    ).toBeInTheDocument();
    expect(within(dialog).getByText(member.bio!)).toBeInTheDocument();
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

  it("suppresses placeholder contacts and omits a bio trigger without a bio", () => {
    render(
      <TeamMemberDialog
        member={{
          ...member,
          bio: undefined,
          email: "#",
          linkedin: "#",
        }}
      />,
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
