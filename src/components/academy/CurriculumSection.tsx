"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialChevron,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { academyCurriculum, academyFaculty } from "@/data/academy";
import type { AcademyModule } from "@/lib/types";

function resolveFacultyNames(contributorIds: string[]): string {
  return contributorIds
    .map((id) => academyFaculty.find((f) => f.id === id)?.name)
    .filter(Boolean)
    .join(", ");
}

function ModuleAccordion({ modules }: { modules: AcademyModule[] }) {
  const [openId, setOpenId] = useState<string | null>(modules[0]?.id ?? null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <ol className="w-full border-t border-[#FCFAEF]/25">
      {modules.map((module) => {
        const isOpen = openId === module.id;
        const panelId = `module-content-${module.id}`;
        const buttonId = `module-toggle-${module.id}`;

        return (
          <li
            key={module.id}
            className="border-b border-[#FCFAEF]/25"
            value={module.order}
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpenId(isOpen ? null : module.id)}
              className="flex min-h-11 w-full items-start justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F4C5C] sm:items-center sm:py-6"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <div className="min-w-0 flex-1">
                <span className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#F5C94D]">
                  Module {String(module.order).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-lg font-semibold leading-tight text-[#FCFAEF] sm:text-xl md:text-2xl">
                  {module.title}
                </h3>
              </div>
              <EditorialChevron
                className={`mt-1 h-5 w-5 shrink-0 text-[#FCFAEF] transition-transform duration-200 motion-reduce:transition-none ${
                  isOpen ? "rotate-[-90deg]" : "rotate-90"
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { height: 0, opacity: 0 }
                  }
                  animate={{ height: "auto", opacity: 1 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.3, ease: "easeInOut" }
                  }
                  style={{ overflow: "hidden" }}
                >
                  <div className="space-y-5 pb-6">
                    <p className="text-sm leading-relaxed text-[#FCFAEF]/85 sm:text-base">
                      {module.description}
                    </p>

                    <div>
                      <h4 className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#F5C94D]">
                        Learning Objectives
                      </h4>
                      <ul className="mt-3 space-y-2 border-l border-[#FCFAEF]/25 pl-4">
                        {module.learningObjectives.map((objective) => (
                          <li
                            key={objective}
                            className="text-sm leading-relaxed text-[#FCFAEF]/85"
                          >
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#FCFAEF]/80">
                      {module.duration ? (
                        <div>
                          <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/60">
                            Duration
                          </dt>
                          <dd className="mt-1">{module.duration}</dd>
                        </div>
                      ) : null}
                      <div>
                        <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/60">
                          Faculty
                        </dt>
                        <dd className="mt-1">
                          {resolveFacultyNames(module.facultyContributors)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}

export default function CurriculumSection() {
  return (
    <EditorialBand
      tone="teal"
      marker="02"
      id="curriculum"
      aria-labelledby="curriculum-heading"
      className="scroll-mt-20 border-y border-[#FCFAEF]/15 bg-[#0F4C5C]"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Curriculum
          </EditorialEyebrow>
          <EditorialHeading
            id="curriculum-heading"
            className="mt-4 text-[#FCFAEF]"
          >
            8 Modules. One Transformative Journey.
          </EditorialHeading>
          <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            A {academyCurriculum.totalDuration} program covering ethical
            leadership, community partnership, research, innovation, and an
            applied capstone project.
          </EditorialLead>
        </div>
      </FadeIn>

      <div className="mx-auto mt-12 max-w-3xl">
        <ModuleAccordion modules={academyCurriculum.modules} />
      </div>
    </EditorialBand>
  );
}
