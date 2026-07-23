import { FadeIn } from "@/components/animations";
import Image from "@/components/common/Image";
import {
  HomeArrowLink,
  HomeBand,
  HomeEyebrow,
  HomeHeading,
  HomeLead,
} from "@/components/home/_home-ui";

export default function BuiltOnEvidenceSection() {
  const headingId = "built-on-evidence-heading";

  return (
    <HomeBand tone="white" marker="04" aria-labelledby={headingId}>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeIn direction="right" className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E6E7E7] dark:border-[#2F3332]">
            <Image
              src="/highlights/Akomapa-66.jpg"
              alt="Akomapa students and faculty reviewing community health research together"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn className="lg:col-span-7">
          <HomeEyebrow>Built on Evidence</HomeEyebrow>
          <HomeHeading id={headingId} className="mt-4">
            Research before implementation.
          </HomeHeading>
          <div className="mt-6 max-w-2xl space-y-5">
            <HomeLead>
              Our model was not designed in a boardroom. It was built through
              research. Our founder&rsquo;s award-winning, mixed-methods MD
              thesis explored whether Community Learning &amp; Care Hubs could
              improve noncommunicable disease care in Ghana.
            </HomeLead>
            <HomeLead>
              Through interviews, focus groups, and surveys involving students,
              faculty, community members, and health leaders, the research
              identified the critical ingredients for a sustainable, ethical,
              and community-owned model. Those findings became the foundation of
              Akomapa — and our work continues to be guided by implementation
              science, continuous evaluation, and community partnership.
            </HomeLead>
          </div>
          <HomeArrowLink href="/research" className="mt-7">
            Explore our research
          </HomeArrowLink>
        </FadeIn>
      </div>
    </HomeBand>
  );
}
