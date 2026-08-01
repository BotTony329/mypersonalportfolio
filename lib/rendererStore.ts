import type { CameraState } from "./camera";

/**
 * The renderer lives outside React's tree (it owns a rAF loop and a WebGL
 * context). Rather than thread refs through providers, it registers a single
 * imperative handle here that the scroll director drives.
 */
export interface RendererHandle {
  flyTo: (state: CameraState, duration?: number) => void;
  setDust: (opacity: number, duration?: number) => void;
}

let handle: RendererHandle | null = null;

export const registerRenderer = (h: RendererHandle | null) => { handle = h; };
export const getRenderer = () => handle;
