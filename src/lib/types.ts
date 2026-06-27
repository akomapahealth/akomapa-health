export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  approach: string;
  category: string;
  image: string;
  established: string;
  locations: string[];
  peopleServed: string;
  keyPoints: string[];
  impacts: string[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  image?: string;
  url: string;
  downloadUrl?: string;
  programs: string[];
  date: string;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  category: string;
  featured?: boolean;
  tags?: string[];
}

export interface TeamMember {
  id: string;
  slug?: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  roleCategory:
    | "executive"
    | "faculty"
    | "advisor"
    | "community-leader"
    | "government-leader"
    | "partner-institution";
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  image: string;
}

export interface PillarImage {
  src: string;
  alt: string;
  position?: string;
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  image: PillarImage;
  color: string;
  features: string[];
  link: string;
  ctaLabel: string;
}

export interface AcademyModule {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  facultyContributors: string[];
  duration?: string;
  order: number;
}

export interface AcademyCurriculum {
  modules: AcademyModule[];
  totalDuration: string;
  certificationName: string;
  certificationDescription: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  institution: string;
  bio: string;
  image: string;
  specialties: string[];
  socialLinks?: {
    linkedin?: string;
    email?: string;
    website?: string;
  };
}

export type HubRouteSlug = "ucc" | "ug" | "nhp";

export interface CommunityHub {
  id: string;
  slug: string;
  routeSlug: HubRouteSlug;
  name: string;
  location: string;
  country: string;
  description: string;
  image: string;
  color: string;
  status: "active" | "in-development" | "planned";
  missions: HubMission[];
  communityStories?: Story[];
  studentStories?: Story[];
  facultyMentorship?: MentorshipInfo;
  research?: ResearchItem[];
  innovations?: InnovationItem[];
  metrics: HubMetrics;
}

export interface HubMission {
  id: number;
  title: string;
  description: string;
}

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  role: string;
  image?: string;
  date: string;
}

export interface MentorshipInfo {
  model: string;
  mentors: string[];
}

export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  status: "ongoing" | "completed" | "published";
  link?: string;
}

export interface InnovationItem {
  id: string;
  title: string;
  description: string;
  category: "nkwapa" | "quality-improvement" | "technology";
}

export interface HubMetrics {
  patientsServed: number;
  studentsTrained: number;
  communitiesReached: number;
  partnersEngaged: number;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: "university" | "community" | "government" | "global";
  website?: string;
  country: string;
}

export interface PhilosophySection {
  id: string;
  title: string;
  content: string;
  order: number;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon?: string;
  milestone: boolean;
}

export interface ImpactCategory {
  id: string;
  title: string;
  metrics: ImpactMetric[];
}

export interface ImpactMetric {
  id: string;
  label: string;
  currentValue: string;
  futureValue?: string;
  futureYear?: number;
  icon?: string;
}

export interface MapLocation {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: "active-hub" | "planned-hub" | "partner";
  description: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage?: string;
  category:
    | "student-essay"
    | "faculty-reflection"
    | "article"
    | "community-voice"
    | "recorded-talk"
    | "conference-session";
  tags: string[];
  image?: string;
  date: string;
  featured: boolean;
  videoUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  tag?: string;
  tagColor?: "lapis" | "amber" | "skobeloff";
  image?: string;
  videoUrl?: string;
  /** Optional poster override; otherwise YouTube/Vimeo preview or `image` is used. */
  thumbnail?: string;
  ctaText?: string;
  ctaLink?: string;
  isExternal?: boolean;
  /**
   * Optional substrings of `title` to highlight with brand accent colors
   * (alternating cyan/amber). Substrings are matched literally, in order.
   * Leave undefined or empty to render the title in plain white.
   */
  titleHighlights?: string[];
}

export interface AnnouncementCampaign {
  version: string;
  slides: Announcement[];
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  videoUrl: string | null;
  thumbnail: string | null;
  date: string | null;
  category: string;
  categoryColor: "lapis" | "amber" | "skobeloff";
  tags: string[];
  featured: boolean;
  ctaText: string | null;
  ctaLink: string | null;
  isExternalCta: boolean;
  source: "announcement" | "news";
}
