import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = {
  title: "NCD Impact",
  description:
    "Learn how Akomapa addresses non-communicable diseases through prevention, community screening, education, and stronger care pathways.",
};

const highlights = [
  {
    title: "Prevention",
    description:
      "Community education and locally relevant tools help people understand risk factors and take earlier action.",
  },
  {
    title: "Screening",
    description:
      "Accessible screening brings early detection closer to communities and creates opportunities for timely support.",
  },
  {
    title: "Continuity of Care",
    description:
      "Partnerships strengthen referral pathways, follow-up, and the systems needed for sustainable long-term care.",
  },
] as const;

export default function NcdImpactPage() {
  return (
    <RebrandPageShell
      eyebrow="Community Health"
      title="NCD Impact"
      description={BRAND.description}
      highlights={highlights}
    />
  );
}
