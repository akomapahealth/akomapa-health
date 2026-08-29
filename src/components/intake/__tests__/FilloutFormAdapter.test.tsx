import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import FilloutFormAdapter from "@/components/intake/FilloutFormAdapter";
import type { FilloutContext } from "@/lib/intake/immersion-registry";

const context: FilloutContext = {
  formType: "immersion",
  intent: "register_interest",
  schemaVersion: "1",
  sourcePath: "/global-health-immersion-program",
  programId: "global-health-immersion-program",
};

afterEach(() => {
  vi.useRealTimers();
  Object.defineProperty(window.navigator, "onLine", {
    configurable: true,
    value: true,
  });
});

function getEmbedIdentity() {
  const iframe = screen.getByTitle(
    "Global Health Immersion Program form",
  ) as HTMLIFrameElement;
  const url = new URL(iframe.src);
  return {
    iframe,
    url,
    embedId: url.searchParams.get("fillout-embed-id"),
  };
}

describe("FilloutFormAdapter", () => {
  it("uses the exact provider origin, approved parameters, and no permissions", async () => {
    const onStateChange = vi.fn();
    render(
      <FilloutFormAdapter
        filloutId="abc123Example"
        context={context}
        onStateChange={onStateChange}
        onComplete={vi.fn()}
      />,
    );

    await waitFor(() =>
      expect(
        screen.getByTitle("Global Health Immersion Program form"),
      ).toBeInTheDocument(),
    );
    const { iframe, url, embedId } = getEmbedIdentity();
    expect(url.origin).toBe("https://embed.fillout.com");
    expect(url.pathname).toBe("/t/abc123Example");
    expect(Object.fromEntries(url.searchParams)).toEqual({
      ...context,
      "fillout-embed-id": embedId,
    });
    expect(iframe).not.toHaveAttribute("allow");
  });

  it("accepts only the expected origin and embed identifier", async () => {
    const onStateChange = vi.fn();
    render(
      <FilloutFormAdapter
        filloutId="abc123Example"
        context={context}
        onStateChange={onStateChange}
        onComplete={vi.fn()}
      />,
    );
    await waitFor(() => expect(getEmbedIdentity().embedId).toBeTruthy());
    const { embedId } = getEmbedIdentity();

    act(() => {
      window.dispatchEvent(
        new MessageEvent("message", {
          origin: "https://attacker.example",
          data: { type: "form_init", embedId },
        }),
      );
      window.dispatchEvent(
        new MessageEvent("message", {
          origin: "https://embed.fillout.com",
          data: { type: "form_init", embedId: "wrong-id" },
        }),
      );
    });
    expect(onStateChange).not.toHaveBeenCalledWith("ready");

    act(() => {
      window.dispatchEvent(
        new MessageEvent("message", {
          origin: "https://embed.fillout.com",
          data: {
            type: "form_init",
            embedId,
            submissionUuid: "ignored",
          },
        }),
      );
    });
    expect(onStateChange).toHaveBeenCalledWith("ready");
  });

  it("deduplicates provider completion callbacks", async () => {
    const onComplete = vi.fn();
    render(
      <FilloutFormAdapter
        filloutId="abc123Example"
        context={context}
        onStateChange={vi.fn()}
        onComplete={onComplete}
      />,
    );
    await waitFor(() => expect(getEmbedIdentity().embedId).toBeTruthy());
    const { embedId } = getEmbedIdentity();
    const completion = new MessageEvent("message", {
      origin: "https://embed.fillout.com",
      data: {
        type: "form_submit",
        embedId,
        submissionUuid: "ignored",
        email: "must-not-be-forwarded@example.com",
      },
    });

    act(() => {
      window.dispatchEvent(completion);
      window.dispatchEvent(completion);
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith();
  });

  it("reports offline and recoverable timeout states", async () => {
    Object.defineProperty(window.navigator, "onLine", {
      configurable: true,
      value: false,
    });
    const onStateChange = vi.fn();
    const { unmount } = render(
      <FilloutFormAdapter
        filloutId="abc123Example"
        context={context}
        onStateChange={onStateChange}
        onComplete={vi.fn()}
        loadTimeoutMs={25}
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("appear to be offline");

    Object.defineProperty(window.navigator, "onLine", {
      configurable: true,
      value: true,
    });
    act(() => window.dispatchEvent(new Event("online")));
    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading the secure Immersion form",
    );
    unmount();

    vi.useFakeTimers();
    render(
      <FilloutFormAdapter
        filloutId="abc123Example"
        context={context}
        onStateChange={onStateChange}
        onComplete={vi.fn()}
        loadTimeoutMs={25}
      />,
    );
    act(() => vi.advanceTimersByTime(26));
    expect(screen.getByRole("alert")).toHaveTextContent("form did not load");
    expect(onStateChange).toHaveBeenCalledWith("load_timeout");
  });
});
