import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { SocialCardSpec } from "@/lib/social-card";
import { SOCIAL_IMAGE_HEIGHT, SOCIAL_IMAGE_WIDTH } from "@/lib/social-image";

/**
 * Renders a branded 1200×630 card. Deterministic: same spec → same pixels, so
 * the output is safe to cache at build time.
 */

const FONT_DIR = join(process.cwd(), "src/fonts/social-cards");
const LOGO_PATH = join(process.cwd(), "public/images/akomapa-logo-dark.png");

const palette = {
  teal: "#0F4C5C",
  tealDeep: "#0A3641",
  cream: "#FCFAEF",
  creamMuted: "rgba(252, 250, 239, 0.82)",
  gold: "#F5C94D",
  amber: "#eeba2b",
};

let logoPromise: Promise<string> | null = null;

function loadLogo() {
  logoPromise ??= readFile(LOGO_PATH).then(
    (data) => `data:image/png;base64,${data.toString("base64")}`,
  );
  return logoPromise;
}

let fontsPromise: Promise<
  { name: string; data: Buffer; weight: 400 | 600 | 700; style: "normal" }[]
> | null = null;

function loadFonts() {
  fontsPromise ??= Promise.all([
    readFile(join(FONT_DIR, "Chillax-Bold.ttf")).then((data) => ({
      name: "Chillax",
      data,
      weight: 700 as const,
      style: "normal" as const,
    })),
    readFile(join(FONT_DIR, "PlusJakartaSans-Regular.ttf")).then((data) => ({
      name: "Plus Jakarta Sans",
      data,
      weight: 400 as const,
      style: "normal" as const,
    })),
    readFile(join(FONT_DIR, "PlusJakartaSans-SemiBold.ttf")).then((data) => ({
      name: "Plus Jakarta Sans",
      data,
      weight: 600 as const,
      style: "normal" as const,
    })),
  ]);
  return fontsPromise;
}

function clamp(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 20)).trimEnd()}…`;
}

function titleSize(title: string) {
  if (title.length <= 40) return 72;
  if (title.length <= 70) return 60;
  if (title.length <= 100) return 50;
  if (title.length <= 140) return 42;
  return 36;
}

export async function renderSocialCard(spec: SocialCardSpec) {
  const [fonts, logo] = await Promise.all([loadFonts(), loadLogo()]);
  const title = clamp(spec.title, 180);
  const description = clamp(spec.description, title.length > 140 ? 120 : 170);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: `linear-gradient(135deg, ${palette.teal} 0%, ${palette.tealDeep} 100%)`,
          color: palette.cream,
          fontFamily: "Plus Jakarta Sans",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 14,
            height: "100%",
            background: palette.amber,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: palette.gold,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: palette.gold,
              }}
            />
            {spec.eyebrow}
          </div>

          <div
            style={{
              fontFamily: "Chillax",
              fontWeight: 700,
              fontSize: titleSize(title),
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: palette.creamMuted,
              maxWidth: 960,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid rgba(252, 250, 239, 0.25)`,
            paddingTop: 26,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders raw <img> */}
          <img src={logo} alt="" width={260} height={52} />
          <div style={{ fontSize: 22, fontWeight: 600, color: palette.creamMuted }}>
            akomapa.org
          </div>
        </div>
      </div>
    ),
    {
      width: SOCIAL_IMAGE_WIDTH,
      height: SOCIAL_IMAGE_HEIGHT,
      fonts,
    },
  );
}
