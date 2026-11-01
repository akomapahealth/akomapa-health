import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";
import {
  ConsentProvider,
  useCookieConsent,
} from "@/components/consent/ConsentProvider";
import CookieBanner from "@/components/consent/CookieBanner";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import {
  CONSENT_POLICY_VERSION,
  CONSENT_STORAGE_KEY,
  readConsent,
  writeConsent,
} from "@/lib/consent";

function SettingsState() {
  const { isSettingsOpen } = useCookieConsent();
  return <p data-testid="settings-state">{isSettingsOpen ? "open" : "closed"}</p>;
}

function renderBanner() {
  return render(
    <ConsentProvider>
      <CookieBanner />
      <SettingsState />
      <CookieSettingsButton />
    </ConsentProvider>,
  );
}

const banner = () =>
  screen.queryByRole("region", { name: "Can we use optional analytics cookies?" });

beforeEach(() => localStorage.clear());

describe("CookieBanner", () => {
  it("is absent from server HTML so it never flashes or mismatches", () => {
    const html = renderToString(
      <ConsentProvider>
        <CookieBanner />
      </ConsentProvider>,
    );

    expect(html).not.toContain("data-cookie-banner");
  });

  it("asks first-time visitors with equally weighted accept and reject", () => {
    renderBanner();

    expect(banner()).toBeInTheDocument();
    const accept = screen.getByRole("button", { name: "Accept optional cookies" });
    const reject = screen.getByRole("button", { name: "Reject optional cookies" });
    expect(accept.className).toBe(reject.className);
    expect(screen.getByRole("link", { name: "Cookie Policy" })).toHaveAttribute(
      "href",
      "/cookie-policy",
    );
  });

  it("records acceptance in one click and confirms it with focus", async () => {
    const user = userEvent.setup();
    renderBanner();

    await user.click(screen.getByRole("button", { name: "Accept optional cookies" }));

    expect(readConsent()).toMatchObject({
      analytics: true,
      version: CONSENT_POLICY_VERSION,
    });
    const confirmation = screen.getByRole("heading", {
      name: "You've accepted optional cookies.",
    });
    expect(confirmation.parentElement?.parentElement).toHaveFocus();
    expect(
      screen.queryByRole("button", { name: "Accept optional cookies" }),
    ).not.toBeInTheDocument();
  });

  it("records rejection in one click and can hide the confirmation", async () => {
    const user = userEvent.setup();
    renderBanner();

    await user.click(screen.getByRole("button", { name: "Reject optional cookies" }));

    expect(readConsent()?.analytics).toBe(false);
    expect(
      screen.getByRole("heading", { name: "You've rejected optional cookies." }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Hide this message" }));
    expect(document.querySelector("[data-cookie-banner]")).toBeNull();
  });

  it("does not prompt again once a current choice is stored", () => {
    writeConsent({ analytics: false });
    renderBanner();

    expect(document.querySelector("[data-cookie-banner]")).toBeNull();
  });

  it("prompts again when the policy version changes", () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ version: "2025-01-01", analytics: true, decidedAt: Date.now() }),
    );
    renderBanner();

    expect(banner()).toBeInTheDocument();
  });

  it("opens settings from the banner and from any settings button", async () => {
    const user = userEvent.setup();
    writeConsent({ analytics: true });
    renderBanner();

    await user.click(screen.getByRole("button", { name: "Cookie settings" }));
    expect(screen.getByTestId("settings-state")).toHaveTextContent("open");
  });

  it("quietly retires the prompt when another tab records a choice", () => {
    renderBanner();
    expect(banner()).toBeInTheDocument();

    act(() => {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          version: CONSENT_POLICY_VERSION,
          analytics: false,
          decidedAt: Date.now(),
        }),
      );
      window.dispatchEvent(new StorageEvent("storage", { key: CONSENT_STORAGE_KEY }));
    });

    expect(document.querySelector("[data-cookie-banner]")).toBeNull();
  });
});
