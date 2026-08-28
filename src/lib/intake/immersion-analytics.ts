import { trackEvent } from "@/lib/analytics";
import type { ImmersionIntent } from "@/lib/intake/immersion-registry";

export type ImmersionOperationalErrorCategory =
  | "offline"
  | "load_timeout"
  | "provider_error"
  | "missing_configuration";

export type ImmersionOperationalEvent =
  | { type: "opened"; intent: ImmersionIntent }
  | { type: "provider_loaded"; intent: ImmersionIntent }
  | {
      type: "provider_failed";
      intent: ImmersionIntent;
      category: ImmersionOperationalErrorCategory;
    }
  | { type: "fallback_selected"; intent: ImmersionIntent }
  | { type: "completed"; intent: ImmersionIntent };

export function trackImmersionOperationalEvent(
  event: ImmersionOperationalEvent,
): void {
  const common = {
    form_key: "immersion" as const,
    intent: event.intent,
  };

  switch (event.type) {
    case "opened":
      trackEvent({ name: "intake_form_open", ...common });
      break;
    case "provider_loaded":
      trackEvent({ name: "intake_provider_loaded", ...common });
      break;
    case "provider_failed":
      trackEvent({
        name: "intake_provider_failed",
        ...common,
        error_category: event.category,
      });
      break;
    case "fallback_selected":
      trackEvent({ name: "intake_fallback_selected", ...common });
      break;
    case "completed":
      trackEvent({ name: "intake_submission_completed", ...common });
      break;
  }
}
