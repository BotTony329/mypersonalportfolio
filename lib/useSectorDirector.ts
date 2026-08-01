"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAMERA, SECTOR_LABEL, viewportScale, type SectorId } from "./camera";
import { getRenderer } from "./rendererStore";

const SECTORS: SectorId[] = ["hero", "missions", "case01", "case02", "resp", "skills", "contact"];
const NAV_FOR: Record<SectorId, string> = {
  hero: "hero", missions: "missions", case01: "case01",
  case02: "case02", resp: "case02", skills: "skills", contact: "contact",
};

/**
 * Binds scroll position to (a) the renderer's camera state, (b) the dimming
 * veil that keeps body copy legible, and (c) the HUD sector readout.
 *
 * One resolver rather than seven enter/leave triggers: per-section
 * onEnter/onEnterBack pairs only fire when you *cross* a boundary, so a jump
 * straight to #contact — nav click, deep link, restored scroll position —
 * could leave the rig stranded between two sectors. Deriving the active
 * sector from scroll position on every update is simpler and correct from any
 * starting point.
 */
export function useSectorDirector(
  onSector: (label: string, navId: string) => void
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const dim = document.getElementById("dim");
    let current: SectorId | null = null;

    const flyTo = (id: SectorId) => {
      const c = CAMERA[id];
      if (!c) return;
      const f = viewportScale(window.innerWidth);
      if (dim) gsap.to(dim, { opacity: c.dim, duration: 1.7, ease: "power2.inOut", overwrite: "auto" });
      getRenderer()?.flyTo({ ...c, zoom: c.zoom * f, x: c.x * f, y: c.y * f });
      getRenderer()?.setDust(1 - c.dim * 0.75);
    };

    /* section tops only move on refresh, not on scroll — so cache them */
    let tops: { id: SectorId; top: number }[] = [];
    const measure = () => {
      tops = SECTORS.flatMap((id) => {
        const el = document.getElementById(id);
        return el ? [{ id, top: el.getBoundingClientRect().top + window.scrollY }] : [];
      });
    };

    /* the last section whose top has passed the middle of the viewport owns
       the camera, which also holds ENT-02 through the pinned timeline */
    const resolve = (): SectorId => {
      const mid = window.scrollY + window.innerHeight * 0.5;
      let id: SectorId = tops.length ? tops[0].id : "hero";
      for (const s of tops) if (mid >= s.top) id = s.id;
      return id;
    };

    const apply = (id: SectorId) => {
      if (id === current) return;
      current = id;
      flyTo(id);
      onSector(SECTOR_LABEL[id], NAV_FOR[id]);
    };

    measure();
    const director = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: () => apply(resolve()),
      onRefresh: () => { measure(); apply(resolve()); },
    });
    apply(resolve());

    let rz: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rz);
      rz = setTimeout(() => {
        measure();
        if (current) flyTo(current);
        ScrollTrigger.refresh();
      }, 220);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(rz);
      director.kill();
    };
  }, [onSector]);
}
