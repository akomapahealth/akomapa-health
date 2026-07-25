"use client";

import { FadeIn } from "@/components/animations";
import { trackEvent } from "@/lib/analytics";
import { HomeButton, HomeEyebrow, HomeHeading } from "@/components/home/_home-ui";

export default function JoinTheMovementSection() {
  const headingId = "join-heading";

  return (
    <section
      aria-labelledby={headingId}
      data-join-the-movement
      className="relative overflow-hidden border-t border-[#66C4DC]/45 bg-[#0F4C5C] text-[#FCFAEF]"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-1 w-24 bg-[#eeba2b] md:w-40"
      />

      <div className="site-container relative mx-auto px-4 py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-end lg:gap-16">
          <FadeIn>
            <div data-join-copy className="max-w-3xl">
              <HomeEyebrow
                tone="gold"
                className="text-[#F5C94D] dark:text-[#F5C94D]"
              >
                Join the Movement
              </HomeEyebrow>
              <HomeHeading id={headingId} className="mt-4 text-[#FCFAEF]">
                Build healthier communities and stronger health leaders with
                us.
              </HomeHeading>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#FCFAEF]/85 md:text-lg">
                Improving chronic disease care takes communities, universities,
                healthcare institutions, policymakers, and supporters working
                together. Join us as we care for today&rsquo;s patients and
                prepare tomorrow&rsquo;s health leaders.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div
              data-join-actions
              className="border-t border-[#66C4DC]/65 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
            >
              <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/75">
                Choose how to take part
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <HomeButton
                  href="/donate"
                  variant="amber"
                  className="min-h-14 w-full justify-between bg-[#eeba2b] px-5 py-4 text-[#1C1F1E] hover:bg-[#F5C94D] sm:col-span-2"
                  onClick={() =>
                    trackEvent({
                      name: "donation_cta_click",
                      location: "home_join_the_movement",
                    })
                  }
                >
                  Support Our Work
                </HomeButton>

                <HomeButton
                  href="/partnerships"
                  variant="light"
                  className="min-h-14 w-full justify-between px-5 py-4 text-[#0F4C5C] hover:bg-[#F5C94D] hover:text-[#1C1F1E]"
                >
                  Partner With Us
                </HomeButton>

                <HomeButton
                  href="/get-involved"
                  variant="outline-light"
                  className="min-h-14 w-full justify-between border-[#66C4DC] px-5 py-4 hover:border-[#FCFAEF] hover:text-[#0F4C5C]"
                >
                  Join Akomapa
                </HomeButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
