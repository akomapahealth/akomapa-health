"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { divIcon, latLngBounds } from "leaflet";
import type { MapLocation } from "@/lib/types";
import { mapLocations } from "@/data/impact";
import "leaflet/dist/leaflet.css";
import "./impact-map.css";

/**
 * Basemap with English / romanized place names.
 * Standard OSM raster tiles bake in local-language labels; Leaflet cannot override that.
 * Esri World Street Map serves English-leaning labels without an API key.
 * Note Esri's path order is z/y/x (not z/x/y).
 */
const ENGLISH_BASEMAP_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";

const typeLabels: Record<MapLocation["type"], string> = {
  "active-hub": "Active hub",
  "planned-hub": "Planned hub",
  partner: "Partner",
};

const markerStyles: Record<
  MapLocation["type"],
  { background: string; border: string }
> = {
  "active-hub": { background: "#0097b2", border: "#ffffff" },
  "planned-hub": { background: "#eeba2b", border: "#ffffff" },
  partner: { background: "#ffffff", border: "#0097b2" },
};

const badgeStyles: Record<MapLocation["type"], { background: string; color: string }> =
  {
    "active-hub": { background: "rgba(0, 151, 178, 0.1)", color: "#0097b2" },
    "planned-hub": { background: "rgba(238, 186, 43, 0.15)", color: "#8a6b12" },
    partner: { background: "rgba(15, 76, 92, 0.1)", color: "#0F4C5C" },
  };

/** Distinct shapes (filled circle / filled square / outlined circle) so type is not color-alone. */
function createMarkerIcon(type: MapLocation["type"]) {
  const { background, border } = markerStyles[type];
  const shape =
    type === "planned-hub"
      ? "border-radius:2px;"
      : "border-radius:9999px;";
  const fill =
    type === "partner" ? "transparent" : background;

  return divIcon({
    className: "impact-map-marker",
    html: `<span style="display:block;width:14px;height:14px;${shape}background:${fill};border:2px solid ${border};box-shadow:0 1px 3px rgba(15,76,92,0.25);"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  });
}

function FitAllLocations({ locations }: { locations: readonly MapLocation[] }) {
  const map = useMap();

  useEffect(() => {
    if (locations.length === 0) return;

    const bounds = latLngBounds(
      locations.map((location) => [
        location.coordinates.lat,
        location.coordinates.lng,
      ]),
    );

    // Ensure Leaflet measures the aspect-ratio panel after dynamic mount.
    map.invalidateSize();
    map.fitBounds(bounds, {
      padding: [48, 48],
      maxZoom: 5,
      animate: false,
    });
  }, [locations, map]);

  return null;
}

/** Enable wheel zoom only after the user engages the map, so page scroll stays natural. */
function ScrollWheelOnEngage() {
  const map = useMap();

  useEffect(() => {
    map.scrollWheelZoom.disable();

    const enable = () => map.scrollWheelZoom.enable();
    const disable = () => map.scrollWheelZoom.disable();

    map.on("click", enable);
    map.on("focus", enable);
    map.on("blur", disable);
    map.getContainer().addEventListener("mouseleave", disable);

    return () => {
      map.off("click", enable);
      map.off("focus", enable);
      map.off("blur", disable);
      map.getContainer().removeEventListener("mouseleave", disable);
    };
  }, [map]);

  return null;
}

export default function ImpactMapCanvas() {
  const icons = useMemo(
    () => ({
      "active-hub": createMarkerIcon("active-hub"),
      "planned-hub": createMarkerIcon("planned-hub"),
      partner: createMarkerIcon("partner"),
    }),
    [],
  );

  const center: [number, number] = [20, -40];
  // One world only — Leaflet wraps tiles horizontally by default.
  const worldBounds: [[number, number], [number, number]] = [
    [-85, -180],
    [85, 180],
  ];

  return (
    <MapContainer
      center={center}
      zoom={2}
      minZoom={2}
      maxBounds={worldBounds}
      maxBoundsViscosity={1}
      attributionControl={false}
      scrollWheelZoom={false}
      className="h-full w-full"
      data-testid="impact-map-canvas"
      aria-label="Interactive map of Akomapa hub and partner locations"
    >
      <TileLayer
        url={ENGLISH_BASEMAP_URL}
        noWrap
        bounds={worldBounds}
      />
      <FitAllLocations locations={mapLocations} />
      <ScrollWheelOnEngage />
      {mapLocations.map((location) => (
        <Marker
          key={location.id}
          position={[location.coordinates.lat, location.coordinates.lng]}
          icon={icons[location.type]}
          title={`${location.name} — ${typeLabels[location.type]}`}
          alt={`${location.name} — ${typeLabels[location.type]}`}
        >
          <Popup
            // Desktop keeps Leaflet's roomier default; mobile width is capped in CSS.
            maxWidth={300}
            minWidth={180}
            autoPanPadding={[20, 20]}
            className="impact-map-popup-root"
          >
            <div
              className="impact-map-popup space-y-1.5 text-left"
              data-testid={`impact-map-popup-${location.id}`}
            >
              <span
                className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                style={{
                  background: badgeStyles[location.type].background,
                  color: badgeStyles[location.type].color,
                }}
              >
                {typeLabels[location.type]}
              </span>
              <p className="text-sm font-semibold leading-snug text-[#1C1F1E]">
                {location.name}
              </p>
              {/* Full copy stays in the cards below; keep popups compact on small maps. */}
              <p className="impact-map-popup-description text-xs leading-snug text-[#2F3332]/80">
                {location.description}
              </p>
              {location.href ? (
                <a
                  href={location.href}
                  className="inline-block pt-1 text-xs font-semibold text-[#0097b2] underline-offset-2 hover:underline"
                >
                  View hub
                </a>
              ) : null}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
