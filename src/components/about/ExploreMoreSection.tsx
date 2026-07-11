"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { exploreMoreCards } from "@/data/about";

export default function ExploreMoreSection() {
  return (
    <section
      id="explore-more"
      className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#031C3A] py-16 text-[#FCFAEF] md:py-24"
      aria-labelledby="explore-more-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-32 h-72 w-72 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
      </div>

      <div className="site-container relative mx-auto px-4 sm:px-6">
        <FadeIn className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F5C94D]">
            Explore More
          </p>
          <h2
            id="explore-more-heading"
            className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl"
          >
            Learn About Our Foundation
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg">
            Discover our philosophy, team, impact, and partners working together to
            advance ethical global health leadership.
          </p>
        </FadeIn>

        <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {exploreMoreCards.map((card) => (
            <FadeInStaggerItem key={card.id} direction="up">
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-2xl border border-[#FCFAEF]/15 bg-[#FCFAEF]/10 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#FCFAEF]/15 hover:shadow-2xl sm:p-8"
              >
                <div className="flex items-center gap-2">
                  <div className="h-1 w-8 rounded-full bg-[#F5C94D]" />
                  <div className="h-1 w-1 rounded-full bg-[#F5C94D]" />
                </div>
                <h3 className="mt-4 text-xl font-semibold sm:text-2xl">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#FCFAEF]/80 sm:text-base">
                  {card.description}
                </p>
                <span className="mt-6 inline-flex items-center font-medium text-[#F5C94D] transition-transform group-hover:translate-x-2">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
