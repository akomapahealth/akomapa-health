import { describe, expect, it } from "vitest";
import {
  communityHubs,
  uccHubRoster,
  ugHubRoster,
} from "@/data/community-hubs";
import { UG_TRAINING_FORM_URL } from "@/config/links";
import { getPersonById, resolveHubLeadership } from "@/data/team";

const expectedLeadership = [
  ["Osei Kwarkye Bonsu Tony", "Faculty Recruitment Lead", "Doctor of Optometry Student, University of Cape Coast"],
  ["Djan Patrick Nyarko", "Finance Officer", "Doctor of Pharmacy Student, University of Cape Coast"],
  ["Adeporka Awinibota Peter", "Follow-up Team Lead", "Biomedical Science Graduate, University of Cape Coast"],
  ["Ampomah Prince Peprah", "Research Lead", "Optometry Student, University of Cape Coast"],
  ["Anane Sarah Adomah", "Community Outreach", "Health Information Management Student, University of Cape Coast"],
  ["David Konadu Kombate", "Co-Director", "Medical Laboratory Science Graduate, University of Cape Coast"],
  ["Araba Nyakoa Amartey", "Research Lead", "Medical Student, University of Cape Coast"],
  ["Justice Marvel Yaw Anieku", "Co-Director", "Medical Student, University of Cape Coast"],
  ["Evans Worae Obeng", "Volunteer Recruitment and Scheduling Team Lead", "Medical Laboratory Science Student, University of Cape Coast"],
  ["Kingsley Botchwey", "Media Lead", "MPhil Molecular Medicine Student, University of Cape Coast"],
  ["Vanessa Borna", "Follow-up Lead", "Clinical Nutrition Graduate, University of Cape Coast"],
  ["Batanye Joseph", "Finance Officer", "Doctor of Pharmacy Student, University of Cape Coast"],
  ["Lydia Ira", "Logistics and Supplies Lead", "Medical Laboratory Science Student, University of Cape Coast"],
  ["Osei Owusu Raphael", "Training and Standards Co-Lead", "Optometry Student, University of Cape Coast"],
  ["Akua Asiedu Sekyi", "Training and Standards Lead", "Doctor of Pharmacy Student, University of Cape Coast"],
  ["Oheneba Pearl", "Community Outreach", "Medical Laboratory Science Student, University of Cape Coast"],
  ["Beatrice Edinam Tsikata", "Volunteer Recruitment and Scheduling Team Lead", "Nutrition Student, University of Cape Coast"],
  ["Bukari Yaw Waidu", "Community Liaison Lead", "Doctor of Optometry Student, University of Cape Coast"],
] as const;

const expectedUgLeadership = [
  ["Divina Selase Afenyo", "UG Hub Co-Director", "University of Ghana"],
  ["Priscilla Afriyie Adomako", "Co-Director", "Medical student"],
  ["Victor Owusu Barnieh", "Media Lead", "Level 300 Computer Science student, University of Ghana, Legon"],
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

  it("maps confirmed portraits to unique ImageKit paths", () => {
    const people = [...uccHubRoster.leadership, ...uccHubRoster.volunteers];
    const portraits = people.flatMap(({ image }) => (image ? [image] : []));

    expect(uccHubRoster.leadership).toHaveLength(18);
    expect(uccHubRoster.volunteers).toHaveLength(36);
    expect(new Set(people.map(({ id }) => id)).size).toBe(people.length);
    expect(new Set(portraits).size).toBe(portraits.length);
    expect(
      uccHubRoster.volunteers.every(
        ({ image }) => typeof image === "string" && image.startsWith("/ucc-team/"),
      ),
    ).toBe(true);
    expect(
      uccHubRoster.leadership.every(
        ({ image }) => image === undefined || image.startsWith("/ucc-team/"),
      ),
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

  it("keeps David Konadu Kombate on his confirmed portrait and profile", () => {
    const david = uccHubRoster.leadership.find(
      ({ name }) => name === "David Konadu Kombate",
    );
    const profile = getPersonById("member-david-konadu-kombate");

    expect(david?.id).toBe("member-david-konadu-kombate");
    expect(david?.role).toBe("Co-Director");
    expect(david?.featured).toBe(true);
    expect(david?.image).toBe("/ucc-team/david_konadu_kombate.JPG");
    expect(david?.bio).toBe(profile?.bio);
    expect(david?.contact?.email).toBe("kombatedavidkonadu@gmail.com");
    expect(
      uccHubRoster.leadership.some(({ name }) =>
        ["Hafiz Shaban", "Getwell Essuman", "Wilfred Obeng", "David Ofosu"].includes(name),
      ),
    ).toBe(false);
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
      "/ug-team/priscilla_adomako.jpeg",
      "/ug-team/victor_owusu_barnieh.jpg",
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

  it("publishes Victor and Priscilla with their supplied contact links", () => {
    const victor = ugHubRoster.leadership.find(({ id }) => id === "victor-owusu-barnieh");
    const priscilla = ugHubRoster.leadership.find(({ id }) => id === "priscilla-afriyie-adomako");

    expect(victor?.contact?.email).toBe("victorbarnieh8@gmail.com");
    expect(victor?.contact?.linkedin).toBeUndefined();
    expect(priscilla?.contact?.email).toBe("priscillaafriyieadomako@gmail.com");
    expect(priscilla?.contact?.linkedin).toBe(
      "https://www.linkedin.com/in/priscilla-afriyie-adomako",
    );
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
