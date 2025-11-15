"use client";

import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type SpotlightMember = {
  name: string;
  role: string;
  org: string;
  image: string;
  email?: string;
  linkedin?: string;
};

const HERO_PORTRAIT_SIZE = 80;

const heroRows: Array<{
  offset: string;
  faces: Array<{ image: string; delay: number }>;
}> = [
  {
    offset: "pr-2 lg:pr-4",
    faces: [
      { image: "/images/team/brian-fleischer.jpg", delay: 0 },
      { image: "/images/team/esi-bon-berkoh.jpg", delay: 0.05 }
    ]
  },
  {
    offset: "pr-8 lg:pr-12",
    faces: [
      { image: "/images/team/bismark-amoh.jpg", delay: 0.1 },
      { image: "/images/team/sedem-dankwa.jpg", delay: 0.15 },
      { image: "/images/team/nana-ama-ocran.jpg", delay: 0.2 }
    ]
  },
  {
    offset: "pr-14 lg:pr-20",
    faces: [
      { image: "/images/team/afriyie-badu.jpg", delay: 0.25 },
      { image: "/images/team/prince-agyei-tuffour.jpg", delay: 0.3 },
      { image: "/images/team/adwoa-danso-dodoo.jpg", delay: 0.35 },
      { image: "/images/team/amma-buckman.jpg", delay: 0.4 }
    ]
  },
  {
    offset: "pr-20 lg:pr-28",
    faces: [
      { image: "/ucc-team/david_kojo_ofosu.JPG", delay: 0.45 },
      { image: "/images/team/dzifianu-edoh-torgah.jpg", delay: 0.5 },
      { image: "/ucc-team/wilfred_obeng.JPG", delay: 0.55 },
      { image: "/images/team/samuel-kumi.jpg", delay: 0.6 }
    ]
  },
  {
    offset: "pr-24 lg:pr-36",
    faces: [
      { image: "/ucc-team/hafiz_shaban.JPG", delay: 0.65 },
      { image: "/images/team/mighty-doffoe.jpg", delay: 0.7 },
      { image: "/images/team/derek-anamaale-tuoyire.jpg", delay: 0.75 },
      { image: "/images/team/jeremy-schwartz.jpg", delay: 0.8 }
    ]
  },
  {
    offset: "pr-28 lg:pr-44",
    faces: [
      { image: "/images/team/martins-ekor.jpg", delay: 0.85 },
      { image: "/images/team/samuel-kyei.jpg", delay: 0.9 },
      { image: "/images/team/adrian-mayo.jpg", delay: 0.95 }
    ]
  },
  {
    offset: "pr-32 lg:pr-52",
    faces: [
      { image: "/images/team/elijah-paintsil.jpg", delay: 1.0 },
      { image: "/images/team/adrian-mayo.jpg", delay: 1.05 }
    ]
  }
];

const executiveTeam: SpotlightMember[] = [
  {
    name: "Brian Amu Fleischer, MD",
    role: "Founder & President",
    org: "Yale University",
    image: "/images/team/brian-fleischer.jpg"
  },
  {
    name: "Esi Bon Berkoh",
    role: "Co-Founder & Vice President",
    org: "University of Cape Coast",
    image: "/images/team/esi-bon-berkoh.jpg"
  },
  {
    name: "Bismark Amoh",
    role: "Co-Founder & Research Lead",
    org: "David Geffen School of Medicine at UCLA",
    image: "/images/team/bismark-amoh.jpg"
  },
  {
    name: "Afriyie Badu, MD",
    role: "Co-Founder & Finance Lead",
    org: "University of Ghana",
    image: "/images/team/afriyie-badu.jpg"
  },
  {
    name: "Adwoa Danso-Dodoo",
    role: "Finance Associate Lead",
    org: "Yale University",
    image: "/images/team/adwoa-danso-dodoo.jpg"
  },
  {
    name: "David Ofosu",
    role: "Chapter Co-Director, Akomapa UCC",
    org: "University of Cape Coast",
    image: "/ucc-team/david_kojo_ofosu.JPG"
  },
  {
    name: "Hafiz Shaban",
    role: "Chapter Co-Director, Akomapa UCC",
    org: "University of Cape Coast",
    image: "/ucc-team/hafiz_shaban.JPG"
  },
  {
    name: "Sedem Dankwa",
    role: "Global Partnerships Lead",
    org: "Yale University",
    image: "/images/team/sedem-dankwa.jpg"
  },
  {
    name: "Nana Ama Ocran",
    role: "Leadership Training Program Lead",
    org: "Yale University",
    image: "/images/team/nana-ama-ocran.jpg"
  },
  {
    name: "Wilfred Obeng",
    role: "Clinical Standards Lead",
    org: "University of Cape Coast",
    image: "/ucc-team/wilfred_obeng.JPG"
  },
  {
    name: "Dzifianu Afi Edoh-Torgah",
    role: "Branding & Creative Lead",
    org: "University of Cape Coast",
    image: "/images/team/dzifianu-edoh-torgah.jpg"
  },
  {
    name: "Christabel Amma Buckman",
    role: "Development & Communications Lead",
    org: "David Geffen School of Medicine at UCLA",
    image: "/images/team/amma-buckman.jpg"
  },
  {
    name: "Prince Agyei Tuffour",
    role: "IT Services Lead",
    org: "Akomapa Health Foundation",
    image: "/images/team/prince-agyei-tuffour.jpg"
  },
  {
    name: "Mighty Doffoe",
    role: "IT Services Associate Lead",
    org: "Akomapa Health Foundation",
    image: "/images/team/mighty-doffoe.jpg"
  },
  {
    name: "Samuel Kumi",
    role: "Legal Affairs Lead",
    org: "Akomapa Health Foundation",
    image: "/images/team/samuel-kumi.jpg"
  }
];

const advisoryBoard: SpotlightMember[] = [
  {
    name: "Dr. Derek Anamaale Tuoyire",
    role: "Head of Community Medicine",
    org: "University of Cape Coast",
    image: "/images/team/derek-anamaale-tuoyire.jpg"
  },
  {
    name: "Prof. Martins Ekor",
    role: "Provost, College of Health and Allied Sciences",
    org: "University of Cape Coast",
    image: "/images/team/martins-ekor.jpg"
  },
  {
    name: "Prof. Samuel Kyei",
    role: "Professor of Optometry",
    org: "University of Cape Coast",
    image: "/images/team/samuel-kyei.jpg"
  },
  {
    name: "Dr. Jeremy Schwartz",
    role: "Head, Chronic Care Access Lab",
    org: "Yale University",
    image: "/images/team/jeremy-schwartz.jpg"
  },
  {
    name: "Dr. Adrian Mayo",
    role: "Assistant Clinical Professor",
    org: "David Geffen School of Medicine, UCLA",
    image: "/images/team/adrian-mayo.jpg"
  },
  {
    name: "Dr. Elijah Paintsil",
    role: "Chief & Chair of Pediatrics",
    org: "Boston Medical Center",
    image: "/images/team/elijah-paintsil.jpg"
  }
];

const heroStats = [
  { value: "15+", label: "Executive Leads" },
  { value: "6", label: "Academic Partners" },
  { value: "100+", label: "Volunteers Inspired" }
];

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const primaryCtaClass =
  `${ctaBaseClass} bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#8DD4E6]`;

const secondaryCtaClass =
  `${ctaBaseClass} bg-[#eeba2b] hover:bg-[#eeba2b]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#F5C94D]`;

function TeamCard({
  member,
  variant = "default"
}: {
  member: SpotlightMember;
  variant?: "default" | "compact";
}) {
  const imageHeight = variant === "compact" ? "h-56 sm:h-64" : "h-64 sm:h-72 md:h-80";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group flex flex-col rounded-[28px] border border-[#E6E7E7]/80 dark:border-[#2E3433] bg-white/95 dark:bg-[#1C1F1E]/95 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
    >
      <div className={`relative w-full ${imageHeight} overflow-hidden`}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover rounded-t-[28px]"
          style={{
            objectPosition: 'center 20%'
          }}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-col gap-2 px-6 py-6">
        <p className="text-sm uppercase tracking-[0.3em] text-[#0F4C5C]/60 dark:text-[#66C4DC]">
          {member.org}
        </p>
        <h3 className="text-xl font-semibold text-[#0B2F3A] dark:text-[#FCFAEF]">
          {member.name}
        </h3>
        <p className="text-[#2F3332]/80 dark:text-[#E6E7E7]/80">{member.role}</p>
        {(member.email || member.linkedin) && (
          <div className="flex items-center gap-3 pt-2">
            {member.email && (
              <Link
                href={`mailto:${member.email}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E7E7] text-[#0B2F3A] hover:bg-[#0097b2]/10 dark:text-[#FCFAEF]"
              >
                <Mail className="h-4 w-4" />
              </Link>
            )}
            {member.linkedin && (
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E7E7] text-[#0B2F3A] hover:bg-[#0097b2]/10 dark:text-[#FCFAEF]"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      <section className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] py-16 md:py-24">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:items-center">
          <div className="max-w-3xl w-full">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#FCFAEF]/80 mb-3 sm:mb-4">
              A team of young leaders for young people
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 sm:mb-6 text-[#FCFAEF]">
              We are a youth-powered team reimagining healthcare with heart, science, and shared purpose.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#FCFAEF]/80 mb-6 sm:mb-8">
              From Cape Coast to Yale and UCLA, Akomapa leaders blend academic rigor, community roots,
              and relentless hope to build a student-run model of care that is ethical, joyful, and
              unstoppable.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
                  <p className="text-2xl sm:text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Button asChild className={primaryCtaClass}>
                <Link href="/contact">Meet with Us</Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/join">Join the Movement</Link>
              </Button>
            </div>
          </div>

          <div className="w-full max-w-full lg:w-[480px] flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7 self-center lg:self-start lg:ml-auto lg:pt-8 lg:translate-x-10 mt-8 lg:mt-0">
            {heroRows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={`flex items-center justify-end gap-2 sm:gap-3 md:gap-4 ${row.offset}`}
              >
                {row.faces.map((face, faceIndex) => (
                  <div
                    key={`${face.image}-${faceIndex}`}
                    className="flex items-center gap-2 sm:gap-3 md:gap-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: face.delay }}
                      className="relative rounded-full bg-white/10 backdrop-blur shrink-0 hero-portrait"
                      style={{
                        '--portrait-size': `${HERO_PORTRAIT_SIZE}px`,
                        width: `clamp(32px, ${HERO_PORTRAIT_SIZE * 0.6}px, var(--portrait-size))`,
                        height: `clamp(32px, ${HERO_PORTRAIT_SIZE * 0.6}px, var(--portrait-size))`
                      } as React.CSSProperties & { '--portrait-size': string }}
                    >
                      <Image
                        src={face.image}
                        alt=""
                        fill
                        className="rounded-full object-cover object-center"
                      />
                    </motion.div>
                    {faceIndex !== row.faces.length - 1 && (
                      <span className="h-px w-6 sm:w-8 md:w-10 lg:w-14 border-t border-dotted border-white/30" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-8 sm:mb-12 text-center mx-auto space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] sm:tracking-[0.5em] text-[#0097b2]">Executive Team</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2F3A] dark:text-[#FCFAEF]">
              The builders behind the Akomapa model
            </h2>
            <p className="text-base sm:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
              Each leader blends academic excellence, community credibility, and operational discipline to
              ensure every clinic day reflects empathy, rigor, and trust.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {executiveTeam.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#031C3A] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-8 sm:mb-12 text-center mx-auto space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] sm:tracking-[0.5em] text-[#F5C94D]">Advisory Board</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Global experts guiding our ethics, science, and scale
            </h2>
            <p className="text-base sm:text-lg text-white/80">
              Our advisors ensure Akomapa remains clinically sound, academically rigorous, and deeply
              community-rooted as we expand across regions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {advisoryBoard.map((member) => (
              <TeamCard key={member.name} member={member} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2F3A] dark:text-[#FCFAEF]">
            Join the hearts behind the mission
          </h2>
          <p className="text-base sm:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 max-w-3xl mx-auto">
            We are always looking for collaborators, mentors, and students who believe in ethical,
            student-powered healthcare. Your skills, story, or sponsorship could open the next door for
            patients we serve.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <Button asChild className={primaryCtaClass}>
              <Link href="/partner">Partner with Akomapa</Link>
            </Button>
            <Button asChild className={secondaryCtaClass}>
              <Link href="/join">Apply to Serve</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

