/**
 * When generated ImageKit URLs must stay off the CDN.
 *
 * ImageKit CDN URLs are emitted only on real Vercel production deployments
 * (`VERCEL_ENV=production` — akomapa.org and staging.akomapa.org prod).
 * Local development, local `next start`, and Vercel preview always use fixtures.
 *
 * Preview and local client bundles cannot read `VERCEL_ENV`. next.config
 * publishes `NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES` at build time so the loader
 * and the fixture route agree (`"0"` only when built with `VERCEL_ENV=production`).
 */

/**
 * @typedef {Object} ImageKitFixtureEnv
 * @property {string} [NODE_ENV]
 * @property {string} [VERCEL_ENV]
 * @property {string} [NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES]
 */

/**
 * @param {ImageKitFixtureEnv} [env]
 * @returns {"0" | "1"}
 */
export function imageKitFixturePublicFlag(env = process.env) {
  return env.VERCEL_ENV === "production" ? "0" : "1";
}

/**
 * @param {ImageKitFixtureEnv} [env]
 * @returns {boolean}
 */
export function shouldUseImageKitFixtures(env = process.env) {
  // Prefer explicit VERCEL_ENV when present (server runtime / test stubs).
  if (env.VERCEL_ENV) {
    return env.VERCEL_ENV !== "production";
  }

  // Client / local without VERCEL_ENV: trust the bake-time flag; default to fixtures.
  return env.NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES !== "0";
}
