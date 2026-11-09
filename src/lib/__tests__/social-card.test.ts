import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blog";
import { news } from "@/data/news";
import { researchPapers } from "@/data/research-papers";
import { canonicalSeoRoutes } from "@/lib/seo-routes";
import {
  blogSocialCard,
  cardPath,
  defaultSocialCard,
  listSocialCardKeys,
  newsSocialCard,
  researchSocialCard,
  socialCardFromKey,
  staticSocialCard,
} from "@/lib/social-card";

describe("social card specs", () => {
  it("lists one card per canonical route, blog post, news item, and research paper", () => {
    const keys = listSocialCardKeys();
    const expected =
      1 + canonicalSeoRoutes.length + blogPosts.length + news.length + researchPapers.length;
    expect(keys).toHaveLength(expected);

    const paths = keys.map(cardPath);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) {
      expect(path).toMatch(/^\/og\/[a-z0-9-]+(\/[a-z0-9-]+)?\.png$/);
    }
  });

  it("round-trips every listed key back to a spec with copy from its source record", () => {
    for (const key of listSocialCardKeys()) {
      const spec = socialCardFromKey(key);
      expect(spec, key.join("/")).toBeDefined();
      expect(spec!.key).toEqual(key);
      expect(spec!.title.trim().length).toBeGreaterThan(0);
      expect(spec!.description.trim().length).toBeGreaterThan(0);
      expect(spec!.eyebrow.trim().length).toBeGreaterThan(0);
      expect(spec!.alt).toContain(spec!.title);
    }
  });

  it("derives static cards from the SEO route table", () => {
    const about = staticSocialCard("/about")!;
    expect(about.key).toEqual(["static", "about"]);
    expect(about.title).toBe("About Akomapa");
    expect(about.eyebrow).toBe("About Akomapa");

    const ucc = staticSocialCard("/community-hubs/ucc")!;
    expect(ucc.key).toEqual(["static", "community-hubs--ucc"]);
    expect(ucc.eyebrow).toBe("Community Health Hubs");

    expect(staticSocialCard("/")!.key).toEqual(["static", "home"]);
    expect(staticSocialCard("/does-not-exist")).toBeUndefined();
  });

  it("derives detail cards from content records", () => {
    const post = blogPosts[0];
    const blog = blogSocialCard(post.slug)!;
    expect(blog.title).toBe(post.title);
    expect(blog.description).toBe(post.excerpt);
    expect(blog.eyebrow).toMatch(/^Thought Leadership · /);

    const item = news[0];
    const card = newsSocialCard(item.slug)!;
    expect(card.title).toBe(item.title);
    expect(card.eyebrow).toBe(`News · ${item.category}`);

    const plos = researchSocialCard("stakeholder-support-student-run-free-clinics-ghana")!;
    expect(plos.eyebrow).toBe("Research · PLOS Global Public Health");
    // The short summary, never the full abstract.
    expect(plos.description.length).toBeLessThan(300);
    expect(plos.description).not.toMatch(/odds ratio/i);
  });

  it("rejects keys that are not produced by the data", () => {
    expect(socialCardFromKey(["static", "evil"])).toBeUndefined();
    expect(socialCardFromKey(["blog", "not-a-post"])).toBeUndefined();
    expect(socialCardFromKey(["news"])).toBeUndefined();
    expect(socialCardFromKey(["default", "extra"])).toBeUndefined();
    expect(socialCardFromKey(["whatever", "x"])).toBeUndefined();
    expect(socialCardFromKey([])).toBeUndefined();
    expect(socialCardFromKey(["static", "about", "deeper"])).toBeUndefined();
  });

  it("keeps the default card free of any page-specific copy", () => {
    expect(defaultSocialCard.key).toEqual(["default"]);
    expect(cardPath(defaultSocialCard.key)).toBe("/og/default.png");
    expect(defaultSocialCard.title).toBe("Building Ethical Global Health Leaders");
  });
});
