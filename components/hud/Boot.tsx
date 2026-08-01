"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const ROWS = [
  "Calibrating die interconnect geometry",
  "Loading mission archive · 02 records",
  "Spooling silicon render pipeline",
  "Handshake complete — welcome, operator",
];

export default function Boot() {
  const root = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => { document.body.classList.remove("is-loading"); setGone(true); };
    if (reduced) { finish(); return; }

    const state = { v: 0 };
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(state, {
      v: 100, duration: 2.1, ease: "power2.inOut",
      onUpdate: () => setPct(Math.round(state.v)),
    });
    el.querySelectorAll(".rows span").forEach((r, i) =>
      tl.to(r, { opacity: 1, duration: 0.2 }, 0.25 + i * 0.45)
    );
    tl.to(el.querySelector(".bootwrap"), { opacity: 0, y: -18, duration: 0.6, ease: "power2.in" }, "+=0.15");
    tl.to(el, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.25");
    return () => { tl.kill(); };
  }, []);

  if (gone) return null;

  return (
    <div id="boot" ref={root} aria-hidden>
      <div className="bootwrap">
        <div className="brand"><span>TZ · Deep Field Array</span><span>TZ-100 Uplink</span></div>
        <div className="pct">{String(pct).padStart(3, "0")}<small>%</small></div>
        <div className="bar"><i style={{ width: `${pct}%` }} /></div>
        <div className="rows">
          {ROWS.map((r) => (<span key={r}>› {r} <b>[ OK ]</b></span>))}
        </div>
      </div>
    </div>
  );
}
