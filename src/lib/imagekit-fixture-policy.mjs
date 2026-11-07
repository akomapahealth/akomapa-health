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
 *
 * Client reads of the public flag MUST use direct `process.env.NEXT_PUBLIC_*`
 * property access so Next.js can inline the bake-time value. Looking up the
 * same key via a `process.env` alias (`const env = process.env; env.X`) stays
 * undefined in the browser and incorrectly forces fixtures for client-only
 * media such as ImmersionHeroMedia video sources.
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
  // Unit-test stubs pass a plain object — evaluate against that object only.
  if (env !== process.env) {
    if (env.VERCEL_ENV) {
      return env.VERCEL_ENV !== "production";
    }
    return env.NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES !== "0";
  }

  // Direct property access (not `env.VERCEL_ENV`) so server runtime and
  // Next.js client inlining both see the real values.
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV !== "production";
  }

  return process.env.NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES !== "0";
}
