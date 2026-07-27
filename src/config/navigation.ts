export type NavigationChild = {
  name: string;
  href: string;
};

export type NavigationLink = {
  name: string;
  href: string;
};

export type NavigationGroup = {
  name: string;
  href?: string;
  children: readonly NavigationChild[];
};

export type NavigationItem = NavigationLink | NavigationGroup;

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
      { name: "Community Health Hubs", href: "/community-hubs" },
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
  item: NavigationItem,
): item is NavigationGroup {
  return "children" in item;
}

export function isNavigationPathActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function isNavigationItemActive(
  pathname: string,
  item: NavigationItem,
) {
  if (item.href && isNavigationPathActive(pathname, item.href)) {
    return true;
  }

  return (
    isNavigationGroup(item) &&
    item.children.some((child) =>
      isNavigationPathActive(pathname, child.href),
    )
  );
}
