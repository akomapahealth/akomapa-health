export type AboutCategory = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: "GraduationCap" | "HeartHandshake" | "FlaskConical" | "Lightbulb" | "Handshake";
};

export type ExploreMoreCard = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export const aboutHero = {
  eyebrow: "Our Story",
  headline: "A Student-Powered Movement for Ethical Global Health Leadership",
  openingParagraph:
    "Akomapa was founded in response to the growing burden of non-communicable diseases and the urgent need for ethical, community-centered leadership in global health. We believe that students are not just the leaders of tomorrow — they are partners in creating change today. Through community-driven healthcare, leadership development, research, innovation, and equitable partnerships, we are building a new model for global health.",
} as const;

export const whatWeDoCategories: AboutCategory[] = [
  {
    id: "leadership",
    title: "Student Leadership Development",
    description:
      "Training ethical leaders through the Academy and experiential learning.",
    href: "/academy",
    icon: "GraduationCap",
  },
  {
    id: "community-health",
    title: "Community Health",
    description:
      "Community Learning & Care Hubs addressing non-communicable diseases.",
    href: "/community-hubs",
    icon: "HeartHandshake",
  },
  {
    id: "research",
    title: "Research",
    description: "Student-led and community-based research.",
    href: "/research",
    icon: "FlaskConical",
  },
  {
    id: "innovation",
    title: "Innovation",
    description: "Nkwapa, digital health, and quality improvement.",
    href: "/research",
    icon: "Lightbulb",
  },
  {
    id: "partnerships",
    title: "Partnerships",
    description:
      "University, community, government, and global collaborations.",
    href: "/partnerships",
    icon: "Handshake",
  },
];

export const exploreMoreCards: ExploreMoreCard[] = [
  {
    id: "philosophy",
    title: "Our Philosophy",
    description:
      "Explore the principles that guide our approach to ethical global health leadership.",
    href: "/philosophy",
  },
  {
    id: "team",
    title: "Our Team",
    description:
      "Meet the dedicated professionals and student leaders making our work possible.",
    href: "/about/team",
  },
  {
    id: "impact",
    title: "Our Impact",
    description:
      "See how we are measuring progress across community health and leadership development.",
    href: "/impact",
  },
  {
    id: "partners",
    title: "Our Partners",
    description:
      "Discover the organizations we collaborate with to expand our reach and impact.",
    href: "/partnerships",
  },
];
