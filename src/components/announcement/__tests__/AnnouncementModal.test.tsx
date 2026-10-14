import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "framer-motion";
import AnnouncementModal from "@/components/announcement/AnnouncementModal";
import { CONFETTI_BURST_MS } from "@/components/announcement/AnnouncementConfetti";
import type { AnnouncementCampaign } from "@/lib/types";

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();

  return {
    ...actual,
    useReducedMotion: vi.fn(),
  };
});

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

const twoCtaCampaign: AnnouncementCampaign = {
  version: "test-immersion-v1",
  slides: [
    {
      id: "global-health-immersion-applications",
      publishedAt: "2026-09-03T00:00:00.000Z",
      tag: "Applications Open",
      tagColor: "amber",
      title: "Global Health Immersion Program applications are open",
      description:
        "Apply for Akomapa's two-week Global Health Immersion Program in Ghana, or RSVP for the upcoming information session.",
      image: "/elimina-castle.webp",
      ctaText: "Apply Now",
      ctaLink: "https://example.com/apply",
      isExternal: true,
      secondaryCtaText: "RSVP for the Info Session",
      secondaryCtaLink: "https://example.com/rsvp",
      secondaryCtaIsExternal: true,
    },
    {
      id: "single-cta-slide",
      publishedAt: "2026-08-12T00:00:00.000Z",
      tag: "Now Open",
      tagColor: "amber",
      title: "A second announcement",
      description: "A follow-up update with a single CTA.",
      image: "/highlights/ug.jpg",
      ctaText: "Learn More",
      ctaLink: "/programs/akomapa-ghltp",
      isExternal: false,
    },
  ],
};

function renderModal(
  campaign: AnnouncementCampaign = twoCtaCampaign,
  props: Partial<{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onDismiss: () => void;
  }> = {},
) {
  const onOpenChange = props.onOpenChange ?? vi.fn();
  const onDismiss = props.onDismiss ?? vi.fn();

  return {
    onOpenChange,
    onDismiss,
    ...render(
      <AnnouncementModal
        campaign={campaign}
        isOpen={props.isOpen ?? true}
        onOpenChange={onOpenChange}
        onDismiss={onDismiss}
      />,
    ),
  };
}

describe("AnnouncementModal", () => {
  beforeEach(() => {
    localStorage.clear();
    mockedUseReducedMotion.mockReturnValue(false);
  });

  it("keeps Apply, RSVP, View All Updates, and Dismiss in the dialog", () => {
    renderModal();

    const dialog = screen.getByRole("dialog", { name: "Announcements" });

    expect(
      within(dialog).getByRole("link", { name: "Apply Now" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("link", { name: "RSVP for the Info Session" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("link", { name: /View All Updates/i }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("button", { name: "Dismiss" }),
    ).toBeInTheDocument();
  });

  it("places View All Updates beside Dismiss in a dedicated footer row", () => {
    renderModal();

    const secondary = screen.getByTestId("announcement-modal-secondary-actions");

    expect(
      within(secondary).getByRole("link", { name: /View All Updates/i }),
    ).toBeInTheDocument();
    expect(
      within(secondary).getByRole("button", { name: "Dismiss" }),
    ).toBeInTheDocument();
    expect(
      within(secondary).queryByRole("link", { name: "Apply Now" }),
    ).not.toBeInTheDocument();
    expect(
      within(secondary).queryByRole("link", {
        name: "RSVP for the Info Session",
      }),
    ).not.toBeInTheDocument();
    expect(secondary.className).toMatch(/justify-between/);
  });

  it("keeps Apply and RSVP on the same action row", () => {
    renderModal();

    const ctas = screen.getByTestId("announcement-modal-ctas");
    expect(ctas.className).toMatch(/\bflex\b/);
    expect(ctas.className).not.toMatch(/flex-wrap/);
    expect(within(ctas).getByRole("link", { name: "Apply Now" })).toBeInTheDocument();
    expect(
      within(ctas).getByRole("link", { name: "RSVP for the Info Session" }),
    ).toBeInTheDocument();
  });

  it("scrolls the announcement body inside the dialog", () => {
    renderModal();

    const scroller = screen.getByTestId("announcement-modal-scroll");
    expect(scroller.className).toMatch(/overflow-y-auto/);
    expect(scroller.className).toMatch(/min-h-0/);
    expect(
      screen.getByRole("dialog", { name: "Announcements" }).className,
    ).toMatch(/max-h-\[90dvh\]/);
  });

  it("keeps prev/next controls with the media, not over the footer", () => {
    renderModal();

    const scroller = screen.getByTestId("announcement-modal-scroll");
    expect(
      within(scroller).getByRole("button", { name: "Previous announcement" }),
    ).toBeInTheDocument();
    expect(
      within(scroller).getByRole("button", { name: "Next announcement" }),
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("announcement-modal-secondary-actions")).queryByRole(
        "button",
        { name: "Previous announcement" },
      ),
    ).not.toBeInTheDocument();
  });

  it("dismisses from the sticky footer", () => {
    const { onDismiss, onOpenChange } = renderModal();

    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem("akomapa-announcements-dismissed")).toBe(
      "test-immersion-v1",
    );
  });
});

const celebrationCampaign: AnnouncementCampaign = {
  version: "test-launch-v1",
  slides: [
    {
      id: "milestone-launch",
      publishedAt: "2026-10-14T00:00:00.000Z",
      tag: "Now Live",
      tagColor: "skobeloff",
      title: "A milestone is live",
      description: "A celebratory milestone announcement.",
      image: "/static/nkwapa/nkwapa-launch.webp",
      ctaText: "Explore",
      ctaLink: "https://example.com/launch",
      isExternal: true,
      celebration: "confetti",
    },
    {
      id: "plain-update",
      publishedAt: "2026-10-10T00:00:00.000Z",
      tag: "Update",
      title: "A regular update",
      description: "Nothing to celebrate here.",
      image: "/highlights/ug.jpg",
      ctaText: "Read more",
      ctaLink: "https://example.com/update",
      isExternal: true,
    },
  ],
};

describe("AnnouncementModal celebration", () => {
  beforeEach(() => {
    localStorage.clear();
    mockedUseReducedMotion.mockReturnValue(false);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("bursts confetti when the modal opens directly on a marked slide", () => {
    renderModal(celebrationCampaign);

    const confetti = screen.getByTestId("announcement-confetti");
    expect(confetti).toHaveAttribute("data-variant", "burst");
    expect(confetti).toHaveAttribute("aria-hidden", "true");
    expect(confetti.className).toMatch(/pointer-events-none/);
    expect(confetti.querySelectorAll("span").length).toBeGreaterThan(20);
  });

  it("does not celebrate unmarked slides", () => {
    renderModal({
      ...celebrationCampaign,
      slides: [celebrationCampaign.slides[1]],
    });

    expect(screen.queryByTestId("announcement-confetti")).not.toBeInTheDocument();
  });

  it("does not render while the modal is closed", () => {
    renderModal(celebrationCampaign, { isOpen: false });

    expect(screen.queryByTestId("announcement-confetti")).not.toBeInTheDocument();
  });

  it("fires one new burst per selection transition, not per re-render", async () => {
    const { rerender, onOpenChange, onDismiss } = renderModal(celebrationCampaign);
    const firstBurst = screen
      .getByTestId("announcement-confetti")
      .getAttribute("data-burst");

    rerender(
      <AnnouncementModal
        campaign={celebrationCampaign}
        isOpen
        onOpenChange={onOpenChange}
        onDismiss={onDismiss}
      />,
    );
    expect(
      screen.getByTestId("announcement-confetti").getAttribute("data-burst"),
    ).toBe(firstBurst);

    fireEvent.click(screen.getByRole("button", { name: "Next announcement" }));
    await screen.findByRole("heading", { name: "A regular update" });
    await waitFor(() =>
      expect(screen.queryByTestId("announcement-confetti")).not.toBeInTheDocument(),
    );

    fireEvent.click(screen.getByRole("button", { name: "Next announcement" }));
    await screen.findByRole("heading", { name: "A milestone is live" });
    const secondBurst = await screen.findByTestId("announcement-confetti");
    expect(secondBurst.getAttribute("data-burst")).not.toBe(firstBurst);
  });

  it("clears the burst after it finishes", () => {
    vi.useFakeTimers();
    renderModal(celebrationCampaign);
    expect(screen.getByTestId("announcement-confetti")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(CONFETTI_BURST_MS + 50);
    });

    expect(screen.queryByTestId("announcement-confetti")).not.toBeInTheDocument();
  });

  it("keeps controls, CTA, and dismissal usable while celebrating", () => {
    const { onDismiss, onOpenChange } = renderModal(celebrationCampaign);
    expect(screen.getByTestId("announcement-confetti")).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: /Explore/ });
    expect(cta).toHaveAttribute("href", "https://example.com/launch");
    expect(
      screen.getByRole("button", { name: "Next announcement" }),
    ).toBeEnabled();

    const dialog = screen.getByRole("dialog", { name: "Announcements" });
    const close = screen.getByRole("button", { name: "Close announcements" });
    close.focus();
    expect(close).toHaveFocus();
    expect(
      within(screen.getByTestId("announcement-confetti")).queryAllByRole("button"),
    ).toHaveLength(0);
    expect(dialog).toContainElement(close);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("renders a static treatment instead of particle motion for reduced motion", () => {
    vi.useFakeTimers();
    mockedUseReducedMotion.mockReturnValue(true);
    renderModal(celebrationCampaign);

    const confetti = screen.getByTestId("announcement-confetti");
    expect(confetti).toHaveAttribute("data-variant", "static");
    expect(confetti).toHaveAttribute("aria-hidden", "true");

    act(() => {
      vi.advanceTimersByTime(CONFETTI_BURST_MS + 50);
    });
    expect(screen.getByTestId("announcement-confetti")).toHaveAttribute(
      "data-variant",
      "static",
    );
  });
});
