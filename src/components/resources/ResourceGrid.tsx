import ResourceCard from "./ResourceCard";
import { Resource } from "@/lib/types";

export default function ResourceGrid({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h3 className="text-xl font-medium mb-2">No Resources Found</h3>
        <p className="text-gray-600">
          Try adjusting your filters or search criteria to find what you&apos;re looking for.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-4 text-gray-600">
        Showing {resources.length} resource{resources.length !== 1 ? "s" : ""}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}