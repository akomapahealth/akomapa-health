/**
 * When generated ImageKit URLs must stay off the CDN.
 *
 * `next dev` uses fixtures unless NEXT_PUBLIC_IMAGEKIT_DEV_FIXTURES=0.
 * Vercel preview builds (VERCEL_ENV=preview) always use fixtures, including
 * when that local opt-out is set. Production deployments keep the CDN.
 *
 * Preview client bundles cannot read VERCEL_ENV. next.config publishes
 * NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES at build time so the loader and the
 * fixture route agree.
 */

/**
 * @typedef {Object} ImageKitFixtureEnv
 * @property {string} [NODE_ENV]
 * @property {string} [VERCEL_ENV]
 * @property {string} [NEXT_PUBLIC_IMAGEKIT_DEV_FIXTURES]
 * @property {string} [NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES]
 */

/**
 * @param {ImageKitFixtureEnv} [env]
 * @returns {"0" | "1"}
 */
export function imageKitFixturePublicFlag(env = process.env) {
  return env.VERCEL_ENV === "preview" ? "1" : "0";
}

/**
 * @param {ImageKitFixtureEnv} [env]
 * @returns {boolean}
 */
export function shouldUseImageKitFixtures(env = process.env) {
  if (env.VERCEL_ENV === "preview" || env.NEXT_PUBLIC_IMAGEKIT_USE_FIXTURES === "1") {
    return true;
  }

  return (
    env.NODE_ENV === "development" &&
    env.NEXT_PUBLIC_IMAGEKIT_DEV_FIXTURES !== "0"
  );
}
