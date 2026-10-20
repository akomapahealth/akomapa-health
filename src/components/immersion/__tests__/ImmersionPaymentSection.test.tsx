import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import ImmersionPaymentSection from "../ImmersionPaymentSection";

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("Immersion payment section", () => {
  it("hides email and payment choices until application confirmation", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: async () => ({ verified: false }) }));
    const user = userEvent.setup();
    render(<ImmersionPaymentSection />);
    expect(screen.getByText(/deposit portion is nonrefundable/)).toBeInTheDocument();
    expect(screen.getByText(/November 29, 2026 at 11:59 p.m. Eastern Time/)).toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: /Email address/ })).toBeNull();
    expect(screen.queryByRole("button", { name: /Pay \$1,249/ })).toBeNull();
    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("textbox", { name: /Email address/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Pay \$1,249/ })).toBeNull();
  });

  it("shows a verified participant their first name and payment choices", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: async () => ({ verified: true, firstName: "Test" }) }));
    render(<ImmersionPaymentSection />);
    await waitFor(() => expect(screen.getByText(/Welcome, Test/)).toBeInTheDocument());
    expect(screen.getByRole("button", { name: /Pay \$1,249/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Pay \$2,499/ })).toBeInTheDocument();
  });
});
