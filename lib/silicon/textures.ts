import * as THREE from "three";
import { PALETTE, createCanvas, monoFont, seededRandom } from "./palette";

/**
 * Every surface on the TZ-100 is drawn at runtime into a canvas — no image
 * assets, no network cost, and the die scales with the device's pixel budget.
 *
 * The whole module shares one seeded RNG so the package is reproducible.
 */
const rnd = seededRandom();

type Ctx = CanvasRenderingContext2D;

export interface SurfaceTextures {
  map: THREE.Texture;
  emissive: THREE.Texture;
}

function toTexture(canvas: HTMLCanvasElement, anisotropy = 8) {
  const t = new THREE.CanvasTexture(canvas);
  t.anisotropy = anisotropy;
  t.needsUpdate = true;
  return t;
}

/** Compute clusters, cache fabric and PHY teeth — the die shot. */
function paintDie(a: Ctx, e: Ctx, x: number, y: number, w: number, h: number, detail: boolean) {
  a.fillStyle = PALETTE.die;
  a.fillRect(x, y, w, h);

  const teeth = Math.round(w / 9);
  for (let i = 0; i < teeth; i++) {
    const t = i / teeth;
    const on = rnd() < 0.55;
    a.fillStyle = on ? "#16233c" : "#0d1524";
    a.fillRect(x + t * w + 1, y + 2, w / teeth - 2, h * 0.03);
    a.fillRect(x + t * w + 1, y + h - 2 - h * 0.03, w / teeth - 2, h * 0.03);
    a.fillRect(x + 2, y + t * h + 1, w * 0.03, h / teeth - 2);
    a.fillRect(x + w - 2 - w * 0.03, y + t * h + 1, w * 0.03, h / teeth - 2);
    if (on) {
      e.fillStyle = "rgba(47,107,255,0.55)";
      e.fillRect(x + t * w + 1, y + 2, w / teeth - 2, h * 0.03);
      e.fillRect(x + 2, y + t * h + 1, w * 0.03, h / teeth - 2);
    }
  }

  const cols = detail ? 8 : 5;
  const rows = detail ? 6 : 4;
  const pad = w * 0.075;
  const gx = x + pad;
  const gy = y + pad;
  const gw = w - pad * 2;
  const gh = h - pad * 2;
  const cacheY = gy + gh * 0.455;
  const cacheH = gh * 0.09;
  const cw = gw / cols;
  const chh = (gh - cacheH) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const bx = gx + c * cw + 2;
      const by = gy + r * chh + 2 + (r >= rows / 2 ? cacheH : 0);
      const bw = cw - 4;
      const bh = chh - 4;
      const hot = rnd() < 0.15;
      a.fillStyle = hot ? PALETTE.hot : PALETTE.blockLo;
      a.fillRect(bx, by, bw, bh);

      const n = detail ? 6 : 4;
      a.fillStyle = hot ? PALETTE.hotHi : PALETTE.block;
      for (let i = 0; i < n; i++) {
        a.fillRect(bx + 2, by + 2 + (i * (bh - 4)) / n, bw - 4, ((bh - 4) / n) * 0.5);
      }
      if (hot) {
        e.fillStyle = "rgba(255,122,26,0.9)";
        for (let i = 0; i < n; i++) {
          e.fillRect(bx + 2, by + 2 + (i * (bh - 4)) / n, bw - 4, ((bh - 4) / n) * 0.5);
        }
      }
    }
  }

  /* the cache fabric — the bright seam across the middle of the die */
  a.fillStyle = "#0a1322";
  a.fillRect(gx, cacheY, gw, cacheH);
  const slices = detail ? 40 : 22;
  for (let i = 0; i < slices; i++) {
    const sw = gw / slices;
    a.fillStyle = rnd() < 0.5 ? "#1d2f4d" : "#122036";
    a.fillRect(gx + i * sw + 1, cacheY + 2, sw - 2, cacheH - 4);
  }
  e.fillStyle = "rgba(255,122,26,0.55)";
  e.fillRect(gx, cacheY + cacheH * 0.42, gw, cacheH * 0.16);

  a.strokeStyle = "#22334f";
  a.lineWidth = Math.max(1, w * 0.006);
  a.strokeRect(x + 1, y + 1, w - 2, h - 2);
  e.strokeStyle = "rgba(255,122,26,0.42)";
  e.lineWidth = Math.max(1, w * 0.01);
  e.strokeRect(x + 1, y + 1, w - 2, h - 2);
}

/** Routing traces, gold pad ring, discretes and silkscreen. */
function paintSubstrate(a: Ctx, e: Ctx, S: number, cavity: { x: number; y: number; w: number; h: number }) {
  a.fillStyle = PALETTE.pcb;
  a.fillRect(0, 0, S, S);

  for (let i = 0; i < 900; i++) {
    a.fillStyle = `rgba(28,44,72,${0.02 + rnd() * 0.05})`;
    a.fillRect(rnd() * S, rnd() * S, 1 + rnd() * 3, 1 + rnd() * 2);
  }

  a.lineWidth = Math.max(1, S * 0.0022);
  for (let i = 0; i < 260; i++) {
    const side = Math.floor(rnd() * 4);
    const t = 0.06 + rnd() * 0.88;
    let sx: number, sy: number, ex: number, ey: number;
    if (side === 0) {
      sx = t * S; sy = cavity.y;
      ex = sx + (rnd() - 0.5) * S * 0.22; ey = cavity.y - S * (0.03 + rnd() * 0.13);
    } else if (side === 1) {
      sx = t * S; sy = cavity.y + cavity.h;
      ex = sx + (rnd() - 0.5) * S * 0.22; ey = sy + S * (0.03 + rnd() * 0.13);
    } else if (side === 2) {
      sx = cavity.x; sy = t * S;
      ex = cavity.x - S * (0.03 + rnd() * 0.13); ey = sy + (rnd() - 0.5) * S * 0.22;
    } else {
      sx = cavity.x + cavity.w; sy = t * S;
      ex = sx + S * (0.03 + rnd() * 0.13); ey = sy + (rnd() - 0.5) * S * 0.22;
    }
    a.strokeStyle = rnd() < 0.22 ? PALETTE.gold : PALETTE.trace;
    a.beginPath();
    a.moveTo(sx, sy);
    a.lineTo((sx + ex) / 2, sy);
    a.lineTo(ex, ey);
    a.stroke();
  }

  const m = S * 0.045;
  const pads = 44;
  for (let i = 0; i < pads; i++) {
    const t = (i + 0.5) / pads;
    const pw = S * 0.01;
    const ph = S * 0.024;
    a.fillStyle = PALETTE.gold;
    a.fillRect(t * S - pw / 2, m, pw, ph);
    a.fillRect(t * S - pw / 2, S - m - ph, pw, ph);
    a.fillRect(m, t * S - pw / 2, ph, pw);
    a.fillRect(S - m - ph, t * S - pw / 2, ph, pw);
  }

  for (let i = 0; i < 54; i++) {
    const edge = rnd() < 0.5;
    const px = edge ? cavity.x + rnd() * cavity.w : (rnd() < 0.5 ? S * 0.1 : S * 0.86) + rnd() * S * 0.04;
    const py = edge ? (rnd() < 0.5 ? S * 0.1 : S * 0.87) + rnd() * S * 0.03 : cavity.y + rnd() * cavity.h;
    a.fillStyle = "#1a1207";
    a.fillRect(px, py, S * 0.022, S * 0.011);
    a.fillStyle = "#3d3018";
    a.fillRect(px, py, S * 0.005, S * 0.011);
    a.fillRect(px + S * 0.017, py, S * 0.005, S * 0.011);
  }

  /* silkscreen — original TZ-100 marking, deliberately no third-party marks */
  a.save();
  a.fillStyle = "rgba(196,214,244,0.62)";
  a.font = monoFont(S * 0.038);
  a.fillText("TZ-100", S * 0.085, S * 0.115);
  a.font = monoFont(S * 0.02, 400);
  a.fillStyle = "rgba(150,178,220,0.45)";
  a.fillText("NEURAL ACCELERATOR", S * 0.085, S * 0.146);
  a.font = monoFont(S * 0.017, 400);
  a.fillStyle = "rgba(255,122,26,0.60)";
  a.fillText("8192 TENSOR CORES · 96GB HBM", S * 0.085, S * 0.925);
  a.fillStyle = "rgba(150,178,220,0.34)";
  a.fillText("TONY ZHAO SILICON · MEL-AU", S * 0.085, S * 0.952);
  a.textAlign = "right";
  a.fillText("REV 2.6 · LOT 0801", S * 0.915, S * 0.952);
  a.restore();

  e.fillStyle = "rgba(255,122,26,0.5)";
  e.font = monoFont(S * 0.017, 400);
  e.fillText("8192 TENSOR CORES · 96GB HBM", S * 0.085, S * 0.925);

  a.fillStyle = "rgba(255,122,26,0.75)";
  a.beginPath();
  a.arc(S * 0.062, S * 0.062, S * 0.011, 0, Math.PI * 2);
  a.fill();
  e.fillStyle = "rgba(255,122,26,1)";
  e.beginPath();
  e.arc(S * 0.062, S * 0.062, S * 0.013, 0, Math.PI * 2);
  e.fill();
}

function surfacePair(S: number, paint: (a: Ctx, e: Ctx) => void, anisotropy?: number): SurfaceTextures {
  const ca = createCanvas(S);
  const ce = createCanvas(S);
  const a = ca.getContext("2d")!;
  const e = ce.getContext("2d")!;
  e.fillStyle = "#000";
  e.fillRect(0, 0, S, S);
  paint(a, e);
  return { map: toTexture(ca, anisotropy), emissive: toTexture(ce, anisotropy) };
}

/** Hero package face — an empty cavity, because the die is real geometry. */
export function heroSubstrateTextures(S = 1024) {
  return surfacePair(S, (a, e) => {
    const cavity = { x: S * 0.2, y: S * 0.2, w: S * 0.6, h: S * 0.6 };
    paintSubstrate(a, e, S, cavity);
    a.fillStyle = "#04070d";
    a.fillRect(cavity.x, cavity.y, cavity.w, cavity.h);
  });
}

export function heroDieTextures(S = 1024) {
  return surfacePair(S, (a, e) => paintDie(a, e, 0, 0, S, S, true));
}

/** Field chip — substrate, die and memory all painted into one face. */
export function chipFieldTextures(S = 512) {
  return surfacePair(
    S,
    (a, e) => {
      const cavity = { x: S * 0.22, y: S * 0.24, w: S * 0.56, h: S * 0.52 };
      paintSubstrate(a, e, S, cavity);
      paintDie(a, e, cavity.x, cavity.y, cavity.w, cavity.h, false);
      for (let i = 0; i < 4; i++) {
        const bx = i < 2 ? S * 0.09 : S * 0.8;
        const by = cavity.y + (i % 2) * cavity.h * 0.52;
        const bw = S * 0.11;
        const bh = cavity.h * 0.46;
        a.fillStyle = "#0a1120";
        a.fillRect(bx, by, bw, bh);
        a.fillStyle = "#16233a";
        for (let k = 0; k < 5; k++) {
          a.fillRect(bx + 2, by + 3 + (k * (bh - 6)) / 5, bw - 4, ((bh - 6) / 5) * 0.55);
        }
        a.strokeStyle = "#24344f";
        a.lineWidth = 1;
        a.strokeRect(bx + 0.5, by + 0.5, bw - 1, bh - 1);
      }
    },
    4,
  );
}

/**
 * The underside. Without it a chip tumbling back-on renders as a dark plank,
 * which is exactly what breaks the illusion in the field.
 */
export function padArrayTexture(S: number, n: number) {
  const ca = createCanvas(S);
  const a = ca.getContext("2d")!;
  a.fillStyle = "#05080e";
  a.fillRect(0, 0, S, S);
  for (let i = 0; i < 400; i++) {
    a.fillStyle = `rgba(26,40,66,${0.02 + rnd() * 0.05})`;
    a.fillRect(rnd() * S, rnd() * S, 2, 2);
  }
  const m = S * 0.085;
  const step = (S - m * 2) / n;
  const rad = step * 0.27;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const x = m + step * (c + 0.5);
      const y = m + step * (r + 0.5);
      const g = a.createRadialGradient(x - rad * 0.35, y - rad * 0.35, rad * 0.1, x, y, rad);
      g.addColorStop(0, "#d8b478");
      g.addColorStop(0.55, "#8f6a2d");
      g.addColorStop(1, "#3a2a12");
      a.fillStyle = g;
      a.beginPath();
      a.arc(x, y, rad, 0, Math.PI * 2);
      a.fill();
    }
  }
  a.strokeStyle = "rgba(120,150,200,0.16)";
  a.lineWidth = Math.max(1, S * 0.004);
  a.strokeRect(m * 0.55, m * 0.55, S - m * 1.1, S - m * 1.1);
  return toTexture(ca, 4);
}

export function glowTexture(S = 256) {
  const c = createCanvas(S);
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  grd.addColorStop(0.0, "rgba(255,150,60,0.85)");
  grd.addColorStop(0.22, "rgba(255,110,25,0.34)");
  grd.addColorStop(0.55, "rgba(120,80,255,0.10)");
  grd.addColorStop(1.0, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, S, S);
  return toTexture(c, 2);
}

/**
 * A tiny studio in a cube map. Without any environment the metal reads flat
 * black, and with a real HDR the bundle triples in size for no visible gain.
 */
export function studioEnvironment() {
  const F = 64;
  const faces: HTMLCanvasElement[] = [];
  for (let i = 0; i < 6; i++) {
    const c = createCanvas(F);
    const g = c.getContext("2d")!;
    const grd = g.createLinearGradient(0, 0, 0, F);
    if (i === 2) {
      grd.addColorStop(0, "#20304f");
      grd.addColorStop(1, "#0b1322");
    } else if (i === 3) {
      grd.addColorStop(0, "#04060d");
      grd.addColorStop(1, "#02040a");
    } else {
      grd.addColorStop(0, "#16243c");
      grd.addColorStop(0.58, "#0a1220");
      grd.addColorStop(1, "#2c1608");
    }
    g.fillStyle = grd;
    g.fillRect(0, 0, F, F);
    if (i === 0) { g.fillStyle = "rgba(255,140,50,0.62)"; g.fillRect(0, 16, F, 18); }
    if (i === 1) { g.fillStyle = "rgba(47,107,255,0.30)"; g.fillRect(0, 22, F, 12); }
    if (i === 4) { g.fillStyle = "rgba(120,170,255,0.22)"; g.fillRect(0, 8, F, 10); }
    faces.push(c);
  }
  const t = new THREE.CubeTexture(faces as unknown as HTMLImageElement[]);
  t.needsUpdate = true;
  return t;
}
