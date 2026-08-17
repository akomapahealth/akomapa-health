import type { CSSProperties } from "react";
import Link from "next/link";
import HubLeaderDialog from "@/components/community-hubs/HubLeaderDialog";
import HubPortrait from "@/components/community-hubs/HubPortrait";
import PeopleMotionGrid from "@/components/community-hubs/PeopleMotionGrid";
import VolunteerPortraitGrid from "@/components/community-hubs/VolunteerPortraitGrid";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import type { HubLeader, HubRoster, HubRosterPendingSection } from "@/lib/types";

type HubPeopleSectionProps = {
  hubName: string;
  roster?: HubRoster;
  /** Hub brand accent for card edges and pending surfaces. */
  accentColor?: string;
};

function LeaderContactLinks({ leader }: { leader: HubLeader }) {
  const email = leader.contact?.email;
  const linkedin = leader.contact?.linkedin;

  if (!email && !linkedin) {
    return null;
  }

  return (
    <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-sm font-semibold">
      {email ? (
        <Link
          href={`mailto:${email}`}
          className="min-h-11 content-center text-[#0097b2] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] dark:text-[#66C4DC]"
        >
          Email {leader.name}
        </Link>
      ) : null}
      {linkedin ? (
        <Link
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          className="min-h-11 content-center text-[#0097b2] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] dark:text-[#66C4DC]"
        >
          LinkedIn
        </Link>
      ) : null}
    </div>
  );
}

function LeaderCard({
  leader,
  hubName,
}: {
  leader: HubLeader;
  hubName: string;
}) {
  return (
    <article
      data-hub-leader={leader.id}
      className="group flex h-full flex-col border-t-[3px] border-t-[var(--hub-people-accent,#0097b2)] pt-4"
    >
      <HubPortrait
        name={leader.name}
        image={leader.image}
        alt={`Portrait of ${leader.name}, ${leader.role} at ${hubName}`}
        sizes={
          leader.featured
            ? "(min-width: 1280px) 584px, (min-width: 640px) 50vw, 100vw"
            : "(min-width: 1280px) 378px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        }
      />

      <div className="flex flex-1 flex-col pt-5">
        <p className="font-subheading text-xs font-bold uppercase tracking-[0.18em] text-[#0F4C5C] dark:text-[#66C4DC]">
          {leader.role}
        </p>
        <h3 className="mt-3 font-heading text-xl font-semibold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] lg:text-2xl">
          {leader.name}
        </h3>
        <p className="mt-2 text-sm font-medium leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
          {leader.affiliation}
        </p>
        {leader.bio ? (
          <p className="mt-4 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
            {leader.bio}
          </p>
        ) : null}
        <LeaderContactLinks leader={leader} />
      </div>
    </article>
  );
}

function PendingPortraitSurfaces({
  hubName,
  pending,
  tone,
}: {
  hubName: string;
  pending: HubRosterPendingSection;
  tone: "light" | "dark";
}) {
  const monogram = pending.monogram ?? "AH";

  return (
    <div className="mt-12">
      <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
        {[0, 1].map((index) => (
          <HubPortrait
            key={`${monogram}-pending-${index}`}
            alt={`Reserved portrait for ${hubName}`}
            monogram={monogram}
            className={
              tone === "dark"
                ? "bg-[color-mix(in_srgb,#F5C94D_18%,#0F4C5C)] ring-[#F5C94D]/35"
                : undefined
            }
          />
        ))}
      </div>
      <p
        className={
          tone === "dark"
            ? "mt-8 max-w-2xl text-base leading-relaxed text-[#FCFAEF]/80"
            : "mt-8 max-w-2xl text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80"
        }
      >
        {pending.description}
      </p>
      {pending.cta ? (
        <EditorialButton
          href={pending.cta.href}
          external={pending.cta.external}
          variant={tone === "dark" ? "amber" : "solid"}
          className="mt-6"
        >
          {pending.cta.label}
        </EditorialButton>
      ) : null}
    </div>
  );
}

export default function HubPeopleSection({
  hubName,
  roster,
  accentColor = "#0097b2",
}: HubPeopleSectionProps) {
  if (!roster) {
    return null;
  }

  const showLeadership =
    roster.leadership.length > 0 || Boolean(roster.pending?.leadership);
  const showVolunteers =
    roster.volunteers.length > 0 || Boolean(roster.pending?.volunteers);

  if (!showLeadership && !showVolunteers) {
    return null;
  }

  const leadershipPresentation = roster.leadershipPresentation ?? "editorial";
  const featuredLeaders = roster.leadership.filter(({ featured }) => featured);
  const otherLeaders = roster.leadership.filter(({ featured }) => !featured);
  const accentStyle = {
    "--hub-people-accent": accentColor,
  } as CSSProperties;

  return (
    <div style={accentStyle}>
      {showLeadership ? (
        <EditorialBand
          tone="cream"
          id="hub-leadership"
          aria-labelledby="hub-leadership-heading"
          className="border-y border-[#1C1F1E]/10 dark:border-[#FCFAEF]/10"
          data-hub-leadership-presentation={leadershipPresentation}
        >
          <div className="max-w-3xl">
            <EditorialEyebrow>Student Leadership</EditorialEyebrow>
            <EditorialHeading id="hub-leadership-heading" className="mt-4">
              Meet the People Leading the Work
            </EditorialHeading>
            <EditorialLead className="mt-5">
              An interprofessional student team coordinates community service,
              volunteer readiness, responsible operations, and continuous learning
              at this hub.
            </EditorialLead>
          </div>

          {roster.leadership.length > 0 ? (
            leadershipPresentation === "compact-modal" ? (
              <PeopleMotionGrid className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
                {roster.leadership.map((leader) => (
                  <HubLeaderDialog
                    key={leader.id}
                    leader={leader}
                    hubName={hubName}
                  />
                ))}
              </PeopleMotionGrid>
            ) : (
              <>
                {featuredLeaders.length > 0 ? (
                  <PeopleMotionGrid className="mt-12 grid gap-8 sm:grid-cols-2 lg:gap-10">
                    {featuredLeaders.map((leader) => (
                      <LeaderCard
                        key={leader.id}
                        leader={leader}
                        hubName={hubName}
                      />
                    ))}
                  </PeopleMotionGrid>
                ) : null}

                {otherLeaders.length > 0 ? (
                  <PeopleMotionGrid className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
                    {otherLeaders.map((leader) => (
                      <LeaderCard
                        key={leader.id}
                        leader={leader}
                        hubName={hubName}
                      />
                    ))}
                  </PeopleMotionGrid>
                ) : null}
              </>
            )
          ) : roster.pending?.leadership ? (
            <PendingPortraitSurfaces
              hubName={hubName}
              pending={roster.pending.leadership}
              tone="light"
            />
          ) : null}
        </EditorialBand>
      ) : null}

      {showVolunteers ? (
        <EditorialBand
          tone="teal"
          id="hub-volunteers"
          aria-labelledby="hub-volunteers-heading"
          className="border-b border-[#FCFAEF]/15 bg-[#0F4C5C]"
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
                Our Volunteers
              </EditorialEyebrow>
              <EditorialHeading
                id="hub-volunteers-heading"
                className="mt-4 max-w-3xl text-[#FCFAEF]"
              >
                The People Who Make Service Possible
              </EditorialHeading>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-[#FCFAEF]/80 lg:col-span-5 lg:justify-self-end">
              Every clinic day is sustained by volunteers who bring their time,
              disciplines, and care to the communities we serve.
            </p>
          </div>

          {roster.volunteers.length > 0 ? (
            <VolunteerPortraitGrid hubName={hubName} portraits={roster.volunteers} />
          ) : roster.pending?.volunteers ? (
            <PendingPortraitSurfaces
              hubName={hubName}
              pending={roster.pending.volunteers}
              tone="dark"
            />
          ) : null}
        </EditorialBand>
      ) : null}
    </div>
  );
}
