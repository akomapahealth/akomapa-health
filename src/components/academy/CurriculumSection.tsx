"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, Clock, Users } from "lucide-react";
import { FadeIn } from "@/components/animations";
import {
  PublicSection,
  PublicSectionHeader,
} from "@/components/shared/PublicPagePrimitives";
import { academyCurriculum, academyFaculty } from "@/data/academy";
import type { AcademyModule } from "@/lib/types";

const accentColors = ["#0097b2", "#F5C94D", "#66C4DC", "#eeba2b"] as const;

function getAccentColor(index: number) {
  return accentColors[index % accentColors.length];
}

function resolveFacultyNames(contributorIds: string[]): string {
  return contributorIds
    .map((id) => academyFaculty.find((f) => f.id === id)?.name)
    .filter(Boolean)
    .join(", ");
}

function ModuleAccordion({ modules }: { modules: AcademyModule[] }) {
  const [openId, setOpenId] = useState<string | null>(modules[0]?.id ?? null);

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {modules.map((module, index) => {
        const isOpen = openId === module.id;
        const accent = getAccentColor(index);

        return (
          <div
            key={module.id}
            className="overflow-hidden rounded-2xl border border-neutral-200/50 bg-white text-[#0F4C5C] shadow-md shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 dark:border-[#2F3332] dark:bg-[#2F3332] dark:text-[#FCFAEF] dark:shadow-black/30"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : module.id)}
              className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left sm:items-center sm:gap-4 sm:px-6 sm:py-5"
              aria-expanded={isOpen}
              aria-controls={`module-content-${module.id}`}
            >
              <div className="min-w-0 flex-1 space-y-2 sm:space-y-3">
                <span
                  className="inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] sm:px-3 sm:text-xs sm:tracking-[0.3em]"
                  style={{
                    color: accent,
                    backgroundColor: `${accent}1A`,
                  }}
                >
                  Module {module.order}
                </span>
                <h3 className="text-base font-semibold leading-tight text-[#0F4C5C] dark:text-[#FCFAEF] sm:text-lg md:text-xl">
                  {module.title}
                </h3>
              </div>
              <ChevronDown
                className={`mt-1 h-4 w-4 flex-shrink-0 text-[#0F4C5C] transition-transform duration-200 dark:text-[#FCFAEF] sm:mt-0 sm:h-5 sm:w-5 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`module-content-${module.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="space-y-4 px-4 pb-4 sm:px-6 sm:pb-6">
                    <p className="text-sm leading-relaxed text-[#2F3332] dark:text-[#E6E7E7] sm:text-base">
                      {module.description}
                    </p>

                    <div>
                      <h4 className="font-subheading text-xs font-bold uppercase tracking-widest text-[#0097b2] dark:text-[#66C4DC]">
                        Learning Objectives
                      </h4>
                      <ul className="mt-2 space-y-1.5">
                        {module.learningObjectives.map((objective) => (
                          <li
                            key={objective}
                            className="flex items-start gap-2 text-sm text-[#2F3332]/85 dark:text-[#E6E7E7]/85"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0097b2] dark:text-[#66C4DC]" />
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                      {module.duration ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0097b2]/10 px-3 py-1 font-semibold text-[#0097b2] dark:bg-[#66C4DC]/15 dark:text-[#66C4DC]">
                          <Clock className="h-3 w-3" />
                          {module.duration}
                        </span>
                      ) : null}
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3 w-3 text-[#0097b2] dark:text-[#66C4DC]" />
                        {resolveFacultyNames(module.facultyContributors)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function CurriculumSection() {
  return (
    <PublicSection
      id="curriculum"
      tone="white"
      spacing="spacious"
      className="scroll-mt-20"
    >
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Curriculum"
          title="8 Modules. One Transformative Journey."
          description={`A ${academyCurriculum.totalDuration} program covering ethical leadership, community partnership, research, innovation, and an applied capstone project.`}
          alignment="center"
          className="mb-12 md:mb-16"
        />
      </FadeIn>

      <div className="mx-auto max-w-3xl">
        <ModuleAccordion modules={academyCurriculum.modules} />
      </div>
    </PublicSection>
  );
}
