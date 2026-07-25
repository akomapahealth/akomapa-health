"use client";

import { useState } from "react";
import { Target, Globe, TrendingUp, CheckCircle, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MotionDiv } from "@/components/motion/framer";
import { phases } from "./phases";

const iconMap: Record<(typeof phases)[number]["icon"], LucideIcon> = {
  Target,
  TrendingUp,
  Globe,
};

export default function RoadmapPhases() {
  const [activePhase, setActivePhase] = useState(1);

  return (
    <>
      {/* Phase Navigation */}
      <section className="py-8 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="site-container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {phases.map((phase) => {
              const Icon = iconMap[phase.icon];
              return (
                <Button
                  key={phase.id}
                  onClick={() => setActivePhase(phase.id)}
                  variant={activePhase === phase.id ? "default" : "outline"}
                  className={`rounded-full px-6 py-3 ${
                    activePhase === phase.id
                      ? `${phase.color} text-[#FCFAEF] hover:${phase.color}`
                      : "border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2] hover:text-[#FCFAEF] dark:border-[#66C4DC] dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#1C1F1E]"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {phase.title.split(":")[1]}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Phase Details */}
      <section className="py-16">
        <div className="site-container mx-auto px-4">
          {phases.map((phase) => {
            const Icon = iconMap[phase.icon];
            return (
              <MotionDiv
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activePhase === phase.id ? 1 : 0,
                  y: activePhase === phase.id ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                className={`${activePhase === phase.id ? "block" : "hidden"}`}
              >
                <div className="max-w-4xl mx-auto">
                  {/* Phase Header */}
                  <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                      <div
                        className={`w-16 h-16 rounded-full ${phase.color} flex items-center justify-center mr-4`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {phase.title}
                        </h2>
                        <p className="text-lg text-[#0097b2] dark:text-[#66C4DC] font-medium">
                          {phase.period}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-[#2F3332] rounded-xl p-6 shadow-lg mb-8">
                      <h3 className="text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-3">
                        Focus
                      </h3>
                      <p className="text-[#2F3332] dark:text-[#E6E7E7] text-lg">
                        {phase.focus}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-[#0097b2] to-[#eeba2b] rounded-xl p-6 text-white">
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Goal
                      </h3>
                      <p className="text-lg">
                        {phase.goal.replace(/'/g, "&apos;")}
                      </p>
                    </div>
                  </div>

                  {/* Achievements Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {phase.achievements.map((achievement, index) => (
                      <MotionDiv
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-[#2F3332] group">
                          <CardContent className="p-6">
                            <div className="flex items-start">
                              <div
                                className={`w-8 h-8 rounded-full ${phase.color} flex items-center justify-center mr-4 mt-1`}
                              >
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                              <p className="text-[#2F3332] dark:text-[#E6E7E7] group-hover:text-[#0097b2] dark:group-hover:text-[#66C4DC] transition-colors">
                                {achievement}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </MotionDiv>
                    ))}
                  </div>
                </div>
              </MotionDiv>
            );
          })}
        </div>
      </section>
    </>
  );
}
