import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ImmersionPaymentSection from "../ImmersionPaymentSection";

const links = {
  deposit: "https://buy.stripe.com/test_deposit",
  full: "https://buy.stripe.com/test_full",
};

describe("Immersion payment section", () => {
  it("requires application self-confirmation before exposing checkout links", async () => {
    const user = userEvent.setup();
    render(<ImmersionPaymentSection links={links} />);

    expect(screen.queryByRole("link", { name: /Pay \$1,249\.50 deposit/ })).toBeNull();
    expect(screen.queryByRole("link", { name: /Pay \$2,499 in full/ })).toBeNull();

    await user.click(screen.getByRole("checkbox"));

    expect(screen.getByRole("link", { name: /Pay \$1,249\.50 deposit/ })).toHaveAttribute(
      "href",
      links.deposit,
    );
    expect(screen.getByRole("link", { name: /Pay \$2,499 in full/ })).toHaveAttribute(
      "href",
      links.full,
    );
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    await user.click(screen.getByRole("checkbox"));
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
