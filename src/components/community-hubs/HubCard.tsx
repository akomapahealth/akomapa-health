"use client";

import type { CSSProperties } from "react";
import Image from "@/components/common/Image";
import { EditorialArrowLink } from "@/components/shared/EditorialPrimitives";
import { getHubStatusLabel } from "@/components/community-hubs/hub-status";
import { getHubHref } from "@/data/community-hubs";
import type { CommunityHub } from "@/lib/types";

type HubCardProps = {
  hub: CommunityHub;
};

export default function HubCard({ hub }: HubCardProps) {
  const href = getHubHref(hub);
  const statusLabel = getHubStatusLabel(hub.status);

  return (
    <article
      data-testid="community-hub-card"
      data-hub-id={hub.id}
      data-accent-color={hub.color}
      data-hub-status={hub.status}
      className="flex h-full flex-col border border-[#1C1F1E]/15 bg-transparent dark:border-[#FCFAEF]/20"
      style={
        {
          borderTopWidth: "3px",
          borderTopColor: hub.color,
        } as CSSProperties
      }
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0F4C5C]/10">
        <Image
          src={hub.image}
          alt={`${hub.name} in ${hub.location}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 py-6 sm:px-6">
        <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0F4C5C] dark:text-[#66C4DC]">
          {statusLabel}
        </p>

        <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF]">
          {hub.name}
        </h3>

        <p className="mt-3 text-sm font-medium text-[#0097b2] dark:text-[#66C4DC]">
          {hub.location}, {hub.country}
        </p>

        <p className="mt-4 flex-1 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
          {hub.description}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-[#1C1F1E]/10 pt-5 text-sm dark:border-[#FCFAEF]/15">
          <div>
            <dt className="text-[#2F3332]/60 dark:text-[#E6E7E7]/60">Served</dt>
            <dd className="mt-1 font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
              {hub.metrics.communityMembersServed.toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-[#2F3332]/60 dark:text-[#E6E7E7]/60">Students</dt>
            <dd className="mt-1 font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
              {hub.metrics.studentsTrained.toLocaleString()}
            </dd>
          </div>
        </dl>

        <EditorialArrowLink href={href} className="mt-6">
          <span className="sr-only">{hub.name}: </span>
          Learn More
        </EditorialArrowLink>
      </div>
    </article>
  );
}
