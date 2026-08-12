import { describe, expect, it } from "vitest";
import { communityHubs, uccHubRoster } from "@/data/community-hubs";

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

  it("attaches the roster only to UCC", () => {
    const ucc = communityHubs.find(({ routeSlug }) => routeSlug === "ucc");
    const hubsWithoutRosters = communityHubs.filter(({ routeSlug }) => routeSlug !== "ucc");

    expect(ucc?.roster).toBe(uccHubRoster);
    expect(hubsWithoutRosters.every(({ roster }) => roster === undefined)).toBe(true);
  });
});
