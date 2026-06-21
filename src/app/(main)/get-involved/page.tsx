import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join Akomapa as a learner, volunteer, partner, researcher, mentor, or supporter advancing ethical and equitable global health.",
};

const highlights = [
  {
    title: "Learn and Lead",
    description:
      "Students and emerging professionals can build practical skills through education, mentorship, research, and service.",
  },
  {
    title: "Partner",
    description:
      "Communities, universities, health organizations, and funders can collaborate on shared priorities and sustainable solutions.",
  },
  {
    title: "Support the Movement",
    description:
      "Volunteers, mentors, advocates, and donors help strengthen the people and partnerships behind Akomapa's mission.",
  },
] as const;

export default function GetInvolvedPage() {
  return (
    <RebrandPageShell
      eyebrow="Join the Movement"
      title="Get Involved"
      description={BRAND.footerMission}
      highlights={highlights}
    />
  );
}
