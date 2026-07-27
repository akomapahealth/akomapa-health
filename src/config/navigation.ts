export type NavigationLink = {
  name: string;
  href: string;
};

export type NavigationGroup = {
  name: string;
  href?: string;
  children: readonly NavigationNode[];
};

export type NavigationNode = NavigationLink | NavigationGroup;
export type NavigationItem = NavigationNode;

export const mainNavigation: readonly NavigationItem[] = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    children: [
      { name: "Our Story", href: "/about" },
      { name: "Our Team", href: "/about/team" },
      { name: "Our Philosophy", href: "/philosophy" },
      { name: "Thought Leadership", href: "/blog" },
    ],
  },
  {
    name: "Our Work",
    children: [
      {
        name: "Community Health Hubs",
        href: "/community-hubs",
        children: [
          { name: "All Community Health Hubs", href: "/community-hubs" },
          { name: "Akomapa UCC Hub", href: "/community-hubs/ucc" },
          { name: "Akomapa UG Hub", href: "/community-hubs/ug" },
          { name: "Akomapa NHP Yale Hub", href: "/community-hubs/nhp" },
        ],
      },
      { name: "Research & Innovation", href: "/research" },
      { name: "Impact", href: "/impact" },
    ],
  },
  {
    name: "Learning Experiences",
    children: [
      { name: "Akomapa Academy", href: "/academy" },
      {
        name: "Global Health Immersion Program",
        href: "/global-health-immersion-program",
      },
    ],
  },
  {
    name: "Join Us",
    children: [
      { name: "Get Involved", href: "/get-involved" },
      { name: "Partnerships", href: "/partnerships" },
    ],
  },
] as const;

export function isNavigationGroup(
  item: NavigationNode,
): item is NavigationGroup {
  return "children" in item;
}

export function isNavigationPathActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function isNavigationItemActive(
  pathname: string,
  item: NavigationNode,
): boolean {
  if (item.href && isNavigationPathActive(pathname, item.href)) {
    return true;
  }

  return (
    isNavigationGroup(item) &&
    item.children.some((child) =>
      isNavigationItemActive(pathname, child),
    )
  );
}
