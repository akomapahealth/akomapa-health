import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { phases } from "./phases";

export default function RoadmapPhases() {
  return (
    <EditorialBand
      tone="cream"
      marker="01"
      id="roadmap-phases"
      aria-labelledby="roadmap-phases-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
            Three Phases
          </EditorialEyebrow>
          <EditorialHeading id="roadmap-phases-heading" className="mt-4">
            Akomapa&apos;s 3-Year Roadmap
          </EditorialHeading>
          <EditorialLead className="mt-5">
            Each phase builds on the last—from launching care and learning
            systems, to testing sustainability models, to scaling what works.
          </EditorialLead>
        </div>
      </FadeIn>

      <nav aria-label="Roadmap phases" className="mt-10">
        <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          {phases.map((phase) => (
            <li key={phase.id}>
              <a
                href={`#phase-${phase.id}`}
                className="inline-flex min-h-11 items-center rounded-md border border-[#1C1F1E]/15 px-4 py-2 text-sm font-semibold text-[#0F4C5C] transition-colors hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:border-[#FCFAEF]/25 dark:text-[#66C4DC] dark:hover:border-[#66C4DC]"
              >
                <span className="mr-2 font-subheading text-xs tracking-[0.15em] uppercase opacity-70">
                  Phase {phase.id}
                </span>
                {phase.title.split(": ")[1] ?? phase.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <ol className="mt-14 space-y-0 border-t border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20">
        {phases.map((phase) => (
          <li
            key={phase.id}
            id={`phase-${phase.id}`}
            className="scroll-mt-28 border-b border-[#1C1F1E]/15 py-12 dark:border-[#FCFAEF]/20 lg:py-16"
          >
            <FadeIn>
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <span
                    aria-hidden="true"
                    className="font-heading text-4xl font-semibold tracking-[-0.06em] text-[#0097b2]/55 dark:text-[#66C4DC]/65"
                  >
                    {String(phase.id).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-heading text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-3xl">
                    {phase.title}
                  </h3>
                  <p className="mt-3 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
                    {phase.period}
                  </p>
                </div>

                <div className="lg:col-span-8 space-y-8">
                  <div>
                    <h4 className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                      Focus
                    </h4>
                    <p className="mt-2 text-base leading-relaxed text-[#1C1F1E] dark:text-[#FCFAEF] md:text-lg">
                      {phase.focus}
                    </p>
                  </div>

                  <div className="border-l-2 border-[#eeba2b] pl-5">
                    <h4 className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]">
                      Goal
                    </h4>
                    <p className="mt-2 text-base leading-relaxed text-[#1C1F1E] dark:text-[#FCFAEF] md:text-lg">
                      {phase.goal}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                      Key Milestones
                    </h4>
                    <ul className="mt-4 space-y-3 border-t border-[#1C1F1E]/10 pt-4 dark:border-[#FCFAEF]/15">
                      {phase.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-base"
                        >
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          </li>
        ))}
      </ol>
    </EditorialBand>
  );
}
