import type { Emotion } from "./types";
import { isEmotion } from "./types";
import type { FallbackReason } from "./diagnostics";

/**
 * Provider-agnostic model access.
 *
 * Everything provider-specific is a single POST to an OpenAI-compatible
 * chat-completions endpoint, which is what DeepSeek, OpenAI, Together, Groq
 * and most hosted gateways speak. Swapping provider is two environment
 * variables, not a code change — so nothing above this file knows or cares
 * which model answered.
 *
 * Server-side only. `AI_API_KEY` has no NEXT_PUBLIC_ prefix, so Next will
 * refuse to inline it into a client bundle even by accident, and it is never
 * returned to the caller or written to a log.
 */

export interface ProviderConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  timeoutMs: number;
}

export function readProviderConfig(): ProviderConfig | null {
  const apiKey = process.env.AI_API_KEY?.trim();
  if (!apiKey) return null;
  return {
    apiKey,
    /* Trailing slashes stripped so the endpoint is always exactly
       `${AI_BASE_URL}/chat/completions`. */
    baseUrl: (process.env.AI_BASE_URL?.trim() || "https://api.deepseek.com").replace(/\/+$/, ""),
    model: process.env.AI_MODEL?.trim() || "deepseek-chat",
    timeoutMs: Number(process.env.AI_TIMEOUT_MS || 25_000),
  };
}

export const isProviderConfigured = () => readProviderConfig() !== null;

/** The shape the model is required to return. Validated, never trusted. */
export interface ModelPayload {
  answer: string;
  emotion: Emotion;
  suggestedQuestions: string[];
}

/**
 * Outcome of one provider call.
 *
 * The previous version collapsed every failure into `null`, which is why a
 * bypassed or failing call looked identical to a successful one from the
 * outside. The caller now gets enough to log a cause.
 */
export interface ProviderResult {
  content: string | null;
  httpStatus: number | null;
  durationMs: number;
  failure: Extract<
    FallbackReason,
    "none" | "provider_request_failed" | "provider_http_error" | "provider_timeout"
  >;
}

/**
 * Parses and validates the model's reply.
 *
 * A model that returns prose instead of JSON, or an unknown emotion, or a
 * suggestion list of forty items, must not be able to reach the UI — so this
 * returns null rather than coercing, and the caller falls back.
 */
export function parseModelPayload(raw: string): ModelPayload | null {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = (fenced ? fenced[1] : raw).trim();
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end <= start) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(candidate.slice(start, end + 1));
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null) return null;

  const obj = parsed as Record<string, unknown>;
  const answer = typeof obj.answer === "string" ? obj.answer.trim() : "";
  if (answer.length < 2 || answer.length > 2000) return null;

  const emotion: Emotion = isEmotion(obj.emotion) ? obj.emotion : "idle";
  const suggestedQuestions = Array.isArray(obj.suggestedQuestions)
    ? obj.suggestedQuestions
        .filter((q): q is string => typeof q === "string" && q.trim().length > 4)
        .slice(0, 4)
        .map((q) => q.trim())
    : [];

  return { answer, emotion, suggestedQuestions };
}

type Message = { role: "system" | "user"; content: string };

function buildBody(config: ProviderConfig, messages: Message[], jsonMode: boolean) {
  return JSON.stringify({
    model: config.model,
    messages,
    temperature: 0.3,
    max_tokens: 600,
    ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
  });
}

async function post(
  config: ProviderConfig,
  messages: Message[],
  jsonMode: boolean,
): Promise<{ res: Response | null; timedOut: boolean }> {
  try {
    const res = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: buildBody(config, messages, jsonMode),
      signal: AbortSignal.timeout(config.timeoutMs),
      cache: "no-store",
    });
    return { res, timedOut: false };
  } catch (error) {
    const timedOut =
      error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
    return { res: null, timedOut };
  }
}

export async function completeChat(
  config: ProviderConfig,
  messages: Message[],
): Promise<ProviderResult> {
  const startedAt = Date.now();

  let { res, timedOut } = await post(config, messages, true);

  /* Not every OpenAI-compatible model accepts response_format. A 400 on the
     first attempt is far more likely to mean "this model has no JSON mode"
     than "the request was malformed", so retry once without it rather than
     silently degrading to the local answer. */
  if (res && res.status === 400) {
    ({ res, timedOut } = await post(config, messages, false));
  }

  const durationMs = Date.now() - startedAt;

  if (!res) {
    return {
      content: null,
      httpStatus: null,
      durationMs,
      failure: timedOut ? "provider_timeout" : "provider_request_failed",
    };
  }

  if (!res.ok) {
    return { content: null, httpStatus: res.status, durationMs, failure: "provider_http_error" };
  }

  try {
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content ?? null;
    return {
      content,
      httpStatus: res.status,
      durationMs,
      failure: content ? "none" : "provider_http_error",
    };
  } catch {
    return { content: null, httpStatus: res.status, durationMs, failure: "provider_request_failed" };
  }
}
