"use client";

import { trackEvent } from "@/lib/analytics";
import { HomeButton, HomeEyebrow, HomeHeading } from "@/components/home/_home-ui";

export default function JoinTheMovementSection() {
  const headingId = "join-heading";

  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-[#121514] text-[#FCFAEF]"
    >
      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <HomeEyebrow tone="gold" className="inline-block">
            Join the Movement
          </HomeEyebrow>
          <HomeHeading id={headingId} className="mt-4 text-[#FCFAEF]">
            Build healthier communities and stronger health leaders with us.
          </HomeHeading>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#FCFAEF]/80 md:text-lg">
            Improving chronic disease care takes communities, universities,
            healthcare institutions, policymakers, and supporters working
            together. Join us as we care for today&rsquo;s patients and prepare
            tomorrow&rsquo;s health leaders.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <HomeButton href="/partnerships" variant="light">
              Partner With Us
            </HomeButton>
            <HomeButton
              href="/donate"
              variant="amber"
              onClick={() =>
                trackEvent({
                  name: "donation_cta_click",
                  location: "home_join_the_movement",
                })
              }
            >
              Support Our Work
            </HomeButton>
            <HomeButton href="/get-involved" variant="outline-light">
              Join Akomapa
            </HomeButton>
          </div>
        </div>
      </div>
    </section>
  );
}
