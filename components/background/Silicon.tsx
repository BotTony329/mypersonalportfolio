"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "@/lib/silicon/background.glsl";
import { buildSiliconScene } from "@/lib/silicon/scene";
import { applyRig } from "@/lib/silicon/rig";
import { registerRenderer } from "@/lib/rendererStore";
import type { CameraState } from "@/lib/camera";

/**
 * Owns the WebGL context and the rAF loop, and nothing else.
 *
 * Two passes into one context: a fullscreen quad for the deep field, then the
 * TZ-100 stage rendered with a real perspective camera. Everything the scroll
 * director animates is a plain `{ value }` box, so the director never touches
 * the DOM — or three.js — to move the camera.
 */
export default function Silicon() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch {
      return;
    }

    const mobile = window.innerWidth < 760;
    const DPR = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75);
    renderer.setPixelRatio(DPR);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x02040a, 1);
    renderer.autoClear = false;
    el.appendChild(renderer.domElement);

    const uniforms = {
      uRes: { value: new THREE.Vector2(window.innerWidth * DPR, window.innerHeight * DPR) },
      uTime: { value: 0 },
      uZoom: { value: 1 },
      uOffset: { value: new THREE.Vector2(0, 0.19) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uIntensity: { value: 1 },
      uTilt: { value: 0.36 },
      uWarp: { value: 0 },
    };

    /* ---- deep field ---- */
    const bgScene = new THREE.Scene();
    const bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const bgGeo = new THREE.PlaneGeometry(2, 2);
    const bgMat = new THREE.ShaderMaterial({
      uniforms, vertexShader: VERTEX_SHADER, fragmentShader: FRAGMENT_SHADER,
      depthTest: false, depthWrite: false,
    });
    bgScene.add(new THREE.Mesh(bgGeo, bgMat));

    /* ---- the stage ---- */
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 220);
    const stage = buildSiliconScene({ mobile, dpr: DPR });

    registerRenderer({
      flyTo: (s: CameraState, duration = 1.7) => {
        const ease = "power2.inOut";
        gsap.to(uniforms.uZoom, { value: s.zoom, duration, ease, overwrite: "auto" });
        gsap.to(uniforms.uIntensity, { value: s.intensity, duration, ease, overwrite: "auto" });
        gsap.to(uniforms.uTilt, { value: s.tilt, duration, ease, overwrite: "auto" });
        gsap.to(uniforms.uWarp, { value: s.warp, duration, ease, overwrite: "auto" });
        gsap.to(uniforms.uOffset.value, { x: s.x, y: s.y, duration, ease, overwrite: "auto" });
      },
      setDust: (opacity, duration = 1.7) => {
        gsap.to(stage.dustMaterial.uniforms.uOpacity, {
          value: opacity, duration, ease: "power2.inOut", overwrite: "auto",
        });
      },
    });

    /* ---- loop ---- */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const damped = new THREE.Vector2();
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let visible = true;
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    const t0 = performance.now();
    let last = t0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) { last = now; return; }

      const time = (now - t0) * 0.001;
      const delta = Math.min(0.05, (now - last) * 0.001);
      last = now;

      uniforms.uTime.value = time;
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      uniforms.uMouse.value.set(pointer.x, pointer.y);
      damped.set(pointer.x, pointer.y);

      const zoom = Math.max(0.22, uniforms.uZoom.value);
      /* the flight path dims to 0.18 to bury the old shader; geometry needs a
         floor or the package disappears entirely mid-page */
      const light = 0.34 + 0.66 * uniforms.uIntensity.value;

      applyRig(camera, {
        zoom, offset: uniforms.uOffset.value, tilt: uniforms.uTilt.value,
        pointer: damped, time,
      });
      stage.update({ time, delta, light, warp: uniforms.uWarp.value, zoom }, camera);

      renderer.clear();
      renderer.render(bgScene, bgCam);
      renderer.clearDepth();
      renderer.render(stage.scene, camera);
    };
    raf = requestAnimationFrame(frame);

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      uniforms.uRes.value.set(w * DPR, h * DPR);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      registerRenderer(null);
      stage.dispose();
      bgMat.dispose();
      bgGeo.dispose();
      renderer.dispose();
      el.replaceChildren();
    };
  }, []);

  return <div id="gl" ref={host} aria-hidden />;
}
