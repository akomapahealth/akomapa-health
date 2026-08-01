import type { Metadata, MetadataRoute } from "next";

export const SITE_URL = "https://akomapahealth.org";
export const SITE_NAME = "Akomapa Health";
export const DEFAULT_TITLE =
  "Akomapa Health - Building Ethical Global Health Leaders";
export const DEFAULT_DESCRIPTION =
  "Akomapa develops ethical, community-centered global health leaders through healthcare service, leadership training, research, and equitable partnerships.";
export const DEFAULT_OG_IMAGE = "/opengraph-image";

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
};

export const canonicalSeoRoutes = [
  {
    path: "/",
    title: "Building Ethical Global Health Leaders",
    description:
      "Akomapa develops ethical, community-centered leaders through healthcare service, leadership training, research, and equitable partnerships.",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/about",
    title: "About Akomapa",
    description:
      "Learn about Akomapa's mission to develop ethical global health leaders who partner with communities to address the NCD epidemic.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/about/team",
    title: "Our Team",
    description:
      "Meet the student leaders, faculty mentors, and advisors driving Akomapa's mission forward through service, research, and partnership.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/philosophy",
    title: "Our Philosophy",
    description:
      "Discover Akomapa's core principles: ethical leadership, community partnership, reciprocal learning, and sustainable impact.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/academy",
    title: "Akomapa Academy",
    description:
      "Train to become an ethical global health leader through Akomapa's comprehensive curriculum, expert faculty, and hands-on experience.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/community-hubs",
    title: "Community Health Hubs",
    description:
      "Student-powered platforms addressing the NCD epidemic while developing future ethical health leaders through supervised community care.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/community-hubs/ucc",
    title: "UCC Community Health Hub",
    description:
      "Akomapa's flagship hub at the University of Cape Coast serves communities in Ghana's Central Region through student-powered NCD care.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/community-hubs/ug",
    title: "UG Community Health Hub",
    description:
      "Expanding community-centered NCD care to the Greater Accra Region through the University of Ghana and local health partners.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/community-hubs/nhp",
    title: "NHP Yale Community Health Hub",
    description:
      "Akomapa's transnational hub in New Haven, CT brings NCD screening and education to trusted barbershops, salons, and neighborhood spaces.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/ncd-impact",
    title: "NCD Impact",
    description:
      "How Akomapa addresses the silent epidemic of non-communicable diseases through prevention, screening, education, referrals, and care.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/impact",
    title: "Our Impact",
    description:
      "Explore measurable outcomes in community health, leadership development, research, partnerships, and health-system strengthening.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/partnerships",
    title: "Partnerships",
    description:
      "Build equitable collaborations with Akomapa across universities, communities, governments, health systems, and global organizations.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/partnerships/corporate-sponsorship",
    title: "Corporate Sponsorship",
    description:
      "Explore corporate sponsorship opportunities supporting Akomapa community health hubs, training grants, clinic care, pharmacy access, and sustainable programs.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/research",
    title: "Research & Innovation",
    description:
      "Explore student-led research, implementation science, and innovative solutions that strengthen community health systems and NCD care.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog",
    title: "Thought Leadership",
    description:
      "Read student essays, faculty reflections, and community voices on ethical global health, leadership, partnership, and community-centered care.",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/get-involved",
    title: "Get Involved",
    description:
      "Join Akomapa as a student leader, academy scholar, faculty mentor, researcher, partner, or supporter advancing ethical health leadership.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/donate",
    title: "Donate",
    description:
      "Support ethical global health leadership development and community health programs delivering prevention, screening, education, and care.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/contact",
    title: "Contact Us",
    description:
      "Get in touch with Akomapa Health Foundation about programs, partnerships, research, giving, media, or ways to join the movement.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/programs",
    title: "Programs",
    description:
      "Explore Akomapa programs connecting community health hubs, leadership training, immersion, youth advocacy, research, and sustainable care.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/programs/akomapa-ghltp",
    title: "Global Health Leadership Training",
    description:
      "Learn about Akomapa's certificate-bearing global health leadership training for ethical, community-centered emerging professionals.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/global-health-immersion-program",
    title: "Global Health Immersion Program",
    description:
      "Explore Akomapa's three-week learning experience in Ghana centered on supervised community health practice, research, ethical leadership, and cultural learning.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/programs/akomapa-young-advocates",
    title: "Akomapa Young Advocates",
    description:
      "Empower high school students with NCD prevention, mental wellness, mentorship, and leadership through Akomapa Young Advocates.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/programs/akomapa-network",
    title: "Akomapa Network",
    description:
      "Connect student-powered clinics and partners through Akomapa's global network for mentorship, research, and community health learning.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/programs/akomapa-foods",
    title: "Akomapa Foods & Stores",
    description:
      "Learn how Akomapa Foods and Stores link food security, economic empowerment, nutrition, and sustainable community health funding.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/news",
    title: "Akomapa News",
    description:
      "Read Akomapa news, awards, partnerships, program launches, and milestones shaping ethical leadership and student-powered care.",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    path: "/resources",
    title: "Healthcare Resources",
    description:
      "Access Akomapa educational resources, research publications, program tools, and materials supporting community health learning.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/roadmap",
    title: "Akomapa Roadmap",
    description:
      "Follow Akomapa's roadmap for launching, learning, scaling, and sustaining student-powered community health and leadership programs.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "Review Akomapa Health Foundation's privacy practices for website visitors, applicants, donors, partners, and community members.",
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description:
      "Read Akomapa Health Foundation's website terms covering acceptable use, content, donations, third-party services, and limitations.",
    changeFrequency: "yearly",
    priority: 0.4,
  },
] as const satisfies readonly SeoRoute[];

export const noindexRoutes = [
  {
    path: "/sentry-example-page",
    title: "Sentry Diagnostics",
    description:
      "A private diagnostics page for validating Akomapa Health Foundation error monitoring and frontend reporting behavior, excluded from search.",
  },
] as const;

export const canonicalSeoRouteMap = new Map<string, SeoRoute>(
  canonicalSeoRoutes.map((route) => [route.path, route]),
);

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

export function buildPageMetadata(path: string): Metadata {
  const route = getRouteSeo(path);
  const url = absoluteUrl(route.path);
  const socialTitle = withSiteName(route.title);

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
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - ${route.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: route.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function buildNoindexMetadata(path: string): Metadata {
  const route = noindexRoutes.find((item) => item.path === path);

  if (!route) {
    throw new Error(`Missing noindex metadata for route: ${path}`);
  }

  return {
    title: route.title,
    description: route.description,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export function buildArticleMetadata({
  title,
  description,
  path,
  image,
  publishedTime,
  authors,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  publishedTime?: string | null;
  authors?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = withSiteName(title);
  const imageUrl = image ?? DEFAULT_OG_IMAGE;

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
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors?.length ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
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
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  publishedTime?: string | null;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(image ?? DEFAULT_OG_IMAGE),
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(author
      ? {
          author: {
            "@type": "Person",
            name: author,
          },
        }
      : {}),
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
