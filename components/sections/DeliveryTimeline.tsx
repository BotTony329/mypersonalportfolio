"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CASE_ENTERPRISE } from "@/lib/content";

/** Kickoff → Go Live, pinned and scrubbed horizontally. */
export default function DeliveryTimeline() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const items = CASE_ENTERPRISE.timeline;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const o = outer.current, t = track.current;
    if (!o || !t) return;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, t.scrollWidth - window.innerWidth + 40);
      gsap.to(t, {
        x: () => -distance(), ease: "none",
        scrollTrigger: {
          trigger: o, start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.6}`,
          pin: true, scrub: 0.8, invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
      gsap.from(gsap.utils.toArray<HTMLElement>(".tl-item", o), {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.05, ease: "expo.out",
        scrollTrigger: { trigger: o, start: "top 70%", once: true },
      });
    }, o);
    return () => ctx.revert();
  }, []);

  const activeIndex = Math.round(progress * (items.length - 1));

  return (
    <div className="tl-outer" id="delivery-timeline" ref={outer}>
      <div className="tl-head wrap">
        <p className="eyebrow b">Delivery Timeline · {items.length} Stages</p>
        <h3 className="h3" style={{ marginTop: 14 }}>Kickoff → Go Live</h3>
      </div>

      <div className="tl-track" ref={track}>
        {items.map((it, i) => (
          <div className={`tl-item${i <= activeIndex ? " on" : ""}`} key={it.name}>
            <span className="no">T-{String(i + 1).padStart(2, "0")}</span>
            <div className="bar"><i /></div>
            <div className="nm">{it.name}</div>
            <div className="ds">{it.desc}</div>
          </div>
        ))}
      </div>

      <div className="tl-prog" aria-hidden><i style={{ width: `${progress * 100}%` }} /></div>
    </div>
  );
}
