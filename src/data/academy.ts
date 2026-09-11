import { advisoryBoardMembers } from "@/data/team";
import type {
  AcademyCurriculum,
  FacultyMember,
  TeamMember,
  Testimonial,
} from "@/lib/types";

export const academyOverview = {
  title: "Training Ethical Leaders for a Changing World",
  description:
    "The Akomapa Academy prepares students and emerging health professionals to navigate the ethical, relational, and systems challenges of global health. Its semester-long learning experience combines faculty dialogue, case-based study, community practice, mentorship, and guided reflection.",
  whyItMatters:
    "Health professionals make decisions that affect communities, institutions, and public trust. Ethical leadership helps them examine power, listen across differences, use evidence responsibly, and build solutions with the people those solutions are intended to serve.",
} as const;

export const academyCurriculum: AcademyCurriculum = {
  totalDuration: "10–16 weeks",
  certificationName: "Akomapa Certificate in Global Health Leadership",
  certificationDescription:
    "Awarded to scholars who complete the core modules, participate in faculty and peer learning, and finish the closing reflection and commitment.",
  modules: [
    {
      id: "welcome-akomapa-ethos",
      title: "Welcome & Akomapa Ethos",
      description:
        "Begin with Akomapa's origin story and the personal journeys that shape ethical global health leadership.",
      learningObjectives: [
        "Understand Akomapa's origin and shared ethos",
        "Reflect on personal journeys into community health",
        "Connect individual purpose to leadership commitments",
      ],
      facultyContributors: ["Akomapa Team"],
      order: 1,
    },
    {
      id: "ncds-as-systems-problems",
      title: "NCDs as Systems Problems",
      description:
        "Examine Ghana's NCD epidemic as a systems challenge, and why screening alone cannot close gaps in chronic care.",
      learningObjectives: [
        "Examine the silent epidemic of NCDs through the Ghanaian story",
        "Explain why screening alone fails without systems thinking",
        "Study the Akomapa model as a community-centered response",
      ],
      facultyContributors: [
        "Prof. Alfred Yawson",
        "Dr. Jeremy Schwartz",
        "Dr. Megan Raney",
      ],
      order: 2,
    },
    {
      id: "leadership-power-responsibility",
      title: "Leadership, Power & Responsibility",
      description:
        "Examine how power, privilege, and bias shape leadership in community and global health.",
      learningObjectives: [
        "Recognize power and privilege in health leadership",
        "Identify how bias affects care and partnership",
        "Practice responsible use of influence in community settings",
      ],
      facultyContributors: ["Dr. Aba Black"],
      order: 3,
    },
    {
      id: "ethics-in-community-health-work",
      title: "Ethics in Community Health Work",
      description:
        "Build cultural humility, ethical leadership, and reciprocal learning across institutions and communities.",
      learningObjectives: [
        "Practice cultural humility and ethical leadership",
        "Examine bidirectionality in global health education",
        "Learn from student-led community engagement through the COBES story",
      ],
      facultyContributors: [
        "Dr. Kaveh Khoshnood",
        "Dr. Rabin",
        "Prof. Alfred Yawson",
        "Prof. Derek Anamaale Tuoyire",
      ],
      order: 4,
    },
    {
      id: "sustainability-systems-design",
      title: "Sustainability, Systems Design & Longitudinal Impact",
      description:
        "Learn why promising global health programs fail, and how to design ethical, scalable systems for NCD care.",
      learningObjectives: [
        "Identify why good global health programs fail",
        "Design ethical and scalable systems for NCD care",
        "Plan for longitudinal impact beyond short-term projects",
      ],
      facultyContributors: ["Emily Sheldon", "Dr. Elijah Paintsil"],
      order: 5,
    },
    {
      id: "community-driven-care-trust",
      title: "Community-Driven Care & Trust",
      description:
        "Explore how trust and community leadership shape durable care.",
      learningObjectives: [
        "Describe principles of community-driven care",
        "Explain how trust is built and sustained with communities",
        "Connect community leadership to care design",
      ],
      facultyContributors: ["Dr. Frimpong"],
      order: 6,
    },
    {
      id: "research-data-knowledge-stewardship",
      title: "Research, Data & Knowledge Stewardship",
      description:
        "Practice ethical student-led research and responsible stewardship of community health data.",
      learningObjectives: [
        "Apply consent, privacy, confidentiality, and data ownership in student-led research",
        "Practice reciprocity in how knowledge is generated and shared",
        "Understand Nkwapa and Akomapa's data trust policy",
      ],
      facultyContributors: [
        "Dr. Jeremy Schwartz",
        "Prof. Kyei",
        "Dr. Easmon Otupuri",
      ],
      order: 7,
    },
    {
      id: "student-led-leadership-advocacy",
      title: "Student-Led Leadership, Advocacy & Innovation",
      description:
        "Learn from youth leadership, mentorship pipelines, and student-led innovation in practice.",
      learningObjectives: [
        "Learn from youth leadership in action through the OKB Foundation story",
        "Explore mentorship, pipelines, and leadership development",
        "Connect student leadership to advocacy and innovation",
      ],
      facultyContributors: ["Osei-Boateng", "NHP Free Clinic"],
      order: 8,
    },
    {
      id: "interprofessional-practice-team-leadership",
      title: "Interprofessional Practice & Team Leadership",
      description:
        "Understand why interprofessional care matters and how hierarchies can harm teams and patients.",
      learningObjectives: [
        "Explain why interprofessional care matters",
        "Identify harmful hierarchies in healthcare",
        "Practice team leadership across professional roles",
      ],
      facultyContributors: ["Prof. Rohrbaugh"],
      order: 9,
    },
    {
      id: "reflection-integration-commitment",
      title: "Reflection, Integration & Commitment",
      description:
        "Integrate the semester's learning, reflect on leading within limits, and define next steps.",
      learningObjectives: [
        "Participate in a reflection circle on leading within limits",
        "Integrate learning across the Academy curriculum",
        "Commit to concrete next steps as an ethical health leader",
      ],
      facultyContributors: ["Akomapa Team"],
      order: 10,
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
    teamMemberId: "34",
    id: "alfred-yawson",
    institution: "University of Ghana",
    specialties: [
      "Public health",
      "Health professions education",
      "Health systems leadership",
    ],
  },
  {
    teamMemberId: "30",
    id: "emily-sheldon",
    institution: "African Health Innovation Center",
    specialties: [
      "Public health innovation",
      "Organizational leadership",
      "Health systems design",
    ],
  },
  {
    teamMemberId: "33",
    id: "elijah-paintsil",
    institution: "Boston Medical Center",
    specialties: [
      "Pediatrics",
      "Healthcare leadership",
      "Clinical education",
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
  const member = advisoryBoardMembers.find(
    (teamMember) => teamMember.id === profile.teamMemberId,
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
