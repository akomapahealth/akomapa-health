import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";

export const metadata: Metadata = {
  title: "Learning From Global Leaders",
  description:
    "Meet the faculty, advisors, and community leaders shaping the next generation of ethical global health professionals at Akomapa.",
};

const highlights = [
  {
    title: "Clinical Supervision",
    description:
      "Experienced clinicians guide students through real-world patient encounters, ensuring safe, ethical, and community-centered care.",
  },
  {
    title: "Mentorship",
    description:
      "Faculty mentors support leadership growth, career development, and reflective practice for every student in the program.",
  },
  {
    title: "Interdisciplinary Expertise",
    description:
      "Our faculty bring diverse backgrounds in medicine, public health, research, and policy to enrich the learning experience.",
  },
] as const;

export default function FacultyPage() {
  return (
    <RebrandPageShell
      eyebrow="Our People"
      title="Learning From Global Leaders"
      description="Faculty, clinical supervisors, and mentors who guide student learning and shape the next generation of ethical global health leaders."
      highlights={highlights}
    />
  );
}
