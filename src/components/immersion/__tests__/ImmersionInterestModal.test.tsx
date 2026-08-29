import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ImmersionInterestProvider from "@/components/immersion/ImmersionInterestProvider";
import ImmersionRegisterInterestButton from "@/components/immersion/ImmersionRegisterInterestButton";
import ImmersionRequestBrochureButton from "@/components/immersion/ImmersionRequestBrochureButton";

const { filloutProps, mockControl } = vi.hoisted(() => ({
  filloutProps: vi.fn(),
  mockControl: { initialize: true, throwOnRender: false },
}));

vi.mock("@fillout/react", async () => {
  const React = await import("react");
  return {
    FilloutStandardEmbed: (props: {
      filloutId: string;
      domain?: string;
      inheritParameters?: boolean;
      parameters?: Record<string, string>;
      onInit?: (submissionUuid: string) => void;
      onSubmit?: (
        submissionUuid: string,
        data?: Record<string, unknown>,
      ) => void;
    }) => {
      filloutProps(props);
      React.useEffect(() => {
        if (mockControl.initialize) props.onInit?.("ignored-submission-id");
      }, [props]);
      if (mockControl.throwOnRender) throw new Error("provider render failure");
      return (
        <button
          type="button"
          onClick={() => {
            props.onSubmit?.("ignored-submission-id", {
              email: "must-not-reach-analytics@example.com",
            });
            props.onSubmit?.("duplicate-id", { name: "Must not leak" });
          }}
        >
          Complete test form
        </button>
      );
    },
  };
});

function renderIsland() {
  return render(
    <ImmersionInterestProvider>
      <ImmersionRegisterInterestButton variant="gold" />
      <ImmersionRequestBrochureButton />
    </ImmersionInterestProvider>,
  );
}

function enableTestProvider() {
  vi.stubEnv("NEXT_PUBLIC_IMMERSION_INTAKE_ENABLED", "true");
  vi.stubEnv("NEXT_PUBLIC_IMMERSION_FILLOUT_FORM_ID", "abc123Example");
  vi.stubEnv(
    "NEXT_PUBLIC_IMMERSION_FILLOUT_FORM_URL",
    "https://forms.fillout.com/t/abc123Example",
  );
}

beforeEach(() => {
  mockControl.initialize = true;
  mockControl.throwOnRender = false;
  filloutProps.mockClear();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  localStorage.clear();
});

describe("Immersion Fillout pilot dialog", () => {
  it("fails closed, explains the fallback, and restores focus after Escape", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderIsland();

    const trigger = screen.getByRole("button", { name: "Register Interest" });
    await user.click(trigger);
    const dialog = await screen.findByRole("dialog", {
      name: "Register your interest",
    });

    expect(dialog).toHaveAccessibleDescription(
      /Share your details so the program team can follow up/,
    );
    expect(within(dialog).getByText("Before you continue")).toBeVisible();
    expect(
      within(dialog).getByText(/same non-private browser and device/i),
    ).toBeVisible();
    expect(
      within(dialog).getByRole("link", { name: "Contact Akomapa instead" }),
    ).toHaveAttribute("href", "/contact");
    expect(filloutProps).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(localStorage).toHaveLength(0);

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  });

  it("passes only approved context without inheriting page parameters", async () => {
    enableTestProvider();
    const user = userEvent.setup();
    renderIsland();

    await user.click(screen.getByRole("button", { name: "Register Interest" }));
    expect(
      await screen.findByRole("button", { name: "Complete test form" }),
    ).toBeVisible();

    const props = filloutProps.mock.calls.at(-1)?.[0];
    expect(props).toMatchObject({
      filloutId: "abc123Example",
      domain: "embed.fillout.com",
      inheritParameters: false,
      parameters: {
        formType: "immersion",
        intent: "register_interest",
        schemaVersion: "1",
        sourcePath: "/global-health-immersion-program",
        programId: "global-health-immersion-program",
      },
    });
    expect(Object.keys(props.parameters)).toEqual([
      "formType",
      "intent",
      "schemaVersion",
      "sourcePath",
      "programId",
    ]);
    expect(props.parameters).not.toHaveProperty("email");
    expect(props.parameters).not.toHaveProperty("utm_source");
    expect(
      screen.getByRole("link", { name: "Open the secure hosted form" }),
    ).toHaveAttribute(
      "href",
      "https://forms.fillout.com/t/abc123Example",
    );
  });

  it("resolves brochure requests through the same form with a distinct intent", async () => {
    enableTestProvider();
    const user = userEvent.setup();
    renderIsland();

    await user.click(screen.getByRole("button", { name: "Request Brochure" }));
    expect(
      await screen.findByRole("dialog", {
        name: "Request the program brochure",
      }),
    ).toBeVisible();
    expect(filloutProps.mock.calls.at(-1)?.[0]).toMatchObject({
      filloutId: "abc123Example",
      parameters: expect.objectContaining({ intent: "request_brochure" }),
    });
  });

  it("deduplicates completion and never sends provider payloads to analytics", async () => {
    enableTestProvider();
    const gtag = vi.fn();
    window.gtag = gtag as typeof window.gtag;
    const user = userEvent.setup();
    renderIsland();

    await user.click(screen.getByRole("button", { name: "Register Interest" }));
    await user.click(
      await screen.findByRole("button", { name: "Complete test form" }),
    );

    expect(
      await screen.findByText("Thank you. Your request is complete."),
    ).toBeVisible();
    const completionCalls = gtag.mock.calls.filter(
      ([, name]) => name === "intake_submission_completed",
    );
    expect(completionCalls).toHaveLength(1);
    expect(completionCalls[0]).toEqual([
      "event",
      "intake_submission_completed",
      { form_key: "immersion", intent: "register_interest" },
    ]);
    expect(JSON.stringify(gtag.mock.calls)).not.toContain(
      "must-not-reach-analytics@example.com",
    );
    expect(JSON.stringify(gtag.mock.calls)).not.toContain(
      "ignored-submission-id",
    );
    expect(localStorage).toHaveLength(0);
  });

  it("fails safely when the enable flag lacks matching public configuration", async () => {
    vi.stubEnv("NEXT_PUBLIC_IMMERSION_INTAKE_ENABLED", "true");
    const user = userEvent.setup();
    renderIsland();

    await user.click(screen.getByRole("button", { name: "Register Interest" }));
    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByText(
        "The embedded Immersion form is temporarily unavailable.",
      ),
    ).toBeVisible();
    expect(filloutProps).not.toHaveBeenCalled();
  });

  it("normalizes provider render failures without displaying raw errors", async () => {
    enableTestProvider();
    mockControl.throwOnRender = true;
    const user = userEvent.setup();
    renderIsland();

    await user.click(screen.getByRole("button", { name: "Register Interest" }));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("secure form could not be displayed");
    expect(alert).not.toHaveTextContent("provider render failure");
  });
});
