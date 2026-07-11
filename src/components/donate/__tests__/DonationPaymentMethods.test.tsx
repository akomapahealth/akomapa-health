import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import DonationPaymentMethods from "@/components/donate/DonationPaymentMethods";

afterEach(() => {
  vi.unstubAllGlobals();
});

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
    expect(screen.getByText("PayPal")).toBeInTheDocument();
    expect(screen.getByText("Venmo")).toBeInTheDocument();
    expect(screen.getByText("Cash App")).toBeInTheDocument();
    expect(screen.getByText("Zelle")).toBeInTheDocument();
    expect(screen.getByText("Card / ACH")).toBeInTheDocument();
    expect(screen.getAllByText("Coming soon")).toHaveLength(5);
    expect(screen.getByTestId("payment-method-paypal")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByTestId("payment-method-paypal")).toHaveClass(
      "cursor-not-allowed",
      "grayscale",
    );
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
    expect(
      screen.getByRole("heading", { name: "Let us thank you" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Full name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(
      screen.getByText(/does not verify or confirm that a transfer was completed/i),
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

  it("shares minimal donor details without claiming payment confirmation", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <DonationPaymentMethods
        flow="oneTime"
        selectedGivingLevel="$25 one time"
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "View Mobile Money instructions",
      }),
    );
    await user.type(screen.getByLabelText("Full name"), "Ama Mensah");
    await user.type(screen.getByLabelText("Email address"), "ama@example.com");
    await user.click(screen.getByRole("button", { name: "Share my details" }));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/donation-follow-up",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );
    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(request.body))).toEqual({
      name: "Ama Mensah",
      email: "ama@example.com",
      flow: "oneTime",
      selectedGivingLevel: "$25 one time",
      company: "",
    });
    expect(
      await screen.findByText("Thank you for sharing your details."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does not verify or confirm a payment/i),
    ).toBeInTheDocument();
  });
});
