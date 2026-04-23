import { AnnouncementCampaign } from "@/lib/types";

export const announcementCampaign: AnnouncementCampaign = {
  version: "2026-04-v1",
  slides: [
    {
      id: "student-clinic-2026",
      tag: "Apply Now",
      tagColor: "lapis",
      title: "Join the Akomapa Student Clinic",
      description:
        "Work with a global team to deliver screenings, education, and care in underserved communities. Applications are open for the 2026 cohort — limited spots available.",
      image: "/highlights/Akomapa-38.jpg",
      ctaText: "Apply Now",
      ctaLink: "/join",
      isExternal: false,
    },
    {
      id: "yale-innovation-summit",
      tag: "Announcement",
      tagColor: "amber",
      title: "Akomapa at Yale Innovation Summit",
      description:
        "We have been selected to pitch at the Yale Innovation Summit. Stay tuned for updates on our groundbreaking NCD prevention research.",
      image: "/highlights/Akomapa-2.jpg",
      ctaText: "Learn More",
      ctaLink: "/news",
      isExternal: false,
    },
    {
      id: "nkwapa-emr-launch",
      tag: "New",
      tagColor: "skobeloff",
      title: "Introducing Nkwapa — Our EMR Platform",
      description:
        "Our offline-first electronic medical records system is now in public beta. Purpose-built to power Akomapa clinics in resource-limited settings.",
      image: "/highlights/Akomapa-28.jpg",
      ctaText: "View Demo",
      ctaLink: "https://staging.nkwapa.app",
      isExternal: true,
    },
    {
      id: "leadership-2026",
      tag: "Opportunity",
      tagColor: "lapis",
      title: "Join Our Student Leadership Program",
      description:
        "Applications are now open for the 2026 cohort. Be part of a global movement of student leaders tackling non-communicable diseases in underserved communities.",
      image: "/highlights/Akomapa-5.jpg",
      ctaText: "Apply Now",
      ctaLink: "/join",
      isExternal: false,
    },
    {
      id: "health-fair-2026",
      tag: "Event",
      tagColor: "amber",
      title: "Upcoming: Community Health Fair",
      description:
        "Join us for our annual community health screening event. Free health checks, educational sessions, and resources for the whole family.",
      image: "/highlights/Akomapa-42.jpg",
      ctaText: "Learn More",
      ctaLink: "/news",
      isExternal: false,
    },
    {
      id: "research-milestone",
      tag: "Announcement",
      tagColor: "skobeloff",
      title: "Research Partnership Milestone",
      description:
        "Our collaborative research with leading institutions has reached a significant milestone in understanding NCD prevention strategies in Ghana.",
      image: "/highlights/Akomapa-20.jpg",
      ctaText: "Read More",
      ctaLink: "/news",
      isExternal: false,
    },
  ],
};
