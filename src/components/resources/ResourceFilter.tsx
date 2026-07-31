"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, FilterX } from "lucide-react";

interface FiltersState {
  category: string;
  type: string;
  program: string;
  search: string;
}

interface ResourceFilterProps {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  totalResources: number;
}

export default function ResourceFilter({
  filters,
  setFilters,
  totalResources,
}: ResourceFilterProps) {
  const [searchInput, setSearchInput] = useState(filters.search);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchInput }));
  };

  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, category: value }));
  };

  const handleTypeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, type: value }));
  };

  const handleProgramChange = (value: string) => {
    setFilters((prev) => ({ ...prev, program: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: "all",
      type: "all",
      program: "all",
      search: "",
    });
    setSearchInput("");
  };

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.type !== "all" ||
    filters.program !== "all" ||
    Boolean(filters.search);

  return (
    <div
      data-resource-filter
      className="border border-[#1C1F1E]/12 bg-[#FCFAEF] dark:border-[#FCFAEF]/15 dark:bg-[#121514] lg:sticky lg:top-24"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1C1F1E]/10 px-5 py-4 dark:border-[#FCFAEF]/10 sm:px-6">
        <h3 className="font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
          Filter Resources
        </h3>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#0F4C5C] transition-colors hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC]"
          >
            <FilterX size={16} aria-hidden="true" />
            Reset
            <span className="sr-only"> all filters</span>
          </button>
        ) : null}
      </div>

      <div className="space-y-6 px-5 py-6 sm:px-6">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
        >
          <Label htmlFor="search" className="sr-only">
            Search resources
          </Label>
          <Input
            id="search"
            placeholder="Search resources..."
            value={searchInput}
            onChange={handleSearchChange}
            className="min-h-11 flex-1 border-[#1C1F1E]/15 bg-white dark:border-[#FCFAEF]/20 dark:bg-[#1C1F1E]"
          />
          <button
            type="submit"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-[#0097b2] px-5 py-3 text-sm font-semibold text-[#FCFAEF] transition-colors hover:bg-[#eeba2b] hover:text-[#1C1F1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2"
          >
            <Search size={16} aria-hidden="true" />
            Search
          </button>
        </form>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <Label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]"
            >
              Category
            </Label>
            <Select value={filters.category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category" className="min-h-11">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="education">Educational Resources</SelectItem>
                <SelectItem value="research">Research Publications</SelectItem>
                <SelectItem value="guide">Practical Guides</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="type"
              className="mb-2 block text-sm font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]"
            >
              Resource Type
            </Label>
            <Select value={filters.type} onValueChange={handleTypeChange}>
              <SelectTrigger id="type" className="min-h-11">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="PDF">PDF Documents</SelectItem>
                <SelectItem value="Video">Videos</SelectItem>
                <SelectItem value="Article">Articles</SelectItem>
                <SelectItem value="Toolkit">Toolkits</SelectItem>
                <SelectItem value="Infographic">Infographics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <Label
              htmlFor="program"
              className="mb-2 block text-sm font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]"
            >
              Related Program
            </Label>
            <Select value={filters.program} onValueChange={handleProgramChange}>
              <SelectTrigger id="program" className="min-h-11">
                <SelectValue placeholder="All Programs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="community-clinics">
                  Community Clinics
                </SelectItem>
                <SelectItem value="health-education">
                  Health Education
                </SelectItem>
                <SelectItem value="medical-training">
                  Medical Training
                </SelectItem>
                <SelectItem value="research">Research Initiatives</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-t border-[#1C1F1E]/10 pt-4 dark:border-[#FCFAEF]/10">
          <p
            className="text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80"
            aria-live="polite"
          >
            Showing{" "}
            <span className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
              {totalResources}
            </span>{" "}
            resource{totalResources !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
