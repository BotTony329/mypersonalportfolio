"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function Counter({ to, pad = 2 }: { to: number; pad?: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 1500);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <b ref={ref}>{String(v).padStart(pad, "0")}</b>;
}
