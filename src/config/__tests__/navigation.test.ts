import { describe, expect, it } from "vitest";
import {
  isNavigationGroup,
  isNavigationItemActive,
  isNavigationPathActive,
  mainNavigation,
  type NavigationGroup,
  type NavigationLink,
  type NavigationNode,
} from "@/config/navigation";

function findNode(
  items: readonly NavigationNode[],
  name: string,
): NavigationNode | undefined {
  for (const item of items) {
    if (item.name === name) {
      return item;
    }

    if (isNavigationGroup(item)) {
      const nested = findNode(item.children, name);
      if (nested) {
        return nested;
      }
    }
  }

  return undefined;
}

function asLink(name: string): NavigationLink {
  const item = findNode(mainNavigation, name);
  if (!item || isNavigationGroup(item) || !item.href) {
    throw new Error(`Expected a navigation link named ${name}`);
  }
  return item;
}

function asGroup(name: string): NavigationGroup {
  const item = findNode(mainNavigation, name);
  if (!item || !isNavigationGroup(item)) {
    throw new Error(`Expected a navigation group named ${name}`);
  }
  return item;
}

describe("isNavigationPathActive", () => {
  it("uses exact matching so sibling routes are exclusive", () => {
    expect(isNavigationPathActive("/about/team", "/about")).toBe(false);
    expect(isNavigationPathActive("/about/team", "/about/team")).toBe(true);
    expect(isNavigationPathActive("/about", "/about")).toBe(true);
    expect(isNavigationPathActive("/", "/")).toBe(true);
    expect(isNavigationPathActive("/about", "/")).toBe(false);
  });
});

describe("main navigation active state", () => {
  const home = asLink("Home");
  const ourStory = asLink("Our Story");
  const ourTeam = asLink("Our Team");
  const about = asGroup("About");
  const allHubs = asLink("All Community Health Hubs");
  const uccHub = asLink("Akomapa UCC Hub");
  const hubs = asGroup("Community Health Hubs");

  it("highlights only Our Team on /about/team while keeping About active", () => {
    expect(isNavigationItemActive("/about/team", ourTeam)).toBe(true);
    expect(isNavigationItemActive("/about/team", ourStory)).toBe(false);
    expect(isNavigationItemActive("/about/team", about)).toBe(true);
    expect(isNavigationPathActive("/about/team", ourTeam.href)).toBe(true);
    expect(isNavigationPathActive("/about/team", ourStory.href)).toBe(false);
  });

  it("highlights only Our Story on /about", () => {
    expect(isNavigationItemActive("/about", ourStory)).toBe(true);
    expect(isNavigationItemActive("/about", ourTeam)).toBe(false);
    expect(isNavigationItemActive("/about", about)).toBe(true);
  });

  it("highlights only the UCC hub on /community-hubs/ucc", () => {
    expect(isNavigationItemActive("/community-hubs/ucc", uccHub)).toBe(true);
    expect(isNavigationItemActive("/community-hubs/ucc", allHubs)).toBe(false);
    expect(isNavigationItemActive("/community-hubs/ucc", hubs)).toBe(true);
  });

  it("highlights only Home on /", () => {
    expect(isNavigationItemActive("/", home)).toBe(true);
    expect(isNavigationItemActive("/", about)).toBe(false);
    expect(isNavigationPathActive("/", "/about")).toBe(false);
    expect(isNavigationPathActive("/about", "/")).toBe(false);
  });
});
