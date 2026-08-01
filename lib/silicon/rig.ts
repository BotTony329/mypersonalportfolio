import * as THREE from "three";

/**
 * Translates the flight-path uniforms into a real camera move.
 *
 * The uniform names are inherited from the original shader renderer on
 * purpose — the scroll director animates the same five numbers whether the
 * subject is a fullscreen shader or actual geometry, so the choreography in
 * `lib/camera.ts` survives a change of subject.
 */
export interface RigInput {
  /** how close the rig sits: bigger is nearer */
  zoom: number;
  /** where the subject sits on screen, in half-heights */
  offset: THREE.Vector2;
  /** camera elevation — low is edge-on, high looks down the die */
  tilt: number;
  /** damped pointer position, for the parallax lean */
  pointer: THREE.Vector2;
  /** seconds since start, for the slow orbit */
  time: number;
}

const BASE_DISTANCE = 7.5;
const ORIGIN = new THREE.Vector3(0, 0, 0);

/** Distance falls off with zoom so the flight path reads as a dolly. */
export const rigDistance = (zoom: number) => BASE_DISTANCE / Math.max(0.22, zoom);

export function applyRig(camera: THREE.PerspectiveCamera, input: RigInput) {
  const dist = rigDistance(input.zoom);
  const elevation = Math.max(0.045, Math.min(1.05, input.tilt * 1.3));
  const azimuth = input.time * 0.042 + input.pointer.x * 0.2;
  const ring = Math.cos(elevation) * dist;

  camera.position.set(
    Math.sin(azimuth) * ring,
    Math.sin(elevation) * dist + input.pointer.y * 0.35,
    Math.cos(azimuth) * ring,
  );
  camera.lookAt(ORIGIN);

  /* Pan in camera space so `offset` keeps meaning "screen half-heights",
     exactly as it did when it was a shader uniform. */
  const pan = dist * 0.7;
  camera.translateX(-input.offset.x * pan);
  camera.translateY(-input.offset.y * pan);

  return dist;
}
