"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Emotion } from "@/lib/ai/types";

/**
 * Moo's emotional state machine.
 *
 * Two things can move it: petting (rapid clicks build affection until she
 * purrs) and answers (the assistant can return a hiss). Both are temporary —
 * everything decays back to idle, so the cat never gets stuck mid-expression.
 */

const PURR_THRESHOLD = 7;      // clicks within the window that earn a purr
const AFFECTION_WINDOW_MS = 3200;
const PURR_DURATION_MS = 4200;
const HISS_DURATION_MS = 3000;

const PURR_MESSAGES = [
  "Purr protocol activated.",
  "Moo approves.",
  "Co-pilot morale: maximum.",
];

export function useMooEmotion() {
  const [emotion, setEmotion] = useState<Emotion>("idle");
  const [bump, setBump] = useState(0);        // increments to retrigger squash
  const [message, setMessage] = useState<string | null>(null);

  const clickTimes = useRef<number[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const settle = useCallback((ms: number) => {
    schedule(() => {
      setEmotion("idle");
      setMessage(null);
    }, ms);
  }, [schedule]);

  /**
   * Register a pet. Returns what the caller should do about sound, so the
   * audio hook stays out of the state machine entirely.
   */
  const pet = useCallback((): "meow" | "purr" | "none" => {
    setBump((b) => b + 1);

    const now = Date.now();
    clickTimes.current = [...clickTimes.current, now].filter(
      (t) => now - t < AFFECTION_WINDOW_MS,
    );

    if (clickTimes.current.length >= PURR_THRESHOLD) {
      clickTimes.current = [];
      clearTimers();
      setEmotion("purring");
      setMessage(PURR_MESSAGES[Math.floor(Math.random() * PURR_MESSAGES.length)]);
      settle(PURR_DURATION_MS);
      return "purr";
    }

    /* A meow on every single click gets old fast — space them out. */
    return clickTimes.current.length % 2 === 1 ? "meow" : "none";
  }, [clearTimers, settle]);

  /** Applied to an answer from the assistant. */
  const react = useCallback((next: Emotion) => {
    if (next === "idle") {
      clearTimers();
      setEmotion("idle");
      setMessage(null);
      return;
    }
    clearTimers();
    setEmotion(next);
    settle(next === "hiss" ? HISS_DURATION_MS : PURR_DURATION_MS);
  }, [clearTimers, settle]);

  return {
    emotion,
    message,
    /** Changes on every pet so the squash animation can be re-keyed. */
    bump,
    affection: clickTimes.current.length,
    pet,
    react,
  };
}
