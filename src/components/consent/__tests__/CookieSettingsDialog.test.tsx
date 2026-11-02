import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import CookieSettingsDialog from "@/components/consent/CookieSettingsDialog";
import { readConsent, writeConsent } from "@/lib/consent";

function renderDialog(onOpenChange = vi.fn()) {
  render(
    <ConsentProvider>
      <CookieSettingsDialog open onOpenChange={onOpenChange} />
    </ConsentProvider>,
  );
  return onOpenChange;
}

beforeEach(() => localStorage.clear());

describe("CookieSettingsDialog", () => {
  it("is a labelled dialog that explains necessary storage", () => {
    renderDialog();

    const dialog = screen.getByRole("dialog", { name: "Cookie settings" });
    expect(dialog).toHaveAccessibleDescription(/change it at any time/i);
    expect(screen.getByText("Always on")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read the Cookie Policy" })).toHaveAttribute(
      "href",
      "/cookie-policy",
    );
  });

  it("starts unticked for undecided visitors", () => {
    renderDialog();

    expect(
      screen.getByRole("checkbox", { name: "Allow Google Analytics cookies" }),
    ).not.toBeChecked();
  });

  it("lets visitors withdraw consent they gave earlier", async () => {
    const user = userEvent.setup();
    writeConsent({ analytics: true });
    const onOpenChange = renderDialog();

    const toggle = screen.getByRole("checkbox", {
      name: "Allow Google Analytics cookies",
    });
    expect(toggle).toBeChecked();

    await user.click(toggle);
    await user.click(screen.getByRole("button", { name: "Save my choices" }));

    expect(readConsent()?.analytics).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("saves an opt-in using only the keyboard", async () => {
    const user = userEvent.setup();
    renderDialog();

    screen.getByRole("checkbox", { name: "Allow Google Analytics cookies" }).focus();
    await user.keyboard(" ");
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Save my choices" })).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(readConsent()?.analytics).toBe(true);
  });

  it("closes on Escape without changing the saved choice", async () => {
    const user = userEvent.setup();
    writeConsent({ analytics: false });
    const onOpenChange = renderDialog();

    await user.click(
      screen.getByRole("checkbox", { name: "Allow Google Analytics cookies" }),
    );
    await user.keyboard("{Escape}");

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(readConsent()?.analytics).toBe(false);
  });
});
