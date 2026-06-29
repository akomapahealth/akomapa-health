import { FadeIn } from "@/components/animations";
import Image from "@/components/common/Image";
import {
  HomeArrowLink,
  HomeBand,
  HomeEyebrow,
  HomeHeading,
} from "@/components/home/_home-ui";

const stories = [
  {
    kicker: "One Patient",
    title: "Early diagnosis, continuity, and hope.",
    image: "/highlights/Akomapa-28.jpg",
    alt: "An Akomapa care team screening a community member for noncommunicable disease",
    href: "/ncd-impact",
  },
  {
    kicker: "One Student",
    title: "Learning to lead through service.",
    image: "/highlights/Akomapa-40.jpg",
    alt: "An Akomapa student leader during a community learning and care session",
    href: "/academy",
  },
  {
    kicker: "One Community",
    title: "Partnership creating lasting change.",
    image: "/highlights/ucc.jpg",
    alt: "Akomapa community partners gathered at a Community Learning and Care Hub",
    href: "/community-hubs",
  },
];

export default function StoriesOfImpactSection() {
  const headingId = "stories-heading";

  return (
    <HomeBand tone="cream" marker="08" aria-labelledby={headingId}>
      <FadeIn>
        <div className="max-w-3xl">
          <HomeEyebrow>Stories of Impact</HomeEyebrow>
          <HomeHeading id={headingId} className="mt-4">
            Care, leadership, and partnership — one story at a time.
          </HomeHeading>
        </div>
      </FadeIn>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {stories.map((story, index) => (
          <FadeIn key={story.kicker} delay={index * 0.08}>
            <article className="group flex h-full flex-col">
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-[#E6E7E7] dark:border-[#2F3332]">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  sizes="(min-width: 768px) 32vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#FCFAEF] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0097b2] shadow-sm">
                  {story.kicker}
                </span>
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold leading-snug text-[#1C1F1E] dark:text-[#FCFAEF]">
                {story.title}
              </h3>
              <HomeArrowLink href={story.href} className="mt-4">
                Read the story
              </HomeArrowLink>
            </article>
          </FadeIn>
        ))}
      </div>
    </HomeBand>
  );
}
