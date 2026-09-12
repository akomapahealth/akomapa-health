import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AnnouncementModal from "@/components/announcement/AnnouncementModal";
import type { AnnouncementCampaign } from "@/lib/types";

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

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
