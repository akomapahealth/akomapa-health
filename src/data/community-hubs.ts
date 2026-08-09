import type {
  CommunityHub,
  HubMission,
  HubRoster,
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

export const uccHubRoster: HubRoster = {
  leadership: [
    {
      id: "david-ofosu",
      name: "David Ofosu",
      role: "Co-Director",
      affiliation: "Medical Student",
      image: "/ucc-team/david_kojo_ofosu.JPG",
      featured: true,
    },
    {
      id: "hafiz-shaban",
      name: "Hafiz Shaban",
      role: "Co-Director",
      affiliation: "Nursing Student",
      image: "/ucc-team/hafiz_shaban.JPG",
      featured: true,
    },
    {
      id: "getwell-essuman",
      name: "Getwell Essuman",
      role: "Volunteer Recruitment Co-Lead",
      affiliation: "Medical Laboratory Science Student",
      image: "/ucc-team/getwell_ebiram_essuman.JPG",
    },
    {
      id: "david-konadu-kombate",
      name: "David Konadu Kombate",
      role: "Volunteer Recruitment Co-Lead",
      affiliation: "Medical Laboratory Science Student",
      image: "/ucc-team/david_konadu_kombate.JPG",
    },
    {
      id: "wilfred-obeng",
      name: "Wilfred Obeng",
      role: "Training & Standards Coordinator",
      affiliation: "Medical Student",
      image: "/ucc-team/wilfred_obeng.JPG",
    },
    {
      id: "belinda-odoom",
      name: "Belinda Odoom",
      role: "Training & Standards Coordinator",
      affiliation: "Nursing Student",
      image: "/ucc-team/belinda_odoom.JPG",
    },
    {
      id: "geraldine-cristal-apeadua-agyapong",
      name: "Geraldine-Cristal Apeadua Agyapong",
      role: "Finance Officer",
      affiliation: "Medical Student",
      image: "/ucc-team/geraldine_cristal_apeadua_agyepong.JPG",
    },
    {
      id: "frederick-baffour",
      name: "Frederick Baffour",
      role: "Finance Officer",
      affiliation: "Optometry Student",
      image: "/ucc-team/frederick_baffour.JPG",
    },
    {
      id: "gloria-tawiah-blay",
      name: "Gloria Tawiah Blay",
      role: "Community Engagement Liaison",
      affiliation: "Pharmacy Student",
      image: "/ucc-team/gloria_tawia_blay.JPG",
    },
    {
      id: "prince-nyarko",
      name: "Prince Nyarko",
      role: "Community Engagement Liaison",
      affiliation: "Optometry Student",
      image: "/ucc-team/prince_nyarkoh.JPG",
    },
    {
      id: "queenstar-aduse-opoku",
      name: "Queenstar Aduse Opoku",
      role: "Supplies & Logistics Manager",
      affiliation: "Pharmacy Student",
      image: "/ucc-team/queenster_aduse_opoku.JPG",
    },
    {
      id: "martha-bawa",
      name: "Martha Bawa",
      role: "Supplies & Logistics Manager",
      affiliation: "Nursing Student",
      image: "/ucc-team/martha_bawa.JPG",
    },
  ],
  volunteers: [
    {
      id: "ucc-volunteer-103",
      image: "/ucc-team/volunteers/Akomapa-103.jpg",
      alt: "UCC community hub volunteer in a teal Akomapa shirt standing outdoors",
    },
    {
      id: "ucc-volunteer-105",
      image: "/ucc-team/volunteers/Akomapa-105.jpg",
      alt: "UCC community hub volunteer in a navy Akomapa shirt with hands clasped",
    },
    {
      id: "ucc-volunteer-104",
      image: "/ucc-team/volunteers/Akomapa-104.jpg",
      alt: "UCC community hub volunteer wearing glasses and a teal Akomapa shirt",
    },
    {
      id: "ucc-volunteer-106",
      image: "/ucc-team/volunteers/Akomapa-106.jpg",
      alt: "UCC community hub volunteer in a teal Akomapa shirt with arms folded",
    },
    {
      id: "ucc-volunteer-67",
      image: "/ucc-team/volunteers/Akomapa-67.jpg",
      alt: "Smiling UCC community hub volunteer in a teal Akomapa shirt",
    },
    {
      id: "ucc-volunteer-69",
      image: "/ucc-team/volunteers/Akomapa-69.jpg",
      alt: "UCC community hub volunteer wearing red glasses and a teal shirt",
    },
    {
      id: "ucc-volunteer-65",
      image: "/ucc-team/volunteers/Akomapa-65.jpg",
      alt: "UCC community hub volunteer in a navy shirt and colorful patterned skirt",
    },
    {
      id: "ucc-volunteer-48",
      image: "/ucc-team/volunteers/Akomapa-48.jpg",
      alt: "UCC community hub volunteer in a teal Akomapa shirt with arms folded",
    },
    {
      id: "ucc-volunteer-64",
      image: "/ucc-team/volunteers/Akomapa-64.jpg",
      alt: "Smiling UCC community hub volunteer in a navy shirt and light blue jeans",
    },
    {
      id: "ucc-volunteer-47",
      image: "/ucc-team/volunteers/Akomapa-47.jpg",
      alt: "UCC community hub volunteer in a navy Akomapa shirt standing outdoors",
    },
    {
      id: "ucc-volunteer-46",
      image: "/ucc-team/volunteers/Akomapa-46.jpg",
      alt: "Smiling UCC community hub volunteer in a navy Akomapa shirt",
    },
    {
      id: "ucc-volunteer-63",
      image: "/ucc-team/volunteers/Akomapa-63.jpg",
      alt: "UCC community hub volunteer in a teal shirt standing on a garden path",
    },
    {
      id: "ucc-volunteer-62",
      image: "/ucc-team/volunteers/Akomapa-62.jpg",
      alt: "UCC community hub volunteer in a teal Akomapa shirt with hands clasped",
    },
    {
      id: "ucc-volunteer-45",
      image: "/ucc-team/volunteers/Akomapa-45.jpg",
      alt: "Smiling UCC community hub volunteer in a navy shirt on a shaded walkway",
    },
    {
      id: "ucc-volunteer-66",
      image: "/ucc-team/volunteers/Akomapa-66.jpg",
      alt: "UCC community hub volunteer in a teal shirt wearing glasses outdoors",
    },
    {
      id: "ucc-volunteer-50",
      image: "/ucc-team/volunteers/Akomapa-50.jpg",
      alt: "UCC community hub volunteer in a teal Akomapa shirt standing in a garden",
    },
    {
      id: "ucc-volunteer-49",
      image: "/ucc-team/volunteers/Akomapa-49.jpg",
      alt: "UCC community hub volunteer in a navy shirt and tan trousers",
    },
    {
      id: "ucc-volunteer-71",
      image: "/ucc-team/volunteers/Akomapa-71.jpg",
      alt: "UCC community hub volunteer in a navy Akomapa shirt standing outdoors",
    },
    {
      id: "ucc-volunteer-51",
      image: "/ucc-team/volunteers/Akomapa-51.jpg",
      alt: "UCC community hub volunteer in a navy shirt with hands folded",
    },
    {
      id: "ucc-volunteer-55",
      image: "/ucc-team/volunteers/Akomapa-55.jpg",
      alt: "UCC community hub volunteer with long braids wearing a teal shirt",
    },
    {
      id: "ucc-volunteer-56",
      image: "/ucc-team/volunteers/Akomapa-56.jpg",
      alt: "UCC community hub volunteer in a teal Akomapa shirt with arms crossed",
    },
    {
      id: "ucc-volunteer-101",
      image: "/ucc-team/volunteers/Akomapa-101.jpg",
      alt: "Smiling UCC community hub volunteer in a navy shirt with arms crossed",
    },
    {
      id: "ucc-volunteer-72",
      image: "/ucc-team/volunteers/Akomapa-72.jpg",
      alt: "UCC community hub volunteer in a teal shirt standing before a garden",
    },
    {
      id: "ucc-volunteer-54",
      image: "/ucc-team/volunteers/Akomapa-54.jpg",
      alt: "Smiling UCC community hub volunteer in a teal shirt and pink skirt",
    },
    {
      id: "ucc-volunteer-59",
      image: "/ucc-team/volunteers/Akomapa-59.jpg",
      alt: "UCC community hub volunteer with braids wearing a navy Akomapa shirt",
    },
    {
      id: "ucc-volunteer-100",
      image: "/ucc-team/volunteers/Akomapa-100.jpg",
      alt: "UCC community hub volunteer in a navy shirt standing on a garden path",
    },
    {
      id: "ucc-volunteer-97",
      image: "/ucc-team/volunteers/Akomapa-97.jpg",
      alt: "UCC community hub volunteer in a teal Akomapa shirt outdoors",
    },
    {
      id: "ucc-volunteer-52",
      image: "/ucc-team/volunteers/Akomapa-52.jpg",
      alt: "Smiling UCC community hub volunteer in a teal shirt wearing a watch",
    },
    {
      id: "ucc-volunteer-53",
      image: "/ucc-team/volunteers/Akomapa-53.jpg",
      alt: "UCC community hub volunteer in a navy Akomapa shirt standing in a garden",
    },
    {
      id: "ucc-volunteer-95",
      image: "/ucc-team/volunteers/Akomapa-95.jpg",
      alt: "UCC community hub volunteer in a teal shirt on a paved campus path",
    },
    {
      id: "ucc-volunteer-70",
      image: "/ucc-team/volunteers/Akomapa-70.jpg",
      alt: "UCC community hub volunteer in a teal shirt with long braids",
    },
    {
      id: "ucc-volunteer-58",
      image: "/ucc-team/volunteers/Akomapa-58.jpg",
      alt: "UCC community hub volunteer in a navy shirt with hands clasped",
    },
    {
      id: "ucc-volunteer-61",
      image: "/ucc-team/volunteers/Akomapa-61.jpg",
      alt: "UCC community hub volunteer in a navy Akomapa shirt with arms folded",
    },
    {
      id: "ucc-volunteer-98",
      image: "/ucc-team/volunteers/Akomapa-98.jpg",
      alt: "UCC community hub volunteer in a navy shirt speaking with hands together",
    },
    {
      id: "ucc-volunteer-73",
      image: "/ucc-team/volunteers/Akomapa-73.jpg",
      alt: "UCC community hub volunteer in a teal shirt with arms crossed",
    },
    {
      id: "ucc-volunteer-75",
      image: "/ucc-team/volunteers/Akomapa-75.jpg",
      alt: "UCC community hub volunteer with braids wearing a navy shirt",
    },
  ],
};

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
    roster: uccHubRoster,
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
