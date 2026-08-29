import { createInMemoryRateLimiter } from "@/lib/http/public-api-security";

export const NEWSLETTER_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;

export const newsletterRateLimiter = createInMemoryRateLimiter({
  maxEntries: 1_000,
  maxRequests: 5,
  windowMs: NEWSLETTER_RATE_LIMIT_WINDOW_MS,
});

export function resetNewsletterRateLimitForTests() {
  newsletterRateLimiter.reset();
}
