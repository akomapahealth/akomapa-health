import { uccCommunityStories, uccStudentStories } from "./hub-stories/ucc-stories";
import { ugCommunityStories, ugStudentStories } from "./hub-stories/ug-stories";
import { UG_TRAINING_FORM_URL } from "@/config/links";
import type {
  CommunityHub,
  HubLeaderReference,
  HubMission,
  HubRoster,
  HubRouteSlug,
} from "@/lib/types";
import { resolveHubLeadership } from "@/data/team";

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
    title: "Volunteer stories are coming soon",
    description:
      "Leadership journeys and reflections from volunteers at this hub will be shared here.",
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

export const uccLeadershipConfig = [
  { personId: "member-osei-kwarkye-bonsu-tony", role: "Faculty Recruitment Lead" },
  { personId: "member-djan-patrick-nyarko", role: "Finance Officer" },
  { personId: "member-adeporka-awinibota-peter", role: "Follow-up Team Lead" },
  { personId: "member-ampomah-prince-peprah", role: "Research Lead" },
  { personId: "member-anane-sarah-adomah", role: "Community Outreach" },
  { personId: "member-david-konadu-kombate", role: "Co-Director", featured: true },
  { personId: "member-araba-nyakoa-amartey", role: "Research Lead" },
  { personId: "member-justice-marvel-yaw-anieku", role: "Co-Director", featured: true },
  {
    personId: "member-evans-worae-obeng",
    role: "Volunteer Recruitment and Scheduling Team Lead",
  },
  { personId: "member-kingsley-botchwey", role: "Media Lead" },
  { personId: "member-vanessa-borna", role: "Follow-up Lead" },
  { personId: "member-batanye-joseph", role: "Finance Officer" },
  { personId: "member-lydia-ira", role: "Logistics and Supplies Lead" },
  {
    personId: "member-osei-owusu-raphael",
    role: "Training and Standards Co-Lead",
  },
  { personId: "member-akua-asiedu-sekyi", role: "Training and Standards Lead" },
  { personId: "member-oheneba-pearl", role: "Community Outreach" },
  {
    personId: "member-beatrice-edinam-tsikata",
    role: "Volunteer Recruitment and Scheduling Team Lead",
  },
  { personId: "member-bukari-yaw-waidu", role: "Community Liaison Lead" },
  {
    personId: "member-queenster-opoku-aduse",
    role: "Logistics and Supplies Manager",
  },
] as const satisfies readonly HubLeaderReference[];

export const uccHubRoster: HubRoster = {
  leadership: resolveHubLeadership(uccLeadershipConfig),
  volunteers: [
    {
      id: "ucc-volunteer-extra-1",
      image: "/ucc-team/volunteer-1.jpg",
      alt: "UCC Community Hub volunteer portrait 1 of 16",
    },
    {
      id: "ucc-volunteer-extra-2",
      image: "/ucc-team/volunteer-2.jpg",
      alt: "UCC Community Hub volunteer portrait 2 of 16",
    },
    {
      id: "ucc-volunteer-extra-3",
      image: "/ucc-team/volunteer-3.jpg",
      alt: "UCC Community Hub volunteer portrait 3 of 16",
    },
    {
      id: "ucc-volunteer-1",
      image: "/ucc-team/volunteers/akomapa-ucc-volunteer-1.jpg",
      alt: "UCC Community Hub volunteer portrait 4 of 16",
    },
    {
      id: "ucc-volunteer-2",
      image: "/ucc-team/volunteers/akomapa-ucc-volunteer-2.jpg",
      alt: "UCC Community Hub volunteer portrait 5 of 16",
    },
    {
      id: "ucc-volunteer-3",
      image: "/ucc-team/volunteers/akomapa-ucc-volunteer-3.jpg",
      alt: "UCC Community Hub volunteer portrait 6 of 16",
    },
    {
      id: "ucc-volunteer-4",
      image: "/ucc-team/volunteers/akomapa-ucc-volunteer-4.jpg",
      alt: "UCC Community Hub volunteer portrait 7 of 16",
    },
    {
      id: "ucc-volunteer-5",
      image: "/ucc-team/volunteers/akomapa-ucc-volunteer-5.jpg",
      alt: "UCC Community Hub volunteer portrait 8 of 16",
    },
    {
      id: "ucc-volunteer-6",
      image: "/ucc-team/volunteers/akomapa-ucc-volunteer-6.jpg",
      alt: "UCC Community Hub volunteer portrait 9 of 16",
    },
    {
      id: "ucc-volunteer-7",
      image: "/ucc-team/volunteers/akomapa-ucc-volunteer-7.jpg",
      alt: "UCC Community Hub volunteer portrait 10 of 16",
    },
    {
      id: "ucc-volunteer-8",
      image: "/ucc-team/volunteers/akomapa-ucc-volunteer-8.jpg",
      alt: "UCC Community Hub volunteer portrait 11 of 16",
    },
    {
      id: "ucc-volunteer-9",
      image: "/ucc-team/volunteers/akomapa-ucc-volunteer-9.jpg",
      alt: "UCC Community Hub volunteer portrait 12 of 16",
    },
    {
      id: "ucc-volunteer-10",
      image: "/ucc-team/volunteers/akomapa-ucc-volunteer-10.jpg",
      alt: "UCC Community Hub volunteer portrait 13 of 16",
    },
    {
      id: "ucc-volunteer-11",
      image: "/ucc-team/volunteers/akomapa-ucc-volunteer-11.jpg",
      alt: "UCC Community Hub volunteer portrait 14 of 16",
    },
    {
      id: "ucc-volunteer-12",
      image: "/ucc-team/volunteers/akomapa-ucc-volunteer-12.jpg",
      alt: "UCC Community Hub volunteer portrait 15 of 16",
    },
    {
      id: "ucc-volunteer-13",
      image: "/ucc-team/volunteers/akomapa-ucc-volunteer-13.jpg",
      alt: "UCC Community Hub volunteer portrait 16 of 16",
    },
  ],
};

/**
 * UG student leadership roster. Volunteer/non-executive portraits are withheld
 * until names and images are confirmed — keep `volunteers` empty (and do not
 * attach `pending.volunteers`) so the volunteer band stays commented out of the
 * page until that data ships.
 */
export const ugLeadershipConfig = [
  { personId: "executive-divina-afenyo", role: "UG Hub Co-Director" },
  { personId: "priscilla-afriyie-adomako", role: "Co-Director" },
  { personId: "victor-owusu-barnieh", role: "Media Lead" },
  { personId: "kelvin-akoto-boateng", role: "Financial Officer" },
  { personId: "nana-ekow-moses", role: "Follow-up Lead" },
  { personId: "rachael-akusika-adu", role: "Follow-up Lead" },
  { personId: "jil-owusu-ansah", role: "Community Liaison Officer" },
  { personId: "esther-bray", role: "Community Liaison Officer" },
  { personId: "maxwell-abiam-danso", role: "Volunteer Recruitment Lead" },
  { personId: "joseph-at-bron", role: "Volunteer Recruitment Lead" },
  { personId: "akua-bowaa-essah", role: "Faculty Recruitment Lead" },
  { personId: "edugie-osunde", role: "Financial Officer" },
  { personId: "denzel-nketia-achiampong", role: "Research Co-Lead" },
  { personId: "austin-afutu", role: "Training & Standards Coordinator" },
  { personId: "nneoma-orji-okoro", role: "Faculty Recruitment Lead" },
  { personId: "georgina-garbrah", role: "Community Liaison Officer" },
] as const satisfies readonly HubLeaderReference[];

export const ugHubRoster: HubRoster = {
  leadershipPresentation: "compact-modal",
  leadership: resolveHubLeadership(ugLeadershipConfig),
  // Volunteers section intentionally omitted until portraits and bios are ready.
  volunteers: [],
  // pending.volunteers commented out until the non-executive portrait grid ships:
  // pending: {
  //   volunteers: {
  //     monogram: "UG",
  //     description:
  //       "Volunteer portraits will appear here as the UG cohort grows...",
  //     cta: {
  //       label: "Apply now",
  //       href: UG_TRAINING_FORM_URL,
  //       external: true,
  //     },
  //   },
  // },
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
    heroPresentation: "background",
    color: "#0097b2",
    status: "active",
    missions: hubMissions,
    metrics: {
      communityMembersServed: 3000,
      studentsTrained: 250,
      communitiesReached: 2,
      partnersEngaged: 3,
    },
    communityStories: uccCommunityStories,
    studentStories: uccStudentStories,
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
      "Akomapa's University of Ghana Community Health Hub is officially open. Students across all UG campuses can apply for the General Training Programme and join supervised community-based NCD prevention, education, and interprofessional learning.",
    image: "/highlights/ug.jpg",
    heroPresentation: "background",
    color: "#eeba2b",
    status: "active",
    missions: hubMissions,
    metrics: {
      communityMembersServed: 0,
      studentsTrained: 50,
      communitiesReached: 0,
      partnersEngaged: 4,
    },
    communityStories: ugCommunityStories,
    studentStories: ugStudentStories,
    facultyMentorship: {
      model:
        "Faculty, university leaders, health-system partners, and Akomapa mentors supervise interprofessional student teams as the UG hub delivers community health activities and leadership training.",
      mentors: ["alfred-yawson", "esi-berkoh", "patrick-ampofo"],
    },
    research: [],
    innovations: [],
    roster: ugHubRoster,
    cta: {
      label: "Apply now",
      href: UG_TRAINING_FORM_URL,
      external: true,
    },
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
