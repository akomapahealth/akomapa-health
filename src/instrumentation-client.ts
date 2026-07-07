import { loadSentry } from "@/lib/sentry";
import {
  getSentryBaseOptions,
  isSentryClientEnabled,
  SENTRY_APPLICATION_KEY,
  SENTRY_REPLAY_PRIVACY_OPTIONS,
} from "@/lib/sentry-config";

const isSentryEnabled = isSentryClientEnabled();

if (isSentryEnabled) {
  void loadSentry().then((Sentry) => {
    if (!Sentry?.init || !Sentry.replayIntegration) return;

    const integrations = [
      Sentry.replayIntegration(SENTRY_REPLAY_PRIVACY_OPTIONS),
    ];

    if (Sentry.thirdPartyErrorFilterIntegration) {
      integrations.push(
        Sentry.thirdPartyErrorFilterIntegration({
          filterKeys: [SENTRY_APPLICATION_KEY],
          behaviour: "drop-error-if-exclusively-contains-third-party-frames",
          ignoreSentryInternalFrames: true,
        })
      );
    }

    Sentry.init({
      ...getSentryBaseOptions(),
      replaysOnErrorSampleRate: 1.0,
      replaysSessionSampleRate: 0.0,
      integrations,
    });
  });
}

export function onRouterTransitionStart(...args: unknown[]) {
  if (!isSentryEnabled) return;

  void loadSentry().then((Sentry) => {
    Sentry?.captureRouterTransitionStart?.(...args);
  });
}
