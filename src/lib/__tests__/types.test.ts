import { describe, expect, expectTypeOf, it } from "vitest";
import { teamMembers } from "@/data/team";
import type {
  AcademyCurriculum,
  AcademyModule,
  BlogPost,
  CommunityHub,
  FacultyMember,
  HubMetrics,
  HubMission,
  ImpactCategory,
  ImpactMetric,
  InnovationItem,
  MapLocation,
  MentorshipInfo,
  Partner,
  PhilosophySection,
  Pillar,
  ResearchItem,
  Story,
  TeamMember,
  TimelineEvent,
} from "@/lib/types";

type OptionalKeys<T> = {
  [Key in keyof T]-?: undefined extends T[Key] ? Key : never;
}[keyof T];

describe("rebrand data model contracts", () => {
  it("defines the pillar, academy, and faculty models", () => {
    const pillar: Pillar = {
      id: "academy",
      title: "Akomapa Academy",
      description: "Developing ethical global health leaders.",
      image: {
        src: "/highlights/Akomapa-20.jpg",
        alt: "Akomapa student leaders learning together",
      },
      color: "cyan",
      features: ["Leadership curriculum", "Faculty mentorship"],
      link: "/academy",
      ctaLabel: "Step into the Academy",
    };

    const academyModule: AcademyModule = {
      id: "ethical-leadership",
      title: "Ethical Leadership",
      description: "Foundations for equitable global health leadership.",
      learningObjectives: ["Apply ethical frameworks to community health"],
      facultyContributors: ["faculty-1"],
      order: 1,
    };

    const curriculum: AcademyCurriculum = {
      modules: [academyModule],
      totalDuration: "12 weeks",
      certificationName: "Akomapa Global Health Leadership Certificate",
      certificationDescription: "Recognizes completion of the Academy curriculum.",
    };

    const facultyMember: FacultyMember = {
      id: "faculty-1",
      name: "Dr. Akomapa",
      title: "Faculty Mentor",
      institution: "Akomapa Academy",
      bio: "Supports emerging global health leaders.",
      image: "/images/team/faculty.jpg",
      specialties: ["Global health", "Mentorship"],
    };

    expectTypeOf(pillar).toEqualTypeOf<Pillar>();
    expectTypeOf(academyModule).toEqualTypeOf<AcademyModule>();
    expectTypeOf(curriculum).toEqualTypeOf<AcademyCurriculum>();
    expectTypeOf(facultyMember).toEqualTypeOf<FacultyMember>();
    expectTypeOf<OptionalKeys<AcademyModule>>().toEqualTypeOf<"duration">();
    expectTypeOf<OptionalKeys<FacultyMember>>().toEqualTypeOf<"socialLinks">();
  });

  it("supports a fully nested community hub model", () => {
    const mission: HubMission = {
      id: 1,
      title: "Improve Community Health",
      description: "Expand access to preventative care.",
    };

    const story: Story = {
      id: "story-1",
      title: "Community-led care",
      excerpt: "A local leader reflects on the hub.",
      content: "The community shaped the model from the beginning.",
      author: "Community Leader",
      role: "community-leader",
      date: "2026-06-21",
    };

    const mentorship: MentorshipInfo = {
      model: "Faculty-supervised, student-led care",
      mentors: ["faculty-1"],
    };

    const research: ResearchItem = {
      id: "research-1",
      title: "Community hypertension outcomes",
      description: "Measures longitudinal outcomes from hub screenings.",
      status: "ongoing",
    };

    const innovation: InnovationItem = {
      id: "innovation-1",
      title: "Nkwapa EMR",
      description: "A community health record platform.",
      category: "nkwapa",
    };

    const metrics: HubMetrics = {
      communityMembersServed: 100,
      studentsTrained: 25,
      communitiesReached: 6,
      partnersEngaged: 4,
    };

    const hub: CommunityHub = {
      id: "hub-ucc",
      slug: "ucc",
      routeSlug: "ucc",
      name: "Akomapa UCC Community Hub",
      location: "Cape Coast",
      country: "Ghana",
      description: "A student-led community health hub.",
      image: "/images/hubs/ucc.jpg",
      color: "cyan",
      status: "active",
      missions: [mission],
      communityStories: [story],
      studentStories: [story],
      facultyMentorship: mentorship,
      research: [research],
      innovations: [innovation],
      metrics,
    };

    expectTypeOf(hub).toEqualTypeOf<CommunityHub>();
    expectTypeOf(hub.missions).toEqualTypeOf<HubMission[]>();
    expectTypeOf(hub.communityStories).toEqualTypeOf<Story[] | undefined>();
    expectTypeOf(hub.facultyMentorship).toEqualTypeOf<MentorshipInfo | undefined>();
    expectTypeOf(hub.research).toEqualTypeOf<ResearchItem[] | undefined>();
    expectTypeOf(hub.innovations).toEqualTypeOf<InnovationItem[] | undefined>();
    expectTypeOf(hub.metrics).toEqualTypeOf<HubMetrics>();
    expectTypeOf<CommunityHub["status"]>().toEqualTypeOf<
      "active" | "in-development" | "planned" | "future"
    >();
    expectTypeOf<ResearchItem["status"]>().toEqualTypeOf<
      "ongoing" | "completed" | "published"
    >();
    expectTypeOf<InnovationItem["category"]>().toEqualTypeOf<
      "nkwapa" | "quality-improvement" | "technology"
    >();
  });

  it("defines partnership, philosophy, timeline, impact, map, and blog models", () => {
    const partner: Partner = {
      id: "partner-1",
      name: "Partner University",
      logo: "/images/partners/university.svg",
      description: "An academic partner.",
      category: "university",
      country: "Ghana",
    };

    const philosophySection: PhilosophySection = {
      id: "good-heart",
      title: "A Good Heart",
      content: "Health leadership begins with service.",
      order: 1,
      image: "/highlights/Akomapa-20.jpg",
      imageAlt: "Akomapa students learning alongside community partners.",
      imagePosition: "center",
    };

    const timelineEvent: TimelineEvent = {
      id: "launch",
      year: "2025",
      title: "Akomapa launches",
      description: "The first community clinic opens.",
      milestone: true,
    };

    const impactMetric: ImpactMetric = {
      id: "community-members-reached",
      label: "Community members reached",
      currentValue: "100+",
    };

    const impactCategory: ImpactCategory = {
      id: "community-health",
      title: "Community Health",
      metrics: [impactMetric],
    };

    const mapLocation: MapLocation = {
      id: "ucc",
      name: "Akomapa UCC",
      coordinates: { lat: 5.1036, lng: -1.2825 },
      type: "active-hub",
      description: "Akomapa's Cape Coast community hub.",
    };

    const blogPost: BlogPost = {
      id: "post-1",
      slug: "leading-with-a-good-heart",
      title: "Leading with a Good Heart",
      excerpt: "A reflection on ethical global health leadership.",
      content: "Leadership is rooted in service.",
      author: "Akomapa Faculty",
      authorRole: "Faculty Mentor",
      category: "faculty-reflection",
      tags: ["leadership", "global-health"],
      date: "2026-06-21",
      featured: true,
    };

    expectTypeOf(partner).toEqualTypeOf<Partner>();
    expectTypeOf(philosophySection).toEqualTypeOf<PhilosophySection>();
    expectTypeOf(timelineEvent).toEqualTypeOf<TimelineEvent>();
    expectTypeOf(impactMetric).toEqualTypeOf<ImpactMetric>();
    expectTypeOf(impactCategory).toEqualTypeOf<ImpactCategory>();
    expectTypeOf(mapLocation).toEqualTypeOf<MapLocation>();
    expectTypeOf(blogPost).toEqualTypeOf<BlogPost>();
    expectTypeOf<Partner["category"]>().toEqualTypeOf<
      "university" | "community" | "government" | "global"
    >();
    expectTypeOf<MapLocation["type"]>().toEqualTypeOf<
      "active-hub" | "planned-hub" | "partner"
    >();
    expectTypeOf<BlogPost["category"]>().toEqualTypeOf<
      | "student-essay"
      | "faculty-reflection"
      | "article"
      | "community-voice"
      | "recorded-talk"
      | "conference-session"
    >();
  });

  it("keeps optional properties optional", () => {
    expectTypeOf<OptionalKeys<Story>>().toEqualTypeOf<"image">();
    expectTypeOf<OptionalKeys<ResearchItem>>().toEqualTypeOf<"link">();
    expectTypeOf<OptionalKeys<Partner>>().toEqualTypeOf<"logo" | "website">();
    expectTypeOf<OptionalKeys<PhilosophySection>>().toEqualTypeOf<
      "image" | "imageAlt" | "imagePosition" | "quote"
    >();
    expectTypeOf<OptionalKeys<TimelineEvent>>().toEqualTypeOf<"icon">();
    expectTypeOf<OptionalKeys<ImpactMetric>>().toEqualTypeOf<
      "futureValue" | "futureYear" | "icon"
    >();
    expectTypeOf<OptionalKeys<BlogPost>>().toEqualTypeOf<
      "authorInstitution" | "authorBio" | "authorImage" | "image" | "videoUrl"
    >();
  });

  it("requires a supported role category for every team member", () => {
    expectTypeOf<TeamMember["roleCategory"]>().toEqualTypeOf<
      | "executive"
      | "member"
      | "faculty"
      | "advisor"
      | "community-leader"
      | "government-leader"
      | "partner-institution"
    >();

    const roleCounts = teamMembers.reduce<Record<TeamMember["roleCategory"], number>>(
      (counts, member) => {
        counts[member.roleCategory] += 1;
        return counts;
      },
      {
        executive: 0,
        member: 0,
        faculty: 0,
        advisor: 0,
        "community-leader": 0,
        "government-leader": 0,
        "partner-institution": 0,
      },
    );

    expect(roleCounts).toEqual({
      executive: 12,
      member: 18,
      faculty: 0,
      advisor: 8,
      "community-leader": 1,
      "government-leader": 0,
      "partner-institution": 0,
    });
  });
});
