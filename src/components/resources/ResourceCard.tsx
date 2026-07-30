import Link from "next/link";
import Image from "@/components/common/Image";
import { EditorialArrow } from "@/components/shared/EditorialPrimitives";
import { PublicationMeta } from "@/components/publication";
import { Resource } from "@/lib/types";

export default function ResourceCard({ resource }: { resource: Resource }) {
  const isExternal = resource.url.startsWith("http");

  return (
    <article
      data-resource-entry
      className="flex flex-col gap-5 border-t-2 border-[#0F4C5C] py-6 dark:border-[#66C4DC] sm:flex-row sm:gap-8"
    >
      {resource.image ? (
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-[4/3] sm:w-40 md:w-48">
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            sizes="(min-width: 640px) 192px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0097b2] dark:text-[#66C4DC]">
          {resource.type}
        </p>
        <h3 className="mt-2 font-heading text-xl font-semibold leading-snug text-[#1C1F1E] dark:text-[#FCFAEF]">
          {resource.title}
        </h3>
        <PublicationMeta
          className="mt-3"
          items={[
            {
              label: "Category",
              value: resource.category.replace(/-/g, " "),
            },
          ]}
        />
        <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/75 md:text-base">
          {resource.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          {isExternal ? (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0097b2] transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC]"
            >
              View Resource
              <span className="sr-only"> (opens in a new tab)</span>
              <EditorialArrow />
            </a>
          ) : (
            <Link
              href={`/resources/${resource.id}`}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0097b2] transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC]"
            >
              View Details
              <EditorialArrow />
            </Link>
          )}

          {resource.downloadUrl ? (
            <a
              href={resource.downloadUrl}
              download
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1C1F1E] underline decoration-[#eeba2b] decoration-2 underline-offset-4 transition-colors hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#FCFAEF]"
            >
              Download
              <span className="sr-only"> {resource.title}</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
