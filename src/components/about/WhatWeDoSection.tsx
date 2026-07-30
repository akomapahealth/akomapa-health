import Link from "next/link";
import {
  EditorialArrow,
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { whatWeDoCategories } from "@/data/about";

export default function WhatWeDoSection() {
  return (
    <EditorialBand
      tone="cream"
      marker="04"
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
    >
      <div className="max-w-3xl">
        <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
          What We Do
        </EditorialEyebrow>
        <EditorialHeading id="what-we-do-heading" className="mt-4">
          Five Pillars of Our Work
        </EditorialHeading>
        <EditorialLead className="mt-5">
          We develop ethical leaders, strengthen communities, advance research,
          drive innovation, and build equitable partnerships.
        </EditorialLead>
      </div>

      <ol className="mt-12 grid border-t border-[#1C1F1E]/15 md:grid-cols-2 xl:grid-cols-5 dark:border-[#FCFAEF]/20">
        {whatWeDoCategories.map((category, index) => (
          <li
            key={category.id}
            className="border-b border-[#1C1F1E]/15 md:odd:border-r xl:border-r xl:last:border-r-0 dark:border-[#FCFAEF]/20"
          >
            <Link
              href={category.href}
              className="group flex h-full min-h-11 flex-col px-1 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0F4C5C] md:px-6 xl:px-5 dark:focus-visible:ring-[#F5C94D]"
            >
              <span
                aria-hidden="true"
                className="font-heading text-4xl font-semibold tracking-[-0.06em] text-[#0097b2]/55 dark:text-[#66C4DC]/65"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                {category.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                {category.description}
              </p>
              <span className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0F4C5C] dark:text-[#66C4DC]">
                Learn more
                <EditorialArrow className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </EditorialBand>
  );
}
