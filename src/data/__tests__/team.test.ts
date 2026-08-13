import { describe, expect, it } from "vitest";
import {
  advisoryBoardMembers,
  executiveTeamMembers,
  getTeamMemberBySlug,
  nonExecutiveTeamMembers,
  teamMembers,
} from "@/data/team";

describe("canonical team directory", () => {
  it("defines the approved public directory groups without overlap", () => {
    expect(executiveTeamMembers).toHaveLength(12);
    expect(nonExecutiveTeamMembers).toHaveLength(18);
    expect(advisoryBoardMembers).toHaveLength(8);

    const publicDirectory = [
      ...executiveTeamMembers,
      ...nonExecutiveTeamMembers,
      ...advisoryBoardMembers,
    ];
    expect(new Set(publicDirectory.map(({ id }) => id))).toHaveProperty(
      "size",
      publicDirectory.length,
    );
    expect(new Set(publicDirectory.map(({ name }) => name))).toHaveProperty(
      "size",
      publicDirectory.length,
    );
  });

  it("gives every public profile complete, trustworthy display data", () => {
    const publicDirectory = [
      ...executiveTeamMembers,
      ...nonExecutiveTeamMembers,
      ...advisoryBoardMembers,
    ];

    for (const member of publicDirectory) {
      expect(member.name.trim()).not.toBe("");
      expect(member.title.trim()).not.toBe("");
      expect(member.affiliation.trim()).not.toBe("");
      expect(member.bio.trim().length).toBeGreaterThan(60);
      expect(member.image).toMatch(/^\/[a-z0-9_./-]+$/i);
      expect(member.socialLinks?.email).not.toBe("#");
      expect(member.socialLinks?.linkedin).not.toBe("#");
    }
  });

  it("preserves advisor IDs and mentorship slugs used by other pages", () => {
    expect(
      advisoryBoardMembers
        .filter(({ id }) => ["28", "31", "32", "34"].includes(id))
        .map(({ id }) => id),
    ).toEqual(["28", "31", "32", "34"]);

    for (const slug of [
      "derek-tuoyire",
      "martins-ekor",
      "alfred-yawson",
      "esi-berkoh",
      "patrick-ampofo",
      "jeremy-schwartz",
      "stacy-uchendu",
    ]) {
      expect(getTeamMemberBySlug(slug), slug).toBeDefined();
    }

    expect(new Set(teamMembers.map(({ id }) => id))).toHaveProperty(
      "size",
      teamMembers.length,
    );
  });
});
