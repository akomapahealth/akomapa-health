import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ImmersionInterestProvider from "@/components/immersion/ImmersionInterestProvider";
import ImmersionRegisterInterestButton from "@/components/immersion/ImmersionRegisterInterestButton";
import ImmersionAlertSection from "@/components/immersion/ImmersionAlertSection";
import { IMMERSION_INTEREST_COPY } from "@/lib/immersion-interest";

function renderIsland() {
  return render(
    <ImmersionInterestProvider>
      <ImmersionRegisterInterestButton variant="gold" />
      <ImmersionAlertSection />
    </ImmersionInterestProvider>,
  );
}

describe("ImmersionInterestModal", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          outcome: "pending_confirmation",
        }),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("opens from Register Interest, traps focus, and restores focus on Escape", async () => {
    const user = userEvent.setup();
    renderIsland();

    const trigger = screen.getByRole("button", { name: "Register Interest" });
    await user.click(trigger);

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByRole("heading", {
        name: IMMERSION_INTEREST_COPY.modal.title,
      }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  });

  it("shows approved validation messages for empty required fields", async () => {
    const user = userEvent.setup();
    renderIsland();

    await user.click(
      screen.getByRole("button", {
        name: IMMERSION_INTEREST_COPY.section.cta,
      }),
    );

    const dialog = await screen.findByRole("dialog");
    await user.click(
      within(dialog).getByRole("button", {
        name: IMMERSION_INTEREST_COPY.modal.submit,
      }),
    );

    expect(
      await within(dialog).findByText("Enter your first name."),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText("Enter your email address."),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText(
        "Please confirm that we may email you about the Immersion Program.",
      ),
    ).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("submits a valid alert signup and shows the double opt-in success state", async () => {
    const user = userEvent.setup();
    renderIsland();

    await user.click(screen.getByRole("button", { name: "Register Interest" }));
    const dialog = await screen.findByRole("dialog");

    await user.type(within(dialog).getByLabelText(/First name/i), "Ama");
    await user.type(
      within(dialog).getByLabelText(/Email address/i),
      "ama@example.com",
    );
    await user.click(within(dialog).getByRole("checkbox"));
    await user.click(
      within(dialog).getByRole("button", {
        name: IMMERSION_INTEREST_COPY.modal.submit,
      }),
    );

    expect(
      await within(dialog).findByRole("heading", {
        name: IMMERSION_INTEREST_COPY.success.heading,
      }),
    ).toBeInTheDocument();
    expect(within(dialog).getByText(/ama@example.com/i)).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledWith(
      "/api/immersion-interest",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );
    const body = JSON.parse(
      (fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body as string,
    );
    expect(body).toMatchObject({
      firstName: "Ama",
      email: "ama@example.com",
      consent: true,
      company: "",
    });
  });

  it("shows the already-registered state for idempotent repeats", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          outcome: "already_registered",
        }),
      }),
    );

    const user = userEvent.setup();
    renderIsland();

    await user.click(screen.getByRole("button", { name: "Register Interest" }));
    const dialog = await screen.findByRole("dialog");

    await user.type(within(dialog).getByLabelText(/First name/i), "Ama");
    await user.type(
      within(dialog).getByLabelText(/Email address/i),
      "ama@example.com",
    );
    await user.click(within(dialog).getByRole("checkbox"));
    await user.click(
      within(dialog).getByRole("button", {
        name: IMMERSION_INTEREST_COPY.modal.submit,
      }),
    );

    expect(
      await within(dialog).findByRole("heading", {
        name: IMMERSION_INTEREST_COPY.alreadyRegistered.heading,
      }),
    ).toBeInTheDocument();
  });

  it("keeps the modal open and shows retry copy after a service failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: vi.fn().mockResolvedValue({
          error: "Immersion alert service is currently unavailable",
        }),
      }),
    );

    const user = userEvent.setup();
    renderIsland();

    await user.click(screen.getByRole("button", { name: "Register Interest" }));
    const dialog = await screen.findByRole("dialog");

    await user.type(within(dialog).getByLabelText(/First name/i), "Ama");
    await user.type(
      within(dialog).getByLabelText(/Email address/i),
      "ama@example.com",
    );
    await user.click(within(dialog).getByRole("checkbox"));
    await user.click(
      within(dialog).getByRole("button", {
        name: IMMERSION_INTEREST_COPY.modal.submit,
      }),
    );

    expect(
      await within(dialog).findByText(
        IMMERSION_INTEREST_COPY.errors.serviceUnavailable,
      ),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("link", {
        name: /Contact us about the Immersion Program/i,
      }),
    ).toHaveAttribute("href", "/contact?type=immersion");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(within(dialog).getByLabelText(/First name/i)).toHaveValue("Ama");
  });
});
