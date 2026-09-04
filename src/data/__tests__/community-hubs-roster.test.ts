import { describe, expect, it } from "vitest";
import {
  communityHubs,
  uccHubRoster,
  ugHubRoster,
} from "@/data/community-hubs";
import { UG_TRAINING_FORM_URL } from "@/config/links";
import { getPersonById, resolveHubLeadership } from "@/data/team";

const expectedLeadership = [
  ["David Ofosu", "Co-Director", "Medical Student, University of Cape Coast"],
  ["Hafiz Shaban", "Co-Director", "Nursing Student, University of Cape Coast"],
  ["Getwell Essuman", "Volunteer Recruitment Co-Lead", "Medical Laboratory Science Student, University of Cape Coast"],
  ["David Konadu Kombate", "Volunteer Recruitment Co-Lead", "Medical Laboratory Science Student, University of Cape Coast"],
  ["Wilfred Obeng", "Training & Standards Coordinator", "Medical Student, University of Cape Coast"],
  ["Belinda Odoom", "Training & Standards Coordinator", "Nursing Student, University of Cape Coast"],
  ["Geraldine-Cristal Apeadua Agyapong", "Finance Officer", "Medical Student, University of Cape Coast"],
  ["Frederick Baffour", "Finance Officer", "Optometry Student, University of Cape Coast"],
  ["Gloria Tawiah Blay", "Community Engagement Liaison", "Pharmacy Student, University of Cape Coast"],
  ["Prince Nyarko", "Community Engagement Liaison", "Optometry Student, University of Cape Coast"],
  ["Queenstar Aduse Opoku", "Supplies & Logistics Manager", "Pharmacy Student, University of Cape Coast"],
  ["Martha Bawa", "Supplies & Logistics Manager", "Nursing Student, University of Cape Coast"],
] as const;

const expectedUgLeadership = [
  ["Divina Selase Afenyo", "UG Hub Co-Director", "University of Ghana"],
  ["Kelvin Akoto Boateng", "Financial Officer", "Pharmacy Student"],
  ["Nana-Ekow Moses", "Follow-up Lead", "General Nursing Student"],
  ["Rachael Akusika Adu", "Follow-up Lead", "Final Year BSc Physiotherapy Student"],
  ["Jil Owusu-Ansah", "Community Liaison Officer", "University of Ghana"],
  ["Esther Bray", "Community Liaison Officer", "University of Ghana"],
  ["Maxwell Abiam Danso", "Volunteer Recruitment Lead", "University of Ghana"],
  ["Joseph A.T. Broni", "Volunteer Recruitment Lead", "University of Ghana"],
  ["Akua Bowaa Essah", "Faculty Recruitment Lead", "University of Ghana"],
  ["Edugie Osunde", "Financial Officer", "University of Ghana"],
  ["Denzel Nketia-Achiampong", "Research Co-Lead", "University of Ghana"],
  ["Austin Afutu", "Training & Standards Coordinator", "University of Ghana"],
  ["Nneoma Orji-Okoro", "Faculty Recruitment Lead", "University of Ghana"],
  ["Georgina Garbrah", "Community Liaison Officer", "University of Ghana"],
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

  it("shares Wilfred's canonical profile while preserving his hub role", () => {
    const wilfred = uccHubRoster.leadership.find(({ name }) => name === "Wilfred Obeng");
    expect(wilfred?.id).toBe("executive-wilfred-obeng");
    expect(wilfred?.bio).toBe(getPersonById("executive-wilfred-obeng")?.bio);
    expect(wilfred?.contact?.email).toBe("wilfred.obeng7@gmail.com");
    expect(wilfred?.role).toBe("Training & Standards Coordinator");
  });

  it("rejects duplicate and missing hub references", () => {
    expect(() => resolveHubLeadership([
      { personId: "executive-wilfred-obeng", role: "Lead" },
      { personId: "executive-wilfred-obeng", role: "Lead" },
    ])).toThrow(/Duplicate hub leadership placement/);
    expect(() => resolveHubLeadership([{ personId: "missing", role: "Lead" }])).toThrow(/Unknown hub person reference/);
  });
});

describe("UG community hub roster", () => {
  it("contains the confirmed leadership roster with compact modal presentation", () => {
    expect(ugHubRoster.leadershipPresentation).toBe("compact-modal");
    expect(
      ugHubRoster.leadership.map(({ name, role, affiliation }) => [
        name,
        role,
        affiliation,
      ]),
    ).toEqual(expectedUgLeadership);
    expect(
      ugHubRoster.leadership.every(
        ({ image }) =>
          typeof image === "string" &&
          (image.startsWith("/ug-team/") ||
            image.startsWith("/images/team/") ||
            image === "/placeholder.png"),
      ),
    ).toBe(true);
    const confirmedPortraits = ugHubRoster.leadership
      .map(({ image }) => image)
      .filter((image) => image !== "/placeholder.png");
    expect(new Set(confirmedPortraits)).toHaveProperty(
      "size",
      confirmedPortraits.length,
    );
    expect(
      ugHubRoster.leadership.map(({ image }) => image),
    ).toEqual([
      "/ug-team/divina_selase_afenyo.jpg",
      "/ug-team/kelvin-akoto-boateng.jpg",
      "/ug-team/nana-ekow-moses.jpg",
      "/ug-team/rachael-akusika-adu.jpg",
      "/placeholder.png",
      "/ug-team/esther_bray.jpeg",
      "/ug-team/maxwell_abiam_danso.jpg",
      "/ug-team/joseph_broni.jpg",
      "/ug-team/akua_bowaa_essah.jpg",
      "/ug-team/edugie_osunde.jpg",
      "/ug-team/denzel_nketia_achiampong.jpg",
      "/ug-team/austin_afutu.jpg",
      "/ug-team/nneoma_orji-okoro.PNG",
      "/ug-team/georgina_gabrah.jpg",
    ]);
  });

  it("keeps the volunteer section omitted until portraits arrive", () => {
    expect(ugHubRoster.volunteers).toEqual([]);
    expect(ugHubRoster.pending?.volunteers).toBeUndefined();
  });

  it("attaches the roster to the active UG hub with Apply CTA", () => {
    const ug = communityHubs.find(({ routeSlug }) => routeSlug === "ug");
    const nhp = communityHubs.find(({ routeSlug }) => routeSlug === "nhp");

    expect(ug?.status).toBe("active");
    expect(ug?.roster).toBe(ugHubRoster);
    expect(ug?.cta?.href).toBe(UG_TRAINING_FORM_URL);
    expect(nhp?.roster).toBeUndefined();
  });
});
