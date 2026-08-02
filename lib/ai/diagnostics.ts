/**
 * Server-side diagnostics for the chat pipeline.
 *
 * This exists because the previous failure was invisible: the route returned
 * HTTP 200 in single-digit milliseconds with no outbound request, and nothing
 * in the logs said why. Every field below answers one question you would
 * actually ask while debugging a deployment.
 *
 * Never log the API key, the authorization header, request bodies, visitor
 * questions, or whole environment objects. Only the booleans, identifiers and
 * counts declared here.
 */

export type FallbackReason =
  | "none"
  | "moderation_blocked"
  | "empty_question"
  | "no_api_key"
  | "provider_request_failed"
  | "provider_http_error"
  | "provider_timeout"
  | "provider_unparseable_response";

export interface ChatDiagnostics {
  hasApiKey: boolean;
  /** Host only — never the full URL, never credentials. */
  providerHost: string | null;
  model: string | null;
  retrievedContextItems: number;
  providerCallStarted: boolean;
  providerHttpStatus: number | null;
  /** Milliseconds spent inside the provider call. */
  providerDurationMs: number | null;
  fallbackReason: FallbackReason;
  origin: "model" | "local" | "moderation";
}

export function logChatDiagnostics(d: ChatDiagnostics): void {
  /* Single structured line so it is greppable in a platform log viewer. */
  console.log(
    "[moo:chat]",
    JSON.stringify({
      hasApiKey: d.hasApiKey,
      providerHost: d.providerHost,
      model: d.model,
      retrievedContextItems: d.retrievedContextItems,
      providerCallStarted: d.providerCallStarted,
      providerHttpStatus: d.providerHttpStatus,
      providerDurationMs: d.providerDurationMs,
      fallbackReason: d.fallbackReason,
      origin: d.origin,
    }),
  );
}

/** Host without credentials, for logging. Returns null if the URL is unusable. */
export function safeHost(baseUrl: string): string | null {
  try {
    return new URL(baseUrl).host;
  } catch {
    return null;
  }
}
