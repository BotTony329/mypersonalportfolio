import { NextResponse } from "next/server";
import { answerQuestion } from "@/lib/ai/answer";

/**
 * Thin adapter. All behaviour lives in `lib/ai/answer.ts` so it can be tested
 * and reused without a request object — and so the browser can run the same
 * logic when this route is not deployed at all.
 *
 * Note: this file is excluded from the static export build (see the
 * `pageExtensions` switch in next.config.mjs). On GitHub Pages the assistant
 * runs entirely in the browser against the same knowledge index.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Small in-memory throttle. Not a substitute for a real limiter behind a load
   balancer, but enough to stop one browser tab burning the model budget. */
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;

function overLimit(key: string): boolean {
  const now = Date.now();
  const recent = (HITS.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(key, recent);
  if (HITS.size > 5000) HITS.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  const { question, path } = (body ?? {}) as { question?: unknown; path?: unknown };
  if (typeof question !== "string" || !question.trim()) {
    return NextResponse.json({ error: "A question is required." }, { status: 400 });
  }

  const client =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  if (overLimit(client)) {
    return NextResponse.json(
      { error: "Moo needs a moment. Try again shortly." },
      { status: 429 },
    );
  }

  const reply = await answerQuestion({
    question,
    path: typeof path === "string" ? path : undefined,
  });

  return NextResponse.json(reply, {
    headers: { "cache-control": "no-store" },
  });
}
