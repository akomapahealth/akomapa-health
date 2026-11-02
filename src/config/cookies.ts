import {
  CONSENT_MAX_AGE_MS,
  CONSENT_STORAGE_KEY,
} from "@/lib/consent";
import {
  ANNOUNCEMENT_TIP_SESSION_KEY,
  ANNOUNCEMENTS_DISMISSED_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "@/config/storage-keys";
import { INTAKE_DRAFT_TTL_MS } from "@/lib/intake/drafts";
import { INTAKE_SCHEMA_VERSION } from "@/lib/intake/contracts";

/**
 * Inventory of everything the site stores in the browser, rendered by the
 * Cookie Policy. Keep it in step with the code: names come from the same
 * constants the features use, and a unit test checks the rest.
 *
 * Adding a tracker? Update this file, gate it on consent if it is optional,
 * bump CONSENT_POLICY_VERSION when optional purposes change, and follow
 * docs/privacy/cookie-consent.md.
 */

export type CookieCategory = "necessary" | "analytics";

export type BrowserStorageType = "Cookie" | "Local storage" | "Session storage";

export type CookieInventoryItem = {
  name: string;
  provider: string;
  category: CookieCategory;
  storage: BrowserStorageType;
  purpose: string;
  duration: string;
};

const DAY_MS = 24 * 60 * 60 * 1_000;
const days = (ms: number) => Math.round(ms / DAY_MS);

export const IMMERSION_SESSION_COOKIE_NAME = "immersion_verified";
export const SENTRY_REPLAY_SESSION_KEY = "sentryReplaySession";
export const INTAKE_DRAFT_KEY_PATTERN = `akomapa:intake:v${INTAKE_SCHEMA_VERSION}:<form>:<context>`;

export const cookieInventory: readonly CookieInventoryItem[] = [
  {
    name: CONSENT_STORAGE_KEY,
    provider: "Akomapa Health",
    category: "necessary",
    storage: "Local storage",
    purpose:
      "Remembers whether you accepted or rejected optional cookies, and which version of this policy you answered.",
    duration: `${days(CONSENT_MAX_AGE_MS)} days, or until you change it`,
  },
  {
    name: THEME_STORAGE_KEY,
    provider: "Akomapa Health",
    category: "necessary",
    storage: "Local storage",
    purpose: "Remembers your light, dark, or system theme choice.",
    duration: "Until you clear site data",
  },
  {
    name: ANNOUNCEMENTS_DISMISSED_STORAGE_KEY,
    provider: "Akomapa Health",
    category: "necessary",
    storage: "Local storage",
    purpose:
      "Remembers that you closed the current announcements so they don't reopen on every page.",
    duration: "Until you clear site data",
  },
  {
    name: ANNOUNCEMENT_TIP_SESSION_KEY,
    provider: "Akomapa Health",
    category: "necessary",
    storage: "Session storage",
    purpose: "Hides the announcement tip for the rest of your visit once dismissed.",
    duration: "Until you close the tab",
  },
  {
    name: INTAKE_DRAFT_KEY_PATTERN,
    provider: "Akomapa Health",
    category: "necessary",
    storage: "Local storage",
    purpose:
      "Saves an unfinished contact or program form on your device so you don't lose your progress.",
    duration: `Up to ${days(INTAKE_DRAFT_TTL_MS)} days, or until you submit or discard it`,
  },
  {
    name: IMMERSION_SESSION_COOKIE_NAME,
    provider: "Akomapa Health",
    category: "necessary",
    storage: "Cookie",
    purpose:
      "Secure, HttpOnly session that confirms an invited Global Health Immersion Program participant before payment.",
    duration: "2 hours",
  },
  {
    name: SENTRY_REPLAY_SESSION_KEY,
    provider: "Sentry (error monitoring)",
    category: "necessary",
    storage: "Session storage",
    purpose:
      "Lets us diagnose site errors. A masked replay (all text and inputs hidden) is sent only when an error happens.",
    duration: "Until you close the tab",
  },
  {
    name: "_ga",
    provider: "Google Analytics",
    category: "analytics",
    storage: "Cookie",
    purpose: "Distinguishes visitors so we can count visits and see which pages are useful.",
    duration: "Up to 2 years (some browsers shorten this)",
  },
  {
    name: "_ga_<container-id>",
    provider: "Google Analytics",
    category: "analytics",
    storage: "Cookie",
    purpose: "Keeps track of the current visit for Google Analytics.",
    duration: "Up to 2 years (some browsers shorten this)",
  },
];

export type ThirdPartyService = {
  name: string;
  where: string;
  detail: string;
  privacyUrl: string;
};

/**
 * Embedded or linked services that may set their own cookies under their own
 * policies. Akomapa cannot read or control those cookies.
 */
export const thirdPartyServices: readonly ThirdPartyService[] = [
  {
    name: "Google Maps",
    where: "Contact page",
    detail:
      "The embedded map loads with the page, and Google may set cookies or read device information to show and improve the map.",
    privacyUrl: "https://policies.google.com/technologies/cookies",
  },
  {
    name: "YouTube",
    where: "Videos across the site",
    detail:
      "The player loads only after you press play, from Google's privacy-enhanced youtube-nocookie.com domain.",
    privacyUrl: "https://policies.google.com/privacy",
  },
  {
    name: "Vimeo",
    where: "Videos across the site",
    detail: "The player loads only after you press play, and Vimeo may then set its own cookies.",
    privacyUrl: "https://vimeo.com/legal/privacy/policy",
  },
  {
    name: "Givebutter",
    where: "Donate page",
    detail: "The donation form is provided by Givebutter and may set cookies to process your gift securely.",
    privacyUrl: "https://givebutter.com/privacy",
  },
  {
    name: "Fillout",
    where: "Global Health Immersion Program",
    detail:
      "The interest and brochure forms are embedded from Fillout, which may store your in-progress response.",
    privacyUrl: "https://www.fillout.com/privacy",
  },
  {
    name: "Stripe",
    where: "Immersion program payments",
    detail: "Payments open Stripe-hosted Checkout in a new tab, where Stripe's own cookies apply.",
    privacyUrl: "https://stripe.com/privacy",
  },
  {
    name: "Esri ArcGIS",
    where: "Impact map",
    detail:
      "Map tiles are requested from Esri, which receives standard request details such as your IP address. No cookies are set by Akomapa.",
    privacyUrl: "https://www.esri.com/en-us/privacy/overview",
  },
];
