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