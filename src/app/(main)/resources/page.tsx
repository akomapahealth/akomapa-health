"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import ResourceGrid from "@/components/resources/ResourceGrid";
import ResourceFilter from "@/components/resources/ResourceFilter";
import { resources } from "@/data/resources";

export default function ResourcesPage() {
  const searchParams = useSearchParams();
  const initialProgram = searchParams.get('program');
  
  const [filters, setFilters] = useState({
    category: initialProgram ? "program" : "all",
    type: "all",
    program: initialProgram || "all",
    search: "",
  });
  
  const filteredResources = resources.filter((resource) => {
    // Filter by category
    if (filters.category !== "all" && resource.category !== filters.category) {
      return false;
    }
    
    // Filter by type
    if (filters.type !== "all" && resource.type !== filters.type) {
      return false;
    }
    
    // Filter by program
    if (filters.program !== "all" && !resource.programs.includes(filters.program)) {
      return false;
    }
    
    // Filter by search
    if (filters.search && !resource.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      <section className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <PageHeader
            title="Healthcare Resources"
            description="Access educational materials, research publications, and tools to support healthcare knowledge and practices."
          />
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/4">
              <ResourceFilter 
                filters={filters} 
                setFilters={setFilters} 
                totalResources={filteredResources.length}
              />
            </div>
            
            <div className="w-full lg:w-3/4">
              <ResourceGrid resources={filteredResources} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}