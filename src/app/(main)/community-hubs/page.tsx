import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";

export const metadata: Metadata = {
  title: "Community Health Hubs",
  description:
    "Learn about Akomapa's community health hubs and their role in locally led prevention, screening, referral, and health learning.",
};

const highlights = [
  {
    title: "Locally Led",
    description:
      "Each hub is shaped with community partners who understand local priorities, strengths, and barriers to care.",
  },
  {
    title: "Connected Services",
    description:
      "Prevention, screening, education, referral, and follow-up are designed as connected parts of a stronger care journey.",
  },
  {
    title: "Learning Platform",
    description:
      "Hubs create responsible opportunities for leadership development, community research, and practical innovation.",
  },
] as const;

export default function CommunityHubsPage() {
  return (
    <RebrandPageShell
      eyebrow="Care Close to Home"
      title="Community Health Hubs"
      description="Community health hubs bring prevention, education, screening, referral support, and collaborative learning closer to the people they are designed to serve."
      highlights={highlights}
    />
  );
}
