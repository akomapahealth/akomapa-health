import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import ImmersionInterestProvider from "@/components/immersion/ImmersionInterestProvider";
import ImmersionRegisterInterestButton from "@/components/immersion/ImmersionRegisterInterestButton";

function renderIsland() {
  return render(
    <ImmersionInterestProvider>
      <ImmersionRegisterInterestButton variant="gold" />
    </ImmersionInterestProvider>,
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
});

describe("program interest intake dialog", () => {
  it("opens accessibly and restores trigger focus after Escape", async () => {
    const user = userEvent.setup();
    renderIsland();
    const trigger = screen.getByRole("button", { name: "Register Interest" });
    await user.click(trigger);
    expect(await screen.findByRole("dialog")).toHaveTextContent(
      "Tell us what you are interested in",
    );
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  });

  it("focuses a linked validation summary without transmitting an abandoned form", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderIsland();
    await user.click(screen.getByRole("button", { name: "Register Interest" }));
    const dialog = await screen.findByRole("dialog");
    await user.click(
      await within(dialog).findByRole("button", { name: "Submit request" }),
    );
    expect(
      await within(dialog).findByText("Please correct the highlighted fields."),
    ).toBeInTheDocument();
    expect(document.getElementById("intake-error-summary")).toHaveFocus();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits to the purpose-specific endpoint and reports stored success", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    renderIsland();
    await user.click(screen.getByRole("button", { name: "Register Interest" }));
    const dialog = await screen.findByRole("dialog");
    await user.type(
      await within(dialog).findByLabelText("Full name"),
      "Ama Mensah",
    );
    await user.type(
      await within(dialog).findByLabelText("Email address"),
      "ama@example.com",
    );
    await user.click(within(dialog).getByRole("checkbox"));
    await user.click(
      within(dialog).getByRole("button", { name: "Submit request" }),
    );
    expect(
      await within(dialog).findByText("Your request was safely stored."),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/intake/program-interest",
      expect.objectContaining({ method: "POST" }),
    );
    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body).toMatchObject({
      name: "Ama Mensah",
      email: "ama@example.com",
      consent: true,
      programId: "global-health-immersion-program",
    });
    expect(body).not.toHaveProperty("requestId");
  });
});
