import { notFound } from "next/navigation";
import { listSocialCardKeys, socialCardFromKey } from "@/lib/social-card";
import { renderSocialCard } from "@/lib/social-card-image";

/**
 * Branded social cards at /og/<kind>/<id>.png.
 *
 * Only keys returned by generateStaticParams exist: every card is rendered at
 * build time from route/content data, and anything else is a 404. No request
 * input ever reaches the renderer, so the route cannot be used to mint
 * arbitrary branded images.
 */

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return listSocialCardKeys().map((key) => ({
    key: [...key.slice(0, -1), `${key[key.length - 1]}.png`],
  }));
}

function parseKey(segments: string[]) {
  if (segments.length === 0) return undefined;
  const last = segments[segments.length - 1];
  if (!last.endsWith(".png")) return undefined;
  return [...segments.slice(0, -1), last.slice(0, -".png".length)];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key } = await params;
  const parsed = parseKey(key);
  const spec = parsed ? socialCardFromKey(parsed) : undefined;
  if (!spec) notFound();

  const image = await renderSocialCard(spec);
  image.headers.set("Cache-Control", "public, max-age=0, s-maxage=31536000, immutable");
  return image;
}
