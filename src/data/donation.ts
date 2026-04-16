export type DonationFrequency = "monthly" | "one-time";

export type DonationAmountOption = {
  value: number;
  label: string;
  impact: string;
};

export type TransparencyAllocation = {
  label: string;
  percentage: number;
  description: string;
  colorClass: string;
  barClass: string;
};

export const donationAmountOptions: DonationAmountOption[] = [
  { value: 25, label: "$25", impact: "Screen a patient" },
  { value: 50, label: "$50", impact: "Provide medications for a clinic day" },
  { value: 100, label: "$100", impact: "Train a student volunteer" },
  { value: 250, label: "$250", impact: "Fund a community screening event" },
  { value: 500, label: "$500", impact: "Support clinic operations" },
];

export const impactHighlights = [
  {
    title: "Community Clinics",
    description:
      "Your support brings health screenings, medication access, and follow-up care to underserved communities.",
    icon: "clinic",
  },
  {
    title: "Student Training",
    description:
      "Donations equip student volunteers with practical mentorship and field experience rooted in ethical care.",
    icon: "training",
  },
  {
    title: "Research and Outreach",
    description:
      "Every contribution strengthens research-backed outreach programs that scale preventive care.",
    icon: "research",
  },
];

export const transparencyAllocations: TransparencyAllocation[] = [
  {
    label: "Clinics",
    percentage: 60,
    description: "Patient screenings, medications, and clinic-day operations",
    colorClass: "text-lapis dark:text-[#66C4DC]",
    barClass: "bg-lapis",
  },
  {
    label: "Research",
    percentage: 25,
    description: "Clinical data collection, outcomes tracking, and health education",
    colorClass: "text-amber dark:text-[#F5C94D]",
    barClass: "bg-amber",
  },
  {
    label: "Training Programs",
    percentage: 15,
    description: "Volunteer preparation, mentorship, and leadership development",
    colorClass: "text-onyx dark:text-[#E6E7E7]",
    barClass: "bg-[#2F3332] dark:bg-[#E6E7E7]",
  },
];

export const donationCampaign = {
  enabled: false,
  raised: 45000,
  goal: 100000,
  label: "raised toward annual community care goal",
};

export const paymentMethods = [
  { id: "card", label: "Credit / Debit Card" },
  { id: "momo", label: "MTN Mobile Money" },
  { id: "paypal", label: "PayPal Giving" },
  { id: "bank", label: "Bank Transfer" },
] as const;

export type PaymentMethod = (typeof paymentMethods)[number]["id"];
