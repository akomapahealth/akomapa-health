"use client";

import { FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { PublicationEmptyState } from "@/components/publication";
import ResourceCard from "./ResourceCard";
import { Resource } from "@/lib/types";

export default function ResourceGrid({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) {
    return (
      <PublicationEmptyState
        title="No Resources Found"
        description="Try adjusting your filters or search criteria to find what you're looking for."
      />
    );
  }

  return (
    <div>
      <p
        className="mb-6 text-sm font-medium text-[#2F3332]/80 dark:text-[#E6E7E7]/80"
        aria-live="polite"
      >
        Showing {resources.length} resource
        {resources.length !== 1 ? "s" : ""}
      </p>

      <FadeInStagger className="flex flex-col" staggerDelay={0.06}>
        {resources.map((resource) => (
          <FadeInStaggerItem key={resource.id}>
            <ResourceCard resource={resource} />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </div>
  );
}
