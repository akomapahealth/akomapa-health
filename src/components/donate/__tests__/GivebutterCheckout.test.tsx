import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import GivebutterCheckout, {
  resetGivebutterWidgetLibraryForRetry,
} from "@/components/donate/GivebutterCheckout";
import { GIVEBUTTER_ENABLE_ENV } from "@/config/donation-provider";

const scriptSelector = "#givebutter-widgets-library";

beforeAll(() => {
  if (!customElements.get("givebutter-giving-form")) {
    customElements.define(
      "givebutter-giving-form",
      class extends HTMLElement {},
    );
  }
});

afterEach(() => {
  resetGivebutterWidgetLibraryForRetry();
  vi.unstubAllEnvs();
  window.history.replaceState({}, "", "/donate");
});

function enableGivebutter() {
  vi.stubEnv(GIVEBUTTER_ENABLE_ENV, "true");
}

function loadInjectedScript() {
  const script = document.querySelector<HTMLScriptElement>(scriptSelector);
  expect(script).not.toBeNull();
  script?.dispatchEvent(new Event("load"));
  return script;
}

describe("GivebutterCheckout", () => {
  it("fails closed without the explicit rollout flag", () => {
    render(<GivebutterCheckout entryPointId="partner" />);

    expect(
      screen.getByTestId("donation-provider-unavailable"),
    ).toBeInTheDocument();
    expect(document.querySelector(scriptSelector)).toBeNull();
    expect(
      screen.queryByRole("link", { name: /Givebutter campaign/i }),
    ).not.toBeInTheDocument();
  });

  it("loads the official library once and renders the shared monthly form", async () => {
    enableGivebutter();
    render(
      <>
        <GivebutterCheckout entryPointId="partner" />
        <GivebutterCheckout entryPointId="partner" />
      </>,
    );

    expect(document.querySelectorAll(scriptSelector)).toHaveLength(1);
    const script = loadInjectedScript();
    expect(script?.src).toBe(
      "https://widgets.givebutter.com/latest.umd.cjs?acct=cwQQcFP3IiomlFGf&p=other",
    );

    await waitFor(() =>
      expect(screen.getAllByTestId("givebutter-giving-form")).toHaveLength(2),
    );
    for (const form of screen.getAllByTestId("givebutter-giving-form")) {
      expect(form).toHaveAttribute("campaign", "HE1MLG");
      expect(form).toHaveAttribute("max-width", "760px");
    }
    expect(window.location.search).toBe("?frequency=monthly");
  });

  it("uses one-time defaults without overwriting an external amount prefill", async () => {
    enableGivebutter();
    window.history.replaceState(
      {},
      "",
      "/donate?amount=100&frequency=monthly",
    );
    render(<GivebutterCheckout entryPointId="oneTime" />);
    loadInjectedScript();

    await screen.findByTestId("givebutter-giving-form");
    expect(window.location.search).toBe("?amount=100");
  });

  it("announces a load error and retries with a fresh script", async () => {
    enableGivebutter();
    render(<GivebutterCheckout entryPointId="partner" />);

    const firstScript = document.querySelector<HTMLScriptElement>(scriptSelector);
    firstScript?.dispatchEvent(new Event("error"));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      /could not be loaded/i,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Retry secure form" }),
    );
    await waitFor(() => {
      const replacement = document.querySelector(scriptSelector);
      expect(replacement).not.toBe(firstScript);
    });
    loadInjectedScript();
    expect(await screen.findByTestId("givebutter-giving-form")).toBeVisible();
  });

  it("provides a safe direct-campaign fallback without claiming success", async () => {
    enableGivebutter();
    render(<GivebutterCheckout entryPointId="oneTime" />);
    loadInjectedScript();
    await screen.findByTestId("givebutter-giving-form");

    const fallback = screen.getByRole("link", {
      name: /Open the secure Givebutter campaign/i,
    });
    expect(fallback).toHaveAttribute(
      "href",
      "https://givebutter.com/akomapa-health-foundation-donations-he1mlg",
    );
    expect(fallback).toHaveAttribute("target", "_blank");
    expect(fallback).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByText(/payment complete/i)).not.toBeInTheDocument();
  });
});
