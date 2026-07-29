import Link from "next/link";
import {
  EditorialArrow,
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { exploreMoreCards } from "@/data/about";

export default function ExploreMoreSection() {
  return (
    <EditorialBand
      tone="onyx"
      marker="05"
      id="explore-more"
      aria-labelledby="explore-more-heading"
      className="border-t border-[#66C4DC]/35"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Explore More
          </EditorialEyebrow>
          <EditorialHeading id="explore-more-heading" className="mt-4">
            Learn About Our Foundation
          </EditorialHeading>
        </div>
        <EditorialLead className="max-w-3xl text-[#FCFAEF]/78 dark:text-[#FCFAEF]/78 lg:col-span-7 lg:pt-8">
          Discover our philosophy, team, impact, and partners working together to
          advance ethical global health leadership.
        </EditorialLead>
      </div>

      <ul className="mt-12 grid border-t border-[#FCFAEF]/20 sm:grid-cols-2 lg:grid-cols-4">
        {exploreMoreCards.map((card, index) => (
          <li
            key={card.id}
            className="border-b border-[#FCFAEF]/20 sm:odd:border-r lg:border-r lg:last:border-r-0"
          >
            <Link
              href={card.href}
              className="group flex h-full min-h-11 flex-col px-1 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#eeba2b] sm:px-6"
            >
              <span
                aria-hidden="true"
                className="font-subheading text-xs font-bold tracking-[0.2em] text-[#F5C94D]"
              >
                0{index + 1}
              </span>
              <h3 className="mt-5 font-heading text-xl font-semibold text-[#FCFAEF]">
                {card.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#FCFAEF]/72 md:text-base">
                {card.description}
              </p>
              <span className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#F5C94D]">
                Read more
                <EditorialArrow className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </EditorialBand>
  );
}
