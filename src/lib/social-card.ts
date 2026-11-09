import { blogPosts, getCategoryLabel } from "@/data/blog";
import { news } from "@/data/news";
import { researchPapers } from "@/data/research-papers";
import { canonicalSeoRouteMap, canonicalSeoRoutes } from "@/lib/seo-routes";

/**
 * Generated social cards are driven by the same route and content records as
 * page metadata, so copy never has to be maintained twice. Every card has a
 * stable key; only keys produced by `listSocialCardKeys()` are rendered, so
 * arbitrary text can never be turned into a branded image.
 */

export type SocialCardKind = "static" | "blog" | "news" | "research" | "default";

export type SocialCardSpec = {
  kind: SocialCardKind;
  /** URL segments under /og/, e.g. ["static", "about"] or ["blog", "<slug>"]. */
  key: string[];
  eyebrow: string;
  title: string;
  description: string;
  alt: string;
};

export const SOCIAL_CARD_ROUTE_PREFIX = "/og";

function staticKey(path: string) {
  return path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "--");
}

function staticPathFromKey(key: string) {
  return key === "home" ? "/" : `/${key.replace(/--/g, "/")}`;
}

function sectionForPath(path: string) {
  const [first] = path.replace(/^\//, "").split("/");
  switch (first) {
    case "":
      return "Akomapa Health";
    case "about":
    case "philosophy":
      return "About Akomapa";
    case "community-hubs":
      return "Community Health Hubs";
    case "academy":
    case "programs":
    case "global-health-immersion-program":
      return "Learning Experiences";
    case "research":
      return "Research & Innovation";
    case "impact":
    case "ncd-impact":
      return "Our Impact";
    case "partnerships":
    case "get-involved":
    case "donate":
    case "contact":
      return "Join Us";
    case "news":
      return "News";
    case "blog":
      return "Thought Leadership";
    default:
      return "Akomapa Health";
  }
}

export function cardPath(key: string[]) {
  return `${SOCIAL_CARD_ROUTE_PREFIX}/${key.join("/")}.png`;
}

export const defaultSocialCard: SocialCardSpec = {
  kind: "default",
  key: ["default"],
  eyebrow: "Akomapa Health",
  title: "Building Ethical Global Health Leaders",
  description:
    "Community-driven care, leadership development, and equitable partnerships for non-communicable disease prevention in Ghana.",
  alt: "Akomapa Health: Building Ethical Global Health Leaders",
};

export function staticSocialCard(path: string): SocialCardSpec | undefined {
  const route = canonicalSeoRouteMap.get(path);
  if (!route) return undefined;
  return {
    kind: "static",
    key: ["static", staticKey(path)],
    eyebrow: sectionForPath(path),
    title: route.title,
    description: route.description,
    alt: `${route.title} — Akomapa Health`,
  };
}

export function blogSocialCard(slug: string): SocialCardSpec | undefined {
  const post = blogPosts.find((candidate) => candidate.slug === slug);
  if (!post) return undefined;
  return {
    kind: "blog",
    key: ["blog", post.slug],
    eyebrow: `Thought Leadership · ${getCategoryLabel(post.category)}`,
    title: post.title,
    description: post.excerpt,
    alt: `${post.title} — Akomapa Thought Leadership`,
  };
}

export function newsSocialCard(slug: string): SocialCardSpec | undefined {
  const item = news.find((candidate) => candidate.slug === slug);
  if (!item) return undefined;
  return {
    kind: "news",
    key: ["news", item.slug],
    eyebrow: `News · ${item.category}`,
    title: item.title,
    description: item.excerpt,
    alt: `${item.title} — Akomapa News`,
  };
}

export function researchSocialCard(slug: string): SocialCardSpec | undefined {
  const paper = researchPapers.find((candidate) => candidate.slug === slug);
  if (!paper) return undefined;
  return {
    kind: "research",
    key: ["research", paper.slug],
    eyebrow: paper.journal ? `Research · ${paper.journal}` : "Research & Innovation",
    title: paper.title,
    description: paper.summary ?? paper.abstract,
    alt: `${paper.title} — Akomapa Research`,
  };
}

/** Resolve a card from its URL key. Unknown keys return undefined (→ 404). */
export function socialCardFromKey(key: string[]): SocialCardSpec | undefined {
  const [kind, ...rest] = key;
  const id = rest.join("/");
  switch (kind) {
    case "default":
      return rest.length === 0 ? defaultSocialCard : undefined;
    case "static":
      return rest.length === 1 ? staticSocialCard(staticPathFromKey(id)) : undefined;
    case "blog":
      return rest.length === 1 ? blogSocialCard(id) : undefined;
    case "news":
      return rest.length === 1 ? newsSocialCard(id) : undefined;
    case "research":
      return rest.length === 1 ? researchSocialCard(id) : undefined;
    default:
      return undefined;
  }
}

/** Every card the build should pre-render. */
export function listSocialCardKeys(): string[][] {
  return [
    defaultSocialCard.key,
    ...canonicalSeoRoutes.map((route) => staticSocialCard(route.path)!.key),
    ...blogPosts.map((post) => blogSocialCard(post.slug)!.key),
    ...news.map((item) => newsSocialCard(item.slug)!.key),
    ...researchPapers.map((paper) => researchSocialCard(paper.slug)!.key),
  ];
}
