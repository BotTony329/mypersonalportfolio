"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { ChatReply } from "@/lib/ai/types";

export interface Turn {
  id: string;
  role: "visitor" | "moo";
  text: string;
  sources?: ChatReply["sources"];
}

/**
 * The chat surface. A spacecraft console rather than a support widget: HUD
 * chrome, a status readout, and Moo's own answers rendered as transmissions.
 *
 * Focus is trapped while open, because on mobile this covers the page and
 * tabbing out into content nobody can see is disorienting for keyboard and
 * screen-reader users alike.
 */
export default function ChatPanel({
  open,
  turns,
  pending,
  suggestions,
  muted,
  onToggleMute,
  onAsk,
  onClose,
  online,
}: {
  open: boolean;
  turns: Turn[];
  pending: boolean;
  suggestions: string[];
  muted: boolean;
  onToggleMute: () => void;
  onAsk: (question: string) => void;
  onClose: () => void;
  online: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [turns, pending]);

  /* Escape closes; Tab cycles within the panel. */
  useEffect(() => {
    if (!open) return;
    const node = panelRef.current;
    if (!node) return;

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusables = node.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    /* Escape listens on the document: the panel stays open while the visitor
       clicks around the page, and Escape should still dismiss it. Tab
       containment stays scoped to the panel. */
    const onEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };

    node.addEventListener("keydown", onTab);
    document.addEventListener("keydown", onEscape);
    return () => {
      node.removeEventListener("keydown", onTab);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (!value) return;
    onAsk(value);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className={`moo-panel${open ? " open" : ""}`}
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-label="Moo — AI co-pilot"
      aria-hidden={!open}
      {...(open ? {} : { inert: "" as unknown as boolean })}
    >
      <header className="moo-panel-head">
        <span className="moo-status mono">
          <i className={`moo-signal${online ? " live" : ""}`} aria-hidden />
          Co-pilot online
        </span>
        <div className="moo-head-actions">
          <button
            type="button"
            className="moo-icon-btn"
            onClick={onToggleMute}
            aria-pressed={!muted}
            aria-label={muted ? "Unmute Moo's sounds" : "Mute Moo's sounds"}
            title={muted ? "Unmute" : "Mute"}
          >
            <span aria-hidden>{muted ? "🔇" : "🔊"}</span>
          </button>
          <button
            type="button"
            className="moo-icon-btn"
            onClick={onClose}
            aria-label="Close chat"
            title="Close"
          >
            <span aria-hidden>✕</span>
          </button>
        </div>
      </header>

      <div className="moo-log" ref={logRef} role="log" aria-live="polite" aria-relevant="additions">
        {turns.map((t) => (
          <div key={t.id} className={`moo-turn ${t.role}`}>
            <span className="moo-turn-who mono">{t.role === "moo" ? "Moo" : "You"}</span>
            <p>{t.text}</p>
            {t.sources?.length ? (
              <ul className="moo-sources">
                {t.sources.map((s) => (
                  <li key={`${s.href}-${s.section}`}>
                    <Link href={s.href} onClick={onClose}>
                      {s.title} · {s.section}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}

        {pending ? (
          <div className="moo-turn moo pending">
            <span className="moo-turn-who mono">Moo</span>
            <p aria-label="Moo is thinking"><i className="moo-dots" aria-hidden><b /><b /><b /></i></p>
          </div>
        ) : null}
      </div>

      {suggestions.length ? (
        <div className="moo-suggestions">
          {suggestions.map((s) => (
            <button key={s} type="button" className="moo-chip" onClick={() => onAsk(s)}>
              {s}
            </button>
          ))}
        </div>
      ) : null}

      <form className="moo-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="moo-input">Ask Moo about Tony&apos;s work</label>
        <input
          id="moo-input"
          ref={inputRef}
          type="text"
          autoComplete="off"
          placeholder="Ask about a project, a skill, a method…"
          maxLength={600}
        />
        <button type="submit" className="moo-send" aria-label="Send question" disabled={pending}>
          <span aria-hidden>↑</span>
        </button>
      </form>
    </div>
  );
}
