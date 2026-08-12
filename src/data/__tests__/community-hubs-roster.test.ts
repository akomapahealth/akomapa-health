import { describe, expect, it } from "vitest";
import {
  communityHubs,
  uccHubRoster,
  ugHubRoster,
} from "@/data/community-hubs";

const expectedLeadership = [
  ["David Ofosu", "Co-Director", "Medical Student"],
  ["Hafiz Shaban", "Co-Director", "Nursing Student"],
  ["Getwell Essuman", "Volunteer Recruitment Co-Lead", "Medical Laboratory Science Student"],
  ["David Konadu Kombate", "Volunteer Recruitment Co-Lead", "Medical Laboratory Science Student"],
  ["Wilfred Obeng", "Training & Standards Coordinator", "Medical Student"],
  ["Belinda Odoom", "Training & Standards Coordinator", "Nursing Student"],
  ["Geraldine-Cristal Apeadua Agyapong", "Finance Officer", "Medical Student"],
  ["Frederick Baffour", "Finance Officer", "Optometry Student"],
  ["Gloria Tawiah Blay", "Community Engagement Liaison", "Pharmacy Student"],
  ["Prince Nyarko", "Community Engagement Liaison", "Optometry Student"],
  ["Queenstar Aduse Opoku", "Supplies & Logistics Manager", "Pharmacy Student"],
  ["Martha Bawa", "Supplies & Logistics Manager", "Nursing Student"],
] as const;

describe("UCC community hub roster", () => {
  it("contains the approved leadership roster in editorial order", () => {
    expect(
      uccHubRoster.leadership.map(({ name, role, affiliation }) => [
        name,
        role,
        affiliation,
      ]),
    ).toEqual(expectedLeadership);
    expect(uccHubRoster.leadership.filter(({ featured }) => featured)).toHaveLength(2);
  });

  it("maps every leader and volunteer to a unique ImageKit path", () => {
    const people = [...uccHubRoster.leadership, ...uccHubRoster.volunteers];

    expect(uccHubRoster.leadership).toHaveLength(12);
    expect(uccHubRoster.volunteers).toHaveLength(36);
    expect(new Set(people.map(({ id }) => id))).toHaveProperty("size", people.length);
    expect(new Set(people.map(({ image }) => image))).toHaveProperty("size", people.length);
    expect(
      people.every(({ image }) => typeof image === "string" && image.startsWith("/ucc-team/")),
    ).toBe(true);
  });

  it("requires meaningful alternative text for every volunteer portrait", () => {
    for (const volunteer of uccHubRoster.volunteers) {
      expect(volunteer.alt.trim().length).toBeGreaterThan(30);
      expect(volunteer.alt).toMatch(/UCC community hub volunteer/i);
      expect(volunteer.alt).not.toMatch(/shirt|teal|navy|clothing|wearing/i);
    }
  });

  it("attaches the roster to UCC", () => {
    const ucc = communityHubs.find(({ routeSlug }) => routeSlug === "ucc");
    expect(ucc?.roster).toBe(uccHubRoster);
  });
});

describe("UG community hub roster", () => {
  it("ships an image-ready pending roster without fabricated people", () => {
    expect(ugHubRoster.leadership).toEqual([]);
    expect(ugHubRoster.volunteers).toEqual([]);
    expect(ugHubRoster.pending?.leadership?.monogram).toBe("UG");
    expect(ugHubRoster.pending?.volunteers?.monogram).toBe("UG");
    expect(ugHubRoster.pending?.leadership?.description.length).toBeGreaterThan(40);
    expect(ugHubRoster.pending?.volunteers?.description.length).toBeGreaterThan(40);
    expect(ugHubRoster.pending?.volunteers?.cta?.href).toMatch(/^https:\/\/forms\.gle\//);
  });

  it("attaches the pending roster only to the active UG hub", () => {
    const ug = communityHubs.find(({ routeSlug }) => routeSlug === "ug");
    const nhp = communityHubs.find(({ routeSlug }) => routeSlug === "nhp");

    expect(ug?.status).toBe("active");
    expect(ug?.roster).toBe(ugHubRoster);
    expect(ug?.cta?.href).toBe(ugHubRoster.pending?.volunteers?.cta?.href);
    expect(nhp?.roster).toBeUndefined();
  });
});
