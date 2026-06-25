import type { Pillar } from "@/lib/types";

export const pillars: Pillar[] = [
  {
    id: "combat-ncd",
    title: "Combat the NCD Epidemic",
    description:
      "Improving access to prevention, screening, education, and care for non-communicable diseases in underserved communities.",
    image: {
      src: "/highlights/Akomapa-62.jpg",
      alt: "Akomapa health screening volunteers working with community members",
      position: "center",
    },
    color: "#0097b2",
    features: [
      "Community Screening",
      "Health Education",
      "Referral Networks",
      "Longitudinal Care",
    ],
    link: "/ncd-impact",
    ctaLabel: "See the NCD response",
  },
  {
    id: "develop-leaders",
    title: "Develop Future Leaders",
    description:
      "Equipping students with ethical leadership skills and mentorship to become the next generation of global health leaders.",
    image: {
      src: "/highlights/Akomapa-20.jpg",
      alt: "Akomapa student leaders learning together during a community health program",
      position: "center",
    },
    color: "#eeba2b",
    features: [
      "Ethical Leadership Academy",
      "Mentorship Programs",
      "Experiential Learning",
      "Leadership Curriculum",
    ],
    link: "/academy",
    ctaLabel: "Step into the Academy",
  },
  {
    id: "strengthen-communities",
    title: "Strengthen Communities",
    description:
      "Building long-term, equitable partnerships with communities to improve health outcomes and advance health equity.",
    image: {
      src: "/highlights/ucc.jpg",
      alt: "Akomapa community health hub partners gathered at the University of Cape Coast",
      position: "center",
    },
    color: "#0F4C5C",
    features: [
      "Community Partnerships",
      "Health Equity",
      "Reciprocal Learning",
      "Sustainable Impact",
    ],
    link: "/community-hubs",
    ctaLabel: "Visit the community hubs",
  },
  {
    id: "advance-innovation",
    title: "Advance Innovation",
    description:
      "Developing scalable solutions that strengthen health systems through research, technology, and quality improvement.",
    image: {
      src: "/highlights/Akomapa-28.jpg",
      alt: "Akomapa students reviewing research and health systems work together",
      position: "center",
    },
    color: "#66C4DC",
    features: [
      "Nkwapa EMR",
      "Digital Health",
      "Implementation Science",
      "Quality Improvement",
    ],
    link: "/research",
    ctaLabel: "Explore what we're building",
  },
];
