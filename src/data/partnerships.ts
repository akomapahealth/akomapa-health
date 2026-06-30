import type { Partner, PartnerLogo } from "@/lib/types";

// ---------------------------------------------------------------------------
// Partners (primary data)
// ---------------------------------------------------------------------------

export const partners: Partner[] = [
  {
    id: "university-of-cape-coast",
    name: "University of Cape Coast",
    logo: "/images/partners/ucc.png",
    description:
      "A founding university partner supporting community health delivery, interprofessional student leadership, faculty mentorship, and research in Ghana's Central Region.",
    category: "university",
    website: "https://ucc.edu.gh/",
    country: "Ghana",
  },
  {
    id: "university-of-ghana",
    name: "University of Ghana",
    logo: "/images/partners/ug-logo.png",
    description:
      "An academic partner developing a Greater Accra community health hub through the College of Health Sciences and an interprofessional learning model.",
    category: "university",
    website: "https://www.ug.edu.gh/",
    country: "Ghana",
  },
  {
    id: "yale-university",
    name: "Yale University",
    logo: "/images/partners/yale-uni-logo.png",
    description:
      "A university partner contributing student leadership, faculty expertise, research collaboration, and the New Haven community health hub model.",
    category: "university",
    website: "https://www.yale.edu/",
    country: "United States",
  },
  {
    id: "ucla",
    name: "University of California, Los Angeles",
    logo: "/images/partners/ucla.png",
    description:
      "An academic collaborator whose faculty and learners contribute to mentorship, clinical education, research, and ethical leadership development.",
    category: "university",
    website: "https://www.ucla.edu/",
    country: "United States",
  },
  {
    id: "community-partners",
    name: "Community Leaders and Institutions",
    logo: "/images/partners/local-coops-logo.svg",
    description:
      "Traditional leaders, residents, health facilities, churches, schools, barbershops, salons, and local organizations that co-design and sustain community health work.",
    category: "community",
    country: "Ghana and the United States",
  },
  {
    id: "ghana-health-service",
    name: "Ghana Health Service",
    logo: "/images/partners/ghana-health-service-logo.png",
    description:
      "A national health-system partner supporting alignment with public-health priorities, referral pathways, clinical standards, and sustainable service delivery.",
    category: "government",
    website: "https://ghs.gov.gh/",
    country: "Ghana",
  },
  {
    id: "african-health-innovation-centre",
    name: "African Health Innovation Centre",
    logo: "/images/partners/african-health-logo.png",
    description:
      "A global collaborator advancing health innovation, entrepreneurship, mentorship, and practical solutions for stronger African health systems.",
    category: "global",
    website: "https://africanhealthinnovation.org/",
    country: "Ghana",
  },
];

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const partnershipsHeroContent = {
  eyebrow: "Collaboration",
  heading: "Our Partnerships",
  subtitle: "Building Together, Not For",
  description:
    "Creating equitable collaborations across institutions, disciplines, and countries to advance global health equity.",
  ctas: [
    {
      label: "Become a Partner",
      href: "#become-a-partner",
      variant: "amber" as const,
    },
    {
      label: "Our Philosophy",
      href: "/philosophy",
      variant: "teal" as const,
    },
  ],
  image: {
    src: "/highlights/Akomapa-10.jpg",
    alt: "Akomapa partners and student leaders collaborating in community",
  },
} as const;

// ---------------------------------------------------------------------------
// Partnership Philosophy
// ---------------------------------------------------------------------------

export const partnershipPhilosophyContent = {
  eyebrow: "Our Approach",
  heading: "How We Partner",
  description:
    "Akomapa brings communities, universities, health professionals, researchers, and supporters together around shared goals and mutual accountability. Every partnership is designed to strengthen local capacity and create lasting impact.",
  principles: [
    {
      icon: "Handshake",
      title: "Equity",
      description:
        "Every partnership is built on mutual respect, shared decision-making, and equitable distribution of responsibilities and benefits.",
    },
    {
      icon: "RefreshCw",
      title: "Reciprocity",
      description:
        "We learn as much as we contribute. Knowledge and expertise flow in every direction across our partnerships.",
    },
    {
      icon: "Shield",
      title: "Accountability",
      description:
        "Partners hold each other accountable to communities, to ethical standards, and to the outcomes we commit to together.",
    },
    {
      icon: "Sprout",
      title: "Sustainability",
      description:
        "We design partnerships that strengthen local systems and outlast any single project or funding cycle.",
    },
  ],
  quote: {
    text: "We build partnerships, not dependencies.",
    attribution: "Akomapa Health Foundation",
  },
} as const;

// ---------------------------------------------------------------------------
// Category metadata
// ---------------------------------------------------------------------------

export const partnerCategoryMeta: Record<
  Partner["category"],
  { eyebrow: string; heading: string; description: string }
> = {
  university: {
    eyebrow: "Academic Collaborators",
    heading: "University Partnerships",
    description:
      "Universities collaborate on leadership development, research, mentorship, and responsible experiential learning — building pipelines for ethical global health practice.",
  },
  community: {
    eyebrow: "Community Collaborators",
    heading: "Community Partnerships",
    description:
      "Traditional leaders, residents, health facilities, churches, schools, and local organizations co-design and sustain community health work as equal stakeholders.",
  },
  government: {
    eyebrow: "Government Collaborators",
    heading: "Government Partnerships",
    description:
      "National and regional health authorities help align our work with public-health priorities, referral pathways, clinical standards, and sustainable service delivery.",
  },
  global: {
    eyebrow: "Global Collaborators",
    heading: "Global Partnerships",
    description:
      "International organizations and collaborators advance health innovation, entrepreneurship, mentorship, and practical solutions for stronger health systems.",
  },
};

export const categoryOrder: Partner["category"][] = [
  "university",
  "community",
  "government",
  "global",
];

// ---------------------------------------------------------------------------
// Logo grid (all partner / collaborator logos)
// ---------------------------------------------------------------------------

export const allPartnerLogos: PartnerLogo[] = [
  {
    name: "Yale University",
    logo: "/images/partners/yale-uni-logo.png",
    url: "https://www.yale.edu/",
  },
  {
    name: "University of Cape Coast",
    logo: "/images/partners/ucc.png",
    url: "https://ucc.edu.gh/",
  },
  {
    name: "University of Ghana",
    logo: "/images/partners/ug-logo.png",
    url: "https://www.ug.edu.gh/",
  },
  {
    name: "UCLA",
    logo: "/images/partners/ucla.png",
    url: "https://www.ucla.edu/",
  },
  {
    name: "Ghana Health Service",
    logo: "/images/partners/ghana-health-service-logo.png",
    url: "https://ghs.gov.gh/",
  },
  {
    name: "African Health Innovation Centre",
    logo: "/images/partners/african-health-logo.png",
    url: "https://africanhealthinnovation.org/",
  },
  {
    name: "Yale School of Medicine",
    logo: "/images/partners/yale-logo.png",
  },
  {
    name: "Tsai Center for Innovative Thinking",
    logo: "/images/partners/tsai-city-logo.png",
  },
  {
    name: "Africa Health Collaborative",
    logo: "/images/partners/africa-health-collab.png",
  },
  {
    name: "African Innovation Institute",
    logo: "/images/partners/AII-logo.png",
  },
  {
    name: "AFC",
    logo: "/images/partners/afc-logo.png",
  },
  {
    name: "Mastercard Foundation",
    logo: "/images/partners/mastercard-foundation.png",
  },
  {
    name: "Yale African Innovation",
    logo: "/images/partners/yale-african-innovation.webp",
  },
  {
    name: "UCC",
    logo: "/images/partners/ucc-logo.webp",
    url: "https://ucc.edu.gh/",
  },
  {
    name: "UCLA",
    logo: "/images/partners/ucla-logo.png",
    url: "https://www.ucla.edu/",
  },
];

// ---------------------------------------------------------------------------
// Become a Partner CTA
// ---------------------------------------------------------------------------

export const becomePartnerContent = {
  eyebrow: "Join Us",
  heading: "Become a Partner",
  description:
    "Whether you represent a university, community organization, government agency, or global institution — there is a place for you in the Akomapa partnership network.",
  partnershipTypes: [
    { icon: "GraduationCap", label: "University" },
    { icon: "Stethoscope", label: "Clinical" },
    { icon: "FlaskConical", label: "Research" },
    { icon: "HandCoins", label: "Funding" },
    { icon: "Users", label: "Community" },
  ],
  ctas: [
    {
      label: "Get in Touch",
      href: "/contact",
      variant: "amber" as const,
    },
    {
      label: "Corporate Sponsorship",
      href: "/partnerships/corporate-sponsorship",
      variant: "teal" as const,
    },
  ],
} as const;
