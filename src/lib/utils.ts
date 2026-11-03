import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Publication dates are calendar days, not instants. Date-only strings such as
// "2026-10-14" parse as UTC midnight, so they must also be formatted in UTC;
// formatting in the runtime's zone shows the previous day west of UTC and
// lets server and browser render different text.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
const calendarDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

/**
 * Formats a publication date ("YYYY-MM-DD" or an ISO timestamp at UTC
 * midnight) as a readable calendar date, e.g. "October 14, 2026". The result
 * is the same for every visitor and on server and client. Returns the input
 * unchanged when it is not a valid date.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return Number.isNaN(date.getTime())
    ? dateString
    : calendarDateFormatter.format(date);
}

/**
 * Estimates reading time from an HTML (or plain-text) string.
 * Strips tags, counts words, and assumes ~200 words per minute.
 * Returns a label like "4 min read" (always at least 1 minute).
 */
export function readingTime(content: string): string {
  const text = content.replace(/<[^>]*>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}