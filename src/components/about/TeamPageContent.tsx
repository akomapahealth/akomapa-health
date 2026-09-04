import Breadcrumb from "@/components/layout/Breadcrumb";
import TeamHeroNetwork from "@/components/about/TeamHeroNetwork";
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
  executiveLeadership,
  teamDepartments,
  teamHeroPeople,
} from "@/data/team";

const heroStats = [
  { value: String(executiveLeadership.length), label: "Executive Leaders" },
  { value: String(teamDepartments.length), label: "Departments" },
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
        <div
          data-team-hero
          className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-6 xl:gap-8 2xl:gap-12"
        >
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

          <TeamHeroNetwork people={teamHeroPeople} />
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
              Executive Leadership
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
          {executiveLeadership.map((member) => (
            <FadeInStaggerItem key={member.id} className="h-full">
              <TeamMemberDialog member={member} />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </EditorialBand>

      <EditorialBand
        tone="white"
        marker="03"
        data-team-section="departments"
        aria-labelledby="team-members-heading"
        className="border-y border-[#0F4C5C]/15 dark:border-[#66C4DC]/20"
      >
        <FadeIn className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Our Departments
            </EditorialEyebrow>
            <EditorialHeading id="team-members-heading" className="mt-4">
              The people turning shared purpose into daily practice
            </EditorialHeading>
          </div>
          <EditorialLead className="max-w-3xl lg:col-span-7 lg:pt-8">
            Organization-wide teams turn shared purpose into coordinated
            education, research, technology, partnerships, and responsible
            operations.
          </EditorialLead>
        </FadeIn>

        <div className="mt-14 space-y-16 lg:space-y-20">
          {teamDepartments.map((department, departmentIndex) => (
            <section
              key={department.id}
              data-team-department={department.id}
              aria-labelledby={`department-${department.id}`}
              className="border-t border-[#0F4C5C]/20 pt-7 dark:border-[#66C4DC]/25"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-subheading text-xs font-bold tabular-nums tracking-[0.16em] text-[#0097b2] dark:text-[#66C4DC]" aria-hidden="true">
                  {String(departmentIndex + 1).padStart(2, "0")}
                </span>
                <h3 id={`department-${department.id}`} className="font-heading text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl">
                  {department.name}
                </h3>
              </div>
              <FadeInStagger className="mt-8 grid items-stretch gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-12">
                {department.members.map((member) => (
                  <FadeInStaggerItem key={member.id} className="h-full min-w-0">
                    <TeamMemberDialog member={member} appearance="member" />
                  </FadeInStaggerItem>
                ))}
              </FadeInStagger>
            </section>
          ))}
        </div>
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
