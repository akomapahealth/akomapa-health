import { NextRequest, NextResponse } from "next/server";
import { noStoreJson } from "@/lib/http/public-api-security";
import {
  isImageKitHostname,
  localMediaFixture,
  MEDIA_FIXTURE_HEADER,
  shouldUseDevImageKitFixtures,
} from "@/lib/imagekit-local-fixtures.mjs";

export const dynamic = "force-dynamic";

/**
 * Local ImageKit stand-in for `next dev`. Serves fixture bytes and never
 * fetches the `src` query parameter.
 */
export async function GET(request: NextRequest) {
  if (!shouldUseDevImageKitFixtures()) {
    return noStoreJson({ error: "Not found" }, 404);
  }

  const src = request.nextUrl.searchParams.get("src");
  if (!src) {
    return noStoreJson({ error: "Not found" }, 404);
  }

  let hostname: string;
  try {
    hostname = new URL(src).hostname;
  } catch {
    return noStoreJson({ error: "Not found" }, 404);
  }
  if (!isImageKitHostname(hostname)) {
    return noStoreJson({ error: "Not found" }, 404);
  }

  const fixture = localMediaFixture(src, request.headers.get("range") ?? undefined);
  return new NextResponse(fixture.body, {
    status: fixture.status,
    headers: {
      "Content-Type": fixture.contentType,
      "Cache-Control": "no-store",
      "Accept-Ranges": fixture.acceptRanges,
      [MEDIA_FIXTURE_HEADER]: "1",
      ...(fixture.contentRange ? { "Content-Range": fixture.contentRange } : {}),
    },
  });
}
