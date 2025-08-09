"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Location {
  name: string;
  description: string;
  coordinates?: string;
  lat?: number;
  lng?: number;
  address?: string;
}

interface InteractiveMapProps {
  title: string;
  description: string;
  locations: Location[];
  className?: string;
  apiKey?: string;
}

export default function InteractiveMap({ 
  title, 
  description, 
  locations, 
  className = "",
  apiKey 
}: InteractiveMapProps) {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google) return;

    // Calculate center point from all locations
    const validLocations = locations.filter(loc => loc.lat && loc.lng);
    let center = { lat: 0, lng: 0 };
    
    if (validLocations.length > 0) {
      const totalLat = validLocations.reduce((sum, loc) => sum + (loc.lat || 0), 0);
      const totalLng = validLocations.reduce((sum, loc) => sum + (loc.lng || 0), 0);
      center = {
        lat: totalLat / validLocations.length,
        lng: totalLng / validLocations.length
      };
    }

    // Create map instance
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 12,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    mapInstanceRef.current = map;

    // Add markers for each location
    locations.forEach((location, index) => {
      if (location.lat && location.lng) {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map,
          title: location.name,
          label: {
            text: (index + 1).toString(),
            color: "white",
            fontWeight: "bold"
          },
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#007A73"/>
                <text x="20" y="25" text-anchor="middle" fill="white" font-size="14" font-weight="bold">${index + 1}</text>
              </svg>
            `)}`,
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 20)
          }
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #007A73; font-weight: bold;">${location.name}</h3>
              <p style="margin: 0 0 8px 0; font-size: 14px;">${location.description}</p>
              ${location.address ? `<p style="margin: 0; font-size: 12px; color: #666;">${location.address}</p>` : ''}
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          setSelectedLocation(location);
        });

        markersRef.current.push(marker);
      }
    });
  }, [locations]);

  // Initialize Google Maps
  useEffect(() => {
    if (!showMap || !apiKey || !mapRef.current) return;

    const loadGoogleMaps = async () => {
      try {
        // Load Google Maps script if not already loaded
        if (!window.google) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
          script.async = true;
          script.defer = true;
          
          script.onload = () => {
            initializeMap();
          };
          
          document.head.appendChild(script);
        } else {
          initializeMap();
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    loadGoogleMaps();
  }, [showMap, apiKey, initializeMap]);

  const getDirections = (location: Location) => {
    if (location.lat && location.lng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
      window.open(url, '_blank');
    }
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className={`bg-white dark:bg-[#2F3332] rounded-2xl p-6 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <MapPin className="w-6 h-6 text-[#007A73] dark:text-[#63B0AC] mr-3" />
          <h3 className="text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">{title}</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMap}
          className="border-[#007A73] text-[#007A73] hover:bg-[#007A73] hover:text-[#FCFAEF] dark:border-[#63B0AC] dark:text-[#63B0AC] dark:hover:bg-[#63B0AC]"
        >
          {showMap ? 'Hide Map' : 'Show Map'}
        </Button>
      </div>
      
      <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6">{description}</p>
      
      {/* Interactive Map */}
      {showMap && apiKey ? (
        <div className="mb-6">
          <div 
            ref={mapRef}
            className="w-full h-80 rounded-xl overflow-hidden border border-[#C1C3C3] dark:border-[#4F5554]"
          />
          {selectedLocation && (
            <div className="mt-4 p-4 bg-[#FCFAEF]/50 dark:bg-[#1C1F1E]/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">{selectedLocation.name}</h4>
                  <p className="text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80">{selectedLocation.description}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => getDirections(selectedLocation)}
                  className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF]"
                >
                  <Navigation size={16} className="mr-2" />
                  Directions
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : !apiKey ? (
        <div className="bg-gradient-to-br from-[#007A73]/20 to-[#C37B1E]/20 rounded-xl p-8 mb-6 text-center">
          <div className="w-16 h-16 bg-[#007A73]/20 dark:bg-[#63B0AC]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Navigation size={32} className="text-[#007A73] dark:text-[#63B0AC]" />
          </div>
          <h4 className="text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Interactive Map</h4>
          <p className="text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80 mb-4">
            Add Google Maps API key to enable interactive map
          </p>
          <Button 
            variant="outline" 
            className="border-[#007A73] text-[#007A73] hover:bg-[#007A73] hover:text-[#FCFAEF] dark:border-[#63B0AC] dark:text-[#63B0AC] dark:hover:bg-[#63B0AC]"
          >
            View Map & Directions
          </Button>
        </div>
      ) : null}
      
      {/* Location List */}
      <div className="space-y-4">
        {locations.map((location, index) => (
          <div key={index} className="flex items-start p-4 bg-[#FCFAEF]/50 dark:bg-[#1C1F1E]/50 rounded-lg">
            <div className="w-6 h-6 bg-[#007A73] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
              {index + 1}
            </div>
            <div className="flex-1">
              <h5 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-1">{location.name}</h5>
              <p className="text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80 mb-2">{location.description}</p>
              {location.coordinates && (
                <p className="text-xs text-[#2F3332]/60 dark:text-[#E6E7E7]/60">{location.coordinates}</p>
              )}
            </div>
            {location.lat && location.lng && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => getDirections(location)}
                className="ml-2 border-[#007A73] text-[#007A73] hover:bg-[#007A73] hover:text-[#FCFAEF] dark:border-[#63B0AC] dark:text-[#63B0AC] dark:hover:bg-[#63B0AC]"
              >
                <ExternalLink size={14} />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Add Google Maps types to window object
declare global {
  interface Window {
    google: typeof google;
  }
} 