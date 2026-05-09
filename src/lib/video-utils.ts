export type VideoEmbedInfo = {
  provider: "youtube" | "vimeo";
  embedUrl: string;
  thumbnailUrl: string;
};

export type AnnouncementPosterFields = {
  thumbnail?: string | null;
  image?: string | null;
  videoUrl?: string | null;
};

/**
 * Hero cards, modal, and feeds: explicit `thumbnail` wins (custom poster),
 * then the provider’s preview image when `videoUrl` is set (e.g. YouTube),
 * then `image`.
 */
export function getAnnouncementPosterSrc(
  fields: AnnouncementPosterFields
): string | undefined {
  if (fields.thumbnail) return fields.thumbnail;
  if (fields.videoUrl) {
    const parsed = parseVideoUrl(fields.videoUrl);
    if (parsed?.thumbnailUrl) return parsed.thumbnailUrl;
  }
  if (fields.image) return fields.image;
  return undefined;
}

export function parseVideoUrl(url: string): VideoEmbedInfo | null {
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    return {
      provider: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`,
    };
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return {
      provider: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
      thumbnailUrl: "",
    };
  }

  return null;
}
