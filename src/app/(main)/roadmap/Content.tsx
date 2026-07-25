import { ArrowRight, Heart, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "@/components/common/Image";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MotionDiv, MotionH1, MotionH2, MotionP } from "@/components/motion/framer";
import RoadmapPhases from "@/components/roadmap/RoadmapPhases";
import { phases } from "@/components/roadmap/phases";

export default function Content() {
  return (
    <>
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>
      <div className="flex flex-col gap-y-section-mobile md:gap-y-section-tablet lg:gap-y-section-desktop">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Roadmap hero background — decorative — intentional empty alt */}
          <div className="absolute inset-0 z-0 opacity-10" aria-hidden>
            <Image
              src="/highlights/Akomapa-28.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="site-container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Badge className="bg-[#0097b2] text-[#FCFAEF] mb-4">
                  🧭 Akomapa&apos;s 3-Year Roadmap
                </Badge>
              </MotionDiv>

              <MotionH1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6"
              >
                Building sustainable care, one step at a time.
              </MotionH1>

              <MotionP
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-[#2F3332] dark:text-[#E6E7E7] mb-8 max-w-3xl mx-auto"
              >
                Our comprehensive 3-year roadmap (2025–2028) outlines our journey
                from launching essential healthcare services to building
                sustainable, replicable care models across Ghana and beyond.
              </MotionP>
            </div>
          </div>
        </section>

        <RoadmapPhases />

        {/* Progress Timeline */}
        <section className="py-16 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
          <div className="site-container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <MotionH2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-center text-[#1C1F1E] dark:text-[#FCFAEF] mb-12"
              >
                Our Journey Timeline
              </MotionH2>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#0097b2] dark:bg-[#66C4DC] h-full"></div>

                {phases.map((phase, index) => (
                  <MotionDiv
                    key={phase.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`relative mb-12 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } flex flex-col md:flex-row items-center`}
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full ${phase.color} border-4 border-white dark:border-[#2F3332] z-10`}
                    ></div>

                    {/* Content */}
                    <div
                      className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} text-center md:text-left`}
                    >
                      <Card className="bg-white dark:bg-[#2F3332] shadow-lg border-0">
                        <CardHeader>
                          <CardTitle className="text-[#1C1F1E] dark:text-[#FCFAEF]">
                            {phase.title}
                          </CardTitle>
                          <CardDescription className="text-[#0097b2] dark:text-[#66C4DC] font-medium">
                            {phase.period}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                            {phase.focus}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-[#0097b2] to-[#eeba2b]">
          <div className="site-container mx-auto px-4 text-center">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FCFAEF]">
                📣 Help us bring this vision to life
              </h2>
              <p className="text-xl text-[#FCFAEF]/90 mb-8 max-w-2xl mx-auto">
                Whether you&apos;re a donor, global health ally, or community
                partner — we invite you to walk this road with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FCFAEF] text-[#0097b2] hover:bg-[#FCFAEF]/90 font-semibold"
                >
                  <Link href="/partnerships" className="flex items-center">
                    Partner With Us <ArrowRight size={20} className="ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#eeba2b] text-[#FCFAEF] hover:bg-[#F5C94D] font-semibold"
                >
                  <Link href="/partnerships" className="flex items-center">
                    Donate <Heart size={20} className="ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-[#FCFAEF] text-[#FCFAEF] bg-transparent hover:bg-[#FCFAEF] hover:text-[#0097b2] font-semibold"
                >
                  <a
                    href="mailto:akomapahealth@gmail.com"
                    className="flex items-center"
                  >
                    Contact Us <ChevronRight size={20} className="ml-2" />
                  </a>
                </Button>
              </div>
            </MotionDiv>
          </div>
        </section>
      </div>
    </>
  );
}
