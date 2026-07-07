import Image from "@/components/common/Image";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0]?.[0] ?? "";
  const second = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + second).toUpperCase();
}

type AuthorAvatarProps = {
  name: string;
  image?: string;
  /** Tailwind size classes for the avatar square, e.g. "h-11 w-11". */
  sizeClassName?: string;
  className?: string;
};

/**
 * Circular author avatar. Renders the author's photo when available, otherwise
 * a brand-tinted monogram — we never fabricate a portrait.
 */
export function AuthorAvatar({
  name,
  image,
  sizeClassName = "h-11 w-11",
  className,
}: AuthorAvatarProps) {
  if (image) {
    return (
      <span
        className={cn(
          "relative overflow-hidden rounded-full ring-2 ring-white/70 dark:ring-white/10",
          sizeClassName,
          className,
        )}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="88px"
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        "bg-[#0097b2]/12 font-heading text-sm font-bold text-[#036576]",
        "dark:bg-[#0097b2]/25 dark:text-[#66C4DC]",
        sizeClassName,
        className,
      )}
    >
      {getInitials(name)}
    </span>
  );
}
