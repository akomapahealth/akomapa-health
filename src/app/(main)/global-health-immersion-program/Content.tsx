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
    applicationStatus,
    title,
    introduction,
    overview,
    vision,
    facts,
    experiences,
    audiences,
    hostCities,
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
        data-immersion-hero
        aria-labelledby="immersion-title"
        className="relative isolate flex min-h-[620px] items-center overflow-hidden border-y border-[#FCFAEF]/12 bg-[#0F4C5C] text-[#FCFAEF] sm:min-h-[680px] lg:min-h-[720px]"
      >
        <ImmersionHeroMedia
          videoSrc={images.hero.videoSrc}
          posterSrc={images.hero.src}
          posterAlt={images.hero.alt}
          posterPosition={images.hero.position}
        />

        <div className="site-container relative z-10 mx-auto w-full px-4 py-12 md:py-16 lg:py-20">
          <div
            data-immersion-hero-panel
            className="max-w-2xl border border-[#FCFAEF]/22 bg-[#07191d]/32 p-5 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-6 lg:p-7"
          >
            <SectionEyebrow tone="light">{eyebrow}</SectionEyebrow>
            <p className="mt-4 inline-flex border border-[#F5C94D]/55 bg-[#F5C94D]/12 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F5C94D]">
              {applicationStatus}
            </p>
            <h1
              id="immersion-title"
              className="mt-4 max-w-3xl font-heading text-[2.15rem] font-semibold leading-[1.06] tracking-[-0.025em] text-[#FCFAEF] sm:text-[2.75rem] lg:text-[3.5rem]"
            >
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#FCFAEF]/82 sm:text-base sm:leading-7">
              {introduction}
            </p>
            <div className="mt-6 flex max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
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
        data-section-tone="teal"
        className="scroll-mt-24 border-y border-[#FCFAEF]/14 bg-[#0F4C5C] text-[#FCFAEF]"
      >
        <div className={sectionContainerClass}>
          <FadeIn>
            <SectionHeading
              eyebrow="The experience"
              title="What participants experience"
              description="Four connected experiences bring global health learning to life."
              tone="light"
              id="participant-experience-title"
            />
          </FadeIn>

          <ol className="mt-12 grid gap-6 md:grid-cols-2">
            {experiences.map((experience, index) => (
              <li
                key={experience.title}
                className="group overflow-hidden border border-[#FCFAEF]/18 bg-[#FCFAEF] text-[#1C1F1E] shadow-[0_20px_50px_rgba(7,25,29,0.18)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E6E7E7] dark:bg-[#2F3332]">
                  <Image
                    src={experience.image.src}
                    alt={experience.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
                    style={{ objectPosition: experience.image.position }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-4 border border-[#FCFAEF]/35 bg-[#07191d]/78 px-3 py-2 font-heading text-xs font-semibold tracking-[0.16em] text-[#F5C94D] backdrop-blur-sm"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="font-heading text-xl font-semibold leading-7 md:text-2xl">
                    {experience.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#2F3332]/72 md:text-base md:leading-7">
                    {experience.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="eligibility-title"
        className="bg-[#FCFAEF] dark:bg-[#121514]"
      >
        <div className={sectionContainerClass}>
          <FadeIn>
            <SectionHeading
              eyebrow="Eligibility"
              title="Who the program is for"
              description="For learners ready to approach community health with curiosity, humility, and care."
              id="eligibility-title"
            />
          </FadeIn>

          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {audiences.map((audience) => (
              <li
                key={audience.title}
                className="group overflow-hidden border border-[#1C1F1E]/12 bg-white dark:border-[#FCFAEF]/12 dark:bg-[#1C1F1E]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E6E7E7] dark:bg-[#2F3332]">
                  <Image
                    src={audience.image.src}
                    alt={audience.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
                    style={{ objectPosition: audience.image.position }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold leading-7 md:text-xl">
                    {audience.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#2F3332]/72 dark:text-[#E6E7E7]/72 md:text-base md:leading-7">
                    {audience.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="host-cities-title"
        data-section-tone="teal"
        className="border-t border-[#FCFAEF]/14 bg-[#0F4C5C] text-[#FCFAEF]"
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
                src={hostCities.image.src}
                alt={hostCities.image.alt}
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
                style={{ objectPosition: hostCities.image.position }}
              />
            </div>
          </figure>

          <div className="lg:col-span-6">
            <SectionEyebrow tone="light">{hostCities.heading}</SectionEyebrow>
            <h2
              id="host-cities-title"
              className="mt-4 font-heading text-[1.9rem] font-semibold leading-[1.14] tracking-tight md:text-[2.4rem] lg:text-[2.8rem]"
            >
              {hostCities.name}
            </h2>
            <p className="mt-6 inline-flex border-y border-[#FCFAEF]/24 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F5C94D]">
              {hostCities.status}
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#FCFAEF]/78 md:text-lg">
              {hostCities.description}
            </p>

            <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row lg:flex-col 2xl:flex-row">
              <ImmersionRegisterInterestButton
                variant="gold"
                className="min-h-12 justify-center"
              />
            </div>
            <Link
              href="/partnerships"
              className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#FCFAEF] underline decoration-[#F5C94D] decoration-2 underline-offset-4 hover:text-[#F5C94D]"
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
