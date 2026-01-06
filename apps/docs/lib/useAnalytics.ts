import { useCallback } from "react";
import { usePostHog } from "posthog-js/react";
import { TELEMETRY_EVENTS } from "./telemetry-constants";

export { TELEMETRY_EVENTS };

/**
 * Custom hook for tracking analytics events
 * Provides a simple interface to capture events with PostHog
 */
export function useAnalytics() {
  const posthog = usePostHog();

  const trackEvent = useCallback(
    (eventName: string, properties?: Record<string, unknown>) => {
      if (posthog) {
        posthog.capture(eventName, properties);
      }
    },
    [posthog]
  );

  return { trackEvent };
}
