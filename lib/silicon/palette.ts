/**
 * Shared drawing primitives for the procedural silicon.
 *
 * The RNG is seeded on purpose: the die layout must be identical on every
 * load, otherwise the package reads as noise rather than as one designed part.
 */

export const PALETTE = {
  pcb: "#06090f",
  die: "#080d18",
  block: "#16243c",
  blockLo: "#0d1626",
  hot: "#3a2010",
  hotHi: "#7a3d13",
  gold: "#8f6a2d",
  trace: "#1b2a45",
} as const;

export const ACCENT = {
  orange: "rgba(255,122,26,",
  blue: "rgba(47,107,255,",
} as const;

/** Deterministic 32-bit LCG — same die, every reload, every browser. */
export function seededRandom(seed = 20260801) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function createCanvas(w: number, h = w) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

export const monoFont = (px: number, weight = 500) =>
  `${weight} ${px}px "IBM Plex Mono", ui-monospace, Menlo, monospace`;
