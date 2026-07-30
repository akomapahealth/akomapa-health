import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  type EditorialBandTone,
} from "@/components/shared/EditorialPrimitives";

type ProgramQuoteBandProps = {
  eyebrow?: string;
  quote: string;
  attribution: string;
  role?: string;
  image?: string;
  imageAlt?: string;
  tone?: EditorialBandTone;
  marker?: string;
  id?: string;
  className?: string;
};

export default function ProgramQuoteBand({
  eyebrow = "From the Founders",
  quote,
  attribution,
  role,
  image,
  imageAlt,
  tone = "cream",
  marker,
  id = "program-quote",
  className,
}: ProgramQuoteBandProps) {
  const onDark = tone === "teal" || tone === "onyx";

  return (
    <EditorialBand
      tone={tone}
      marker={marker}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={className}
    >
      <FadeIn>
        <EditorialEyebrow
          tone={onDark ? "gold" : "teal"}
          className={onDark ? "text-[#F5C94D]" : undefined}
        >
          {eyebrow}
        </EditorialEyebrow>
        <h2 id={`${id}-heading`} className="sr-only">
          {eyebrow}
        </h2>

        <blockquote
          className={`mt-6 max-w-4xl border-l-2 border-[#eeba2b] pl-6 font-heading text-xl leading-relaxed md:text-2xl ${
            onDark
              ? "text-[#FCFAEF]"
              : "text-[#1C1F1E] dark:text-[#FCFAEF]"
          }`}
        >
          &quot;{quote}&quot;
        </blockquote>

        <footer className="mt-8 flex items-center gap-4">
          {image ? (
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#E6E7E7] dark:bg-[#2F3332]">
              <Image
                src={image}
                alt={imageAlt ?? ""}
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
          <div>
            <cite
              className={`not-italic font-heading text-lg font-semibold ${
                onDark
                  ? "text-[#FCFAEF]"
                  : "text-[#1C1F1E] dark:text-[#FCFAEF]"
              }`}
            >
              {attribution}
            </cite>
            {role ? (
              <p
                className={`text-sm ${
                  onDark
                    ? "text-[#FCFAEF]/75"
                    : "text-[#2F3332]/75 dark:text-[#E6E7E7]/75"
                }`}
              >
                {role}
              </p>
            ) : null}
          </div>
        </footer>
      </FadeIn>
    </EditorialBand>
  );
}
