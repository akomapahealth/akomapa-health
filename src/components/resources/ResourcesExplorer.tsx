"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FadeIn } from "@/components/animations";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ResourceGrid from "@/components/resources/ResourceGrid";
import ResourceFilter from "@/components/resources/ResourceFilter";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { resources } from "@/data/resources";

function ResourcesExplorerInner() {
  const searchParams = useSearchParams();
  const initialProgram = searchParams.get("program");

  const [filters, setFilters] = useState({
    category: initialProgram ? "program" : "all",
    type: "all",
    program: initialProgram || "all",
    search: "",
  });

  const filteredResources = resources.filter((resource) => {
    if (filters.category !== "all" && resource.category !== filters.category) {
      return false;
    }

    if (filters.type !== "all" && resource.type !== filters.type) {
      return false;
    }

    if (
      filters.program !== "all" &&
      !resource.programs.includes(filters.program)
    ) {
      return false;
    }

    if (
      filters.search &&
      !resource.title.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <EditorialBand
        tone="cream"
        aria-labelledby="resources-hero-heading"
        className="border-b border-[#1C1F1E]/10 dark:border-[#FCFAEF]/10"
        containerClassName="py-14 sm:py-16 md:py-20"
      >
        <FadeIn className="max-w-3xl">
          <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
            Knowledge Library
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="resources-hero-heading"
            className="mt-4"
          >
            Healthcare Resources
          </EditorialHeading>
          <EditorialLead className="mt-5">
            Access educational materials, research publications, and tools to
            support healthcare knowledge and practices.
          </EditorialLead>
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="white"
        aria-label="Browse and filter resources"
        containerClassName="py-12 md:py-16 lg:py-20"
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <FadeIn className="w-full lg:w-80 lg:shrink-0" delay={0.05}>
            <ResourceFilter
              filters={filters}
              setFilters={setFilters}
              totalResources={filteredResources.length}
            />
          </FadeIn>

          <FadeIn className="min-w-0 flex-1" delay={0.1}>
            <ResourceGrid resources={filteredResources} />
          </FadeIn>
        </div>
      </EditorialBand>
    </div>
  );
}

export default function ResourcesExplorer() {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-[50vh] items-center justify-center bg-[#FCFAEF] dark:bg-[#121514]"
          role="status"
        >
          <div className="text-center">
            <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-[#0097b2]/20 border-b-[#0097b2] motion-reduce:animate-none" />
            <p className="mt-4 text-sm font-medium text-[#2F3332] dark:text-[#E6E7E7]">
              Loading resources…
            </p>
          </div>
        </div>
      }
    >
      <ResourcesExplorerInner />
    </Suspense>
  );
}
