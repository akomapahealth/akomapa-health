import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import ConsentedAnalytics from "@/components/consent/ConsentedAnalytics";
import { writeConsent } from "@/lib/consent";

vi.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => (
    <span data-testid="google-analytics">{gaId}</span>
  ),
}));

const GA_ID = "G-TEST123";
const flags = window as unknown as Record<string, unknown>;

function renderAnalytics() {
  render(
    <ConsentProvider>
      <ConsentedAnalytics gaId={GA_ID} />
    </ConsentProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
  delete (window as unknown as { gtag?: unknown }).gtag;
  delete window.dataLayer;
  delete flags[`ga-disable-${GA_ID}`];
});

describe("ConsentedAnalytics", () => {
  it("does not load Google Analytics before a choice", () => {
    renderAnalytics();

    expect(screen.queryByTestId("google-analytics")).not.toBeInTheDocument();
    expect(window.dataLayer).toBeUndefined();
  });

  it("does not load Google Analytics after rejection", () => {
    writeConsent({ analytics: false });
    renderAnalytics();

    expect(screen.queryByTestId("google-analytics")).not.toBeInTheDocument();
  });

  it("loads after acceptance with the consent default queued first", () => {
    renderAnalytics();
    act(() => {
      writeConsent({ analytics: true });
    });

    expect(screen.getByTestId("google-analytics")).toHaveTextContent(GA_ID);
    expect(Array.from(window.dataLayer?.[0] as ArrayLike<unknown>)).toEqual([
      "consent",
      "default",
      expect.objectContaining({ analytics_storage: "granted", ad_storage: "denied" }),
    ]);
  });

  it("switches GA off and clears its cookies on withdrawal", () => {
    writeConsent({ analytics: true });
    renderAnalytics();
    document.cookie = "_ga=GA1.1.1; path=/";
    document.cookie = "_ga_TEST123=GS1.1.1; path=/";

    act(() => {
      writeConsent({ analytics: false });
    });

    expect(flags[`ga-disable-${GA_ID}`]).toBe(true);
    expect(document.cookie).not.toMatch(/_ga/);
  });
});
