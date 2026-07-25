"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, Clock, Users } from "lucide-react";
import { FadeIn } from "@/components/animations";
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
            className="overflow-hidden rounded-2xl border border-white/20 bg-[#0B2F3A]/60 text-[#FCFAEF] shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
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
                <h3 className="text-base font-semibold leading-tight text-[#FCFAEF] sm:text-lg md:text-xl">
                  {module.title}
                </h3>
              </div>
              <ChevronDown
                className={`mt-1 h-4 w-4 flex-shrink-0 text-[#FCFAEF] transition-transform duration-200 sm:mt-0 sm:h-5 sm:w-5 ${
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
                    <p className="text-sm leading-relaxed text-[#FCFAEF]/85 sm:text-base">
                      {module.description}
                    </p>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5C94D]">
                        Learning Objectives
                      </h4>
                      <ul className="mt-2 space-y-1.5">
                        {module.learningObjectives.map((objective) => (
                          <li
                            key={objective}
                            className="flex items-start gap-2 text-sm text-[#FCFAEF]/85"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F5C94D]" />
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#FCFAEF]/70">
                      {module.duration ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-semibold text-[#FCFAEF]">
                          <Clock className="h-3 w-3" />
                          {module.duration}
                        </span>
                      ) : null}
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3 w-3 text-[#F5C94D]" />
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
    <section
      id="curriculum"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-16 text-[#FCFAEF] md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
      </div>

      <div className="site-container relative z-10 mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5C94D]">
              Curriculum
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              8 Modules. One Transformative Journey.
            </h2>
            <p className="text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg">
              A {academyCurriculum.totalDuration} program covering ethical
              leadership, community partnership, research, innovation, and an
              applied capstone project.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto max-w-3xl">
          <ModuleAccordion modules={academyCurriculum.modules} />
        </div>
      </div>
    </section>
  );
}
