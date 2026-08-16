import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GhanaMobileMoney from "@/components/donate/GhanaMobileMoney";

describe("GhanaMobileMoney", () => {
  it("renders the verified recipient without an artificial completion action", () => {
    render(<GhanaMobileMoney journey="oneTime" />);

    expect(screen.getByText("Akomapa Health Foundation")).toBeVisible();
    expect(screen.getByText("MTN", { selector: "dd" })).toBeVisible();
    expect(screen.getByText("0249292898")).toBeVisible();
    expect(
      screen.getByText(/confirm the account name appears/i),
    ).toBeVisible();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByText(/payment complete/i)).not.toBeInTheDocument();
  });

  it("explains that Partners Program transfers are manually repeated", () => {
    render(<GhanaMobileMoney journey="partner" />);

    expect(
      screen.getByText(/does not create an automatic monthly plan/i),
    ).toBeVisible();
    expect(
      screen.getByText(/do not trigger Givebutter receipts/i),
    ).toBeVisible();
  });
});
