import type { Pillar } from "@/lib/types";

export const pillars: Pillar[] = [
  {
    id: "combat-ncd",
    title: "Combat the NCD Epidemic",
    description:
      "Improving access to prevention, screening, education, and care for non-communicable diseases in underserved communities.",
    icon: "HeartPulse",
    color: "#0097b2",
    features: [
      "Community Screening",
      "Health Education",
      "Referral Networks",
      "Longitudinal Care",
    ],
    link: "/ncd-impact",
  },
  {
    id: "develop-leaders",
    title: "Develop Future Leaders",
    description:
      "Equipping students with ethical leadership skills and mentorship to become the next generation of global health leaders.",
    icon: "GraduationCap",
    color: "#eeba2b",
    features: [
      "Ethical Leadership Academy",
      "Mentorship Programs",
      "Experiential Learning",
      "Leadership Curriculum",
    ],
    link: "/academy",
  },
  {
    id: "strengthen-communities",
    title: "Strengthen Communities",
    description:
      "Building long-term, equitable partnerships with communities to improve health outcomes and advance health equity.",
    icon: "Users",
    color: "#0F4C5C",
    features: [
      "Community Partnerships",
      "Health Equity",
      "Reciprocal Learning",
      "Sustainable Impact",
    ],
    link: "/community-hubs",
  },
  {
    id: "advance-innovation",
    title: "Advance Innovation",
    description:
      "Developing scalable solutions that strengthen health systems through research, technology, and quality improvement.",
    icon: "Lightbulb",
    color: "#66C4DC",
    features: [
      "Nkwapa EMR",
      "Digital Health",
      "Implementation Science",
      "Quality Improvement",
    ],
    link: "/research",
  },
];
