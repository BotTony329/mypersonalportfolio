"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 44 },
  shown: { opacity: 1, y: 0 },
};

/** The only element types this design actually reveals. */
const TAGS = { div: motion.div, p: motion.p, h3: motion.h3 } as const;
export type RevealTag = keyof typeof TAGS;

/**
 * Viewport reveal primitive. Deliberately narrow — a lookup table rather than
 * `motion(as)` so component identity stays stable across renders.
 */
export default function Reveal({
  children, as = "div", delay = 0, className,
}: { children: ReactNode; as?: RevealTag; delay?: number; className?: string }) {
  const M = TAGS[as];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={variants}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </M>
  );
}
