/**
 * The flight path. Each sector owns one camera state; scrolling into a sector
 * eases the renderer toward it, which is what makes the page read as travel
 * rather than as a background that merely scales.
 *
 * `tilt` is camera elevation over the package: low reads edge-on, high looks
 * down the die. `warp` drives how hard the chip field streams past.
 */
export interface CameraState {
  zoom: number;
  x: number;
  y: number;
  intensity: number;
  tilt: number;
  warp: number;
  dim: number;
}

export type SectorId =
  | "hero" | "positioning" | "missions" | "skills" | "copilot" | "about-preview" | "contact";

export const CAMERA: Record<SectorId, CameraState> = {
  hero:            { zoom: 1.00, x:  0.00, y:  0.19, intensity: 1.00, tilt: 0.36, warp: 0.00, dim: 0.00 },
  positioning:     { zoom: 1.42, x:  0.46, y: -0.06, intensity: 0.30, tilt: 0.30, warp: 0.35, dim: 0.55 },
  missions:        { zoom: 2.05, x: -0.52, y:  0.14, intensity: 0.20, tilt: 0.55, warp: 0.55, dim: 0.72 },
  skills:          { zoom: 1.15, x:  0.16, y: -0.46, intensity: 0.38, tilt: 0.30, warp: 0.20, dim: 0.60 },
  copilot:         { zoom: 2.20, x:  0.30, y:  0.20, intensity: 0.18, tilt: 0.24, warp: 0.45, dim: 0.72 },
  "about-preview": { zoom: 2.55, x:  0.58, y: -0.16, intensity: 0.18, tilt: 0.15, warp: 0.60, dim: 0.74 },
  contact:         { zoom: 0.86, x:  0.32, y: -0.26, intensity: 0.92, tilt: 0.44, warp: 0.00, dim: 0.20 },
};

export const SECTOR_LABEL: Record<SectorId, string> = {
  hero: "HERO", positioning: "PROF", missions: "CTRL", skills: "ARRAY",
  copilot: "MOO-1", "about-preview": "BIO", contact: "COMMS",
};

/** Narrow viewports lose horizontal room, so pull the rig back a little rather
 *  than re-authoring the whole path. The floor is deliberately high: with real
 *  geometry, scaling zoom down too far pushes the package off into the dark. */
export const viewportScale = (w: number) => Math.min(1, Math.max(0.8, w / 1400));
