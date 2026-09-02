import { Fragment, type CSSProperties } from "react";
import Image from "@/components/common/Image";
import type { PersonProfile } from "@/lib/types";

const connectorClassName =
  "h-px w-3 shrink-0 border-t border-dotted border-[#FCFAEF]/40 sm:w-5 lg:w-6 xl:w-9 2xl:w-12";

export function buildTeamHeroRows(people: readonly PersonProfile[]) {
  if (people.length === 0) return [];
  const rowCount = Math.ceil(Math.sqrt(people.length));
  const rowSize = Math.ceil(people.length / rowCount);
  return Array.from({ length: rowCount }, (_, index) =>
    people.slice(index * rowSize, (index + 1) * rowSize),
  ).filter((row) => row.length > 0);
}

export default function TeamHeroNetwork({
  people,
}: {
  people: readonly PersonProfile[];
}) {
  const rows = buildTeamHeroRows(people);

  return (
    <div className="relative mx-auto min-w-0 w-full lg:col-span-7">
      <div
        data-team-node-network
        aria-hidden="true"
        className="flex min-w-0 w-full flex-row flex-nowrap items-center gap-1.5 overflow-x-auto overflow-y-hidden overscroll-x-contain border-y border-[#FCFAEF]/20 py-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-2 sm:py-7 lg:flex-col lg:gap-3 lg:overflow-hidden lg:border-y-0 lg:border-l lg:py-4 lg:pl-6 xl:gap-4 xl:pl-8 2xl:gap-5 2xl:pl-10"
      >
        {rows.map((row, rowIndex) => (
          <Fragment key={row.map(({ id }) => id).join("-")}>
            <div
              className="flex shrink-0 items-center justify-start gap-1.5 sm:gap-2 lg:min-w-0 lg:w-full lg:justify-end lg:pr-[var(--team-row-offset)]"
              style={{
                "--team-row-offset": `${rowIndex * 1.75}rem`,
              } as CSSProperties}
            >
              {row.map((person, faceIndex) => (
                <div key={person.id} className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <div
                    data-team-node-portrait={person.id}
                    className="relative size-12 shrink-0 overflow-hidden rounded-full border border-[#FCFAEF]/35 bg-[#0F4C5C] sm:size-14 lg:size-10 xl:size-12 2xl:size-16"
                  >
                    <Image
                      src={person.image!}
                      alt=""
                      width={64}
                      height={64}
                      className="h-full w-full object-cover object-center"
                      sizes="(max-width: 639px) 48px, (max-width: 1023px) 56px, (max-width: 1279px) 40px, (max-width: 1535px) 48px, 64px"
                    />
                  </div>
                  {faceIndex !== row.length - 1 ? <span className={connectorClassName} /> : null}
                </div>
              ))}
            </div>
            {rowIndex !== rows.length - 1 ? (
              <span className={`${connectorClassName} lg:hidden`} />
            ) : null}
          </Fragment>
        ))}
      </div>
      <span
        data-team-node-scroll-hint
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-9 bg-gradient-to-l from-[#0F4C5C] via-[#0F4C5C]/50 to-transparent sm:w-11 lg:hidden"
      />
    </div>
  );
}
