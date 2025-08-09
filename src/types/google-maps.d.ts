declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: HTMLElement, opts?: MapOptions);
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      addListener(eventName: string, handler: () => void): void;
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      open(map: Map, anchor?: Marker): void;
    }

    class Size {
      constructor(width: number, height: number);
    }

    class Point {
      constructor(x: number, y: number);
    }

    interface MapOptions {
      center?: LatLng;
      zoom?: number;
      styles?: MapTypeStyle[];
    }

    interface MarkerOptions {
      position?: LatLng;
      map?: Map;
      title?: string;
      label?: MarkerLabel;
      icon?: MarkerIcon;
    }

    interface InfoWindowOptions {
      content?: string;
    }

    interface LatLng {
      lat: number;
      lng: number;
    }

    interface MarkerLabel {
      text: string;
      color?: string;
      fontWeight?: string;
    }

    interface MarkerIcon {
      url?: string;
      scaledSize?: Size;
      anchor?: Point;
    }

    interface MapTypeStyle {
      featureType?: string;
      elementType?: string;
      stylers?: Array<Record<string, unknown>>;
    }
  }
}

declare global {
  interface Window {
    google: typeof google;
  }
} 