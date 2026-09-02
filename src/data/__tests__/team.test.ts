import { describe, expect, it } from "vitest";
import {
  advisoryBoardMembers,
  buildTeamDirectory,
  departmentCatalog,
  executiveLeadership,
  getPersonById,
  getPersonBySlug,
  people,
  teamDepartments,
  teamHeroPeople,
  type TeamDirectoryConfig,
} from "@/data/team";
import type { PersonProfile } from "@/lib/types";

const expectedDepartments = [
  ["Education", ["Nana Ama Ocran", "Jeanelle Forson"]],
  ["Research", ["Bernard Mensah", "Erinda Aidoo"]],
  ["Technology", ["Prince Agyei Tuffour", "Sylvester Bempong", "Mighty Doffoe"]],
  ["Onboarding, Training and Standards", ["Wilfred Obeng"]],
  ["Partnerships", ["Sedem Dankwa", "Dr. Patrick Ampofo", "Gabrielle Nartey", "Kelvin Fiifi Ocran"]],
  ["Finance", ["Adwoa Danso-Dodoo"]],
  ["Legal", ["Samuel Kumi"]],
  ["Internal Affairs", ["Jade Kissi"]],
] as const;

describe("canonical people directory", () => {
  it("resolves the approved hierarchy in exact order without overlap", () => {
    expect(executiveLeadership.map(({ name, title }) => [name, title])).toEqual([
      ["Brian Amu Fleischer, MD", "Founder & President"],
      ["Esi Bon Berkoh", "Vice President & Co-Founder"],
      ["Afriyie Badu, MD", "Chief Operations Officer & Co-Founder"],
    ]);
    expect(teamDepartments.map(({ name, members }) => [name, members.map(({ name: memberName }) => memberName)])).toEqual(expectedDepartments);
    expect(advisoryBoardMembers).toHaveLength(8);
    const renderedIds = [...executiveLeadership, ...teamDepartments.flatMap(({ members }) => members), ...advisoryBoardMembers].map(({ id }) => id);
    expect(new Set(renderedIds).size).toBe(renderedIds.length);
  });

  it("keeps complete canonical profiles, legacy IDs, and mentorship slugs", () => {
    expect(new Set(people.map(({ id }) => id)).size).toBe(people.length);
    for (const person of people) {
      expect(person.name.trim()).not.toBe("");
      expect(person.affiliation.trim()).not.toBe("");
      expect(person.bio.trim().length).toBeGreaterThan(60);
      expect(person.socialLinks?.email).not.toBe("#");
      expect(person.socialLinks?.linkedin).not.toBe("#");
    }
    for (const id of ["28", "31", "32", "34"]) expect(getPersonById(id)).toBeDefined();
    for (const slug of ["derek-tuoyire", "martins-ekor", "alfred-yawson", "esi-berkoh", "patrick-ampofo", "jeremy-schwartz", "stacy-uchendu"]) {
      expect(getPersonBySlug(slug), slug).toBeDefined();
    }
  });

  it("selects only the three pictured executive leaders for the hero", () => {
    expect(teamHeroPeople).toHaveLength(22);
    expect(teamHeroPeople.map(({ name }) => name)).toEqual([
      "Brian Amu Fleischer, MD",
      "Esi Bon Berkoh",
      "Afriyie Badu, MD",
      "Prince Agyei Tuffour",
      "Adwoa Danso-Dodoo",
      "Nana Ama Ocran",
      "Wilfred Obeng",
      "Gabrielle Nartey",
      "Dr. Patrick Ampofo",
      "Kelvin Fiifi Ocran",
      "Samuel Kumi",
      "Jeanelle Forson",
      "Bernard Mensah",
      "Jade Kissi",
      "Erinda Aidoo",
      "Sylvester Bempong",
      "Mighty Doffoe",
      "Prof. Derek Anamaale Tuoyire",
      "Prof. Martins Ekor",
      "Emily Sheldon",
      "Dr. Jeremy Schwartz",
      "Dr. Elijah Paintsil",
    ]);
    expect(teamHeroPeople.every(({ image }) => image && !image.includes("placeholder"))).toBe(true);
  });
});

const profile = (id: string, overrides: Partial<PersonProfile> = {}): PersonProfile => ({
  id,
  name: id,
  affiliation: "Akomapa Health Foundation",
  bio: "A complete test biography with enough detail to represent a canonical person profile safely.",
  image: `/images/team/${id}.jpg`,
  ...overrides,
});

const validConfig = (): TeamDirectoryConfig => ({
  people: [profile("leader", { slug: "leader", featuredInTeamHero: true }), profile("member")],
  departments: [{ id: "education", name: "Education" }, { id: "empty", name: "Empty" }],
  executiveLeadership: [{ personId: "leader", title: "President" }],
  departmentMemberships: [{ departmentId: "education", personId: "member", title: "Lead" }],
  advisoryBoard: [],
});

describe("team directory validation", () => {
  it("does not render empty configured departments", () => {
    expect(departmentCatalog).toHaveLength(8);
    expect(buildTeamDirectory(validConfig()).departments.map(({ id }) => id)).toEqual(["education"]);
  });

  it.each([
    ["duplicate IDs", (config: TeamDirectoryConfig) => ({ ...config, people: [...config.people, profile("leader")] }), /Duplicate canonical person ID/],
    ["duplicate slugs", (config: TeamDirectoryConfig) => ({ ...config, people: [...config.people, profile("other", { slug: "leader" })] }), /Duplicate canonical person slug/],
    ["missing people", (config: TeamDirectoryConfig) => ({ ...config, advisoryBoard: [{ personId: "missing", title: "Advisor" }] }), /Unknown canonical person reference/],
    ["unknown departments", (config: TeamDirectoryConfig) => ({ ...config, departmentMemberships: [{ departmentId: "missing", personId: "member", title: "Lead" }] }), /Unknown department reference/],
    ["multiple primary departments", (config: TeamDirectoryConfig) => ({ ...config, departmentMemberships: [...config.departmentMemberships, { departmentId: "empty", personId: "member", title: "Lead" }] }), /multiple primary departments/],
    ["cross-section duplicates", (config: TeamDirectoryConfig) => ({ ...config, advisoryBoard: [{ personId: "leader", title: "Advisor" }] }), /Duplicate Our Team placement/],
    ["hub-only hero people", (config: TeamDirectoryConfig) => ({ ...config, people: [...config.people, profile("hub-only", { featuredInTeamHero: true })] }), /Hub-only person/],
    ["placeholder hero portraits", (config: TeamDirectoryConfig) => ({ ...config, people: config.people.map((person) => person.id === "leader" ? { ...person, image: "/images/team/placeholder.jpg" } : person) }), /non-placeholder portrait/],
  ])("rejects %s", (_name, mutate, message) => {
    expect(() => buildTeamDirectory(mutate(validConfig()))).toThrow(message);
  });
});
