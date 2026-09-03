import { describe, expect, it } from "vitest";
import {
  ANNOUNCEMENT_LIFETIME_DAYS,
  announcementCampaign,
  formatAnnouncementDate,
  getActiveAnnouncementCampaign,
  isAnnouncementActive,
} from "@/data/announcements";

describe("announcement lifecycle", () => {
  const immersionAnnouncement = announcementCampaign.slides[0];

  it("dates every announcement with a valid ISO timestamp", () => {
    for (const announcement of announcementCampaign.slides) {
      expect(Number.isFinite(Date.parse(announcement.publishedAt))).toBe(true);
    }
  });

  it(`keeps announcements active for ${ANNOUNCEMENT_LIFETIME_DAYS} days`, () => {
    expect(
      isAnnouncementActive(
        immersionAnnouncement,
        new Date("2026-09-16T23:59:59.999Z"),
      ),
    ).toBe(true);
    expect(
      isAnnouncementActive(
        immersionAnnouncement,
        new Date("2026-09-17T00:00:00.000Z"),
      ),
    ).toBe(false);
  });

  it("excludes expired and future announcements", () => {
    const active = getActiveAnnouncementCampaign(
      new Date("2026-09-03T12:00:00.000Z"),
    );

    expect(active.slides.map(({ id }) => id)).toEqual([
      "global-health-immersion-applications",
    ]);
    expect(
      isAnnouncementActive(
        immersionAnnouncement,
        new Date("2026-09-02T23:59:59.999Z"),
      ),
    ).toBe(false);
  });

  it("formats the publication date consistently", () => {
    expect(formatAnnouncementDate(immersionAnnouncement.publishedAt)).toBe(
      "September 3, 2026",
    );
  });
});
