"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Rails({ sector }: { sector: string }) {
  const [progress, setProgress] = useState(0);
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (self) => setProgress(self.progress),
    });
    const tick = () => {
      const d = new Date();
      setClock([d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()]
        .map((n) => String(n).padStart(2, "0")).join(":"));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => { st.kill(); clearInterval(id); };
  }, []);

  return (
    <>
      <div className="rail rail-l" aria-hidden>Lat 37°48&apos;S · Melbourne · Deep Field</div>
      <div className="rail rail-r" aria-hidden>
        <span>{String(Math.round(progress * 100)).padStart(2, "0")}</span>
        <div className="track"><i style={{ height: `${progress * 100}%` }} /></div>
        <span>SCR</span>
      </div>
      <div className="hud-bl" aria-hidden>
        <span><i className="dot" />&nbsp; Signal Nominal</span>
        <span>UTC <b>{clock}</b></span>
        <span>Sector <b>{sector}</b></span>
      </div>
    </>
  );
}
