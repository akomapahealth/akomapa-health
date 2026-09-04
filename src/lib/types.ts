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

export interface PersonProfile {
  id: string;
  slug?: string;
  name: string;
  affiliation: string;
  bio: string;
  image?: string;
  featuredInTeamHero?: boolean;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface TeamMember extends Omit<PersonProfile, "image"> {
  title: string;
  image: string;
  roleCategory:
    | "executive"
    | "member"
    | "advisor";
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
  heroPresentation?: "split" | "background";
  color: string;
  status: "active" | "in-development" | "planned" | "future";
  missions: HubMission[];
  communityStories?: Story[];
  studentStories?: Story[];
  facultyMentorship?: MentorshipInfo;
  research?: ResearchItem[];
  innovations?: InnovationItem[];
  roster?: HubRoster;
  metrics: HubMetrics;
  /** Optional hero CTA (e.g. Apply now). Omitted hubs render no button. */
  cta?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

export interface HubRosterPendingSection {
  description: string;
  /** Short brand mark shown on reserved portrait surfaces, e.g. "UG". */
  monogram?: string;
  cta?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

export interface HubRoster {
  leadership: HubLeader[];
  volunteers: HubVolunteerPortrait[];
  /**
   * `editorial` (default): featured + multi-column cards with inline bios.
   * `compact-modal`: denser 3–4 column cards; bio/contact open in a dialog.
   */
  leadershipPresentation?: "editorial" | "compact-modal";
  /**
   * When a leadership/volunteer array is empty, optional pending copy keeps the
   * labeled section mounted so portraits can be added as a data-only change later.
   */
  pending?: {
    leadership?: HubRosterPendingSection;
    volunteers?: HubRosterPendingSection;
  };
}

export interface HubLeader {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  /** When omitted, the UI renders an accessible initials/neutral portrait surface. */
  image?: string;
  featured?: boolean;
  bio?: string;
  contact?: {
    email?: string;
    linkedin?: string;
  };
}

export interface HubLeaderReference {
  personId: string;
  role: string;
  featured?: boolean;
}

export interface HubVolunteerPortrait {
  id: string;
  /** When omitted, the UI renders an accessible initials/neutral portrait surface. */
  image?: string;
  alt: string;
  /** Optional name for initials fallback when a portrait is not yet available. */
  name?: string;
  caption?: string;
  objectPosition?: string;
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
  communityMembersServed: number;
  studentsTrained: number;
  communitiesReached: number;
  partnersEngaged: number;
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  description: string;
  category: "university" | "community" | "government" | "global";
  website?: string;
  country: string;
}

export interface PartnerLogo {
  name: string;
  logo: string;
  url?: string;
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
  /** Optional detail page for hubs (e.g. `/community-hubs/ucc`). */
  href?: string;
}

export interface FutureVisionTarget {
  id: string;
  label: string;
  /** Display value for the 2028 target, e.g. "150,000+". */
  value: string;
  /** Optional present-day baseline for a current → target comparison. */
  currentValue?: string;
  icon?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  /** Institution or community the author is affiliated with (shown in bylines). */
  authorInstitution?: string;
  /** Short author biography rendered in the article's author section. */
  authorBio?: string;
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
  /** ISO-8601 publication timestamp used for display and campaign aging. */
  publishedAt?: string;
  tag?: string;
  tagColor?: "lapis" | "amber" | "skobeloff";
  image?: string;
  videoUrl?: string;
  /** Optional poster override; otherwise YouTube/Vimeo preview or `image` is used. */
  thumbnail?: string;
  ctaText?: string;
  ctaLink?: string;
  isExternal?: boolean;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  secondaryCtaIsExternal?: boolean;
  /**
   * Optional substrings of `title` to highlight with brand accent colors
   * (alternating cyan/amber). Substrings are matched literally, in order.
   * Leave undefined or empty to render the title in plain white.
   */
  titleHighlights?: string[];
}

export interface DatedAnnouncement extends Announcement {
  publishedAt: string;
}

export interface AnnouncementCampaign {
  version: string;
  slides: DatedAnnouncement[];
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

/**
 * A single engagement route on the Get Involved page. `icon` is a Lucide icon
 * name resolved through an `iconMap` in the rendering component. `accent` is a
 * brand hex used for the card's top border and icon badge tint.
 */
export interface Pathway {
  id: string;
  icon: string;
  title: string;
  description: string;
  /** The audience served, e.g. "Health professional students". */
  audience: string;
  ctaLabel: string;
  /**
   * Destination when `opensImmersionInterest` is unset/false.
   * Optional when the CTA opens the shared interest modal instead.
   */
  ctaHref?: string;
  /** When true the CTA opens in a new tab (external form/site). */
  external?: boolean;
  /**
   * When true, the CTA opens the Immersion/student interest modal instead of
   * navigating to `ctaHref` (used while the leadership Google Form is closed).
   */
  opensImmersionInterest?: boolean;
  accent: string;
  /** Primary audiences receive extra visual emphasis in the grid. */
  featured?: boolean;
}

/** An active or rolling opportunity surfaced in the Current Opportunities section. */
export interface GetInvolvedOpportunity {
  id: string;
  title: string;
  description: string;
  /** Short status label, e.g. "Rolling admissions" or "Open". */
  status: string;
  ctaLabel: string;
  /** Destination when `opensImmersionInterest` is unset/false. */
  ctaHref?: string;
  external?: boolean;
  /** Opens the shared Immersion/student interest modal instead of a link. */
  opensImmersionInterest?: boolean;
}

/** A single expandable question/answer on the Get Involved page. */
export interface GetInvolvedFaq {
  id: string;
  question: string;
  answer: string;
}
