# Google Maps Integration Guide

This guide explains how to implement the interactive map functionality in the `InteractiveMap` component.

## 🗺️ Features Implemented

### **Interactive Map Features:**

- ✅ **Real Google Maps integration**
- ✅ **Custom markers with numbered icons**
- ✅ **Info windows with location details**
- ✅ **Directions functionality**
- ✅ **Show/Hide map toggle**
- ✅ **Responsive design**
- ✅ **Dark mode support**
- ✅ **TypeScript support**

## 🔑 Setup Instructions

### 1. **Get Google Maps API Key**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Maps JavaScript API**
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

### 2. **Environment Variables**

Create or update your `.env.local` file:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 3. **Usage Example**

```tsx
import InteractiveMap from "@/components/common/InteractiveMap";

const locations = [
  {
    name: "Location Name",
    description: "Location description",
    coordinates: "5.1319° N, 1.2798° W",
    lat: 5.1319,
    lng: -1.2798,
    address: "Full address here",
  },
];

<InteractiveMap
  title="Map Title"
  description="Map description"
  locations={locations}
  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
/>;
```

## 📍 Location Data Structure

```typescript
interface Location {
  name: string; // Location name
  description: string; // Location description
  coordinates?: string; // Human-readable coordinates
  lat?: number; // Latitude (required for map)
  lng?: number; // Longitude (required for map)
  address?: string; // Full address
}
```

## 🎨 Customization Options

### **Map Styling:**

The map uses custom styling to match your brand colors. You can modify the styles in the `initializeMap` function.

### **Marker Icons:**

Custom SVG markers with numbered icons are used. The color scheme matches your brand (`#007A73`).

### **Info Windows:**

Custom styled info windows with location details and description.

## 🔧 Advanced Features

### **Directions Integration:**

- Click on markers to see location details
- "Directions" button opens Google Maps with directions
- External link buttons for each location

### **Responsive Design:**

- Map adapts to different screen sizes
- Touch-friendly controls on mobile
- Proper spacing and typography

### **Performance:**

- Lazy loading of Google Maps script
- Conditional rendering based on API key
- Efficient marker management

## 🚀 Alternative Map Providers

If you prefer different map providers, here are alternatives:

### **Mapbox:**

```bash
npm install mapbox-gl
```

### **Leaflet (Free):**

```bash
npm install leaflet react-leaflet
```

### **OpenStreetMap (Free):**

```bash
npm install react-leaflet
```

## 🔒 Security Considerations

1. **API Key Restrictions:**

   - Restrict to your domain
   - Enable only necessary APIs
   - Monitor usage

2. **Rate Limiting:**
   - Google Maps has usage limits
   - Monitor API calls
   - Implement caching if needed

## 📱 Mobile Optimization

- Touch-friendly controls
- Responsive map container
- Optimized marker sizes
- Mobile-specific interactions

## 🎯 Troubleshooting

### **Common Issues:**

1. **Map not loading:**

   - Check API key is correct
   - Verify domain restrictions
   - Check browser console for errors

2. **Markers not showing:**

   - Ensure lat/lng coordinates are valid
   - Check coordinate format (decimal degrees)

3. **TypeScript errors:**
   - Ensure `google-maps.d.ts` is included
   - Check type declarations

## 💰 Cost Considerations

- **Google Maps:** $200/month free tier, then pay-per-use
- **Mapbox:** 50,000 free map loads/month
- **Leaflet/OpenStreetMap:** Free

## 🎨 Brand Integration

The map component is designed to match your brand:

- Primary color: `#007A73`
- Secondary color: `#C37B1E`
- Dark mode support
- Consistent typography

## 📞 Support

For issues with the map implementation:

1. Check the browser console for errors
2. Verify API key and permissions
3. Test with different locations
4. Check network connectivity

---

**Note:** The map component gracefully falls back to a placeholder when no API key is provided, ensuring the application works even without Google Maps integration.
