import type { Announcement, News, NewsItem } from "@/lib/types";
import { announcementCampaign } from "@/data/announcements";
import { news } from "@/data/news";

function normalizeAnnouncement(a: Announcement): NewsItem {
  return {
    id: a.id,
    title: a.title,
    excerpt: a.description,
    content: [a.description],
    image: a.image ?? "",
    videoUrl: a.videoUrl ?? null,
    thumbnail: a.thumbnail ?? null,
    date: null,
    category: a.tag ?? "Update",
    categoryColor: a.tagColor ?? "lapis",
    tags: a.tag ? [a.tag] : [],
    featured: false,
    ctaText: a.ctaText ?? null,
    ctaLink: a.ctaLink ?? null,
    isExternalCta: a.isExternal ?? false,
    source: "announcement",
  };
}

function normalizeNews(n: News): NewsItem {
  return {
    id: n.slug,
    title: n.title,
    excerpt: n.excerpt,
    content: n.content,
    image: n.image,
    videoUrl: null,
    thumbnail: null,
    date: n.date,
    category: n.category,
    categoryColor: "lapis",
    tags: n.tags ?? [],
    featured: n.featured ?? false,
    ctaText: null,
    ctaLink: null,
    isExternalCta: false,
    source: "news",
  };
}

let _cached: NewsItem[] | null = null;
let _cachedNewsOnly: NewsItem[] | null = null;

/** Articles from `news.ts` only — use for `/news` listing and detail routes. */
export function getNewsOnlyItems(): NewsItem[] {
  if (_cachedNewsOnly) return _cachedNewsOnly;

  _cachedNewsOnly = [...news.map(normalizeNews)].sort(
    (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
  );
  return _cachedNewsOnly;
}

export function getAllNewsItems(): NewsItem[] {
  if (_cached) return _cached;

  const fromAnnouncements = announcementCampaign.slides.map(normalizeAnnouncement);
  const fromNews = news.map(normalizeNews);

  // Dated items first (newest to oldest), then undated announcements
  const dated = [...fromNews].sort(
    (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
  );
  const undated = fromAnnouncements;

  _cached = [...dated, ...undated];
  return _cached;
}

export function getNewsItemById(id: string): NewsItem | undefined {
  return getNewsOnlyItems().find((item) => item.id === id);
}

export function newsItemToAnnouncement(item: NewsItem): Announcement {
  return {
    id: item.id,
    title: item.title,
    description: item.excerpt,
    tag: item.category,
    tagColor: item.categoryColor,
    image: item.image || undefined,
    videoUrl: item.videoUrl ?? undefined,
    thumbnail: item.thumbnail ?? undefined,
    ctaText: item.isExternalCta ? (item.ctaText ?? undefined) : "Read More",
    ctaLink: item.isExternalCta ? (item.ctaLink ?? undefined) : `/news/${item.id}`,
    isExternal: item.isExternalCta,
  };
}
