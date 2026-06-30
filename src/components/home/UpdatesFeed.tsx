import { motionDurations } from "@/lib/motion/tokens";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import { AnnouncementCard } from "@/components/common/AnnouncementCard";
import {
  PublicCta,
  PublicSection,
  PublicSectionHeader,
} from "@/components/shared/PublicPagePrimitives";
import { getAllNewsItems, newsItemToAnnouncement } from "@/data/unified-news";

/** Number of cards shown on the homepage. */
const FEATURED_COUNT = 3;

export default function UpdatesFeed() {
  const featured = getAllNewsItems()
    .slice(0, FEATURED_COUNT)
    .map(newsItemToAnnouncement);

  return (
    <PublicSection tone="cream" withTexture>
      <FadeIn duration={motionDurations.enter}>
        <PublicSectionHeader
          eyebrow="Updates & Announcements"
          eyebrowTone="gold"
          title="What's happening at Akomapa"
          description="Awards, milestones, and new initiatives driving our mission forward. Stay connected with everything shaping the future of Akomapa Health."
          className="mb-14"
        />
      </FadeIn>

      <FadeInStagger
        className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        staggerDelay={motionDurations.staggerContainer}
      >
        {featured.map((item) => (
          <FadeInStaggerItem key={item.id} direction="up">
            <AnnouncementCard item={item} />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>

      <FadeIn className="mt-12 text-center" duration={motionDurations.enter}>
        <PublicCta href="/news" variant="outline">
          View All Updates
        </PublicCta>
      </FadeIn>
    </PublicSection>
  );
}
