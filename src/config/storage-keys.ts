/**
 * Browser storage keys the site writes. Kept in a plain module (not a client
 * component) so server-rendered pages such as the Cookie Policy can list the
 * real names without importing client code.
 */

export const THEME_STORAGE_KEY = "akomapa-theme";
export const ANNOUNCEMENTS_DISMISSED_STORAGE_KEY =
  "akomapa-announcements-dismissed";
export const ANNOUNCEMENT_TIP_SESSION_KEY = "akomapa-announcement-tip-dismissed";
