import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  ConsentProvider,
  useCookieConsent,
} from "@/components/consent/ConsentProvider";
import { cookieInventory, thirdPartyServices } from "@/config/cookies";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";
import Content, { LAST_UPDATED } from "../Content";

const sectionIds = [
  "summary",
  "what-are-cookies",
  "consent",
  "necessary",
  "analytics",
  "third-parties",
  "manage",
  "changes",
  "contact",
] as const;

function SettingsState() {
  const { isSettingsOpen } = useCookieConsent();
  return <p data-testid="settings-state">{isSettingsOpen ? "open" : "closed"}</p>;
}

function renderPolicy() {
  return render(
    <ConsentProvider>
      <Content />
      <SettingsState />
    </ConsentProvider>,
  );
}

describe("Cookie Policy content", () => {
  it("uses the shared legal shell with one h1 and every section anchor", () => {
    const { container } = renderPolicy();

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const hero = screen
      .getByRole("heading", { level: 1, name: "Cookie Policy" })
      .closest("[data-editorial-band]");
    expect(hero).toHaveAttribute("data-editorial-tone", "teal");
    expect(container.querySelector("[data-legal-prose-article]")).toBeTruthy();

    for (const id of sectionIds) {
      expect(document.getElementById(id)).toBeTruthy();
    }
    expect(
      screen.getAllByText(`Last updated: ${LAST_UPDATED}`).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("lists every inventoried cookie and storage key", () => {
    renderPolicy();

    const necessary = screen.getByRole("table", {
      name: "Necessary cookies and browser storage",
    });
    const analytics = screen.getByRole("table", { name: "Optional analytics cookies" });

    for (const item of cookieInventory) {
      const table = item.category === "analytics" ? analytics : necessary;
      expect(
        within(table).getByText(item.name, { selector: "code" }),
      ).toBeInTheDocument();
    }
    expect(within(necessary).getByText(CONSENT_STORAGE_KEY)).toBeInTheDocument();
    expect(
      screen.getAllByRole("rowheader").length,
    ).toBe(cookieInventory.length);
  });

  it("links to each third-party provider's privacy information", () => {
    renderPolicy();

    for (const service of thirdPartyServices) {
      const providerLink = screen.getByRole("link", {
        name: `${service.name} privacy information`,
      });
      expect(providerLink).toHaveAttribute("href", service.privacyUrl);
      expect(providerLink).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("lets visitors reopen cookie settings from the policy", async () => {
    const user = userEvent.setup();
    renderPolicy();

    await user.click(screen.getByRole("button", { name: "Open cookie settings" }));

    expect(screen.getByTestId("settings-state")).toHaveTextContent("open");
  });
});
