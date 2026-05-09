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
    name: string;
    title: string;
    bio: string;
    image: string;
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