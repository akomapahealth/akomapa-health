import { teamMembers } from "@/data/team";
import type {
  AcademyCurriculum,
  FacultyMember,
  TeamMember,
  Testimonial,
} from "@/lib/types";

export const academyOverview = {
  title: "Training Ethical Leaders for a Changing World",
  description:
    "The Akomapa Academy prepares students and emerging health professionals to navigate the ethical, relational, and systems challenges of global health. Its semester-long learning experience combines faculty dialogue, case-based study, community practice, mentorship, and a capstone project.",
  whyItMatters:
    "Health professionals make decisions that affect communities, institutions, and public trust. Ethical leadership helps them examine power, listen across differences, use evidence responsibly, and build solutions with the people those solutions are intended to serve.",
} as const;

export const academyCurriculum: AcademyCurriculum = {
  totalDuration: "10–16 weeks",
  certificationName: "Akomapa Certificate in Global Health Leadership",
  certificationDescription:
    "Awarded to scholars who complete the core modules, participate in faculty and peer learning, and present an applied community-centered capstone project.",
  modules: [
    {
      id: "ethical-decision-making",
      title: "Ethical Leadership and Decision-Making",
      description:
        "Build a practical foundation for recognizing ethical tensions and making accountable decisions in complex health settings.",
      learningObjectives: [
        "Apply ethical frameworks to realistic global and community health cases",
        "Identify power imbalances, conflicts of interest, and unintended consequences",
        "Practice transparent reasoning and accountable decision-making",
      ],
      facultyContributors: ["derek-tuoyire", "jeremy-schwartz"],
      duration: "2 weeks",
      order: 1,
    },
    {
      id: "community-partnership",
      title: "Community Partnership and Shared Power",
      description:
        "Learn how equitable partnerships are formed, governed, evaluated, and sustained with communities.",
      learningObjectives: [
        "Distinguish consultation from meaningful shared decision-making",
        "Design engagement practices that respect community knowledge and priorities",
        "Develop accountability mechanisms for long-term partnerships",
      ],
      facultyContributors: ["derek-tuoyire", "alfred-yawson"],
      duration: "2 weeks",
      order: 2,
    },
    {
      id: "cultural-humility",
      title: "Cultural Humility and Reciprocal Learning",
      description:
        "Develop reflective habits for learning across cultures, professions, institutions, and lived experiences.",
      learningObjectives: [
        "Practice self-reflection and recognize assumptions that shape health work",
        "Use listening and dialogue to support reciprocal learning",
        "Respond constructively to uncertainty, disagreement, and feedback",
      ],
      facultyContributors: ["adrian-mayo", "derek-tuoyire"],
      duration: "1 week",
      order: 3,
    },
    {
      id: "ncd-health-equity",
      title: "NCDs, Prevention, and Health Equity",
      description:
        "Examine the non-communicable disease epidemic and the structural barriers that shape prevention, diagnosis, treatment, and follow-up.",
      learningObjectives: [
        "Explain how social and health-system factors influence NCD outcomes",
        "Connect prevention and screening to referral and longitudinal care",
        "Assess an NCD intervention through a health-equity lens",
      ],
      facultyContributors: ["jeremy-schwartz", "alfred-yawson"],
      duration: "2 weeks",
      order: 4,
    },
    {
      id: "systems-thinking",
      title: "Systems Thinking and Interprofessional Leadership",
      description:
        "Understand how people, policies, resources, incentives, and institutions interact within health systems.",
      learningObjectives: [
        "Map stakeholders and feedback loops in a health-system challenge",
        "Lead effectively across professional and institutional boundaries",
        "Identify leverage points for sustainable systems strengthening",
      ],
      facultyContributors: ["alfred-yawson", "adrian-mayo"],
      duration: "2 weeks",
      order: 5,
    },
    {
      id: "community-research",
      title: "Community-Based Research and Evidence",
      description:
        "Use research methods responsibly to answer community priorities and improve programs.",
      learningObjectives: [
        "Formulate useful, ethical, and community-relevant research questions",
        "Select appropriate qualitative and quantitative methods",
        "Plan responsible data collection, interpretation, and knowledge sharing",
      ],
      facultyContributors: ["jeremy-schwartz", "derek-tuoyire"],
      duration: "2 weeks",
      order: 6,
    },
    {
      id: "responsible-innovation",
      title: "Responsible Innovation and Quality Improvement",
      description:
        "Explore how technology, implementation science, and quality improvement can strengthen care without outpacing evidence or trust.",
      learningObjectives: [
        "Evaluate innovations for usefulness, safety, equity, and sustainability",
        "Design a measurable quality-improvement cycle",
        "Plan an implementation approach that can adapt to local context",
      ],
      facultyContributors: ["adrian-mayo", "jeremy-schwartz"],
      duration: "2 weeks",
      order: 7,
    },
    {
      id: "leadership-capstone",
      title: "Applied Leadership Capstone",
      description:
        "Integrate Academy learning in a practical proposal responding to a community-defined health challenge.",
      learningObjectives: [
        "Co-design a feasible intervention with a clear theory of change",
        "Define ethical safeguards, partnership roles, and measures of success",
        "Communicate and defend a proposal to faculty, peers, and community partners",
      ],
      facultyContributors: [
        "derek-tuoyire",
        "jeremy-schwartz",
        "adrian-mayo",
        "alfred-yawson",
      ],
      duration: "2 weeks",
      order: 8,
    },
  ],
};

type FacultyProfile = {
  teamMemberId: string;
  id: string;
  institution: string;
  specialties: string[];
};

const facultyProfiles: FacultyProfile[] = [
  {
    teamMemberId: "28",
    id: "derek-tuoyire",
    institution: "University of Cape Coast",
    specialties: [
      "Community medicine",
      "Population health",
      "Community-based research",
    ],
  },
  {
    teamMemberId: "31",
    id: "jeremy-schwartz",
    institution: "Yale University",
    specialties: [
      "Chronic care access",
      "Health systems",
      "Implementation science",
    ],
  },
  {
    teamMemberId: "32",
    id: "adrian-mayo",
    institution: "David Geffen School of Medicine at UCLA",
    specialties: [
      "Clinical education",
      "Ethical leadership",
      "Interprofessional collaboration",
    ],
  },
  {
    teamMemberId: "34",
    id: "alfred-yawson",
    institution: "University of Ghana",
    specialties: [
      "Public health",
      "Health professions education",
      "Health systems leadership",
    ],
  },
];

function toFacultyMember(
  profile: FacultyProfile,
  member: TeamMember,
): FacultyMember {
  return {
    id: profile.id,
    name: member.name,
    title: member.title,
    institution: profile.institution,
    bio: member.bio,
    image: member.image,
    specialties: profile.specialties,
    socialLinks: member.socialLinks && {
      linkedin:
        member.socialLinks.linkedin === "#"
          ? undefined
          : member.socialLinks.linkedin,
      email:
        member.socialLinks.email === "#" ? undefined : member.socialLinks.email,
    },
  };
}

export const academyFaculty: FacultyMember[] = facultyProfiles.map((profile) => {
  const member = teamMembers.find(
    (teamMember) =>
      teamMember.id === profile.teamMemberId &&
      teamMember.roleCategory === "advisor",
  );

  if (!member) {
    throw new Error(
      `Academy faculty source ${profile.teamMemberId} must reference an advisory-board member.`,
    );
  }

  return toFacultyMember(profile, member);
});

export const academyTestimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The Akomapa Program changed how I see leadership. It is not about titles; it is about empathy, ethics, and action.",
    name: "Program Fellow",
    title: "Akomapa Global Health Leadership Training Program",
    image: "/avatar-2.jpg",
  },
  {
    id: 2,
    quote:
      "Learning with peers across countries helped me question my assumptions and approach community health work with greater humility.",
    name: "Student Scholar",
    title: "Akomapa Academy",
    image: "/avatar-2.jpg",
  },
];
