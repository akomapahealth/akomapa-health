import Image from "next/image";
import Link from "next/link";
import { File, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Resource } from "@/lib/types";

export default function ResourceCard({ resource }: { resource: Resource }) {
  const isExternal = resource.url.startsWith('http');
  
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48">
        {resource.image ? (
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
            <File className="h-16 w-16 text-blue-500" />
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
          {resource.type}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
        
        <div className="flex justify-between items-center">
          {isExternal ? (
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 text-sm font-medium inline-flex items-center"
            >
              View Resource <ExternalLink size={14} className="ml-1" />
            </a>
          ) : (
            <Link 
              href={`/resources/${resource.id}`}
              className="text-teal-600 hover:text-teal-700 text-sm font-medium"
            >
              View Details
            </Link>
          )}
          
          {resource.downloadUrl && (
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
            >
              <a 
                href={resource.downloadUrl} 
                download 
                className="inline-flex items-center text-gray-600"
              >
                <Download size={14} className="mr-1" />
                Download
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}