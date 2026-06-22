import type { ImpactCategory, MapLocation } from "@/lib/types";

export const healthImpact: ImpactCategory = {
  id: "health-impact",
  title: "Health Impact",
  metrics: [
    {
      id: "communities-reached",
      label: "Communities Reached",
      currentValue: "6+",
      futureValue: "50+",
      futureYear: 2028,
      icon: "MapPinned",
    },
    {
      id: "community-members-screened",
      label: "Community Members Screened",
      currentValue: "2,000+",
      futureValue: "150,000+",
      futureYear: 2028,
      icon: "HeartPulse",
    },
    {
      id: "referrals-completed",
      label: "Referrals Completed",
      currentValue: "200+",
      futureValue: "10,000+",
      futureYear: 2028,
      icon: "Hospital",
    },
    {
      id: "health-education-sessions",
      label: "Health Education Sessions",
      currentValue: "50+",
      futureValue: "500+",
      futureYear: 2028,
      icon: "Presentation",
    },
  ],
};

export const leadershipImpact: ImpactCategory = {
  id: "leadership-impact",
  title: "Leadership Impact",
  metrics: [
    {
      id: "student-leaders-trained",
      label: "Student Leaders Trained",
      currentValue: "300+",
      futureValue: "3,000+",
      futureYear: 2028,
      icon: "GraduationCap",
    },
    {
      id: "faculty-mentors-engaged",
      label: "Faculty Mentors Engaged",
      currentValue: "10+",
      futureValue: "100+",
      futureYear: 2028,
      icon: "UserRoundCheck",
    },
    {
      id: "academy-graduates",
      label: "Academy Graduates",
      currentValue: "50+",
      futureValue: "500+",
      futureYear: 2028,
      icon: "Award",
    },
    {
      id: "research-scholars-supported",
      label: "Research Scholars Supported",
      currentValue: "5+",
      futureValue: "50+",
      futureYear: 2028,
      icon: "Microscope",
    },
  ],
};

export const impactCategories: ImpactCategory[] = [
  healthImpact,
  leadershipImpact,
];

export const mapLocations: MapLocation[] = [
  {
    id: "ucc-hub",
    name: "Akomapa–UCC Community Health Hub",
    coordinates: { lat: 5.1036, lng: -1.2825 },
    type: "active-hub",
    description:
      "An active community health and leadership hub serving Abeadze Dominase and Abura in Ghana's Central Region.",
  },
  {
    id: "ug-hub",
    name: "Akomapa–UG Community Health Hub",
    coordinates: { lat: 5.6505, lng: -0.1862 },
    type: "planned-hub",
    description:
      "An in-development community health and interprofessional learning hub in the Greater Accra Region.",
  },
  {
    id: "nhp-yale-hub",
    name: "Akomapa–NHP Yale Community Health Hub",
    coordinates: { lat: 41.3083, lng: -72.9279 },
    type: "active-hub",
    description:
      "An active New Haven hub using trusted barbershops and salons for community-based screening and health education.",
  },
];
