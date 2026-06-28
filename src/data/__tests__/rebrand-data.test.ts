import { existsSync } from "node:fs";
import { join } from "node:path";
import * as LucideIcons from "lucide-react";
import { describe, expect, it } from "vitest";
import {
  academyCurriculum,
  academyFaculty,
  academyOverview,
  academyTestimonials,
} from "@/data/academy";
import {
  communityHubs,
  getHubHref,
  hubActivities,
  hubMissions,
  whyHubsMatter,
} from "@/data/community-hubs";
import {
  academyPreviewContent,
  communityHubsPreviewContent,
  goodIntentionsContent,
  silentEpidemicContent,
  studentsChangedContent,
} from "@/data/homepage-narrative";
import {
  healthImpact,
  impactCategories,
  leadershipImpact,
  mapLocations,
} from "@/data/impact";
import { partners } from "@/data/partnerships";
import { philosophySections } from "@/data/philosophy";
import { pillars } from "@/data/pillars";
import { teamMembers } from "@/data/team";
import { timeline } from "@/data/timeline";

function expectUniqueIds(items: ReadonlyArray<{ id: string | number }>) {
  expect(new Set(items.map(({ id }) => id)).size).toBe(items.length);
}

describe("rebrand content data", () => {
  it("defines four valid organizational pillars", () => {
    expect(pillars).toHaveLength(4);
    expectUniqueIds(pillars);

    for (const pillar of pillars) {
      expect(pillar.title).toBeTruthy();
      expect(pillar.description.length).toBeGreaterThan(40);
      expect(pillar.image.src).toMatch(/^\/[a-z0-9-/.]+$/i);
      expect(pillar.image.alt.length).toBeGreaterThan(20);
      expect(pillar.features).toHaveLength(4);
      expect(pillar.link).toMatch(/^\/[a-z0-9-/]+$/);
      expect(pillar.ctaLabel.length).toBeGreaterThan(10);
      expect(pillar.color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it("provides a complete Academy curriculum with valid faculty references", () => {
    expect(academyOverview.title).toBe(
      "Training Ethical Leaders for a Changing World",
    );
    expect(academyCurriculum.modules).toHaveLength(8);
    expectUniqueIds(academyCurriculum.modules);
    expectUniqueIds(academyFaculty);
    expectUniqueIds(academyTestimonials);

    const moduleOrders = academyCurriculum.modules.map(({ order }) => order);
    expect(moduleOrders).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

    const facultyIds = new Set(academyFaculty.map(({ id }) => id));
    const advisors = teamMembers.filter(
      ({ roleCategory }) => roleCategory === "advisor",
    );

    for (const curriculumModule of academyCurriculum.modules) {
      expect(curriculumModule.learningObjectives.length).toBeGreaterThanOrEqual(
        3,
      );
      expect(curriculumModule.facultyContributors.length).toBeGreaterThan(0);

      for (const contributorId of curriculumModule.facultyContributors) {
        expect(facultyIds.has(contributorId)).toBe(true);
      }
    }

    for (const facultyMember of academyFaculty) {
      expect(
        advisors.some(({ name }) => name === facultyMember.name),
      ).toBe(true);
      expect(facultyMember.specialties.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps hub missions, statuses, metrics, and map locations consistent", () => {
    expect(communityHubs).toHaveLength(3);
    expect(hubActivities).toHaveLength(8);
    expect(whyHubsMatter).toHaveLength(5);
    expect(hubMissions.map(({ title }) => title)).toEqual([
      "Improve Community Health",
      "Develop Future Leaders",
      "Build Community Partnerships",
      "Generate Evidence",
      "Pilot Innovation",
    ]);
    expectUniqueIds(communityHubs);
    expectUniqueIds(hubMissions);
    expectUniqueIds(mapLocations);

    const mapById = new Map(mapLocations.map((location) => [location.id, location]));

    for (const hub of communityHubs) {
      expect(hub.missions).toHaveLength(5);
      expect(hub.routeSlug).toMatch(/^(ucc|ug|nhp)$/);
      expect(getHubHref(hub)).toBe(`/community-hubs/${hub.routeSlug}`);
      expect(Object.values(hub.metrics).every((value) => value >= 0)).toBe(true);
      expect(Array.isArray(hub.communityStories)).toBe(true);
      expect(Array.isArray(hub.studentStories)).toBe(true);
      expect(Array.isArray(hub.research)).toBe(true);
      expect(Array.isArray(hub.innovations)).toBe(true);
      expect(hub.facultyMentorship?.model).toBeTruthy();
      expect(hub.facultyMentorship?.mentors.length).toBeGreaterThan(0);

      const mapLocation = mapById.get(hub.id);
      expect(mapLocation).toBeDefined();
      expect(mapLocation?.type).toBe(
        hub.status === "in-development" ? "planned-hub" : "active-hub",
      );
    }

    for (const location of mapLocations) {
      expect(location.coordinates.lat).toBeGreaterThanOrEqual(-90);
      expect(location.coordinates.lat).toBeLessThanOrEqual(90);
      expect(location.coordinates.lng).toBeGreaterThanOrEqual(-180);
      expect(location.coordinates.lng).toBeLessThanOrEqual(180);
    }
  });

  it("defines complete homepage narrative content and verified sources", () => {
    expect(goodIntentionsContent.cta.href).toBe("/philosophy");
    expect(studentsChangedContent.heading).toBe(
      "Students Have Always Changed Healthcare",
    );
    expect(studentsChangedContent.cta.href).toBe("/philosophy");
    expect(studentsChangedContent.image.src).toMatch(/^\/[a-z0-9-/.]+$/i);
    expect(studentsChangedContent.image.alt.length).toBeGreaterThan(20);
    expect(academyPreviewContent.heading).toBe(academyOverview.title);
    expect(academyPreviewContent.body).toBe(academyOverview.description);

    expect(silentEpidemicContent.metrics).toHaveLength(3);
    expectUniqueIds(silentEpidemicContent.metrics);
    expect(silentEpidemicContent.metrics.map(({ value }) => value)).toEqual([
      43, 73, 18,
    ]);
    expect(new URL(silentEpidemicContent.source.href).protocol).toBe("https:");

    expect(communityHubsPreviewContent.hubs).toHaveLength(3);
    expect(communityHubsPreviewContent.hubs.map(({ href }) => href)).toEqual([
      "/community-hubs/ucc",
      "/community-hubs/ug",
      "/community-hubs/nhp",
    ]);

    for (const hub of communityHubsPreviewContent.hubs) {
      expect(communityHubs.some(({ id }) => id === hub.id)).toBe(true);
      expect(hub.href).toMatch(/^\/community-hubs\/(ucc|ug|nhp)$/);
    }
  });

  it("references existing partner logos and represents every category", () => {
    expectUniqueIds(partners);
    expect(new Set(partners.map(({ category }) => category))).toEqual(
      new Set(["university", "community", "government", "global"]),
    );

    for (const partner of partners) {
      const logoPath = join(
        process.cwd(),
        "public",
        partner.logo.replace(/^\//, ""),
      );

      expect(existsSync(logoPath), `${partner.name} logo should exist`).toBe(true);
      expect(partner.description.length).toBeGreaterThan(40);

      if (partner.website) {
        expect(new URL(partner.website).protocol).toBe("https:");
      }
    }
  });

  it("orders substantive philosophy sections and timeline events", () => {
    expect(philosophySections).toHaveLength(9);
    expectUniqueIds(philosophySections);
    expect(philosophySections.map(({ order }) => order)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);

    for (const section of philosophySections) {
      const paragraphs = section.content.split("\n\n");
      expect(paragraphs.length).toBeGreaterThanOrEqual(2);
      expect(paragraphs.length).toBeLessThanOrEqual(3);
      expect(paragraphs.every((paragraph) => paragraph.length > 80)).toBe(true);
      expect(section.image).toMatch(/^\/[a-z0-9-/.]+$/i);
      expect(section.imageAlt?.length).toBeGreaterThan(30);
    }

    const silentEpidemic = philosophySections.find(
      ({ id }) => id === "silent-epidemic",
    );
    expect(silentEpidemic?.content).toContain("43 million");
    expect(silentEpidemic?.content).toContain("73%");
    expect(silentEpidemic?.content).toContain("18 million");
    expect(silentEpidemic?.content).toContain("82%");

    expect(timeline).toHaveLength(6);
    expectUniqueIds(timeline);
    expect(timeline.map(({ year }) => Number(year))).toEqual([
      2024, 2024, 2025, 2025, 2025, 2028,
    ]);

    for (const event of timeline) {
      expect(event.icon).toBeTruthy();
      expect(event.icon && event.icon in LucideIcons).toBe(true);
    }
  });

  it("splits impact into health and leadership categories", () => {
    expect(impactCategories).toEqual([healthImpact, leadershipImpact]);
    expect(impactCategories.map(({ id }) => id)).toEqual([
      "health-impact",
      "leadership-impact",
    ]);

    for (const category of impactCategories) {
      expect(category.metrics).toHaveLength(4);
      expectUniqueIds(category.metrics);

      for (const metric of category.metrics) {
        expect(metric.currentValue).toBeTruthy();
        expect(metric.futureValue).toBeTruthy();
        expect(metric.futureYear).toBe(2028);
        expect(metric.icon && metric.icon in LucideIcons).toBe(true);
      }
    }
  });
});
