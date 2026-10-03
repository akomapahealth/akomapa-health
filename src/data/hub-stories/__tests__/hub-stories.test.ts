import { describe, expect, it } from "vitest";
import { communityHubs } from "@/data/community-hubs";
import {
  uccCommunityStories,
  uccStudentStories,
} from "@/data/hub-stories/ucc-stories";
import {
  ugCommunityStories,
  ugStudentStories,
} from "@/data/hub-stories/ug-stories";

const uccCommunityAuthors = [
  "Gloria Tawiah Blay",
  "Prince Nyarko",
  "David Ofosu",
] as const;

const uccVolunteerAuthors = [
  "Hafiz Shaban",
  "Belinda Odoom",
  "Wilfred Obeng",
] as const;

const ugCommunityAuthors = [
  "Divina Selase Afenyo",
  "Nana-Ekow Moses",
  "Rachael Akusika Adu",
] as const;

const ugVolunteerAuthors = [
  "Kelvin Akoto Boateng",
  "Jil Owusu-Ansah",
  "Maxwell Abiam Danso",
] as const;

function expectDistinctStories(
  stories: typeof uccCommunityStories,
  expectedAuthors: readonly string[],
) {
  expect(stories).toHaveLength(3);
  expect(new Set(stories.map((story) => story.id)).size).toBe(3);
  expect(new Set(stories.map((story) => story.title)).size).toBe(3);
  expect(new Set(stories.map((story) => story.excerpt)).size).toBe(3);
  expect(new Set(stories.map((story) => story.content)).size).toBe(3);
  expect(stories.map((story) => story.author)).toEqual([...expectedAuthors]);
  for (const story of stories) {
    expect(story.author.toLowerCase()).not.toContain("anonymous");
    expect(story.content).not.toMatch(/\u2014|\u2013/);
    expect(story.content.split(/\n\n+/).length).toBeGreaterThanOrEqual(3);
    expect(story.content.length).toBeGreaterThan(600);
  }
}

describe("UCC and UG hub stories", () => {
  it("provides three distinct named community and volunteer stories for UCC", () => {
    expectDistinctStories(uccCommunityStories, uccCommunityAuthors);
    expectDistinctStories(uccStudentStories, uccVolunteerAuthors);
  });

  it("provides three distinct named community and volunteer stories for UG", () => {
    expectDistinctStories(ugCommunityStories, ugCommunityAuthors);
    expectDistinctStories(ugStudentStories, ugVolunteerAuthors);
  });

  it("wires stories onto UCC/UG hubs and leaves NHP empty", () => {
    const ucc = communityHubs.find((hub) => hub.routeSlug === "ucc");
    const ug = communityHubs.find((hub) => hub.routeSlug === "ug");
    const nhp = communityHubs.find((hub) => hub.routeSlug === "nhp");

    expect(ucc?.communityStories).toEqual(uccCommunityStories);
    expect(ucc?.studentStories).toEqual(uccStudentStories);
    expect(ug?.communityStories).toEqual(ugCommunityStories);
    expect(ug?.studentStories).toEqual(ugStudentStories);
    expect(nhp?.communityStories ?? []).toEqual([]);
    expect(nhp?.studentStories ?? []).toEqual([]);
  });
});
