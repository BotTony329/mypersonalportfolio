"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface Step { name: string; desc: string }

/**
 * The workflow spine. GSAP owns this rather than Framer Motion because the
 * fill is scrubbed against scroll position, not triggered by it.
 */
export default function Pipeline({ steps }: { steps: readonly Step[] }) {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Set<number>>(new Set());

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(fill.current, {
        height: "100%", ease: "none",
        scrollTrigger: { trigger: el, start: "top 62%", end: "bottom 78%", scrub: 0.6 },
      });
      gsap.utils.toArray<HTMLElement>(".step", el).forEach((s, i) => {
        gsap.fromTo(s, { x: 34, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1.05, ease: "expo.out",
          scrollTrigger: { trigger: s, start: "top 84%", once: true },
        });
        ScrollTrigger.create({
          trigger: s, start: "top 68%", end: "bottom 40%",
          onToggle: (self) => setActive((prev) => {
            const next = new Set(prev);
            if (self.isActive) next.add(i); else next.delete(i);
            return next;
          }),
        });
      });
    }, el);
    return () => ctx.revert();
  }, [steps]);

  return (
    <div className="pipe" ref={root}>
      <div className="spine" aria-hidden><i ref={fill} /></div>
      {steps.map((s, i) => (
        <div className={`step${active.has(i) ? " on" : ""}`} key={s.name}>
          <span className="node" aria-hidden />
          <span className="sid">STEP {String(i + 1).padStart(2, "0")}</span>
          <span className="sbody">
            <span className="sname">{s.name}</span>
            <span className="sdesc">{s.desc}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
