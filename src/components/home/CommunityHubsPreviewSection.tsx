import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { communityHubsPreviewContent } from "@/data/homepage-narrative";
import {
  PublicSection,
  PublicSectionHeader,
} from "@/components/shared/PublicPagePrimitives";

const statusLabels = {
  active: "Active",
  "in-development": "In development",
  planned: "Planned",
} as const;

export default function CommunityHubsPreviewSection() {
  const headingId = "community-hubs-preview-heading";

  return (
    <PublicSection
      aria-labelledby={headingId}
      tone="cream"
    >
        <FadeIn>
          <PublicSectionHeader
            eyebrow="Care, Learning, and Partnership"
            title={communityHubsPreviewContent.heading}
            titleId={headingId}
            description={communityHubsPreviewContent.subheading}
            className="mb-12"
          />
        </FadeIn>

        <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communityHubsPreviewContent.hubs.map((hub) => (
            <FadeInStaggerItem key={hub.id} className="h-full">
              <article className="h-full">
                <Card
                  data-testid="community-hub-card"
                  data-hub-id={hub.id}
                  data-accent-color={hub.color}
                  className="homepage-hover-card h-full gap-0 overflow-hidden rounded-xl border-x border-b border-t-4 border-[#E6E7E7] bg-white py-0 text-[#1C1F1E] shadow-sm dark:border-[#2F3332] dark:bg-[#1C1F1E] dark:text-[#FCFAEF] dark:shadow-lg"
                  style={
                    {
                      borderTopColor: hub.color,
                      "--homepage-hover-border-color": hub.color,
                    } as CSSProperties
                  }
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={hub.image}
                      alt={`${hub.name} in ${hub.location}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 motion-safe:hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#121514]/55 via-transparent to-transparent"
                    />
                    <span className="absolute right-4 top-4 rounded-full bg-[#FCFAEF]/95 px-3 py-1 text-xs font-bold text-[#1C1F1E] shadow-sm">
                      {statusLabels[hub.status]}
                    </span>
                  </div>

                  <CardHeader className="px-6 pb-4 pt-6">
                    <CardTitle>
                      <h3 className="text-2xl leading-tight text-[#1C1F1E] dark:text-[#FCFAEF]">
                        {hub.name}
                      </h3>
                    </CardTitle>
                    <div className="mt-3 flex items-start gap-2 text-sm font-medium text-[#66C4DC]">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {hub.location}, {hub.country}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col px-6 pb-6">
                    <CardDescription className="flex-1 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]">
                      {hub.description}
                    </CardDescription>
                    <Button
                      asChild
                      variant="link"
                      className="mt-6 h-auto w-fit justify-start p-0 text-base font-bold text-[#66C4DC] hover:text-[#F5C94D]"
                    >
                      <Link
                        href={hub.href}
                        aria-label={`Learn more about ${hub.name}`}
                      >
                        Learn More
                        <ArrowRight
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </article>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
    </PublicSection>
  );
}
