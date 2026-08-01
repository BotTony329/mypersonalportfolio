import type { Emotion } from "./types";
import { isEmotion } from "./types";

/**
 * Provider-agnostic model access.
 *
 * Everything provider-specific is a single fetch against an OpenAI-compatible
 * chat-completions endpoint, which is what DeepSeek, OpenAI, Together, Groq
 * and most hosted gateways speak. Swapping provider is two environment
 * variables, not a code change — so nothing above this file knows or cares
 * which model answered.
 *
 * Server-side only. `AI_API_KEY` has no NEXT_PUBLIC_ prefix, so Next will
 * refuse to inline it into a client bundle even by accident.
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
    baseUrl: (process.env.AI_BASE_URL || "https://api.deepseek.com").replace(/\/+$/, ""),
    model: process.env.AI_MODEL || "deepseek-chat",
    timeoutMs: Number(process.env.AI_TIMEOUT_MS || 20_000),
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

export async function completeChat(
  config: ProviderConfig,
  messages: { role: "system" | "user"; content: string }[],
): Promise<string | null> {
  try {
    const res = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        temperature: 0.3,
        max_tokens: 500,
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(config.timeoutMs),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    return data.choices?.[0]?.message?.content ?? null;
  } catch {
    /* Timeout, network failure, malformed response — the caller degrades to
       local retrieval, so a provider outage never takes the assistant down. */
    return null;
  }
}
