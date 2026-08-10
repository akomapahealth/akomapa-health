import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import TeamMemberDialog from "@/components/about/TeamMemberDialog";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import {
  advisoryBoardMembers,
  executiveTeamMembers,
  nonExecutiveTeamMembers,
} from "@/data/team";

const heroRows: Array<{ offset: string; faces: string[] }> = [
  {
    offset: "lg:pr-1 xl:pr-2 2xl:pr-4",
    faces: [
      "/images/team/brian-fleischer.jpeg",
      "/images/team/esi-bon-berkoh.jpg",
    ],
  },
  {
    offset: "lg:pr-4 xl:pr-8 2xl:pr-12",
    faces: [
      "/ucc-team/getwell_ebiram_essuman.JPG",
      "/ucc-team/david_konadu_kombate.JPG",
      "/images/team/nana-ama-ocran.jpeg",
    ],
  },
  {
    offset: "lg:pr-8 xl:pr-14 2xl:pr-20",
    faces: [
      "/images/team/afriyie-badu.jpg",
      "/images/team/prince-agyei.jpg",
      "/images/team/adwoa-danso-dodoo.jpg",
      "/ucc-team/queenster_aduse_opoku.JPG",
    ],
  },
  {
    offset: "lg:pr-12 xl:pr-20 2xl:pr-28",
    faces: [
      "/ucc-team/david_kojo_ofosu.JPG",
      "/images/team/gabrielle-nartey.JPG",
      "/ucc-team/wilfred_obeng.JPG",
      "/ucc-team/belinda_odoom.JPG",
    ],
  },
  {
    offset: "lg:pr-16 xl:pr-28 2xl:pr-36",
    faces: [
      "/ucc-team/hafiz_shaban.JPG",
      "/images/team/mighty-doffoe.jpg",
      "/images/team/dr-tuoyire.jpeg",
      "/images/team/kelvin-fiifi.jpeg",
    ],
  },
  {
    offset: "lg:pr-20 xl:pr-36 2xl:pr-44",
    faces: [
      "/ucc-team/martha_bawa.JPG",
      "/ucc-team/prince_nyarkoh.JPG",
      "/ucc-team/geraldine_cristal_apeadua_agyepong.JPG",
    ],
  },
  {
    offset: "lg:pr-24 xl:pr-44 2xl:pr-52",
    faces: [
      "/ucc-team/frederick_baffour.JPG",
      "/ucc-team/gloria_tawia_blay.JPG",
    ],
  },
];

const heroStats = [
  { value: "17", label: "Executive Leads" },
  { value: "6", label: "Academic Partners" },
  { value: "100+", label: "Volunteers Inspired" },
];

export default function TeamPageContent() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <EditorialBand
        tone="teal"
        aria-labelledby="team-hero-heading"
        className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-6 xl:gap-8 2xl:gap-12">
          <div className="lg:col-span-5">
            <EditorialEyebrow tone="light">
              A team of young leaders for young people
            </EditorialEyebrow>
            <EditorialHeading
              as="h1"
              id="team-hero-heading"
              className="mt-5 max-w-3xl text-[2.25rem] text-[#FCFAEF] sm:text-[2.75rem] md:text-[3.1rem] lg:text-[2.5rem] xl:text-[2.75rem] 2xl:text-[3.1rem]"
            >
              We are a youth-powered team reimagining healthcare with heart,
              science, and shared purpose.
            </EditorialHeading>
            <EditorialLead className="mt-6 max-w-2xl text-[0.95rem] text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85 md:text-base xl:text-[1.05rem]">
              From Cape Coast to Yale and UCLA, Akomapa leaders blend academic
              rigor, community roots, and relentless hope to build a
              student-powered model of care that is ethical, joyful, and
              unstoppable.
            </EditorialLead>

            <dl className="mt-8 grid border-y border-[#FCFAEF]/25 sm:grid-cols-3">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`py-5 sm:px-5 ${
                    index > 0
                      ? "border-t border-[#FCFAEF]/25 sm:border-l sm:border-t-0"
                      : ""
                  }`}
                >
                  <dd className="font-heading text-2xl font-semibold text-[#FCFAEF] sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 font-subheading text-xs font-bold uppercase tracking-[0.16em] text-[#FCFAEF]/70">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <EditorialButton
                href="/contact"
                variant="light"
                className="text-[#0F4C5C] focus-visible:ring-[#F5C94D] sm:min-w-40"
              >
                Meet with Us
              </EditorialButton>
              <EditorialButton
                href="/get-involved"
                variant="amber"
                className="focus-visible:ring-[#F5C94D] sm:min-w-40"
              >
                Join the Movement
              </EditorialButton>
            </div>
          </div>

          <div
            data-team-node-network
            aria-hidden="true"
            className="mx-auto flex w-full max-w-md flex-col gap-2 overflow-hidden border-y border-[#FCFAEF]/20 py-5 sm:gap-3 sm:py-7 lg:col-span-7 lg:max-w-none lg:gap-3 lg:border-y-0 lg:border-l lg:py-4 lg:pl-6 xl:gap-4 xl:pl-8 2xl:gap-5 2xl:pl-10"
          >
            {heroRows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={`flex min-w-0 items-center justify-end gap-1.5 sm:gap-2 ${row.offset}`}
              >
                {row.faces.map((face, faceIndex) => (
                  <div
                    key={`${face}-${faceIndex}`}
                    className="flex min-w-0 items-center gap-1.5 sm:gap-2"
                  >
                    <div
                      data-team-node-portrait
                      className="relative size-7 shrink-0 overflow-hidden rounded-full border border-[#FCFAEF]/35 bg-[#0F4C5C] sm:size-9 lg:size-10 xl:size-12 2xl:size-16"
                    >
                      <Image
                        src={face}
                        alt=""
                        width={64}
                        height={64}
                        className="h-full w-full object-cover object-center"
                        sizes="(max-width: 639px) 28px, (max-width: 1023px) 36px, (max-width: 1279px) 40px, (max-width: 1535px) 48px, 64px"
                      />
                    </div>
                    {faceIndex !== row.faces.length - 1 ? (
                      <span className="h-px w-3 shrink-0 border-t border-dotted border-[#FCFAEF]/40 sm:w-5 lg:w-6 xl:w-9 2xl:w-12" />
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="02"
        data-team-section="executive"
        aria-labelledby="executive-team-heading"
      >
        <FadeIn className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Executive Team
            </EditorialEyebrow>
            <EditorialHeading id="executive-team-heading" className="mt-4">
              The builders behind the Akomapa model
            </EditorialHeading>
          </div>
          <EditorialLead className="max-w-3xl lg:col-span-7 lg:pt-8">
            Each leader blends academic excellence, community credibility, and
            operational discipline. Together, they mentor the next generation
            of ethical global health professionals while ensuring every clinic
            day reflects empathy, rigor, and trust.
          </EditorialLead>
        </FadeIn>

        <FadeInStagger className="mt-12 grid items-stretch gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {executiveTeamMembers.map((member) => (
            <FadeInStaggerItem key={member.id} className="h-full">
              <TeamMemberDialog member={member} />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </EditorialBand>

      <EditorialBand
        tone="white"
        marker="03"
        data-team-section="member"
        aria-labelledby="team-members-heading"
        className="border-y border-[#0F4C5C]/15 dark:border-[#66C4DC]/20"
      >
        <FadeIn className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Team Members
            </EditorialEyebrow>
            <EditorialHeading id="team-members-heading" className="mt-4">
              The people turning shared purpose into daily practice
            </EditorialHeading>
          </div>
          <EditorialLead className="max-w-3xl lg:col-span-7 lg:pt-8">
            Across recruitment, training, finance, community engagement, and
            logistics, these student leaders make Akomapa’s UCC Community Hub
            dependable, welcoming, and ready to serve.
          </EditorialLead>
        </FadeIn>

        <FadeInStagger className="mt-12 grid items-stretch gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-12">
          {nonExecutiveTeamMembers.map((member) => (
            <FadeInStaggerItem key={member.id} className="h-full min-w-0">
              <TeamMemberDialog member={member} appearance="member" />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </EditorialBand>

      <EditorialBand
        tone="onyx"
        marker="04"
        data-team-section="advisor"
        aria-labelledby="advisory-board-heading"
        className="border-y border-[#66C4DC]/35"
      >
        <FadeIn className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Advisory Board
            </EditorialEyebrow>
            <EditorialHeading id="advisory-board-heading" className="mt-4">
              Global experts guiding our ethics, science, and scale
            </EditorialHeading>
          </div>
          <EditorialLead className="max-w-3xl text-[#FCFAEF]/78 dark:text-[#FCFAEF]/78 lg:col-span-7 lg:pt-8">
            Learning from global leaders sits at the heart of our model. Faculty
            and advisors from partner institutions worldwide keep Akomapa
            clinically sound, academically rigorous, and deeply community-rooted
            as we expand across regions.
          </EditorialLead>
        </FadeIn>

        <FadeInStagger className="mt-12 grid items-stretch gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {advisoryBoardMembers.map((member) => (
            <FadeInStaggerItem key={member.id} className="h-full">
              <TeamMemberDialog member={member} appearance="advisor" />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="05"
        aria-labelledby="team-cta-heading"
      >
        <FadeIn className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <EditorialHeading id="team-cta-heading">
              Join the hearts behind the mission
            </EditorialHeading>
            <EditorialLead className="mt-5 max-w-3xl">
              We are always looking for faculty, mentors, collaborators, and
              students who believe in ethical, student-powered healthcare. Your
              expertise, story, or sponsorship could open the next door for
              patients we serve.
            </EditorialLead>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <EditorialButton
              href="/partnerships"
              className="bg-[#0F4C5C] focus-visible:ring-[#0F4C5C] dark:focus-visible:ring-[#F5C94D]"
            >
              Partner with Akomapa
            </EditorialButton>
            <EditorialButton
              href="/get-involved"
              variant="amber"
              className="focus-visible:ring-[#0F4C5C] dark:focus-visible:ring-[#F5C94D]"
            >
              Apply to Serve
            </EditorialButton>
          </div>
        </FadeIn>
      </EditorialBand>
    </div>
  );
}
