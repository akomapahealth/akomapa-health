import {
  IMMERSION_APPLICATION_FORM_URL,
  IMMERSION_INFO_SESSION_FORM_URL,
  UG_TRAINING_FORM_URL,
} from "@/config/links";
import type {
  AnnouncementCampaign,
  DatedAnnouncement,
} from "@/lib/types";

export const ANNOUNCEMENT_LIFETIME_DAYS = 14;
const ANNOUNCEMENT_LIFETIME_MS =
  ANNOUNCEMENT_LIFETIME_DAYS * 24 * 60 * 60 * 1000;

const announcementDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export const announcementCampaign: AnnouncementCampaign = {
  version: "2026-09-immersion-v1",
  slides: [
    {
      id: "global-health-immersion-applications",
      publishedAt: "2026-09-03T00:00:00.000Z",
      tag: "Applications Open",
      tagColor: "amber",
      title: "Global Health Immersion Program applications are open",
      titleHighlights: ["applications are open"],
      description:
        "Apply for Akomapa's two-week Global Health Immersion Program in Ghana, or RSVP for the upcoming information session to learn about the experience before submitting your application.",
      image: "/elimina-castle.webp",
      ctaText: "Apply Now",
      ctaLink: IMMERSION_APPLICATION_FORM_URL,
      isExternal: true,
      secondaryCtaText: "RSVP for the Info Session",
      secondaryCtaLink: IMMERSION_INFO_SESSION_FORM_URL,
      secondaryCtaIsExternal: true,
    },
    {
      id: "ug-hub-launch",
      publishedAt: "2026-08-12T00:00:00.000Z",
      tag: "Now Open",
      tagColor: "amber",
      title: "The wait is finally over!",
      titleHighlights: ["wait is finally over"],
      description:
        "Akomapa Health University of Ghana Community Health Hub is officially open and now accepting applications for the General Training Programme. Students from the University of Ghana across all campuses are invited to apply and be part of this impactful healthcare initiative. Ready to serve, learn, and make a difference?",
      image: "/highlights/ug.jpg",
      ctaText: "Apply now",
      ctaLink: UG_TRAINING_FORM_URL,
      isExternal: true,
    },
    {
      id: "yale-khanal-award",
      publishedAt: "2026-04-30T00:00:00.000Z",
      tag: "Award",
      tagColor: "amber",
      title: "Yale Global Health Yogesh Khanal Award",
      titleHighlights: ["Global Health", "Yogesh Khanal"],
      description:
        "Akomapa Health received the Yogesh Khanal Award to support the development of our Ethical Leadership Program, Akomapa Academy.",
      image: "/images/akomapa-yale.JPG",
      ctaText: "Explore the recognition",
      ctaLink: "https://medicine.yale.edu/news-article/global-health-and-equity-distinction-pathway-news-update-for-january-6-2025/",
      isExternal: true,
    },
    {
      id: "startup-yale-finalist",
      publishedAt: "2026-04-30T00:00:00.000Z",
      tag: "Recognition",
      tagColor: "amber",
      title: "Startup Yale Finalist powered by Tsai City",
      titleHighlights: ["Startup Yale", "Finalist", "Tsai City"],
      description:
        "We were selected as a finalist at Startup Yale, pitching our vision for scalable, student-powered healthcare delivery across West Africa.",
      image: "/images/partners/tsai-city.png",
      videoUrl: "https://www.youtube.com/watch?v=zg8LbyzqYt0",
      thumbnail: "/images/partners/tsai-city.png",
      ctaText: "Watch the Pitch",
      ctaLink: "https://ysph.yale.edu/future-of-health-innovation-hub/",
      isExternal: true,
    },
    {
      id: "ethical-leadership-launch",
      publishedAt: "2026-04-29T00:00:00.000Z",
      tag: "New Program",
      tagColor: "lapis",
      title: "Akomapa Ethical Leadership Program",
      titleHighlights: ["Ethical Leadership"],
      description:
        "Launching our flagship program to develop the next generation of ethical health leaders — combining clinical training with governance, equity, and community engagement.",
      image: "/highlights/Akomapa-68.jpg",
      ctaText: "Learn More",
      ctaLink: "/programs/akomapa-ghltp",
      isExternal: false,
    },
    {
      id: "nkwapa-emr-launch",
      publishedAt: "2026-04-28T00:00:00.000Z",
      tag: "New",
      tagColor: "skobeloff",
      title: "Introducing Nkwapa — Our EMR Platform",
      titleHighlights: ["Nkwapa", "EMR Platform"],
      description:
        "Our offline-first electronic medical records system is now in public beta. Purpose-built to power Akomapa clinics in resource-limited settings.",
      image: "/images/nkwapa.png",
      ctaText: "View Demo",
      ctaLink: "https://staging.nkwapa.app",
      isExternal: true,
    },
    {
      id: "mastercard-momentum",
      publishedAt: "2026-04-30T00:00:00.000Z",
      tag: "Recognition",
      tagColor: "amber",
      title: "African Impact Initiative - Momentum Track",
      titleHighlights: ["African Impact Initiative", "Momentum Track"],
      description:
        "Akomapa has been promoted to the momentum track in the African Impact Initiative, run by Africa Health Collaborative, for our innovative approach to scaling healthcare access across Ghana.",
      image: "/images/partners/AII-logo.png",
      ctaText: "Discover the initiative",
      ctaLink: "https://www.africanimpact.ca/our-initiatives",
      isExternal: true,
    },
    {
      id: "ucc-expansion",
      publishedAt: "2026-04-26T00:00:00.000Z",
      tag: "Growth",
      tagColor: "skobeloff",
      title: "UCC Expansion to 4 Communities",
      titleHighlights: ["UCC", "4 Communities"],
      description:
        "Our University of Cape Coast partnership has expanded to serve four surrounding communities with regular health screenings and education programs.",
      image: "/highlights/ucc.jpg",
      ctaText: "See Communities",
      ctaLink: "/community-hubs",
      isExternal: false,
    },
    {
      id: "yale-african-symposium",
      publishedAt: "2026-04-30T00:00:00.000Z",
      tag: "Partnership",
      tagColor: "lapis",
      title: "Yale African Innovation Symposium",
      titleHighlights: ["African Innovation", "Symposium"],
      description:
        "Akomapa is partnering with Yale for the African Innovation Symposium, bringing together health innovators from across the continent to share solutions.",
      image: "/images/akomapa-pitch-1.JPG",
      ctaText: "Learn More",
      ctaLink: "https://ventures.yale.edu/yale-innovation-summit-yale-ventures",
      isExternal: true,
    },
  ],
};

export function isAnnouncementActive(
  announcement: DatedAnnouncement,
  now: Date = new Date(),
): boolean {
  const publishedAt = Date.parse(announcement.publishedAt);
  const nowTime = now.getTime();

  if (!Number.isFinite(publishedAt) || !Number.isFinite(nowTime)) return false;

  return (
    publishedAt <= nowTime &&
    nowTime < publishedAt + ANNOUNCEMENT_LIFETIME_MS
  );
}

export function getActiveAnnouncementCampaign(
  now: Date = new Date(),
): AnnouncementCampaign {
  return {
    ...announcementCampaign,
    slides: announcementCampaign.slides.filter((slide) =>
      isAnnouncementActive(slide, now),
    ),
  };
}

export function formatAnnouncementDate(publishedAt: string): string {
  const date = new Date(publishedAt);
  return Number.isFinite(date.getTime())
    ? announcementDateFormatter.format(date)
    : "";
}
