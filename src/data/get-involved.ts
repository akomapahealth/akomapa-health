import type {
  GetInvolvedFaq,
  GetInvolvedOpportunity,
  Pathway,
} from "@/lib/types";
import { CONTACT } from "@/config/contact";
import { LEADERSHIP_APP_FORM_URL } from "@/config/links";

// ---------------------------------------------------------------------------
// Hero copy
// ---------------------------------------------------------------------------

export const getInvolvedHero = {
  eyebrow: "Engagement Pathways",
  title: "Get Involved",
  subtitle:
    "Choose a pathway that matches your goals — student leadership, Academy training, faculty mentorship, research, partnerships, or financial support.",
  image: {
    src: "/highlights/Akomapa-62.jpg",
    alt: "Akomapa student leaders and clinicians serving community members",
  },
} as const;

// ---------------------------------------------------------------------------
// Engagement pathways (primary data)
// ---------------------------------------------------------------------------

export const getInvolvedPathways: Pathway[] = [
  {
    id: "student-leader",
    icon: "User",
    title: "Become a Student Leader",
    description:
      "Join a Community Health Hub as a student leader. Gain hands-on experience in community-centered care while developing ethical leadership skills.",
    audience:
      "Health professional students (medical, nursing, pharmacy, public health, nutrition)",
    ctaLabel: "Apply Now",
    ctaHref: LEADERSHIP_APP_FORM_URL,
    external: true,
    accent: "#0097b2",
    featured: true,
  },
  {
    id: "academy",
    icon: "GraduationCap",
    title: "Join the Academy",
    description:
      "Enroll in the Akomapa Ethical Leadership Academy. Develop skills in ethical decision-making, community partnership, research methods, and systems thinking.",
    audience:
      "Students and emerging health professionals seeking structured leadership training",
    ctaLabel: "Explore the Academy",
    ctaHref: "/academy",
    accent: "#eeba2b",
    featured: true,
  },
  {
    id: "faculty-mentor",
    icon: "Stethoscope",
    title: "Become a Faculty Mentor",
    description:
      "Mentor the next generation of ethical health leaders. Supervise students at Community Health Hubs, contribute to the Academy curriculum, or advise on program development.",
    audience: "Licensed clinicians, faculty members, and senior health professionals",
    ctaLabel: "Learn More",
    ctaHref: "/contact",
    accent: "#0F4C5C",
  },
  {
    id: "research",
    icon: "FlaskConical",
    title: "Contribute to Research",
    description:
      "Join ongoing research projects, propose new studies, or collaborate on publications. Akomapa supports student-led and community-based research.",
    audience: "Researchers, academics, and students interested in global health research",
    ctaLabel: "View Research",
    ctaHref: "/research",
    accent: "#66C4DC",
  },
  {
    id: "partnerships",
    icon: "Handshake",
    title: "Partner With Akomapa",
    description:
      "Build an equitable partnership with Akomapa. Collaborate on community health programs, research, innovation, or leadership development.",
    audience: "Universities, organizations, community groups, and government agencies",
    ctaLabel: "Explore Partnerships",
    ctaHref: "/partnerships",
    accent: "#F5C94D",
  },
  {
    id: "donate",
    icon: "Heart",
    title: "Support Our Work",
    description:
      "Your donation funds community health programs, student training, research, and innovation. Every contribution makes a difference.",
    audience: "Anyone who wants to contribute financially",
    ctaLabel: "Donate",
    ctaHref: "/donate",
    accent: "#eeba2b",
  },
];

// ---------------------------------------------------------------------------
// Current opportunities
// ---------------------------------------------------------------------------

export const getInvolvedOpportunities: GetInvolvedOpportunity[] = [
  {
    id: "student-leader-cohort",
    title: "Student Leader Applications",
    description:
      "We welcome health professional students to join a Community Health Hub cohort and lead alongside faculty mentors.",
    status: "Rolling admissions",
    ctaLabel: "Apply Now",
    ctaHref: LEADERSHIP_APP_FORM_URL,
    external: true,
  },
  {
    id: "academy-enrollment",
    title: "Ethical Leadership Academy Enrollment",
    description:
      "Enroll in the next Academy learning experience covering ethical decision-making, community partnership, research, and systems thinking.",
    status: "Open",
    ctaLabel: "Explore the Academy",
    ctaHref: "/academy",
  },
  {
    id: "faculty-mentorship",
    title: "Faculty Mentorship Openings",
    description:
      "Clinicians and faculty can supervise students at hubs, contribute to the curriculum, or advise on program development.",
    status: "Ongoing",
    ctaLabel: "Get in Touch",
    ctaHref: "/contact",
  },
  {
    id: "partnership-inquiries",
    title: "Partnership & Research Inquiries",
    description:
      "Universities, organizations, and researchers can start an equitable collaboration or propose a community-based study.",
    status: "Ongoing",
    ctaLabel: "Explore Partnerships",
    ctaHref: "/partnerships",
  },
];

// ---------------------------------------------------------------------------
// Frequently asked questions
// ---------------------------------------------------------------------------

export const getInvolvedFaqs: GetInvolvedFaq[] = [
  {
    id: "who-can-join",
    question: "Who can get involved with Akomapa?",
    answer:
      "Health professional students, emerging professionals, licensed clinicians and faculty, researchers, partner institutions, and supporters all have a place. Each pathway above is designed for a specific audience and level of involvement.",
  },
  {
    id: "time-commitment",
    question: "How much time does it take?",
    answer:
      "It depends on the pathway. Student leaders commit to a Community Health Hub cohort with regular sessions, while faculty mentorship, research collaboration, and partnership roles are more flexible and can be scoped to your availability.",
  },
  {
    id: "eligibility",
    question: "Do I need prior global health experience?",
    answer:
      "No. Akomapa is built to develop ethical leaders from the ground up. We look for curiosity, commitment to community-centered care, and a willingness to learn rather than a specific résumé.",
  },
  {
    id: "students-outside-health",
    question: "I'm not a health professional student. Can I still contribute?",
    answer:
      "Yes. Beyond student leadership, you can partner with us, collaborate on research, mentor, or support our work financially. If you're unsure where you fit, reach out and we'll help you find the right path.",
  },
  {
    id: "how-to-start",
    question: "What's the best way to start?",
    answer:
      `Choose the pathway that matches your goals and follow its call to action. Still deciding? Email us at ${CONTACT.email.display} or visit our contact page and we'll point you in the right direction.`,
  },
];
