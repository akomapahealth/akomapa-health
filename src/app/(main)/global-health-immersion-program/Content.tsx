import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import ImmersionAlertSection from "@/components/immersion/ImmersionAlertSection";
import ImmersionHeroMedia from "@/components/immersion/ImmersionHeroMedia";
import ImmersionRegisterInterestButton from "@/components/immersion/ImmersionRegisterInterestButton";
import {
  PublicCta,
  SectionEyebrow,
} from "@/components/shared/PublicPagePrimitives";
import { immersionProgram } from "@/data/immersion-program";
import { cn } from "@/lib/utils";

const sectionContainerClass =
  "site-container mx-auto px-4 py-16 md:py-20 lg:py-24";

function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  id,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "dark" | "light";
  id: string;
}) {
  return (
    <div className="max-w-3xl">
      <SectionEyebrow tone={tone === "light" ? "light" : "teal"}>
        {eyebrow}
      </SectionEyebrow>
      <h2
        id={id}
        className={cn(
          "mt-4 max-w-3xl font-heading text-[1.9rem] font-semibold leading-[1.14] tracking-tight md:text-[2.4rem] lg:text-[2.8rem]",
          tone === "light" ? "text-[#FCFAEF]" : "text-[#1C1F1E] dark:text-[#FCFAEF]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-7 md:text-lg",
            tone === "light"
              ? "text-[#FCFAEF]/78"
              : "text-[#2F3332]/78 dark:text-[#E6E7E7]/78",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function EditorialLinkArrow() {
  return (
    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
      →
    </span>
  );
}

export default function Content() {
  const {
    eyebrow,
    title,
    introduction,
    overview,
    vision,
    facts,
    experiences,
    learningComponents,
    audiences,
    outcomes,
    hostSite,
    images,
  } = immersionProgram;

  return (
    <div
      data-immersion-page
      className="bg-[#FCFAEF] text-[#1C1F1E] dark:bg-[#121514] dark:text-[#FCFAEF]"
    >
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <section
        aria-labelledby="immersion-title"
        className="relative isolate flex min-h-[620px] items-center overflow-hidden border-y border-[#FCFAEF]/12 bg-[#0F4C5C] text-[#FCFAEF] sm:min-h-[680px] lg:min-h-[720px]"
      >
        <ImmersionHeroMedia
          videoSrc={images.hero.videoSrc}
          posterSrc={images.hero.src}
          posterAlt={images.hero.alt}
          posterPosition={images.hero.position}
        />

        <div className="site-container relative z-10 mx-auto w-full px-4 py-16 md:py-24 lg:py-28">
          <div className="max-w-4xl border border-[#FCFAEF]/20 bg-[#07191d]/68 p-6 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-8 lg:p-10">
            <SectionEyebrow tone="light">{eyebrow}</SectionEyebrow>
            <p className="mt-5 inline-flex border border-[#F5C94D]/55 bg-[#F5C94D]/12 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F5C94D] sm:text-sm">
              Coming 2027
            </p>
            <h1
              id="immersion-title"
              className="mt-5 max-w-4xl font-heading text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.025em] text-[#FCFAEF] sm:text-[3.1rem] lg:text-[4.35rem]"
            >
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#FCFAEF]/82 sm:text-lg sm:leading-8">
              {introduction}
            </p>
            <div className="mt-8 flex max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <ImmersionRegisterInterestButton
                variant="gold"
                className="min-h-12 justify-center"
              />
              <PublicCta
                href="#experience"
                variant="outline-light"
                className="min-h-12 justify-center"
              >
                Explore the Experience
              </PublicCta>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="program-facts-title"
        className="border-b border-[#1C1F1E]/12 bg-white dark:border-[#FCFAEF]/12 dark:bg-[#1C1F1E]"
      >
        <div className="site-container mx-auto px-4 py-12 md:py-16">
          <div className="border-b border-[#1C1F1E]/16 pb-6 dark:border-[#FCFAEF]/16">
            <div>
              <SectionEyebrow>Program overview</SectionEyebrow>
              <h2
                id="program-facts-title"
                className="mt-3 font-heading text-2xl font-semibold tracking-tight md:text-3xl"
              >
                At a glance
              </h2>
            </div>
          </div>

          <dl className="grid md:grid-cols-3">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                className={cn(
                  "border-b border-[#1C1F1E]/12 py-7 dark:border-[#FCFAEF]/12 md:border-b-0 md:px-6",
                  index > 0 && "md:border-l",
                  index === 0 && "md:pl-0",
                )}
              >
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-[#0097b2] dark:text-[#66C4DC]">
                  {fact.label}
                </dt>
                <dd className="mt-3">
                  <span className="block font-heading text-2xl font-semibold leading-tight">
                    {fact.value}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-[#2F3332]/68 dark:text-[#E6E7E7]/68">
                    {fact.description}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="program-purpose-title"
        className="bg-[#FCFAEF] dark:bg-[#121514]"
      >
        <div
          className={cn(
            sectionContainerClass,
            "grid items-center gap-12 lg:grid-cols-12 lg:gap-16",
          )}
        >
          <FadeIn className="lg:col-span-6">
            <SectionHeading
              eyebrow="The program"
              title="See health through community, culture, and connection."
              id="program-purpose-title"
            />
            <div className="mt-7 max-w-2xl space-y-5 text-base leading-7 text-[#2F3332]/82 dark:text-[#E6E7E7]/80 md:text-lg md:leading-8">
              {overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <blockquote className="mt-9 border-l-4 border-[#eeba2b] pl-5">
              <p className="font-heading text-xl font-semibold leading-8 text-[#0F4C5C] dark:text-[#FCFAEF] md:text-2xl">
                {vision}
              </p>
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:col-span-6">
            <figure>
              <div className="relative aspect-[16/11] overflow-hidden border border-[#1C1F1E]/14 bg-[#E6E7E7] dark:border-[#FCFAEF]/14 dark:bg-[#2F3332]">
                <Image
                  src={images.overview.src}
                  alt={images.overview.alt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: images.overview.position }}
                />
              </div>
              <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#2F3332]/58 dark:text-[#FCFAEF]/58">
                Learning grounded in place and partnership
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      <section
        id="experience"
        aria-labelledby="participant-experience-title"
        className="scroll-mt-24 border-y border-[#1C1F1E]/10 bg-white dark:border-[#FCFAEF]/10 dark:bg-[#1C1F1E]"
      >
        <div className={sectionContainerClass}>
          <FadeIn>
            <SectionHeading
              eyebrow="The experience"
              title="What participants experience"
              description="The program combines supervised community health practice, academic study, research, reflection, and cultural learning."
              id="participant-experience-title"
            />
          </FadeIn>

          <ol className="mt-12 grid lg:grid-cols-2 lg:gap-x-12">
            {experiences.map((experience, index) => (
              <li
                key={experience.title}
                className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-[#1C1F1E]/16 py-6 dark:border-[#FCFAEF]/16 md:grid-cols-[3.5rem_1fr] md:py-7"
              >
                <span
                  aria-hidden="true"
                  className="font-heading text-sm font-semibold tracking-[0.14em] text-[#C9920F] dark:text-[#F5C94D]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold leading-7 md:text-xl">
                    {experience.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#2F3332]/72 dark:text-[#E6E7E7]/72 md:text-base md:leading-7">
                    {experience.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="learning-components-title"
        className="bg-[#121514] text-[#FCFAEF]"
      >
        <div className={sectionContainerClass}>
          <FadeIn>
            <SectionHeading
              eyebrow="Learning model"
              title="How participants learn"
              description="Each component connects practical experience with disciplined inquiry and guided reflection."
              tone="light"
              id="learning-components-title"
            />
          </FadeIn>

          <ol className="mt-12 border-b border-[#FCFAEF]/18">
            {learningComponents.map((component, index) => (
              <li
                key={component.title}
                className="grid gap-4 border-t border-[#FCFAEF]/18 py-7 md:grid-cols-[4rem_minmax(13rem,0.75fr)_1.25fr] md:items-baseline md:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="text-xs font-bold tracking-[0.2em] text-[#F5C94D]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl font-semibold leading-7 text-[#FCFAEF]">
                  {component.title}
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-[#FCFAEF]/70 md:text-base md:leading-7">
                  {component.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="eligibility-title"
        className="bg-[#FCFAEF] dark:bg-[#121514]"
      >
        <div className={cn(sectionContainerClass, "grid gap-14 lg:grid-cols-2 lg:gap-20")}>
          <div>
            <FadeIn>
              <SectionHeading
                eyebrow="Eligibility"
                title="Who the program is for"
                description="The experience is designed for learners prepared to approach community health with curiosity, humility, and care."
                id="eligibility-title"
              />
            </FadeIn>
            <ul className="mt-10 border-b border-[#1C1F1E]/14 dark:border-[#FCFAEF]/14">
              {audiences.map((audience) => (
                <li
                  key={audience.title}
                  className="border-t border-[#1C1F1E]/14 py-6 dark:border-[#FCFAEF]/14"
                >
                  <h3 className="font-heading text-lg font-semibold leading-7">
                    {audience.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#2F3332]/72 dark:text-[#E6E7E7]/72 md:text-base md:leading-7">
                    {audience.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div aria-labelledby="participant-outcomes-title">
            <FadeIn delay={0.08}>
              <SectionHeading
                eyebrow="Participant development"
                title="What participants develop"
                description="These are learning outcomes, not claims of achieved community impact."
                id="participant-outcomes-title"
              />
            </FadeIn>
            <ul className="mt-10 border-b border-[#1C1F1E]/14 dark:border-[#FCFAEF]/14">
              {outcomes.map((outcome) => (
                <li
                  key={outcome.title}
                  className="border-t border-[#1C1F1E]/14 py-6 dark:border-[#FCFAEF]/14"
                >
                  <h3 className="font-heading text-lg font-semibold leading-7">
                    {outcome.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#2F3332]/72 dark:text-[#E6E7E7]/72 md:text-base md:leading-7">
                    {outcome.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="host-site-title"
        className="border-t border-[#1C1F1E]/12 bg-white dark:border-[#FCFAEF]/12 dark:bg-[#1C1F1E]"
      >
        <div
          className={cn(
            sectionContainerClass,
            "grid items-center gap-12 lg:grid-cols-12 lg:gap-16",
          )}
        >
          <figure className="lg:col-span-6">
            <div className="relative aspect-[16/11] overflow-hidden border-b-4 border-[#eeba2b] bg-[#E6E7E7] dark:bg-[#2F3332]">
              <Image
                src={images.hostSite.src}
                alt={images.hostSite.alt}
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
                style={{ objectPosition: images.hostSite.position }}
              />
            </div>
          </figure>

          <div className="lg:col-span-6">
            <SectionEyebrow>{hostSite.heading}</SectionEyebrow>
            <h2
              id="host-site-title"
              className="mt-4 font-heading text-[1.9rem] font-semibold leading-[1.14] tracking-tight md:text-[2.4rem] lg:text-[2.8rem]"
            >
              {hostSite.name}
            </h2>
            <p className="mt-6 inline-flex border-y border-[#0097b2]/28 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#0F4C5C] dark:text-[#66C4DC]">
              {hostSite.status}
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#2F3332]/76 dark:text-[#E6E7E7]/76 md:text-lg">
              {hostSite.description}
            </p>

            <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row lg:flex-col 2xl:flex-row">
              <ImmersionRegisterInterestButton
                variant="teal"
                className="min-h-12 justify-center !text-[#1C1F1E]"
              />
            </div>
            <Link
              href="/partnerships"
              className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0F4C5C] underline decoration-[#eeba2b] decoration-2 underline-offset-4 hover:text-[#0097b2] dark:text-[#66C4DC] dark:hover:text-[#F5C94D]"
            >
              Partner as a faculty mentor
              <EditorialLinkArrow />
            </Link>
          </div>
        </div>
      </section>

      <ImmersionAlertSection />
    </div>
  );
}
