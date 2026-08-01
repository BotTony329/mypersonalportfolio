"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    let x = 0, y = 0, rx = 0, ry = 0, tx = 0, ty = 0, raf = 0;

    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      x += (tx - x) * 0.45; y += (ty - y) * 0.45;
      rx += (tx - rx) * 0.14; ry += (ty - ry) * 0.14;
      if (dot.current) dot.current.style.transform = `translate(${x - 2.5}px,${y - 2.5}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx - 29}px,${ry - 29}px)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);

    const enter = () => document.body.classList.add("hovering");
    const leave = () => document.body.classList.remove("hovering");
    const targets = document.querySelectorAll("a,button,.mission,.srow,.chip");
    targets.forEach((t) => { t.addEventListener("mouseenter", enter); t.addEventListener("mouseleave", leave); });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      targets.forEach((t) => { t.removeEventListener("mouseenter", enter); t.removeEventListener("mouseleave", leave); });
    };
  }, []);

  return (<><div id="cur2" ref={ring} aria-hidden /><div id="cur" ref={dot} aria-hidden /></>);
}
