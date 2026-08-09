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

export type ImmersionProgramVisualItem = ImmersionProgramItem & {
  image: ImmersionProgramImage;
};

export type ImmersionProgramContent = {
  eyebrow: string;
  applicationStatus: string;
  title: string;
  introduction: string;
  overview: readonly string[];
  vision: string;
  facts: readonly ImmersionProgramFact[];
  experiences: readonly ImmersionProgramVisualItem[];
  audiences: readonly ImmersionProgramVisualItem[];
  hostCities: {
    heading: string;
    name: string;
    status: string;
    description: string;
    image: ImmersionProgramImage;
  };
  images: {
    hero: ImmersionProgramImage & {
      videoSrc: string;
    };
    overview: ImmersionProgramImage;
  };
};

export const immersionProgram: ImmersionProgramContent = {
  eyebrow: "Global Health Immersion Program",
  applicationStatus: "Applications Opening Soon",
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
      title: "Community Partnership",
      description:
        "Work alongside local teams on priorities shaped by the communities they serve.",
      image: {
        src: "/highlights/Akomapa-66.jpg",
        alt: "Akomapa volunteers gathered together in a Ghanaian community",
        position: "center",
      },
    },
    {
      title: "Primary Care & Global Health",
      description:
        "See how prevention, screening, health education, and follow-up connect across care settings.",
      image: {
        src: "/highlights/Akomapa-40.jpg",
        alt: "A community member participating in a primary care eye screening",
        position: "center",
      },
    },
    {
      title: "Ethical Leadership",
      description:
        "Explore trust, power, sustainability, and responsibility through mentored discussion and reflection.",
      image: {
        src: "/gallery/gallery-pic-14.jpg",
        alt: "Students participating in a facilitated leadership discussion",
        position: "center",
      },
    },
    {
      title: "Cultural Immersion & Exchange",
      description:
        "Experience Ghana's history and culture while building genuine relationships across perspectives.",
      image: {
        src: "/akomapa-hangout/Akomapa_hangout-107.jpg",
        alt: "A diverse group of Akomapa participants gathering in Ghana",
        position: "center",
      },
    },
  ],
  audiences: [
    {
      title: "Undergraduate and Pre-Medical Students",
      description:
        "Students exploring medicine, public health, global health, or service.",
      image: {
        src: "/gallery/gallery-pic-10.jpg",
        alt: "Undergraduate students learning together in a classroom",
        position: "center",
      },
    },
    {
      title: "Health Professional Students",
      description:
        "Medical, nursing, pharmacy, public health, and allied health learners.",
      image: {
        src: "/highlights/Akomapa-12.jpg",
        alt: "Health professional students supporting community care in Ghana",
        position: "center",
      },
    },
    {
      title: "Graduate Students and Early-Career Professionals",
      description:
        "Graduate learners and emerging professionals ready to deepen ethical, community-centered practice.",
      image: {
        src: "/akomapa-hangout/Akomapa_hangout-31.jpg",
        alt: "An early-career professional connecting with peers at an Akomapa gathering",
        position: "center",
      },
    },
  ],
  hostCities: {
    heading: "Across Ghana",
    name: "Accra and Cape Coast",
    status: "One journey. Two host cities.",
    description:
      "Experience the energy of Accra and the history of Cape Coast through community learning, health systems exploration, cultural exchange, and time to reflect.",
    image: {
      src: "/akomapa-hangout/Akomapa_hangout-6.jpg",
      alt: "Akomapa participants exchanging ideas around a table in Ghana",
      position: "center",
    },
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
  },
};
