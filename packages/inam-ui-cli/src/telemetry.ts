import { PostHog } from "posthog-node";
import * as os from "os";
import { createHash } from "crypto";

const POSTHOG_KEY = process.env.POSTHOG_API_KEY || "phc_placeholder_key";
const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.i.posthog.com";

let posthogClient: PostHog | null = null;
let isEnabled = true;

/**
 * Check if telemetry is disabled via environment variable
 */
function isTelemetryDisabled(): boolean {
  return (
    process.env.INAM_UI_TELEMETRY_DISABLED === "1" ||
    process.env.INAM_UI_TELEMETRY_DISABLED === "true" ||
    process.env.DO_NOT_TRACK === "1" ||
    process.env.DO_NOT_TRACK === "true"
  );
}

/**
 * Generate anonymous distinct ID from machine ID
 */
function getAnonymousId(): string {
  try {
    const hostname = os.hostname();
    const platform = os.platform();
    const arch = os.arch();
    const machineId = `${hostname}-${platform}-${arch}`;

    // Create SHA256 hash for anonymity
    return createHash("sha256").update(machineId).digest("hex");
  } catch {
    // Fallback to random ID if we can't get machine info
    return createHash("sha256").update(Math.random().toString()).digest("hex");
  }
}

/**
 * Initialize PostHog client
 */
function initPostHog(): PostHog | null {
  if (isTelemetryDisabled()) {
    isEnabled = false;
    return null;
  }

  // Don't initialize with placeholder key
  if (POSTHOG_KEY === "phc_placeholder_key") {
    isEnabled = false;
    return null;
  }

  try {
    return new PostHog(POSTHOG_KEY, {
      host: POSTHOG_HOST,
    });
  } catch {
    isEnabled = false;
    return null;
  }
}

/**
 * Get or create PostHog client
 */
function getClient(): PostHog | null {
  if (!isEnabled) {
    return null;
  }

  if (!posthogClient) {
    posthogClient = initPostHog();
  }

  return posthogClient;
}

/**
 * Track an event with PostHog
 */
export async function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
): Promise<void> {
  const client = getClient();
  if (!client) {
    return;
  }

  try {
    const distinctId = getAnonymousId();

    // Get CLI version
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require("../../package.json");

    client.capture({
      distinctId,
      event: eventName,
      properties: {
        cli_version: pkg.version,
        node_version: process.version,
        platform: os.platform(),
        arch: os.arch(),
        ...properties,
      },
    });
  } catch {
    // Silently fail - telemetry should never break the CLI
  }
}

/**
 * Shutdown telemetry and flush events
 */
export async function shutdownTelemetry(): Promise<void> {
  if (posthogClient) {
    try {
      await posthogClient.shutdown();
    } catch {
      // Silently fail
    }
  }
}

/**
 * Check if telemetry is currently enabled
 */
export function isTelemetryEnabled(): boolean {
  return isEnabled && !isTelemetryDisabled();
}
