import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";

export const metadata: Metadata = {
  title: "Thought Leadership",
  description:
    "Student essays, faculty reflections, and community voices on ethical global health leadership and community-driven care.",
};

const highlights = [
  {
    title: "Community Voices",
    description:
      "Stories and perspectives from the communities we partner with, highlighting local leadership and shared learning.",
  },
  {
    title: "Student Reflections",
    description:
      "First-hand accounts from student leaders on their experiences in clinical practice, research, and ethical leadership.",
  },
  {
    title: "Faculty Perspectives",
    description:
      "Insights from faculty mentors on global health education, community partnership, and developing the next generation of leaders.",
  },
] as const;

export default function BlogPage() {
  return (
    <RebrandPageShell
      eyebrow="Stories & Insights"
      title="Thought Leadership"
      description="Explore essays, reflections, and commentary from across the Akomapa network on ethical global health, community partnership, and student leadership."
      highlights={highlights}
    />
  );
}
