"use client";

import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { whyHubsMatter } from "@/data/community-hubs";

export default function WhyHubsMatter() {
  return (
    <EditorialBand
      tone="teal"
      marker="04"
      id="why-hubs-matter"
      aria-labelledby="why-hubs-matter-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Why Our Hubs Matter
          </EditorialEyebrow>
          <EditorialHeading
            id="why-hubs-matter-heading"
            className="mt-4 text-[#FCFAEF]"
          >
            More Than a Place to Receive Care
          </EditorialHeading>
          <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            Our hubs strengthen communities, develop ethical leaders, generate
            evidence, and pilot innovations that can scale.
          </EditorialLead>
        </div>
      </FadeIn>

      <ol className="mt-12 grid border-t border-[#FCFAEF]/25 md:grid-cols-2 xl:grid-cols-5">
        {whyHubsMatter.map((item, index) => (
          <li
            key={item.id}
            className="border-b border-[#FCFAEF]/25 px-1 py-7 md:odd:border-r md:px-6 xl:border-r xl:px-5 xl:last:border-r-0"
          >
            <span
              aria-hidden="true"
              className="font-heading text-4xl font-semibold tracking-[-0.06em] text-[#FCFAEF]/45"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 font-heading text-lg font-semibold text-[#FCFAEF]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#FCFAEF]/85">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </EditorialBand>
  );
}
