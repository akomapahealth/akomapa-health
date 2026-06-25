import { academyOverview } from "@/data/academy";
import { communityHubs } from "@/data/community-hubs";

export type NcdNarrativeMetric = {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const goodIntentionsContent = {
  heading: "Good Intentions Are Not Enough",
  body:
    "For decades, global health has been driven by passionate individuals seeking to improve lives. Yet many well-intentioned efforts have struggled because they lacked community partnership, ethical reflection, or long-term sustainability. Akomapa exists to help build a different future.",
  cta: {
    label: "Our Philosophy",
    href: "/philosophy",
  },
  image: {
    src: "/highlights/Akomapa-73.jpg",
    alt: "Akomapa students and community partners gathering after a community health activity",
    position: "center",
  },
} as const;

export const studentsChangedContent = {
  heading: "Students Have Always Changed Healthcare",
  body:
    "Throughout history, students have challenged assumptions, advanced research, strengthened communities, and helped shape the future of medicine and public health. At Akomapa, we believe students are not simply the leaders of tomorrow — they are partners in creating change today.",
  cta: {
    label: "See how students lead",
    href: "/philosophy",
  },
  image: {
    src: "/highlights/Akomapa-40.jpg",
    alt: "Akomapa students learning together during a leadership development session",
    position: "center",
  },
} as const;

export const silentEpidemicContent = {
  heading: "The Silent Epidemic",
  body:
    "Non-communicable diseases are among the leading causes of death worldwide, yet millions remain undiagnosed, untreated, or disconnected from care. Akomapa was founded in response to this challenge. Through community partnership, ethical leadership development, and healthcare innovation, we are building a new generation of leaders committed to addressing the NCD epidemic and advancing health equity.",
  cta: {
    label: "Our Community Impact",
    href: "/ncd-impact",
  },
  image: {
    src: "/highlights/Akomapa-28.jpg",
    alt: "Akomapa health professionals conducting a community health screening",
    position: "center",
  },
  metrics: [
    {
      id: "annual-ncd-deaths",
      value: 43,
      suffix: " million",
      label: "people killed by NCDs in 2021",
    },
    {
      id: "lmic-share",
      value: 73,
      suffix: "%",
      label: "of NCD deaths occur in low- and middle-income countries",
    },
    {
      id: "premature-ncd-deaths",
      value: 18,
      suffix: " million",
      label: "people died from an NCD before age 70 in 2021",
    },
  ] as readonly NcdNarrativeMetric[],
  source: {
    label: "World Health Organization, September 25, 2025",
    href: "https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases",
  },
} as const;

export const academyPreviewContent = {
  heading: academyOverview.title,
  body: academyOverview.description,
  cta: {
    label: "Explore the Academy",
    href: "/academy",
  },
  image: {
    src: "/highlights/Akomapa-40.jpg",
    alt: "Akomapa students learning together during a leadership development session",
    position: "center",
  },
} as const;

const communityHubRoutes = {
  "ucc-hub": "/community-hubs/ucc",
  "ug-hub": "/community-hubs/ug",
  "nhp-yale-hub": "/community-hubs/nhp",
} as const;

function getCommunityHubRoute(hubId: string) {
  const href =
    communityHubRoutes[hubId as keyof typeof communityHubRoutes];

  if (!href) {
    throw new Error(`Missing homepage route for community hub "${hubId}".`);
  }

  return href;
}

export const communityHubsPreviewContent = {
  heading: "Community Health Hubs",
  subheading:
    "Student-powered platforms addressing the NCD epidemic while developing future health leaders.",
  hubs: communityHubs.map((hub) => ({
    ...hub,
    href: getCommunityHubRoute(hub.id),
  })),
} as const;
