import HubDetailHero from "@/components/community-hubs/HubDetailHero";
import HubInnovation from "@/components/community-hubs/HubInnovation";
import HubMetrics from "@/components/community-hubs/HubMetrics";
import HubPeopleSection from "@/components/community-hubs/HubPeopleSection";
import HubResearch from "@/components/community-hubs/HubResearch";
import MentorshipSection from "@/components/community-hubs/MentorshipSection";
import StoriesSection from "@/components/community-hubs/StoriesSection";
import { hubEmptyStates } from "@/data/community-hubs";
import type { CommunityHub } from "@/lib/types";

type CommunityHubDetailPageProps = {
  hub: CommunityHub;
};

export default function CommunityHubDetailPage({ hub }: CommunityHubDetailPageProps) {
  return (
    <>
      <HubDetailHero hub={hub} />
      <HubMetrics hub={hub} />
      <HubPeopleSection hubName={hub.name} roster={hub.roster} />
      <StoriesSection
        title="Community Stories"
        stories={hub.communityStories}
        emptyState={hubEmptyStates.communityStories}
        sectionId="community-stories"
      />
      <StoriesSection
        title="Student Stories"
        stories={hub.studentStories}
        emptyState={hubEmptyStates.studentStories}
        sectionId="student-stories"
      />
      <MentorshipSection mentorship={hub.facultyMentorship} />
      <HubResearch items={hub.research} emptyState={hubEmptyStates.research} />
      <HubInnovation items={hub.innovations} emptyState={hubEmptyStates.innovation} />
    </>
  );
}
