import type { Metadata } from "next";
import { resolveSocialImage, type SocialImage } from "@/lib/social-image";
import {
  cardPath,
  defaultSocialCard,
  staticSocialCard,
  type SocialCardSpec,
} from "@/lib/social-card";
import {
  canonicalSeoRouteMap,
  canonicalSeoRoutes,
  noindexRoutes,
  type SeoRoute,
  type SeoRouteImage,
} from "@/lib/seo-routes";

export { canonicalSeoRouteMap, canonicalSeoRoutes, noindexRoutes };
export type { SeoRoute, SeoRouteImage };

export const SITE_URL = "https://akomapa.org";
export const SITE_NAME = "Akomapa Health";
export const DEFAULT_TITLE =
  "Akomapa Health - Building Ethical Global Health Leaders";
export const DEFAULT_DESCRIPTION =
  "Akomapa develops ethical, community-centered global health leaders through healthcare service, leadership training, research, and equitable partnerships.";
export const DEFAULT_OG_IMAGE = "/images/og-homepage.jpg";
export const DEFAULT_OG_IMAGE_ALT =
  "Akomapa homepage: community clinic care with the headline Advancing Noncommunicable Disease Prevention & Care and Explore Our Academy and Partner With Us";


export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function getRouteSeo(path: string): SeoRoute {
  const route = canonicalSeoRouteMap.get(path);

  if (!route) {
    throw new Error(`Missing SEO metadata for route: ${path}`);
  }

  return route;
}

function withSiteName(title: string): string {
  return `${title} | ${SITE_NAME}`;
}

/** The site-wide fallback: a generated brand card, never another page's photo. */
export function defaultSocialImage(): SocialImage {
  return resolveSocialImage({
    src: cardPath(defaultSocialCard.key),
    alt: defaultSocialCard.alt,
  });
}

/**
 * Curated image when the route declares one, otherwise that route's own
 * generated card. The homepage screenshot is only ever used by `/`.
 */
export function socialImageForRoute(route: SeoRoute): SocialImage {
  if (route.image) {
    return resolveSocialImage(route.image);
  }
  const card = staticSocialCard(route.path);
  if (!card) {
    throw new Error(`Missing social card for route: ${route.path}`);
  }
  return resolveSocialImage({ src: cardPath(card.key), alt: card.alt });
}

export function buildPageMetadata(path: string): Metadata {
  const route = getRouteSeo(path);
  const url = absoluteUrl(route.path);
  const socialTitle = withSiteName(route.title);
  const socialImage = socialImageForRoute(route);

  return {
    title: route.title,
    description: route.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: socialTitle,
      description: route.description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: route.description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  };
}

export function buildNoindexMetadata(path: string): Metadata {
  const route = noindexRoutes.find((item) => item.path === path);

  if (!route) {
    throw new Error(`Missing noindex metadata for route: ${path}`);
  }

  // Not indexed, but still shareable by someone with the link. Present the
  // page honestly (its own title, the neutral brand card) rather than letting
  // it inherit the homepage's Open Graph block from the root layout.
  const socialImage = defaultSocialImage();

  return {
    title: route.title,
    description: route.description,
    // Clear the root layout's homepage canonical; a noindex page has none.
    alternates: { canonical: null },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: withSiteName(route.title),
      description: route.description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: withSiteName(route.title),
      description: route.description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  };
}

export function buildArticleMetadata({
  title,
  description,
  path,
  image,
  imageAlt: imageAltOverride,
  imageWidth,
  imageHeight,
  fallbackCard,
  publishedTime,
  authors,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  imageAlt?: string | null;
  /** Intrinsic size when `image` is a committed public/ file. */
  imageWidth?: number;
  imageHeight?: number;
  /** Generated card for this record, used when it has no image of its own. */
  fallbackCard?: SocialCardSpec;
  publishedTime?: string | null;
  authors?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = withSiteName(title);
  const socialImage: SocialImage = image
    ? resolveSocialImage({ src: image, alt: imageAltOverride ?? title, width: imageWidth, height: imageHeight })
    : fallbackCard
      ? resolveSocialImage({ src: cardPath(fallbackCard.key), alt: fallbackCard.alt })
      : defaultSocialImage();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [socialImage],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors?.length ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [
        {
          url: socialImage.url,
          alt: socialImage.alt,
        },
      ],
    },
  };
}

export function buildNotFoundMetadata(title: string): Metadata {
  return {
    title,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/images/akomapa-logo.png"),
    sameAs: [
      "https://www.facebook.com/people/Akomapa-health/100070235658941/",
      "https://www.instagram.com/akomapahealth/",
      "https://www.linkedin.com/company/akomapahealth/posts/?feedView=all",
      "https://www.tiktok.com/@akomapahealth",
    ],
    description: DEFAULT_DESCRIPTION,
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function buildWebPageJsonLd(path: string) {
  const route = getRouteSeo(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: route.title,
    description: route.description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function buildArticleJsonLd({
  title,
  description,
  path,
  image,
  publishedTime,
  author,
  authors,
  type = "Article",
  sameAs,
  isPartOf,
  fallbackCard,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  fallbackCard?: SocialCardSpec;
  publishedTime?: string | null;
  /** Single author. Ignored when `authors` is provided. */
  author?: string;
  /** Multiple authors, each emitted as a schema.org Person. */
  authors?: string[];
  type?: "Article" | "ScholarlyArticle";
  /** Canonical external identifiers for the same work (DOI URL, publisher page). */
  sameAs?: string[];
  /** Journal or periodical the work appears in. */
  isPartOf?: string;
}) {
  const authorList = authors?.length ? authors : author ? [author] : [];
  const authorValue = authorList.map((name) => ({
    "@type": "Person",
    name,
  }));

  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: title,
    description,
    url: absoluteUrl(path),
    image: (image
      ? resolveSocialImage({ src: image, alt: title })
      : fallbackCard
        ? resolveSocialImage({ src: cardPath(fallbackCard.key), alt: fallbackCard.alt })
        : defaultSocialImage()
    ).url,
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(authorValue.length === 1
      ? { author: authorValue[0] }
      : authorValue.length > 1
        ? { author: authorValue }
        : {}),
    ...(sameAs?.length ? { sameAs } : {}),
    ...(isPartOf
      ? { isPartOf: { "@type": "Periodical", name: isPartOf } }
      : {}),
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
