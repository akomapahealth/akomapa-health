import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import ImmersionPaymentSection from "../ImmersionPaymentSection";

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("Immersion payment section", () => {
  it("hides email and payment choices until application confirmation", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: async () => ({ verified: false }) }));
    const user = userEvent.setup();
    render(<ImmersionPaymentSection mode="test" />);
    expect(screen.getByText(/deposit portion is nonrefundable/)).toBeInTheDocument();
    expect(screen.getByText(/November 29, 2026 at 11:59 p.m. Eastern Time/)).toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: /Email address/ })).toBeNull();
    expect(screen.queryByRole("button", { name: /Pay \$1,249/ })).toBeNull();
    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("textbox", { name: /Email address/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Pay \$1,249/ })).toBeNull();
  });

  it("shows a verified participant their first name and payment choices", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: async () => ({ verified: true, firstName: "Test", paymentStage: "initial" }) }));
    render(<ImmersionPaymentSection mode="test" />);
    await waitFor(() => expect(screen.getByText(/Welcome, Test/)).toBeInTheDocument());
    expect(screen.getByRole("button", { name: /Pay \$1,249/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Pay \$2,499/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Pay \$1,249/ })).toBeDisabled();
    await userEvent.setup().click(screen.getByRole("checkbox", { name: /Immersion payment and refund terms/ }));
    expect(screen.getByRole("button", { name: /Pay \$1,249/ })).toBeEnabled();
  });

  it("offers only the remaining balance after a deposit", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: async () => ({ verified: true, firstName: "Test", paymentStage: "balance" }) }));
    render(<ImmersionPaymentSection mode="test" />);
    expect(await screen.findByRole("button", { name: /Pay remaining \$1,249/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Pay \$2,499/ })).toBeNull();
  });

  it("shows a verified scholarship recipient only her discounted full-payment option", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: async () => ({ verified: true, firstName: "Test", paymentStage: "initial", scholarship: true }) }));
    render(<ImmersionPaymentSection mode="test" />);
    expect(await screen.findByRole("button", { name: /Pay \$2,000 in full/ })).toBeInTheDocument();
    expect(screen.getByText(/\$499 scholarship reduces/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Pay \$1,249/ })).toBeNull();
    expect(screen.queryByRole("button", { name: /Pay \$2,499/ })).toBeNull();
  });

  it("offers no payment after the full fee is paid", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: async () => ({ verified: true, firstName: "Test", paymentStage: "paid" }) }));
    render(<ImmersionPaymentSection mode="test" />);
    expect(await screen.findByText(/program fee is paid in full/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Pay/ })).toBeNull();
  });
});
