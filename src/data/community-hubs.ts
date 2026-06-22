import type { CommunityHub, HubMission } from "@/lib/types";

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

export const communityHubs: CommunityHub[] = [
  {
    id: "ucc-hub",
    slug: "akomapa-ucc",
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
      patientsServed: 1000,
      studentsTrained: 75,
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
      patientsServed: 0,
      studentsTrained: 0,
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
    name: "Akomapa–NHP Yale Community Health Hub",
    location: "New Haven, Connecticut",
    country: "United States",
    description:
      "A transnational adaptation of the Akomapa model that works with the Neighborhood Health Project to bring free blood-pressure and glucose screening, education, and referral support into trusted barbershops and salons.",
    image: "/highlights/yale-uni.jpg",
    color: "#0F4C5C",
    status: "active",
    missions: hubMissions,
    metrics: {
      patientsServed: 0,
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
