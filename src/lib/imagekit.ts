/**
 * ImageKit URL generation utility
 * Generates optimized ImageKit URLs with transformations for better caching
 */

interface ImageKitTransformations {
  quality?: number;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
}

/**
 * Generates an ImageKit URL with optional transformations
 * @param path - The image path in ImageKit (e.g., "/gallery/image.jpg")
 * @param transformations - Optional transformation parameters
 * @returns The complete ImageKit URL
 */
export function getImageKitUrl(
  path: string,
  transformations?: ImageKitTransformations
): string {
  // If path is already a full URL (http/https), return it as-is
  // This handles cases where images might come from other sources
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  
  if (!urlEndpoint) {
    console.warn('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not set');
    return path;
  }

  // Remove leading slash from path if present (ImageKit handles it)
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Build transformation query string
  const transformParams: string[] = [];

  if (transformations) {
    // Use minWidth/minHeight if provided, otherwise use width/height
    const width = transformations.minWidth || transformations.width;
    const height = transformations.minHeight || transformations.height;
    
    if (transformations.quality !== undefined) {
      transformParams.push(`q-${transformations.quality}`);
    }
    if (width !== undefined) {
      transformParams.push(`w-${width}`);
    }
    if (height !== undefined) {
      transformParams.push(`h-${height}`);
    }
  }

  // Construct URL
  // Ensure urlEndpoint doesn't have trailing slash
  const baseUrl = urlEndpoint.endsWith('/') 
    ? urlEndpoint.slice(0, -1) 
    : urlEndpoint;
  
  // ImageKit URL format: {urlEndpoint}/{path}?tr={transformations}
  const imageUrl = `${baseUrl}/${cleanPath}`;
  
  if (transformParams.length > 0) {
    return `${imageUrl}?tr=${transformParams.join(',')}`;
  }

  return imageUrl;
}

/**
 * Generates a responsive srcSet for ImageKit images
 * @param path - The image path in ImageKit
 * @param sizes - Array of width sizes for responsive images
 * @param transformations - Base transformation parameters
 * @returns A srcSet string for use in img tags
 */
export function getImageKitSrcSet(
  path: string,
  sizes: number[],
  transformations?: Omit<ImageKitTransformations, 'width' | 'minWidth'>
): string {
  return sizes
    .map((width) => {
      const url = getImageKitUrl(path, { ...transformations, width });
      return `${url} ${width}w`;
    })
    .join(', ');
}

