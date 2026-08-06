export type ImmersionProgramFact = {
  label: string;
  value: string;
  description: string;
};

export type ImmersionProgramItem = {
  title: string;
  description: string;
};

export type ImmersionProgramImage = {
  src: string;
  alt: string;
  position?: string;
};

export type ImmersionProgramContent = {
  eyebrow: string;
  title: string;
  introduction: string;
  overview: readonly string[];
  vision: string;
  facts: readonly ImmersionProgramFact[];
  experiences: readonly ImmersionProgramItem[];
  learningComponents: readonly ImmersionProgramItem[];
  audiences: readonly ImmersionProgramItem[];
  outcomes: readonly ImmersionProgramItem[];
  hostSite: {
    heading: string;
    name: string;
    status: string;
    description: string;
  };
  images: {
    hero: ImmersionProgramImage & {
      videoSrc: string;
    };
    overview: ImmersionProgramImage;
    hostSite: ImmersionProgramImage;
  };
};

export const immersionProgram: ImmersionProgramContent = {
  eyebrow: "Global Health Immersion Program",
  title: "Learn through partnership. Lead with understanding.",
  introduction:
    "A two-week global health experience in Ghana connecting emerging health leaders with community learning, primary care, ethical leadership, and cultural exchange.",
  overview: [
    "Move between health systems and community settings while learning through partnership, reflection, and Ghana's living history. Every experience is designed to build cultural humility and a deeper understanding of locally led health work.",
  ],
  vision:
    "Participants leave with a clearer understanding of community-centered health practice and a stronger foundation for ethical collaboration across cultures, disciplines, and health systems.",
  facts: [
    {
      label: "Duration",
      value: "Two weeks",
      description: "An immersive learning journey in Ghana.",
    },
    {
      label: "Host cities",
      value: "Accra & Cape Coast",
      description: "Two cities, one connected experience.",
    },
    {
      label: "Next cohort",
      value: "Coming 2027",
      description: "Applications opening soon.",
    },
  ],
  experiences: [
    {
      title: "Student-Powered Community Health Hubs",
      description:
        "Take part in supervised screening, counseling, health education, and follow-up alongside local student teams.",
    },
    {
      title: "Community Partnership Projects",
      description:
        "Develop engagement activities with local partners around priorities they identify.",
    },
    {
      title: "Applied Research",
      description:
        "Investigate public health questions through field-based qualitative and quantitative work.",
    },
    {
      title: "Mentored Seminars",
      description:
        "Work through cases with Akomapa mentors, university faculty, and global health practitioners.",
    },
    {
      title: "Health Systems Learning",
      description:
        "Study how national, regional, and community health services connect from policy to primary care.",
    },
    {
      title: "Leadership Circles",
      description:
        "Use facilitated reflection to examine ethics, power, responsibility, and cultural humility.",
    },
    {
      title: "Cultural Learning",
      description:
        "Engage Ghana's history and culture as essential context for responsible partnership.",
    },
  ],
  learningComponents: [
    {
      title: "Community-Based Practice",
      description:
        "Supervised participation in Akomapa's community health and education activities.",
    },
    {
      title: "Community-Based Research",
      description:
        "Small-group inquiry into real public health questions using qualitative and quantitative methods.",
    },
    {
      title: "Ethical Leadership",
      description:
        "Peer discussion that connects field experience with cultural humility, ethics, and systems thinking.",
    },
    {
      title: "Expert Seminars",
      description:
        "Faculty-led sessions on NCD prevention, health systems, research, and responsible practice.",
    },
    {
      title: "Capstone Reflection",
      description:
        "A final presentation of project findings and personal learning to peers, mentors, and community partners.",
    },
  ],
  audiences: [
    {
      title: "Undergraduate and Pre-Medical Students",
      description:
        "Students exploring medicine, global health, public health, or public service through community-centered learning.",
    },
    {
      title: "Health Professional Students",
      description:
        "Medical, nursing, pharmacy, public health, and allied health students seeking interprofessional experience.",
    },
    {
      title: "Graduate Students and Early-Career Professionals",
      description:
        "Emerging professionals committed to ethical global engagement and stronger health systems.",
    },
  ],
  outcomes: [
    {
      title: "Cross-Cultural Collaboration",
      description:
        "Practice listening, communicating, and working responsibly across cultures and disciplines.",
    },
    {
      title: "Community-Defined Problem Solving",
      description:
        "Learn to begin with local priorities and build responses with community partners.",
    },
    {
      title: "Supervised, Student-Powered Care",
      description:
        "Understand how students contribute meaningfully while licensed professionals retain clinical oversight.",
    },
    {
      title: "Reflective Leadership",
      description:
        "Connect practical experience with ethical reasoning, humility, and professional responsibility.",
    },
  ],
  hostSite: {
    heading: "First host site",
    name: "University of Ghana, Legon",
    status: "Next cohort details forthcoming",
    description:
      "Dates, fees, and application timing will be published after they are confirmed. Prospective participants can register interest now to request an update.",
  },
  images: {
    hero: {
      videoSrc: "/immersion-hero.mp4",
      src: "/highlights/Akomapa-40.jpg",
      alt: "A community member taking part in an Akomapa health program in Ghana",
      position: "center",
    },
    overview: {
      src: "/highlights/Akomapa-66.jpg",
      alt: "Students taking part in a supervised community health learning experience",
      position: "center",
    },
    hostSite: {
      src: "/highlights/Akomapa-12.jpg",
      alt: "Akomapa participants gathered during a health program in Ghana",
      position: "center",
    },
  },
};
