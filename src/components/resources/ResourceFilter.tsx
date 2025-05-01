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
import { Button } from "@/components/ui/button";
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

export default function ResourceFilter({ filters, setFilters, totalResources }: ResourceFilterProps) {
  const [searchInput, setSearchInput] = useState(filters.search);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchInput }));
  };
  
  const handleCategoryChange = (value: string) => {
    setFilters(prev => ({ ...prev, category: value }));
  };
  
  const handleTypeChange = (value: string) => {
    setFilters(prev => ({ ...prev, type: value }));
  };
  
  const handleProgramChange = (value: string) => {
    setFilters(prev => ({ ...prev, program: value }));
  };
  
  const resetFilters = () => {
    setFilters({
      category: "all",
      type: "all",
      program: "all",
      search: ""
    });
    setSearchInput("");
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Filter Resources</h3>
          {(filters.category !== "all" || filters.type !== "all" || filters.program !== "all" || filters.search) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <FilterX size={16} className="mr-1" />
              Reset
            </Button>
          )}
        </div>
        
        <form onSubmit={handleSearchSubmit} className="mb-6">
          <Label htmlFor="search" className="sr-only">
            Search resources
          </Label>
          <div className="relative">
            <Input
              id="search"
              placeholder="Search resources..."
              value={searchInput}
              onChange={handleSearchChange}
              className="pr-10"
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="sm" 
              className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
            >
              <Search size={16} />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </form>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="category" className="block mb-2 text-sm font-medium">
              Category
            </Label>
            <Select
              value={filters.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id="category">
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
            <Label htmlFor="type" className="block mb-2 text-sm font-medium">
              Resource Type
            </Label>
            <Select
              value={filters.type}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger id="type">
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
                      
                    <div>
                        <Label htmlFor="program" className="block mb-2 text-sm font-medium">
                          Related Program
                        </Label>
                        <Select
                          value={filters.program}
                          onValueChange={handleProgramChange}
                        >
                          <SelectTrigger id="program">
                            <SelectValue placeholder="All Programs" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Programs</SelectItem>
                            <SelectItem value="community-clinics">Community Clinics</SelectItem>
                            <SelectItem value="health-education">Health Education</SelectItem>
                            <SelectItem value="medical-training">Medical Training</SelectItem>
                            <SelectItem value="research">Research Initiatives</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          Showing <span className="font-medium">{totalResources}</span> resource{totalResources !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }