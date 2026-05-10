"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Site-wide click delegation. Mounted once in the root layout, this listens to
 * clicks at the document level and fires `link_click` and `outbound_click`
 * events for every <a> on the page, attributed to the surface it lives in
 * (header, footer, newsletter, modal, or main content).
 *
 * Component-level trackEvent() calls in instrumented components fire as well
 * — those provide richer, typed context (slide ids, donation amounts, etc.).
 */
export default function GlobalClickTracker() {
  useEffect(() => {
    const getSurface = (
      anchor: HTMLAnchorElement
    ): "header" | "footer" | "newsletter" | "main" | "modal" | "unknown" => {
      if (anchor.closest("header")) return "header";
      if (anchor.closest("footer")) return "footer";
      if (anchor.closest('[data-newsletter]')) return "newsletter";
      if (anchor.closest('[role="dialog"]')) return "modal";
      if (anchor.closest("main")) return "main";
      return "unknown";
    };

    const handleClick = (event: MouseEvent) => {
      // Ignore modified clicks — the user is opening in a new tab/window/etc.
      if (event.defaultPrevented || event.button !== 0) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

      // Resolve absolute URL for outbound detection. Falls back to raw href on parse errors.
      let resolvedUrl = href;
      let isExternal = false;
      try {
        const url = new URL(href, window.location.origin);
        resolvedUrl = url.toString();
        isExternal =
          url.origin !== window.location.origin &&
          (url.protocol === "http:" || url.protocol === "https:");
      } catch {
        // Relative paths that fail to parse stay treated as internal.
      }

      const linkText = (anchor.textContent || anchor.getAttribute("aria-label") || "").trim().slice(0, 200);
      const surface = getSurface(anchor);
      const pagePath = window.location.pathname;

      trackEvent({
        name: "link_click",
        link_text: linkText,
        link_url: resolvedUrl,
        link_external: isExternal,
        page_path: pagePath,
        surface,
      });

      if (isExternal) {
        trackEvent({
          name: "outbound_click",
          link_text: linkText,
          link_url: resolvedUrl,
          page_path: pagePath,
        });
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
