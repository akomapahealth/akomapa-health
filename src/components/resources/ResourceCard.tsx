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

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {isExternal ? (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View resource ${resource.title} (opens in a new tab)`}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-[#0097b2]/35 px-5 py-3 text-sm font-semibold text-[#0097b2] transition-colors hover:border-[#0097b2] hover:bg-[#0097b2]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:border-[#66C4DC]/40 dark:text-[#66C4DC]"
            >
              View Resource
              <EditorialArrow />
            </a>
          ) : (
            <Link
              href={`/resources/${resource.id}`}
              aria-label={`View details for ${resource.title}`}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-[#0097b2]/35 px-5 py-3 text-sm font-semibold text-[#0097b2] transition-colors hover:border-[#0097b2] hover:bg-[#0097b2]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:border-[#66C4DC]/40 dark:text-[#66C4DC]"
            >
              View Details
              <EditorialArrow />
            </Link>
          )}

          {resource.downloadUrl ? (
            <a
              href={resource.downloadUrl}
              download
              aria-label={`Download ${resource.title}`}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-[#1C1F1E]/20 px-5 py-3 text-sm font-semibold text-[#1C1F1E] transition-colors hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:border-[#FCFAEF]/25 dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]"
            >
              Download
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
