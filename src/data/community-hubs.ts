import type {
  CommunityHub,
  HubMission,
  HubRouteSlug,
} from "@/lib/types";

export const hubMissions: HubMission[] = [
  {
    id: 1,
    title: "Improve Community Health",
    description:
      "Expand access to prevention, screening, education, referral support, and continuity of care.",
  },
  {
    id: 2,
    title: "Develop Future Leaders",
    description:
      "Give emerging health professionals supervised opportunities to practice ethical, interprofessional leadership.",
  },
  {
    id: 3,
    title: "Build Community Partnerships",
    description:
      "Co-design priorities and services with community leaders, residents, health facilities, and public institutions.",
  },
  {
    id: 4,
    title: "Generate Evidence",
    description:
      "Study community priorities, program implementation, and outcomes to strengthen practice and policy.",
  },
  {
    id: 5,
    title: "Pilot Innovation",
    description:
      "Test responsible technologies and quality-improvement approaches that can strengthen local health systems.",
  },
];

export const communityHubsListing = {
  headline: "Student-Powered Community Health Hubs",
  subheadline:
    "Akomapa's Community Learning & Care Hubs bring together students, faculty, health professionals, and communities to improve access to care while developing the next generation of ethical health leaders.",
  metadata: {
    title: "Community Health Hubs | Akomapa",
    description:
      "Explore Akomapa's student-powered community health hubs — platforms for healthcare delivery, leadership development, partnership, research, and innovation.",
  },
} as const;

export type HubActivityIcon =
  | "Stethoscope"
  | "ArrowRightLeft"
  | "BookOpen"
  | "Users"
  | "GraduationCap"
  | "HeartHandshake"
  | "FlaskConical"
  | "Lightbulb";

export const hubActivities: ReadonlyArray<{
  id: string;
  title: string;
  description: string;
  icon: HubActivityIcon;
}> = [
  {
    id: "screening",
    title: "Health Screening",
    description:
      "Community-based prevention and early detection for NCDs and related health risks.",
    icon: "Stethoscope",
  },
  {
    id: "referrals",
    title: "Clinical Referrals",
    description:
      "Pathways connecting community members to follow-up care and trusted local services.",
    icon: "ArrowRightLeft",
  },
  {
    id: "education",
    title: "Health Education",
    description:
      "Workshops and outreach that build health literacy in schools, workplaces, and neighborhoods.",
    icon: "BookOpen",
  },
  {
    id: "engagement",
    title: "Community Engagement",
    description:
      "Listening sessions, co-design, and ongoing partnership with local leaders and residents.",
    icon: "Users",
  },
  {
    id: "leadership",
    title: "Leadership Training",
    description:
      "Structured opportunities for students to practice ethical, community-centered leadership.",
    icon: "GraduationCap",
  },
  {
    id: "mentorship",
    title: "Student Mentorship",
    description:
      "Faculty and clinician mentors guiding students through supervised service and reflection.",
    icon: "HeartHandshake",
  },
  {
    id: "research",
    title: "Research Activities",
    description:
      "Student-led and community-based studies that turn local learning into actionable evidence.",
    icon: "FlaskConical",
  },
  {
    id: "innovation",
    title: "Innovation Pilots",
    description:
      "Testing digital tools, quality improvement, and new care models in real community settings.",
    icon: "Lightbulb",
  },
];

export const whyHubsMatter: ReadonlyArray<{
  id: string;
  title: string;
  description: string;
}> = [
  {
    id: "access",
    title: "Healthcare Access",
    description:
      "Hubs bring prevention, screening, education, and referral support closer to the communities that need them most.",
  },
  {
    id: "leadership",
    title: "Leadership Development",
    description:
      "Students gain supervised experience practicing ethical, interprofessional leadership alongside communities.",
  },
  {
    id: "partnership",
    title: "Community Partnership",
    description:
      "Programs are co-designed with local leaders so services reflect community priorities and strengths.",
  },
  {
    id: "research",
    title: "Research",
    description:
      "Hub activity generates evidence that strengthens programs, partnerships, and health-system practice.",
  },
  {
    id: "systems",
    title: "Health Systems Strengthening",
    description:
      "Innovation pilots and referral networks help build more connected, responsive local health systems.",
  },
];

export const hubEmptyStates = {
  communityStories: {
    title: "Community stories are coming soon",
    description:
      "We are gathering stories from patients, community leaders, and partners at this hub.",
    cta: { label: "Share your story", href: "/contact" },
  },
  studentStories: {
    title: "Student stories are coming soon",
    description:
      "Leadership journeys and reflections from students at this hub will be shared here.",
    cta: { label: "Get involved", href: "/get-involved" },
  },
  research: {
    title: "Research updates are coming soon",
    description:
      "Student-led and community-based research from this hub will be published here as it becomes available.",
    cta: { label: "Explore our research", href: "/research" },
  },
  innovation: {
    title: "Innovation updates are coming soon",
    description:
      "Technology pilots, quality improvement work, and other innovations tested at this hub will appear here.",
    cta: { label: "Learn about Nkwapa", href: "/research" },
  },
} as const;

export const communityHubs: CommunityHub[] = [
  {
    id: "ucc-hub",
    slug: "akomapa-ucc",
    routeSlug: "ucc",
    name: "Akomapa–UCC Community Health Hub",
    location: "Abeadze Dominase and Abura, Central Region",
    country: "Ghana",
    description:
      "Akomapa's first community learning and care hub partners with the University of Cape Coast, Ghana Health Service, and local leaders to provide NCD screening, education, referrals, and supervised student learning.",
    image: "/highlights/ucc.jpg",
    color: "#0097b2",
    status: "active",
    missions: hubMissions,
    metrics: {
      communityMembersServed: 3000,
      studentsTrained: 250,
      communitiesReached: 2,
      partnersEngaged: 3,
    },
    communityStories: [],
    studentStories: [],
    facultyMentorship: {
      model:
        "Interprofessional student teams lead defined activities under dual review and on-site supervision from licensed clinicians and faculty mentors.",
      mentors: ["derek-tuoyire", "martins-ekor"],
    },
    research: [],
    innovations: [],
  },
  {
    id: "ug-hub",
    slug: "akomapa-ug",
    routeSlug: "ug",
    name: "Akomapa–UG Community Health Hub",
    location: "Greater Accra Region",
    country: "Ghana",
    description:
      "An in-development partnership with the University of Ghana College of Health Sciences and national health partners, designed to expand community-based NCD prevention and interprofessional learning.",
    image: "/highlights/ug.jpg",
    color: "#eeba2b",
    status: "in-development",
    missions: hubMissions,
    metrics: {
      communityMembersServed: 0,
      studentsTrained: 50,
      communitiesReached: 0,
      partnersEngaged: 4,
    },
    communityStories: [],
    studentStories: [],
    facultyMentorship: {
      model:
        "Faculty, university leaders, health-system partners, and Akomapa mentors are establishing the governance and supervision model before launch.",
      mentors: ["alfred-yawson", "esi-berkoh", "patrick-ampofo"],
    },
    research: [],
    innovations: [],
  },
  {
    id: "nhp-yale-hub",
    slug: "akomapa-nhp",
    routeSlug: "nhp",
    name: "Akomapa–NHP Yale Community Health Hub",
    location: "New Haven, Connecticut",
    country: "United States",
    description:
      "A transnational adaptation of the Akomapa model that works with the Neighborhood Health Project to bring free blood-pressure and glucose screening, education, and referral support into trusted barbershops and salons.",
    image: "/highlights/yale-uni.jpg",
    color: "#0F4C5C",
    status: "future",
    missions: hubMissions,
    metrics: {
      communityMembersServed: 0,
      studentsTrained: 0,
      communitiesReached: 0,
      partnersEngaged: 3,
    },
    communityStories: [],
    studentStories: [],
    facultyMentorship: {
      model:
        "Yale-affiliated clinicians and community health leaders supervise student teams working alongside trusted local business owners.",
      mentors: ["jeremy-schwartz", "stacy-uchendu"],
    },
    research: [],
    innovations: [],
  },
];

export function getHubHref(hubOrId: CommunityHub | string): string {
  const hub =
    typeof hubOrId === "string"
      ? communityHubs.find(({ id }) => id === hubOrId)
      : hubOrId;

  if (!hub) {
    throw new Error(`Unknown community hub "${hubOrId}".`);
  }

  return `/community-hubs/${hub.routeSlug}`;
}

export function getHubByRouteSlug(slug: HubRouteSlug): CommunityHub {
  const hub = communityHubs.find(({ routeSlug }) => routeSlug === slug);

  if (!hub) {
    throw new Error(`Unknown community hub route "${slug}".`);
  }

  return hub;
}

export const hubRouteSlugs = ["ucc", "ug", "nhp"] as const satisfies readonly HubRouteSlug[];

export const hubBreadcrumbLabels: Record<HubRouteSlug, string> = {
  ucc: "Akomapa–UCC Community Health Hub",
  ug: "Akomapa–UG Community Health Hub",
  nhp: "Akomapa–NHP Yale Community Health Hub",
};
