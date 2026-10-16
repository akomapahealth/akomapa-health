import { describe, expect, it } from "vitest";
import { NKWAPA_URL } from "@/config/links";
import {
  ANNOUNCEMENT_LIFETIME_DAYS,
  announcementCampaign,
  formatAnnouncementDate,
  getActiveAnnouncementCampaign,
  isAnnouncementActive,
} from "@/data/announcements";

describe("announcement lifecycle", () => {
  const immersionAnnouncement = announcementCampaign.slides.find(
    ({ id }) => id === "global-health-immersion-applications",
  )!;

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

describe("Nkwapa launch announcement", () => {
  const nkwapa = announcementCampaign.slides.find(
    ({ id }) => id === "nkwapa-emr-launch",
  )!;

  it("announces the full launch and links to production", () => {
    expect(NKWAPA_URL).toBe("https://nkwapa.app");
    expect(nkwapa.tag).toBe("Now Live");
    expect(nkwapa.title).toMatch(/Nkwapa is live!/);
    expect(nkwapa.description).toMatch(/offline-first/i);
    expect(nkwapa.description).not.toMatch(/public beta/i);
    expect(nkwapa.ctaText).toBe("Explore Nkwapa");
    expect(nkwapa.ctaLink).toBe("https://nkwapa.app");
    expect(nkwapa.isExternal).toBe(true);
    expect(nkwapa.image).toBe("/static/nkwapa/nkwapa-launch.webp");
  });

  it("opts into the confetti celebration explicitly", () => {
    expect(nkwapa.celebration).toBe("confetti");
  });

  it("leads the campaign alongside the donate slide at the start of its rollout", () => {
    expect(announcementCampaign.slides[0].id).toBe("nkwapa-emr-launch");
    expect(announcementCampaign.version).toBe("2026-10-plos-publication-v1");

    expect(
      getActiveAnnouncementCampaign(
        new Date("2026-10-14T00:00:00.000Z"),
      ).slides.map(({ id }) => id),
    ).toEqual(["nkwapa-emr-launch", "support-akomapa-care"]);
    expect(
      isAnnouncementActive(nkwapa, new Date("2026-10-28T00:00:00.000Z")),
    ).toBe(false);
  });

  it("never points an announcement CTA at the Nkwapa staging environment", () => {
    for (const slide of announcementCampaign.slides) {
      expect(slide.ctaLink ?? "").not.toContain("staging.nkwapa.app");
      expect(slide.secondaryCtaLink ?? "").not.toContain("staging.nkwapa.app");
    }
  });
});

describe("PLOS Global Public Health publication announcement", () => {
  const publication = announcementCampaign.slides.find(
    ({ id }) => id === "plos-global-public-health-publication",
  )!;
  const articleUrl =
    "https://journals.plos.org/globalpublichealth/article?id=10.1371/journal.pgph.0005092";

  it("announces the published paper and links to the article page", () => {
    expect(announcementCampaign.slides[1].id).toBe(
      "plos-global-public-health-publication",
    );
    expect(publication.tag).toBe("Publication");
    expect(publication.title).toBe(
      "Akomapa research published in PLOS Global Public Health",
    );
    expect(publication.titleHighlights).toEqual(["PLOS Global Public Health"]);
    expect(publication.description).toBe(
      "A proud milestone for Akomapa and student-led health research in Ghana: our study, “Exploring stakeholder support for student-run free clinics to address gaps in non-communicable disease care in Ghana,” is now published in PLOS Global Public Health. The paper explores stakeholder support for student-run free clinics as one response to gaps in non-communicable disease care. Read the open-access research and share the work.",
    );
    expect(publication.description).not.toMatch(
      /odds ratio|prove[sd]?|effective|86\.7/i,
    );
    expect(publication.ctaText).toBe("Read the open-access paper");
    expect(publication.ctaLink).toBe(articleUrl);
    expect(publication.isExternal).toBe(true);
    expect(publication.image).toBeUndefined();
    expect(publication.celebration).toBe("confetti");
  });

  it("stays visible for the 14-day rollout window after Nkwapa", () => {
    expect(
      isAnnouncementActive(publication, new Date("2026-10-15T23:59:59.999Z")),
    ).toBe(false);

    for (const now of ["2026-10-17T00:00:00.000Z", "2026-10-27T23:59:59.999Z"]) {
      expect(
        getActiveAnnouncementCampaign(new Date(now)).slides.map(({ id }) => id),
      ).toEqual([
        "nkwapa-emr-launch",
        "plos-global-public-health-publication",
        "support-akomapa-care",
      ]);
    }

    expect(
      isAnnouncementActive(publication, new Date("2026-10-29T23:59:59.999Z")),
    ).toBe(true);
    expect(
      isAnnouncementActive(publication, new Date("2026-10-30T00:00:00.000Z")),
    ).toBe(false);
  });
});

describe("donate announcement", () => {
  const donate = announcementCampaign.slides.find(
    ({ id }) => id === "support-akomapa-care",
  )!;

  it("invites visitors to the donate page without confetti", () => {
    expect(donate.ctaText).toBe("Support our work");
    expect(donate.ctaLink).toBe("/donate");
    expect(donate.isExternal).toBe(false);
    expect(donate.celebration).toBeUndefined();
    expect(donate.image).toBeTruthy();
  });
});
