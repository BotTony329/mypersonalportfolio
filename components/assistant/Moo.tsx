"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import ChatPanel, { type Turn } from "./ChatPanel";
import { useMooAudio } from "./useMooAudio";
import { useMooEmotion } from "./useMooEmotion";
import { answerLocally } from "@/lib/ai/answer";
import { suggestionsFor } from "@/lib/ai/suggestions";
import { withBasePath } from "@/lib/basePath";
import type { ChatReply } from "@/lib/ai/types";

const ART = {
  idle: { src: "/assistant/moo-idle.webp", alt: "Moo, a cat in an astronaut suit, waiting attentively" },
  purring: { src: "/assistant/moo-purring.webp", alt: "Moo purring happily with eyes closed" },
  hiss: { src: "/assistant/moo-hissing.webp", alt: "Moo hissing with both paws raised" },
} as const;

let turnId = 0;
const nextId = () => `turn-${++turnId}`;

/**
 * Moo — the site's AI co-pilot.
 *
 * She talks to `/api/chat` when a server is there to answer, and falls back to
 * the identical retrieval logic in the browser when it is not. That fallback
 * is the normal case on static hosting, so it is a first-class path rather
 * than an error state: no key, no server, still a working assistant.
 */
export default function Moo() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [pending, setPending] = useState(false);
  const [serverAvailable, setServerAvailable] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>(() => suggestionsFor("/"));

  const { muted, toggleMuted, meow, purr } = useMooAudio();
  const { emotion, message, bump, pet, react } = useMooEmotion();

  /* Suggestions follow the route, so they stay about what is on screen. */
  useEffect(() => {
    if (!turns.length) setSuggestions(suggestionsFor(pathname));
  }, [pathname, turns.length]);

  const art = ART[emotion];

  const push = useCallback((turn: Omit<Turn, "id">) => {
    setTurns((prev) => [...prev, { ...turn, id: nextId() }]);
  }, []);

  const ask = useCallback(
    async (question: string) => {
      push({ role: "visitor", text: question });
      setPending(true);

      let reply: ChatReply | null = null;

      if (serverAvailable) {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ question, path: pathname }),
          });
          if (res.ok) {
            reply = (await res.json()) as ChatReply;
          } else if (res.status === 404 || res.status === 405) {
            /* Statically hosted: there is no route. Stop trying. */
            setServerAvailable(false);
          }
        } catch {
          setServerAvailable(false);
        }
      }

      if (!reply) reply = answerLocally({ question, path: pathname });

      setPending(false);
      push({ role: "moo", text: reply.answer, sources: reply.sources });
      setSuggestions(reply.suggestedQuestions.length ? reply.suggestedQuestions : suggestionsFor(pathname));
      react(reply.emotion);
      if (reply.emotion === "purring") purr(2200);
    },
    [pathname, push, react, purr, serverAvailable],
  );

  const onPet = useCallback(() => {
    const sound = pet();
    if (sound === "meow") meow();
    if (sound === "purr") {
      purr(3600);
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate?.([18, 40, 18, 40, 26]);
      }
    }
  }, [pet, meow, purr]);

  const openPanel = useCallback(() => {
    setOpen(true);
    setGreeted(true);
    if (!turns.length) {
      push({
        role: "moo",
        text: "Hi, I'm Moo — Tony's AI co-pilot. Ask me about his projects, experience, or product approach.",
      });
    }
  }, [turns.length, push]);

  const bubble = useMemo(() => {
    if (message) return message;
    if (emotion === "hiss") return "Hiss.";
    if (!greeted) return "Hi, I'm Moo — Tony's AI co-pilot.";
    return null;
  }, [message, emotion, greeted]);

  return (
    <div className={`moo-root emotion-${emotion}${open ? " panel-open" : ""}`}>
      <ChatPanel
        open={open}
        turns={turns}
        pending={pending}
        suggestions={suggestions}
        muted={muted}
        onToggleMute={toggleMuted}
        onAsk={ask}
        onClose={() => setOpen(false)}
        online={serverAvailable}
      />

      {bubble && !open ? (
        <p className="moo-bubble" role="status">{bubble}</p>
      ) : null}

      <div className="moo-dock">
        <button
          type="button"
          className="moo-pet"
          onClick={onPet}
          aria-label="Pet Moo"
          title="Pet Moo"
        >
          <span className="moo-art" key={bump}>
            <Image
              src={withBasePath(art.src)}
              alt={art.alt}
              width={110}
              height={179}
              priority={false}
              sizes="110px"
            />
          </span>
        </button>

        <button
          type="button"
          className="moo-open"
          onClick={() => (open ? setOpen(false) : openPanel())}
          aria-expanded={open}
          aria-label={open ? "Close Moo, the AI co-pilot" : "Open Moo, the AI co-pilot"}
        >
          <i className="moo-signal live" aria-hidden />
          <span>{open ? "Close" : "Ask Moo"}</span>
        </button>
      </div>
    </div>
  );
}
