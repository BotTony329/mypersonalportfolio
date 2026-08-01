"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Moo's voice, synthesised rather than shipped.
 *
 * A purr is filtered noise with a slow tremolo and a meow is a short pitch
 * bend, so both are a few lines of WebAudio instead of two more network
 * requests. It also means there is no audio element that could ever autoplay:
 * the AudioContext is not even constructed until the visitor's first click,
 * which satisfies browser autoplay policy by construction rather than by
 * remembering to call pause().
 */

const STORAGE_KEY = "moo:muted";
const MASTER_GAIN = 0.09; // quiet on purpose — this is a garnish, not an alert

export function useMooAudio() {
  /* Default to muted. An unexpected noise on a portfolio is a bug. */
  const [muted, setMuted] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== null) setMuted(stored === "true");
    } catch {
      /* Storage can be unavailable (private mode, blocked cookies). Muted stands. */
    }
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        /* Preference simply will not persist. Not worth surfacing. */
      }
      return next;
    });
  }, []);

  /** Lazily created on first sound, which is always inside a user gesture. */
  const context = useCallback((): AudioContext | null => {
    if (muted) return null;
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, [muted]);

  const meow = useCallback(() => {
    const ctx = context();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const tone = ctx.createBiquadFilter();
    tone.type = "bandpass";
    tone.frequency.value = 900;
    tone.Q.value = 1.4;

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.34);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(MASTER_GAIN, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

    osc.connect(tone).connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }, [context]);

  const purr = useCallback((durationMs = 2600) => {
    const ctx = context();
    if (!ctx) return;
    const now = ctx.currentTime;
    const seconds = durationMs / 1000;

    /* One second of brown-ish noise, looped — the body of the purr. */
    const frames = ctx.sampleRate;
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < frames; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.2;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const body = ctx.createBiquadFilter();
    body.type = "lowpass";
    body.frequency.value = 320;
    body.Q.value = 0.8;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(MASTER_GAIN * 1.15, now + 0.25);
    gain.gain.setValueAtTime(MASTER_GAIN * 1.15, now + seconds - 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + seconds);

    /* ~26 Hz amplitude wobble is what makes it read as a purr and not a hum. */
    const tremolo = ctx.createOscillator();
    const tremoloDepth = ctx.createGain();
    tremolo.frequency.value = 26;
    tremoloDepth.gain.value = MASTER_GAIN * 0.55;
    tremolo.connect(tremoloDepth).connect(gain.gain);

    source.connect(body).connect(gain).connect(ctx.destination);
    source.start(now);
    tremolo.start(now);
    source.stop(now + seconds);
    tremolo.stop(now + seconds);
  }, [context]);

  useEffect(() => () => { void ctxRef.current?.close(); }, []);

  return { muted, toggleMuted, meow, purr };
}
