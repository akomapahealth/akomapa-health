import { UpdateSlide } from "@/lib/types";

export const updates: UpdateSlide[] = [
  {
    id: "leadership-2026",
    title: "Join Our Student Leadership Program",
    description:
      "Applications are now open for the 2026 cohort. Be part of a global movement of student leaders tackling non-communicable diseases in underserved communities.",
    ctaText: "Apply Now",
    ctaLink: "/join",
    image: "/gallery/gallery-pic-5.jpg",
    priority: 1,
    isExternal: false,
  },
  {
    id: "health-fair-2026",
    title: "Upcoming: Community Health Fair",
    description:
      "Join us for our annual community health screening event. Free health checks, educational sessions, and resources for the whole family.",
    ctaText: "Learn More",
    ctaLink: "#events",
    image: "/gallery/gallery-pic-6.jpg",
    priority: 2,
    isExternal: false,
  },
  {
    id: "research-milestone",
    title: "Research Partnership Milestone",
    description:
      "Our collaborative research with leading institutions has reached a significant milestone in understanding NCD prevention strategies in Ghana.",
    ctaText: "Read More",
    ctaLink: "/news",
    image: "/highlights/Akomapa-38.jpg",
    priority: 3,
    isExternal: false,
  },
];

export function getActiveUpdates(slides: UpdateSlide[]): UpdateSlide[] {
  const now = new Date();
  
  return slides
    .filter((slide) => {
      if (slide.startDate && new Date(slide.startDate) > now) return false;
      if (slide.endDate && new Date(slide.endDate) < now) return false;
      return true;
    })
    .sort((a, b) => a.priority - b.priority);
}
