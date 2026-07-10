import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import DonationPaymentMethods from "@/components/donate/DonationPaymentMethods";

describe("DonationPaymentMethods", () => {
  it("renders verified Mobile Money details and non-interactive unavailable methods", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DonationPaymentMethods
        flow="partner"
        selectedGivingLevel="$50 monthly"
      />,
    );

    expect(screen.getAllByRole("radio")).toHaveLength(1);
    expect(
      screen.getByRole("radio", { name: /MTN Mobile Money/i }),
    ).toBeChecked();
    expect(container.querySelectorAll("a")).toHaveLength(0);
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(
      screen.getByText(
        "Bank transfer instructions are being verified and will be available soon.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Complete a new manual transfer for each month/i),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "View Mobile Money instructions",
      }),
    );

    const instructions = screen.getByRole("alert");
    expect(within(instructions).getByText("0249292898")).toBeInTheDocument();
    expect(within(instructions).getByText("MTN")).toBeInTheDocument();
    expect(
      within(instructions).getByText("Akomapa Health Foundation"),
    ).toBeInTheDocument();
    expect(
      within(instructions).getByText(
        "Before completing your transfer, please confirm the account name appears as Akomapa Health Foundation.",
      ),
    ).toBeInTheDocument();
  });

  it("uses the same configuration for a one-time gift without recurring claims", () => {
    render(
      <DonationPaymentMethods
        flow="oneTime"
        selectedGivingLevel="$25 one time"
      />,
    );

    expect(
      screen.getByRole("radio", { name: /MTN Mobile Money/i }),
    ).toBeChecked();
    expect(
      screen.getByText(
        "This is a one-time manual transfer. No recurring payment will be created.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does not calculate or display a Mobile Money currency conversion/i),
    ).toBeInTheDocument();
  });
});
